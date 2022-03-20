<template>
        <VideoContainer :videoUrl="videoUrl" :events="events" v-if="videoUrl" /> 
</template>

<script>
import axios from "axios";
export default {
    name:'Watch',
    data(){
        return{
            videoUrl:null,
            events:[],

        }
    },
    mounted() {
    let videoId = this.$route.query.id;
    axios.get(`/play-video/${videoId}`).then((response) => {
      this.videoUrl = response.data[0].video_url;
      this.events = JSON.parse(response.data[0].events);
      console.log(response.data);
    });
  },
}
</script>