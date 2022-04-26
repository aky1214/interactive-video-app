<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 pt-5">
        <VideoContainer :videoName="videoName" :videoUrl="videoUrl" :events="events" v-if="videoUrl" /> 

        <div class="d-flex w-100 my-5">
          <div class="card w-100">
            <div class="card-header">
              <h4 class="text-center">Select iframe code for dimensions</h4>

            </div>
            <div class="card-body">
              <input type="textarea" placeholder="Edit your iframe link here..." class="form-control w-100 my-2" row="3" v-model="copytext">
              <b-button variant="outline-primary" @click="copySomething(copytext)">Copy Edited</b-button>
              <b-button variant="outline-primary" @click="copySomething(`<iframe width='850px' height='480px' src='${location}/video?id=${video_id}' frameborder='0'></iframe>`)">Iframe (850px x 480px)</b-button>
              <b-button variant="outline-primary" @click="copySomething(`<div id='video_box'></div>
    <script id='pgScript' src='${location}/scripts/lg/${video_id}'></script>`)">Script</b-button>
              
              <b-button variant="outline-primary" @click="copytext = ''">Clear</b-button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name:'Watch',
    data(){
        return{
            videoName:null,
            videoUrl:null,
            events:[],
            location:null,
            video_id:null,
            copytext:null,

        }
    },
    async created(){
      this.video_id =  this.$route.query.id; 

    },
    mounted() {
      this.location = location.origin;
      // console.log(location.origin)
      let videoId = this.$route.query.id;
    // this.video_id =  videoId; 
    axios.get(`/play-video/${videoId}`).then((response) => {
      this.videoUrl = response.data[0].video_url;
      this.videoName = response.data[0].video_name;
      this.events = JSON.parse(response.data[0].events);
      // console.log(response.data);
    });
  },
  methods:{
    async copySomething(text) {
      this.copytext = text;
      try {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2500);
        await this.$copyText(text);
      } catch (e) {
        console.error(e);
      }
    },
  }
}
</script>