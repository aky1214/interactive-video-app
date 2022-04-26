var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
// link.integrity = 'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3';
link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
link.media = 'all';
link.crossorigin = 'anonymous';
var style = document.createElement("style");
style.innerHTML = `.top-left {
  position: absolute;
  top: 1rem;
  left: 1rem;
}
.top-center {
  position: absolute;
  top: 1rem;
}
.top-right {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.middle-left {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform:translate(0%,-50%);
}
.middle-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.middle-right {
  position: absolute;
  top: 50%;
  right: 1rem;
}
.bottom-left {
  position: absolute;
  bottom: 4.2rem;
  left: 1rem;
}
.bottom-center {
  position: absolute;
  bottom: 4.2rem;
  left: 50%;
  transform: translate(-50%);
}
.bottom-right {
  position: absolute;
  bottom: 4.2rem;
  right: 1rem;
}

.cta{
  max-height: 350px!important;
  overflow: scroll;
}
.forms{
  max-height: 350px!important;
  overflow-y: scroll;
}
.cta::-webkit-scrollbar{
  display: none;
  width: 4px;
  border-radius: 50%;
}
.forms::-webkit-scrollbar{
  display: none;
  width: 4px;
  border-radius: 50%;
}
.social{
    display: flex;
}
.social svg{
    width:20px;
}
.social:hover svg path{
    fill:#fff;
}`;
head.appendChild(link);
head.appendChild(style);
//video box config
const video_box = document.getElementById('video_box');


//events to add
var eventObjectRaw = {
  id: 'db_id',
  video_name: 'db_video_name',
  video_id: 'db_video_id',
  events: 'db_events',
  video_url: 'db_video_url',
  user: 'db_user',
};
var eventsObject = {
  id: JSON.parse(eventObjectRaw.id),
  video_name: JSON.parse(eventObjectRaw.video_name),
  video_id: JSON.parse(eventObjectRaw.video_id),
  events: JSON.parse(eventObjectRaw.events),
  video_url: JSON.parse(eventObjectRaw.video_url),
  user: JSON.parse(eventObjectRaw.user),
};


const videoPlayer = function () {
  const player = document.createElement('video');

  player.autoplay = true;
  player.controls = true;
  player.id = 'video';
  player.style.borderRadius = '8px';
  player.style.width = '840px';
  player.style.height = 'auto';
  player.style.margin = 'auto';
  player.style.position = 'relative';
  player.addEventListener('loadeddata', (e, index) => {
    let vcTime = e.target.currentTime;
    eventDisplay(vcTime)
  });
  player.addEventListener('timeupdate', (e, index) => {
    let vcTime = e.target.currentTime;
    eventDisplay(vcTime)
  });
  player.addEventListener('seeked', (e, index) => {
    let vcTime = e.target.currentTime;
    eventDisplay(vcTime)
  });
  if (isValidHttpUrl(eventsObject.video_url)) {
    player.src = eventsObject.video_url;
  } else if (!isValidHttpUrl(eventsObject.video_url)) {
    player.src = 'http://localhost:3000' + eventsObject.video_url;
  }
  return player
}


function isValidHttpUrl(val) {
  let url;

  try {
    url = new URL(val);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}


setTimeout(() => { eventDisplay(0) }, 700)

function eventDisplay(vcTime) {
  var createdEvents = document.querySelectorAll('[data-start]');

  createdEvents.forEach((ele) => {
    if (parseInt(ele.dataset.start) <= vcTime && parseInt(ele.dataset.dur) >= vcTime) {
      if (ele.classList.contains('d-none')) {
        ele.classList.remove('d-none')
      }
    } else {
      if (!ele.classList.contains('d-none')) {
        ele.classList.add('d-none')
      }
    }
  })
}



function closeForm(val) {
  // preventDefaul
  let formSelector = document.getElementById(val);
  formSelector.classList.toggle('d-none');
}
function closeCta(val) {
  // preventDefaul
  let formSelector = document.getElementById(`form_${val}`);
  let ctaSelector = document.getElementById(`cta_${val}`);
  formSelector.classList.toggle('d-none');
  ctaSelector.classList.toggle('d-none');
}

const eventBox = function () {
  const events_box = document.createElement('div');

  events_box.style.display = 'flex';
  events_box.style.color = '#fff';
  events_box.width = '100%';

  eventsObject.events.forEach((element, elIndex) => {
    const event_item = document.createElement('div');
    event_item.className = `${element.position} d-none`;

    event_item.dataset.start = parseInt(element.time_start);
    event_item.dataset.dur = parseInt(element.time_start) + parseInt(element.duration);

    if (element.event_type == 'button') {
      element.buttons.forEach((el) => {

        if (el.type == 'redirect') {
          event_item.innerHTML += `<a class="btn btn-primary m-2" href="${el.link}">${el.text}</a>`;
        }
        if (el.type == 'social') {
          event_item.innerHTML += `<div class="d-flex" v-else-if="button.type == 'social' && this.button">
                <a target="_blank" class="btn btn-outline-primary m-2 social s-email" href="mailto:?subject=Video share&amp;body=Check this video - ${location.href}" v-if="button.social.email == true">
                    <svg width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    >
                    <path
                      fill="#007bff"
                      d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4ZM5,6H19a1,1,0,0,1,1,1l-8,4.88L4,7A1,1,0,0,1,5,6ZM20,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9.28l7.48,4.57a1,1,0,0,0,1,0L20,9.28Z"
                    />
                  </svg>
                </a>
                <a target="_blank" class="btn btn-outline-primary m-2 social s-facebook" href="https://www.facebook.com/share.php?u=${location.href}" v-if="button.social.facebook == true">
                    <svg width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#007bff"
                      d="M15.12,5.32H17V2.14A26.11,26.11,0,0,0,14.26,2C11.54,2,9.68,3.66,9.68,6.7V9.32H6.61v3.56H9.68V22h3.68V12.88h3.06l.46-3.56H13.36V7.05C13.36,6,13.64,5.32,15.12,5.32Z"
                    />
                  </svg>
                </a>
                <a target="_blank" class="btn btn-outline-primary m-2 social s-linkedin" href="https://www.linkedin.com/shareArticle?url=${location.href}&amp;summary=Check this video - ${location.href}&amp;source= ${location.href}" v-if="button.social.linkedin == true">
                    <svg width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#007bff"
                      d="M17.5,8.999a5.41868,5.41868,0,0,0-2.56543.64453A.99918.99918,0,0,0,14,8.999H10a.99943.99943,0,0,0-1,1v12a.99942.99942,0,0,0,1,1h4a.99942.99942,0,0,0,1-1v-5.5a1,1,0,1,1,2,0v5.5a.99942.99942,0,0,0,1,1h4a.99942.99942,0,0,0,1-1v-7.5A5.50685,5.50685,0,0,0,17.5,8.999Zm3.5,12H19v-4.5a3,3,0,1,0-6,0v4.5H11v-10h2v.70313a1.00048,1.00048,0,0,0,1.78125.625A3.48258,3.48258,0,0,1,21,14.499Zm-14-12H3a.99943.99943,0,0,0-1,1v12a.99942.99942,0,0,0,1,1H7a.99942.99942,0,0,0,1-1v-12A.99943.99943,0,0,0,7,8.999Zm-1,12H4v-10H6ZM5.01465,1.542A3.23283,3.23283,0,1,0,4.958,7.999h.02832a3.23341,3.23341,0,1,0,.02832-6.457ZM4.98633,5.999H4.958A1.22193,1.22193,0,0,1,3.58887,4.77051c0-.7461.55957-1.22852,1.42578-1.22852A1.2335,1.2335,0,0,1,6.41113,4.77051C6.41113,5.5166,5.85156,5.999,4.98633,5.999Z"
                    />
                  </svg>
                </a>
                <a target="_blank" class="btn btn-outline-primary m-2 social s-twitter" href="https://twitter.com/intent/tweet?text=Check this video - ${location.href}" v-if="button.social.twitter == true">
                    <svg width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#007bff"
                      d="M22.99121,3.9502a.99942.99942,0,0,0-1.51074-.85938,7.47956,7.47956,0,0,1-1.873.793,5.15234,5.15234,0,0,0-3.374-1.24219,5.23238,5.23238,0,0,0-5.22363,5.06348A11.03194,11.03194,0,0,1,4.19629,3.78125,1.01154,1.01154,0,0,0,3.33887,3.416a.99852.99852,0,0,0-.78516.5,5.2755,5.2755,0,0,0-.24219,4.76855l-.00195.00195a1.0411,1.0411,0,0,0-.49512.88868,3.04174,3.04174,0,0,0,.02637.43945,5.1854,5.1854,0,0,0,1.56836,3.3125.99813.99813,0,0,0-.06641.76953,5.20436,5.20436,0,0,0,2.36231,2.92187,7.46464,7.46464,0,0,1-3.58985.44825.99975.99975,0,0,0-.665,1.833A12.94248,12.94248,0,0,0,8.46,21.36133,12.7878,12.7878,0,0,0,20.9248,11.998,12.82166,12.82166,0,0,0,21.46,8.35156c0-.06543,0-.13281-.001-.20019A5.76963,5.76963,0,0,0,22.99121,3.9502ZM19.68457,7.16211a.995.995,0,0,0-.2334.70215c.00977.165.00879.331.00879.4873a10.82371,10.82371,0,0,1-.4541,3.08106A10.68457,10.68457,0,0,1,8.46,19.36133a10.93791,10.93791,0,0,1-2.55078-.30078,9.47951,9.47951,0,0,0,2.94238-1.56348A1.00033,1.00033,0,0,0,8.25,15.71094a3.208,3.208,0,0,1-2.21387-.93457q.22413-.04248.44532-.10547a1.00026,1.00026,0,0,0-.08008-1.94336,3.19824,3.19824,0,0,1-2.25-1.72559,5.29929,5.29929,0,0,0,.54492.0459,1.02093,1.02093,0,0,0,.9834-.69629A.9998.9998,0,0,0,5.2793,9.21484,3.19559,3.19559,0,0,1,3.85547,6.542c0-.0664.00195-.13281.00586-.19824a13.01365,13.01365,0,0,0,8.209,3.47949,1.02046,1.02046,0,0,0,.81739-.3584,1.00037,1.00037,0,0,0,.206-.86816,3.15653,3.15653,0,0,1-.08691-.72852A3.23,3.23,0,0,1,16.2334,4.6416a3.18428,3.18428,0,0,1,2.34472,1.02051A.993.993,0,0,0,19.499,5.96a9.27073,9.27073,0,0,0,1.21192-.32226A6.68126,6.68126,0,0,1,19.68457,7.16211Z"
                    />
                  </svg>
                </a>
                <a target="_blank" class="btn btn-outline-primary m-2 social s-whatsapp" href="https://wa.me/?text=Check this video - ${location.href}" v-if="button.social.whatsapp == true">
                    <svg width="16"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="svg8"
                    inkscape:version="0.92.4 (5da689c313, 2019-01-14)"
                    sodipodi:docname="1881161.svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    style="enable-background: new 0 0 24 24"
                    xml:space="preserve"
                  >
                    <path
                      fill="#007bff"
                      id="path4"
                      inkscape:connector-curvature="0"
                      d="M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9"
                    />
                  </svg>
                </a>
            </div>`;
        }
        if (el.type == 'completed') {
          event_item.innerHTML += `<div class="d-flex">
                <button class="btn btn-primary m-2 text-capitalize" onclick="loadNew(${el.link})">${el.text}</button>
              </div>`;
        }
        if (el.type == 'uploaded') {
          event_item.innerHTML += `<div class="d-flex">
                <button class="btn btn-primary m-2 text-capitalize" onclick="loadNewuploaded({link:'${el.link}',name:'${el.text}'})">${el.text}</button>
              </div>`;
        }
      })
    }
    if (element.event_type == 'form') {
      const form = document.createElement('form');
      form.addEventListener('submit', (el) => {
        el.preventDefault();
        let inputDiv = el.target.querySelectorAll('[data-class = form-input]')
        var qAns = [];
        inputDiv.forEach((input) => {
          if (input.dataset.type != 'checkbox') {
            var qaObj = {
              ques: input.dataset.label,
              ans: input.dataset.value,
            };
            qAns.push(qaObj);
          } else {
            let ansArr = JSON.parse(input.dataset.value)
            var ans = []
            ansArr.forEach((el) => {
              if (typeof el == 'string') {
                ans.push(el)
              }
            });
            var qaObj = {
              ques: input.dataset.label,
              ans: ans,
            };
            qAns.push(qaObj);
          }
        });

        var bodyData = {
          video_id: eventsObject.video_id,
          video_name: eventsObject.video_name,
          user: eventsObject.user,
          form_data: JSON.stringify(qAns),
        }

        var raw = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyData)
        }

        fetch('http://localhost:3000/form-submit', raw).then(response => response.json())
          .then((data) => {
            console.log(data)
          })

      })
      form.className = "card p-3 text-dark forms";
      form.id = `form_${elIndex}`;
      form.style.maxHeight = '350px';
      form.style.overflowY = 'scroll';
      const formTitle = document.createElement('div');
      const formBody = document.createElement('div');
      const formSubmit = document.createElement('button');

      formTitle.className = "d-flex justify-content-between mb-2 border-1 border-bottom pb-2";
      formBody.className = "mb-3";
      formTitle.innerHTML = `<p class="text-capitalize h5">${element.form_title}</p>
    <button class="btn-close" onclick="closeForm('form_${elIndex}')"></button>`;
      form.appendChild(formTitle);

      element.inputs.forEach((el, index) => {
        if (el.type == 'text' || el.type == 'email' || el.type == 'textarea') {
          const formBodyText = document.createElement('div');
          formBodyText.dataset.label = el.name;
          formBodyText.dataset.class = 'form-input';
          formBodyText.dataset.type = el.type;
          formBodyText.innerHTML += `<label class="text-capitalize" for="input-${index}">${el.name}</label>
            <input
              class="form-control mb-2"
              name="input-${index}"
              id="input-${index}"
              type="${el.type}"
              placeholder="${el.placeholder}"
            />`;
          formBody.appendChild(formBodyText)
        } else if (el.type == 'dropdown') {
          const formSelectDiv = document.createElement('div');
          formSelectDiv.dataset.label = el.name;
          formSelectDiv.dataset.class = 'form-input';
          formSelectDiv.dataset.type = el.type;
          const formSelect = document.createElement('select');
          formSelect.className = "form-select my-2";
          const formSelectTitle = document.createElement('p');

          formSelectTitle.innerHTML = el.name;
          formSelectTitle.className = "m-0 mb-2 text-capitalize";

          formSelectDiv.appendChild(formSelectTitle);

          el.options.forEach((opt) => {
            formSelect.innerHTML += `<option value="${opt}">${opt}</option>`
          });
          formSelectDiv.appendChild(formSelect)
          formBody.appendChild(formSelectDiv);
        } else if (el.type == 'radio') {
          const formRadio = document.createElement('div');
          formRadio.dataset.label = el.name;
          formRadio.dataset.class = 'form-input';
          formRadio.dataset.type = el.type;
          formRadio.className = "d-flex flex-column";
          const formRadioTitle = document.createElement('p');

          formRadioTitle.innerHTML = el.name;
          formRadioTitle.className = "m-0 mb-2 text-capitalize";

          formRadio.appendChild(formRadioTitle);

          el.options.forEach((opt, radioIndex) => {
            const formRadioBox = document.createElement('div');
            formRadioBox.className = "form-check"
            formRadioBox.innerHTML += `<input class="form-check-input" type="radio" value="${opt}" name="${el.name}" id="radio-${radioIndex}" />
          <label class="form-check-label text-capitalize" for="radio-${radioIndex}">${opt}</label>`
            formRadio.appendChild(formRadioBox);
          });

          formBody.appendChild(formRadio);
        } else if (el.type == 'checkbox') {
          const formCheck = document.createElement('div');

          formCheck.dataset.label = el.name;
          formCheck.dataset.class = 'form-input';
          formCheck.dataset.type = el.type;
          formCheck.className = "form-check";
          const formCheckTitle = document.createElement('p');

          formCheckTitle.innerHTML = el.name;
          formCheckTitle.className = "m-0 mb-2 text-capitalize";

          formCheck.appendChild(formCheckTitle);

          el.options.forEach((opt, checkIndex) => {
            const formCheckBox = document.createElement('div');
            formCheckBox.className = "form-check";
            formCheckBox.innerHTML += `<input class="form-check-input" type="checkbox" value="${opt}" name="${el.name}" id="checkbox-${checkIndex}" />
              <label class="form-check-label text-capitalize" for="checkbox-${checkIndex}">${opt}</label>`
            formCheck.appendChild(formCheckBox);
          });

          formBody.appendChild(formCheck);

        }
      })

      form.appendChild(formBody);
      formSubmit.type = 'submit';
      formSubmit.className = 'btn btn-outline-primary'
      formSubmit.innerHTML = 'Submit';
      form.appendChild(formSubmit);
      event_item.appendChild(form);
    }
    if (element.event_type == 'cta') {
      const buttonCta = document.createElement('button');
      buttonCta.className = "btn btn-primary"
      buttonCta.innerHTML = `${element.cta_text}`;
      buttonCta.id = `cta_${elIndex}`
      buttonCta.addEventListener('click', () => { closeCta(elIndex) })
      event_item.appendChild(buttonCta)
      const form = document.createElement('form');
      form.addEventListener('submit', (el) => {
        el.preventDefault();
        let inputDiv = el.target.querySelectorAll('[data-class = form-input]')
        var qAns = [];
        inputDiv.forEach((input) => {
          if (input.dataset.type != 'checkbox') {
            var qaObj = {
              ques: input.dataset.label,
              ans: input.dataset.value,
            };
            qAns.push(qaObj);
          } else {
            let ansArr = JSON.parse(input.dataset.value)
            var ans = []
            ansArr.forEach((el) => {
              if (typeof el == 'string') {
                ans.push(el)
              }
            });
            var qaObj = {
              ques: input.dataset.label,
              ans: ans,
            };
            qAns.push(qaObj);
          }
        });

        var bodyData = {
          video_id: eventsObject.video_id,
          video_name: eventsObject.video_name,
          user: eventsObject.user,
          form_data: JSON.stringify(qAns),
        }

        var raw = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyData)
        }

        fetch('http://localhost:3000/form-submit', raw).then(response => response.json())
          .then((data) => {
            console.log(data)
          })

      })
      form.className = "card p-3 text-dark d-none cta";
      form.id = `form_${elIndex}`;      
      form.style.maxHeight = '350px';
      form.style.overflowY = 'scroll';
      const formTitle = document.createElement('div');
      const formBody = document.createElement('div');
      const formSubmit = document.createElement('button');

      formTitle.className = "d-flex justify-content-between mb-2 border-1 border-bottom pb-2";
      formBody.className = "mb-3";
      formTitle.innerHTML = `<p class="text-capitalize h5">${element.cta_text}</p>
      <button class="btn-close" onclick="closeCta('${elIndex}')"></button>`;
      form.appendChild(formTitle);

      element.inputs.forEach((el, index) => {
        if (el.type == 'text' || el.type == 'email' || el.type == 'textarea') {
          const formBodyText = document.createElement('div');
          formBodyText.dataset.label = el.name;
          formBodyText.dataset.class = 'form-input';
          formBodyText.dataset.type = el.type;
          formBodyText.innerHTML += `<label class="text-capitalize" for="input-${index}">${el.name}</label>
            <input
              class="form-control mb-2"
              name="input-${index}"
              id="input-${index}"
              type="${el.type}"
              placeholder="${el.placeholder}"
            />`;
          formBody.appendChild(formBodyText);
        } else if (el.type == 'dropdown') {
          const formSelectDiv = document.createElement('div');
          formSelectDiv.dataset.label = el.name;
          formSelectDiv.dataset.class = 'form-input';
          formSelectDiv.dataset.type = el.type;
          const formSelect = document.createElement('select');
          formSelect.className = "form-select my-2";
          const formSelectTitle = document.createElement('p');

          formSelectTitle.innerHTML = el.name;
          formSelectTitle.className = "m-0 mb-2 text-capitalize";

          formSelectDiv.appendChild(formSelectTitle);

          el.options.forEach((opt) => {
            formSelect.innerHTML += `<option value="${opt}">${opt}</option>`
          });
          formSelectDiv.appendChild(formSelect)
          formBody.appendChild(formSelectDiv);
        } else if (el.type == 'radio') {
          const formRadio = document.createElement('div');
          formRadio.dataset.label = el.name;
          formRadio.dataset.class = 'form-input';
          formRadio.dataset.type = el.type;
          formRadio.className = "d-flex flex-column";
          const formRadioTitle = document.createElement('p');

          formRadioTitle.innerHTML = el.name;
          formRadioTitle.className = "m-0 mb-2 text-capitalize";

          formRadio.appendChild(formRadioTitle);

          el.options.forEach((opt, radioIndex) => {
            const formRadioBox = document.createElement('div');
            formRadioBox.className = "form-check"
            formRadioBox.innerHTML += `<input class="form-check-input" type="radio" value="${opt}" name="${el.name}" id="radio-${radioIndex}" />
          <label class="form-check-label text-capitalize" for="radio-${radioIndex}">${opt}</label>`
            formRadio.appendChild(formRadioBox);
          });

          formBody.appendChild(formRadio);
        } else if (el.type == 'checkbox') {
          const formCheck = document.createElement('div');
          formCheck.dataset.label = el.name;
          formCheck.dataset.class = 'form-input';
          formCheck.dataset.type = el.type;
          formCheck.className = "form-check";
          const formCheckTitle = document.createElement('p');

          formCheckTitle.innerHTML = el.name;
          formCheckTitle.className = "m-0 mb-2 text-capitalize";

          formCheck.appendChild(formCheckTitle);

          el.options.forEach((opt, checkIndex) => {
            const formCheckBox = document.createElement('div');
            formCheckBox.className = "form-check";
            formCheckBox.innerHTML += `<input class="form-check-input" type="checkbox" value="${opt}" name="${el.name}" id="checkbox-${checkIndex}" />
              <label class="form-check-label text-capitalize" for="checkbox-${checkIndex}">${opt}</label>`
            formCheck.appendChild(formCheckBox);
          });

          formBody.appendChild(formCheck);

        }
      })

      form.appendChild(formBody);
      formSubmit.type = 'submit';
      formSubmit.className = 'btn btn-outline-primary'
      formSubmit.innerHTML = 'Submit';
      form.appendChild(formSubmit);
      event_item.appendChild(form);
    }



    events_box.appendChild(event_item)
  });
  return events_box
}

function loadNew(val) {
  const dataObj = fetch(`http://localhost:3000/play-video/${val}`, { method: 'GET' }).then(response => response.text())
    .then((result) => {
      var dataObj = JSON.parse(result)[0]
  eventsObject = {
    id: dataObj.id,
    video_name: dataObj.video_name,
    video_id: dataObj.video_id,
    events: JSON.parse(dataObj.events),
    video_url: dataObj.video_url,
    user: dataObj.user,
  }
  addToHtml()
    });
    console.log(dataObj)
}

function loadNewuploaded(val) {
  if (isValidHttpUrl(val.link)) {
    eventsObject = {
      video_name: val.name,
      events: [],
      video_url: val.link
    };
    addToHtml()
  }
}

function addToHtml() {
  video_box.innerHTML = ``;
  video_box.appendChild(videoPlayer());
  video_box.appendChild(eventBox());
  video_box.style.width = '840px';
  video_box.style.margin = 'auto';
  video_box.style.position = 'relative';
}

addToHtml()
// video_box.appendChild(eventBox());



function inpEvent() {
  let inputDiv = document.querySelectorAll('[data-class = form-input]')
  inputDiv.forEach((elem) => {
    if (elem.dataset.type == 'text' || elem.dataset.type == 'email' || elem.dataset.type == 'textarea') {
      let inEl = elem.querySelector('input');
      inEl.addEventListener('keyup', (e) => {
        elem.dataset.value = e.target.value;
      })
    }
    if (elem.dataset.type == 'dropdown') {
      let inEl = elem.querySelector('select');
      inEl.addEventListener('change', (e) => {
        elem.dataset.value = e.target.value;
      })
    }
    if (elem.dataset.type == 'radio') {
      let inEl = elem.querySelectorAll(`[name = ${elem.dataset.label}]`);
      inEl.forEach((el) => {
        el.addEventListener('change', (e) => {
          elem.dataset.value = e.target.value;
        })

      })
    }
    if (elem.dataset.type == 'checkbox') {
      let inEl = elem.querySelectorAll(`input`);
      elem.dataset.value = JSON.stringify([]);
      inEl.forEach((el, indx) => {
        el.addEventListener('change', (e) => {
          let arr = JSON.parse(elem.dataset.value)

          if (e.target.checked) {
            arr[indx] = e.target.value;
            elem.dataset.value = JSON.stringify(arr);
          } else if (!e.target.checked) {
            arr[indx] = null
            elem.dataset.value = JSON.stringify(arr);
          }
        })

      })
    }
  })
}

inpEvent()






