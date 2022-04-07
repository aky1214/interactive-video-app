<template>
  <div class="card">    
      <div class="card-header px-3 pt-3 m-0">
        <h3 class="h5 m-0 text-capitalize">{{ items.video_name }}</h3>
      </div>
      <div class="card-body">
        <p>{{ webSite }}/watch?id={{ items.video_id }}</p>
      </div>
      <div class="card-footer">
        <b-button
          variant="btn btn-outline-primary"
          :to="`/watch?id=${items.video_id}`"
          >Open</b-button
        >
        <b-button
          variant="btn btn-outline-primary mx-2"
          :to="`/create?id=${items.video_id}&edit=true`"
          >Edit</b-button
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "UrlList",
  middleware: "check",
  props: {
    items: Object,
  },
  data() {
    return {
      // urlDataList:null,
      webSite: null,
      copied: false,
    };
  },
  mounted() {
    this.webSite = location.origin;
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