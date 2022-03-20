<template>
    <div class="card overflow-hidden" >
        <video :src="this.videoUrl" controls id="videoPlayer" @timeupdate="getDetails()" @seeked="getSeeked()"></video>
        <div class="d-flex w-100 align-items-center" id="comp"></div>
        <!-- <b-button variant="btn btn-outline-primary" @click="getDetails()">show</b-button> -->
        {{currentTime}}
    </div>
</template>

<script>
export default {
    name:'VideoContainer',
    props:{
        videoUrl:String,
        events:Object
    },
    data(){
        return{
            currentTime:null,
            createEvent:false
        }
    },
    methods:{
        getDetails(){
            var video = document.querySelector('#videoPlayer');
            var time = parseInt(video.currentTime)
            var events = this.events;

            events.forEach((element)=>{
                var comp = document.querySelector('#comp');
                if(time >= element.time_start && time < (element.time_start + element.duration) && this.createEvent == false){
                    // alert('1')
                    // comp.innerHTML =``;
                    if(element.event_type == 'button'){
                        // alert('2')
                        element.buttons.forEach((el)=>{
                            // alert(el)
                            comp.innerHTML += `<a class="btn btn-primary" href="${el.link}">${el.text}</a>`;
                        })                        
                        this.createEvent = true;
                    }else if(element.event_type == 'form'){
                        // var buttons 
                        // event_typeent.buttons.forEach((element)=>{
                        //     console.log(element)
                            comp.innerHTML += `<form class="card p-4 bg-light">
                                                  <div class="mb-3">
                                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                                  </div>
                                                  <div class="mb-3">
                                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                                    <input type="password" class="form-control" id="exampleInputPassword1">
                                                  </div>
                                                  <div class="mb-3 form-check">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                                  </div>
                                                  <button type="submit" class="btn btn-primary">Submit</button>
                                                </form>`;
                        // })                        
                        this.createEvent = true;
                    }
                } else if((time == element.time_start + element.duration) && this.createEvent == true){
                    comp.innerHTML = ``;
                    this.createEvent = false;
                } 
                // else if(time <= element.time_start && time >= element.time_end && this.createEvent == true){
                //     comp.innerHTML = ``;
                //     this.createEvent = false;
                // }
                // alert(element.time_start)
            })


            this.currentTime = time

            // console.log(time)
        },
        getSeeked(){
            var comp = document.querySelector('#comp');
            comp.innerHTML =``;
            this.createEvent = false;
            this.getDetails();
        },
        check(){
            alert('check')
        }
    }
}
</script>

<style scoped>
#comp{
    position: absolute;
    top: 20px;
    justify-content: space-evenly;
}

</style>