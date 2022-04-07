<template>
  <!-- <div class="container"> -->
    <!-- <div class="row justify-content-center">
      <div class="col-8 pt-5"> -->
        <VideoContainer :videoName="videoName" :videoUrl="videoUrl" :events="events" v-if="videoUrl" /> 
      <!-- </div>
    </div> -->
  <!-- </div> -->
</template>

<script>
import axios from "axios";
export default {
    name:'Video',
    layout:'LayoutWatch',
    data(){
        return{
            videoName:null,
            videoUrl:null,
            events:[],

        }
    },
    mounted() {
    let videoId = this.$route.query.id;
    axios.get(`/play-video/${videoId}`).then((response) => {
      this.videoUrl = response.data[0].video_url;
      this.videoName = response.data[0].video_name;
      this.events = JSON.parse(response.data[0].events);
      console.log(response.data);
    });
  },
}
</script>