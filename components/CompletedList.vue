<template>
  <!-- <div class="card"> -->
    <div class="card-body" v-if="!urlDataList || urlDataList.length == 0">
      <h4 class="text-center my-4">No videos created yet...</h4>
    </div>
  <div class="card-body px-0 my-1" v-else>
    <div class="card my-1" v-for="(items, index) in urlDataList" :key="index">
      <!-- <nuxt-link :to="{name:'create', params:{obj:items}}"> -->
      <div class="card-title px-3 pt-3 m-0">
        <h3 class="h5 m-0 text-capitalize">{{ items.video_name }}</h3>
      </div>
      <div class="card-body">
        <p>{{ webSite }}/watch?id={{ items.video_id }}</p>
        <b-button
          variant="btn btn-outline-primary"
          :to="`/watch?id=${items.video_id}`"
          >Open</b-button
        >
        <b-button
          variant="btn btn-outline-primary"
          @click="copySomething(`${webSite}/watch?id=${items.video_id}`)"
          >Copy Link</b-button
        >
        <b-button
          variant="btn btn-outline-danger"
          @click="deleteVideo(items.video_id)"
          >Delete</b-button
        >
      </div>
      <!-- </nuxt-link> -->
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios';
export default {
  name: "UrlList",
  middleware: "check",
  props: {
    urlDataList: Array,
  },
  data() {
    return {
      // urlDataList:null,
      webSite: null,
      copied: false,
    };
  },
  mounted() {
    this.webSite = location.host;
  },
  methods: {
    async deleteVideo(val){
      await axios.get(`/delete-complete/${val}`).then((response)=>{
        console.log('response :', response)
        this.$emit('deleted')
      }).catch((error)=>{
        console.log('error :', error)
      })
    },
    async copySomething(text) {
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
  },
};
</script>