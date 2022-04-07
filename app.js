const { loadNuxt, build } = require('nuxt');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const _ = require('lodash');
const db = require('./db');
const { json } = require('express/lib/response');
const fs = require('fs');
const res = require('express/lib/response');
require('dotenv/config');

const isDev = process.env.APP_ENVIRONMENT != 'production'

const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan('dev'));

app.get('/scripts', (req,res)=>{
  res.sendFile(__dirname + "/data/" + "video-script.js")
})

app.post('/add-video', (req, res) => {
  if (!req.files) {
    if (req.body.video_url) {
      db.query(`INSERT INTO video_list(url, name, user) VALUES('${req.body.video_url}','${req.body.video_name}', '${req.body.user}')`,(error,response)=>{
        if(response){
          res.send('video added')
        }else if(error){
          res.send(error)
        }
      })
    } else {
      return res.status(500).send({ msg: "file is not found" })
    }
  } else {
    // accessing the file
    const myFile = req.files.file;
    db.query(`INSERT INTO video_list(url, name, user) VALUES('${'/uploads/' + req.body.user + '/' + myFile.name}','${myFile.name}', '${req.body.user}')`)

    myFile.mv(`${__dirname}/static/uploads/${req.body.user}/${myFile.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
  }
});

app.post('/user-signup', (req, res) => {
  db.query(`SELECT user_name, email FROM users WHERE user_name = '${req.body.user}'`, (error, response) => {
    if (response.length>0) {
      res.status(403).send("User already exists!");
    }else if (error || response.length == 0) {
      db.query(`INSERT INTO users(user_name, email) VALUES('${req.body.user}', '${req.body.email}')`,()=>{
        if (response) {
          res.status(201).send(`Account for ${req.body.user} Created`);
        }
        if (error) {
          res.status(403).send(error);
        };
      })
    };
  })
})

app.post('/user-login', (req, res) => {
  try {
    db.query(`SELECT user_name, email FROM users WHERE user_name = '${req.body.user}'`, (error, response) => {
      if (response) {
        if (response[0] != undefined) {
          res.status(201).send({ login: true });
          console.log('login success')
        } else {
          res.send({ login: false });
          console.log('no user found')
        }
        // console.log(response[0])
      }
      if (error) {
        console.log(error);
      };
    })
  } catch (error) {
    console.log(error)
  }
})

app.get('/videos/:user', (req, res) => {
  let user = req.params.user
  db.query(`SELECT * FROM video_list WHERE user = '${user}'`, (error, response) => {
    if (response) {
      let resObj = response
      res.send(resObj)
    } else if (error) {
      res.status(404).send(error)
    }
  })
})

app.get('/get-video/:videoId', (req, res) => {

  console.log(req.ip)
  db.query(`SELECT * FROM video_list WHERE id = '${req.params.videoId}'`, (error, response) => {
    if (response) {
      res.send(response)
    } else {
      res.status(403).send(error)
    }
  })
});

app.post('/create-video/:edit', (req, res) => {
  console.log(req.params.edit)
  console.log(req.body)

  if(req.params.edit == 'false'){
    db.query(`INSERT INTO video_config(video_name, video_id, video_url, user, events) VALUES('${req.body.video_name}', '${req.body.video_id}', '${req.body.video_url}', '${req.body.user}', '${req.body.events}')`, (error, response) => {
      if (response) {
        res.send(response)
      } else {
        res.status(403).send(error)
      }
    })
  }else if(req.params.edit == 'true'){
    db.query(`UPDATE video_config SET events = '${req.body.events}', video_name = '${req.body.video_name}' WHERE video_id = '${req.body.video_id}'`, (error, response) => {
      if (response) {
        res.send(response)
      } else {
        res.status(403).send(error)
      }
    })
  }
  // console.log(req.body)
})

app.get('/play-video/:ids', (req, res) => {

  let vId = `${req.params.ids}`;
  db.query(`SELECT * FROM video_config WHERE video_id = '${vId}'`, (error, response) => {
    if (response) {
      // console.log(response)
      res.send(response)
    } else {
      res.status(403).send(error)
    }
  })
})
app.get('/created-videos/:user', (req, res) => {

  let vId = `${req.params.user}`;
  db.query(`SELECT * FROM video_config WHERE user = '${vId}'`, (error, response) => {
    if (response) {
      // console.log(response)
      res.send(response)
    } else {
      res.status(403).send(error)
    }
  })
})

app.post('/form-submit', (req,res)=>{
  db.query(`INSERT INTO user_form_data(user,video_name, video_id, form_data, sender_ip, read_status) VALUES('${req.body.user}','${req.body.video_name}','${req.body.video_id}','${req.body.form_data}', '${req.ip}', '${0}')`, (error,response)=>{
    if (response) {
      console.log(response)
      res.send(response)
    } else {
      res.status(403).send(error)
    }
  })
});

app.get('/:user/get-replies', (req, res)=>{
  db.query(`SELECT * FROM user_form_data WHERE user='${req.params.user}'`, (error, response) => {
    if (response) {
      console.log(response)
      res.send(response)
    } else {
      res.status(403).send(error)
    }
  })
});

app.post('/read/:id', (req,res)=>{
  db.query(`UPDATE user_form_data SET read_status = true WHERE id = ${req.params.id}` )
})
app.get('/delete-message/:id', (req,res)=>{
  console.log(req.params.id)
  db.query(`DELETE FROM user_form_data WHERE id = ${req.params.id}`, (error,response)=>{
    if(response){
      res.send(response);
    }else if(error){
      res.status(403).send(error);
    }
  })
})
app.get('/delete-uploaded/:user/:name/:id', (req,res)=>{
  var path = `${__dirname}/static/uploads/${req.params.user}/${req.params.name}`
  // fs.unlinkSync(path)
  db.query(`DELETE FROM video_list WHERE id = ${req.params.id}`, (error,response)=>{
    if(response){
      try {
        console.log(req.params.name, typeof req.params.name)
        if(req.params.name != undefined && req.params.name != "undefined"){
          console.log('in')
          fs.unlinkSync(path)
        }
        //file removed
        res.send(response);
      } catch(err) {
        console.error('err',err)
        res.status(403).send(err);
      }
    }else if(error){
      console.log('error', error)
      res.status(403).send(error);
    }
  })
})
app.get('/delete-complete/:id', (req,res)=>{
  console.log(req.params.id)
  db.query(`DELETE FROM video_config WHERE video_id = ${req.params.id}`, (error,response)=>{
    if(response){
      res.send(response);
    }else if(error){
      res.status(403).send(error);
    }
  })
})

async function start() {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Render every route with Nuxt
  app.use(nuxt.render)

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

start()


//start app 
const port = process.env.PORT || 3000;

// app.listen(port, () =>
//   console.log(`App is listening on port ${port}.`)
// );