<template>
  <div class="card p-5">
    <div class="card-title">
      <h2 class="text-center">Start adding Videos.</h2>
    </div>
    <div class="card-body">
      <FormData @refreshList="refreshList"/>
      <hr class="text-center mt-4 border-1 border-bottom">
      <form @submit.prevent="onSubmit" class="mt-4">
        <label for="url_input" class="form-label">Enter video url here:</label>
        <input
          type="text"
          class="form-control"
          id="url_input"
          v-model="urlInput"
        />
        <button type="submit" class="btn btn-outline-primary mt-2">Add<span v-if="message == true">ed</span></button>
      </form>
      <div class="d-flex flex-column mt-5 w-100">
          <h2 class="f3">Your videos</h2>
          <div class="d-flex">
              <button class="btn btn-outline-primary mr-2" :class="{'active':show_completed == false}" @click="show_completed = false">Uploaded Videos</button>
              <button class="btn btn-outline-primary" :class="{'active':show_completed == true}" @click="show_completed = true">Completed Videos</button>
          </div>
        <UrlList :urlDataList="this.dataObjArray" v-if="!show_completed"/>
        <CompletedList :urlDataList="this.createdVideos" v-if="show_completed"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GatherUrl",
  props: {
    dataObjArray: Array,
    createdVideos:Array
  },
  data() {
    return {
      urlInput: null,
      urlArray: [],
      message:false,
      show_completed:false,
    };
  },
  created() {},
  methods: {
    async onSubmit() {
      const formData = new FormData();
      formData.append("video_url", this.urlInput);
      formData.append("user", "user1");
      try {
        await axios.post(`/add-video`, formData);
        this.message = true;
        setTimeout(()=>{this.message = false}, 2500)
      } catch (err) {
          console.log(err);
        this.message = err.response.data.error;
          setTimeout(()=>{this.message = false}, 2500)
      }
      this.refreshList();
    },
    refreshList(){
        this.$emit('refreshList')
    }
  },
};
</script>
<style scoped>
</style>