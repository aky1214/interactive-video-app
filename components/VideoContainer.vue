<template>
  <div class="card overflow-hidden">
    <video
      :src="this.video_url"
      controls
      id="videoPlayer"
      @loadeddata="videoLength()"
      @timeupdate="getDetails()"
      @seeked="getSeeked()"
    ></video>
    <div class="d-flex w-100 align-items-center" id="comp" v-if="this.events_array && eventOn == true">
      <div
        class="bg-light"
        id="events"
        v-for="(items, index) in this.events_array"
        :key="index"
      >
        <div class="d-flex flex-wrap"
          :class="items.position"
          id="buttons"
          v-if="
            items.event_type == 'button' &&
            parseInt(items.time_start) <= current_time &&
            parseInt(items.time_start) + parseInt(items.duration) >=
              current_time
          "
        >
          <div
            class="d-flex"
            v-for="(item, index) in items.buttons"
            :key="index"
          >
          <VideoButtons :button="item" @loadNew="loadNew" @loadNewuploaded="loadNewuploaded"/>
            
          </div>
        </div>
        <div
          :class="items.position"
          id="forms"
          v-if="
            items.event_type == 'form' &&
            current_time >= parseInt(items.time_start) &&
            current_time <=
              parseInt(items.time_start) + parseInt(items.duration)
          "
        >
          <VideoForm v-if="formClose == false" :videoName="video_name" :event="items" @closeForm="submittedForm" @submitted="submittedForm"/>
        </div>
        <div
          :class="items.position"
          id="cta"
          v-if="
            items.event_type == 'cta' &&
            current_time >= parseInt(items.time_start) &&
            current_time <=
              parseInt(items.time_start) + parseInt(items.duration)
          "
        >
          <button class="btn btn-primary" v-if="ctaTextShow == true" @click="ctaTextShow = false">{{items.cta_text}}</button>
          <VideoCta v-if="ctaTextShow == false" :videoName="video_name" :event="items" @closeForm="submittedCta" @submitted="submittedCta"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "VideoContainer",
  props: {
    videoName:String,
    videoUrl: String,
    events: Array,
  },
  data() {
    return {
      video_name: this.videoName,
      events_array: this.events,
      video_url:this.videoUrl,
      current_time: 0,
      video_length: 0,
      eventOn: true,
      ctaTextShow:true,
      formClose:false,
    };
  },
  methods: {
    async loadNew(val){
      await axios.get(`/play-video/${val}`).then((response) => {
        this.video_url = response.data[0].video_url;
          this.video_name = response.data[0].video_name;
          this.events_array = JSON.parse(response.data[0].events);
          // if(playerDiv.paused == true){
            // playerDiv.setAttribute("autoplay", true);
          // }
        });
        var playerDiv = document.querySelector('#videoPlayer')
         playerDiv.play();
    },
    loadNewuploaded(val){
      var playerDiv = document.querySelector('#videoPlayer')
      playerDiv.autoplay = true;
       playerDiv.play();
      if(this.isValidHttpUrl(val.link)){
        this.video_url = val.link
        this.video_name = val.name;
        this.events_array = [];
        }
      // }else{
      //   axios.get(`/play-video/${val.link}`).then((response) => {
      //     this.video_url = response.data[0].video_url;
      //     this.video_name = response.data[0].video_name;
      //     // this.events_array = JSON.parse(response.data[0].events);
      //     document.getElementById('videoPlayer').play();
      //   });
      // }
    },
    videoLength() {
      var video = document.querySelector("#videoPlayer");
      var dur = parseInt(video.duration);
      this.video_length = dur;
      this.$emit("videoLength", dur);
    },
    getDetails() {
      var video = document.querySelector("#videoPlayer");
      var time = parseInt(video.currentTime);
      this.current_time = time;
      this.$emit("currentTime", time);

      // console.log(time)
    },
    submittedForm(){
      this.formClose = true
    },
    submittedCta(){
      this.ctaTextShow = true
    },
    getSeeked() {
      var comp = document.querySelector("#comp");
      comp.innerHTML = ``;
      this.getDetails();
      this.eventOn = false;
        this.$nextTick(() => {
          this.eventOn = true;
        });
    },
      isValidHttpUrl(val) {
          let url;

          try {
            url = new URL(val);
          } catch (_) {
            return false;
          }

          return url.protocol === "http:" || url.protocol === "https:";
      },
  },
};
</script>

<style scoped>
#comp {
  /* position: absolute;
  height: 100%;
  top: 20px;
  justify-content: space-evenly; */
}
.top-left {
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

#cta{
  max-height: 350px;
  overflow: scroll;
}
#forms{
  max-height: 350px;
  overflow-y: scroll;
}
#cta::-webkit-scrollbar{
  display: none;
  width: 4px;
  border-radius: 50%;
}
#forms::-webkit-scrollbar{
  display: none;
  width: 4px;
  border-radius: 50%;
}
</style>