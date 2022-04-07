<template>
  <div class="card p-5">
    <div class="card-title">
      <h2 class="text-center">Start adding Videos.</h2>
    </div>
    <div class="card-body">
      <FormData @refreshList="refreshList"/>
      <hr class="text-center mt-4 border-1 border-bottom">
      <form @submit.prevent="onSubmit" class="mt-4">
        <label for="name_input" class="form-label">Enter video name here:</label>
        <input
          type="text"
          class="form-control mb-2"
          placeholder="Enter video name here..."
          id="name_input"
          v-model="nameInput"/>
        <label for="url_input" class="form-label">Enter video url here:</label>
        <input
          type="text"
          class="form-control mb-2"
          placeholder="Enter video url here..."
          id="url_input"
          v-model="urlInput"
        />
        <div class="message d-flex align-items-center mt-2">
        <button type="submit" class="btn btn-outline-primary">Add</button>
          <h5 class="m-0 ml-2" v-if="loading && !message">Adding...</h5>
          <h5 class="m-0 ml-2" v-if="message">{{ message }}</h5>
        </div>
      </form>
      <div class="d-flex flex-column mt-5 w-100">
          <h2 class="f3">Your videos</h2>
          <div class="d-flex">
              <button class="btn btn-outline-primary mr-2" :class="{'active':show_completed == false}" @click="show_completed = false">Uploaded Videos</button>
              <button class="btn btn-outline-primary" :class="{'active':show_completed == true}" @click="show_completed = true">Completed Videos</button>
          </div>
          <div v-if="!show_completed">
            <div class="card-body" v-if="!dataObjArray || dataObjArray.length == 0">
              <h4 class="text-center my-4">No videos uploaded yet...</h4>
            </div>
            <div class="card-body px-0 my-1" v-else>
              <div class="my-2" v-for="(item, index) in dataObjArray" :key="index">
                <UrlList :items="item" @deleted="deleted" />
              </div>
            </div>
          </div>
          <div v-if="show_completed">
            <div class="card-body" v-if="!createdVideos || createdVideos.length == 0">
              <h4 class="text-center my-4">No videos created yet...</h4>
            </div>
            <div class="card-body px-0 my-1" v-else>
              <div class="card my-1" v-for="(items, index) in createdVideos" :key="index">
                <CompletedList :items="items" @deleted="deleted"/>
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
  name: "GatherUrl",
  props: {
    dataObjArray: Array,
    createdVideos:Array
  },
  data() {
    return {
      nameInput: null,
      urlInput: null,
      urlArray: [],
      message:false,
      show_completed:false,
      loading:false
    };
  },
  watch:{
    message(){
      setTimeout(()=>{this.loading = false},2000)
    }
  },
  methods: {
    deleted(){
      this.$emit('deleted');
    },
    async onSubmit() {
      this.loading = true
      const formData = new FormData();
      formData.append("video_url", this.urlInput);
      formData.append("video_name", this.nameInput);
      formData.append("user", this.$store.state.auth.user);
      
          console.log('response')
        await axios.post(`/add-video`, formData).then((response)=>{
          console.log(response)
          this.message = response.data;
          setTimeout(()=>{this.message = null}, 2500)
        })
       .catch((err)=>{
          console.log(err);
        this.message = err.response.data.error;
          setTimeout(()=>{this.message = null}, 2500)
      })
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