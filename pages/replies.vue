<template>
  <div class="container">
    <div class="card mt-5">
      <h1 class="text-center my-3 f4">Form Replies</h1>
      <div class="d-flex justify-content-center">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-primary" :class="{'active': this.rep_status == 'all'}" @click="rep_status = 'all'">All</button>
          <button type="button" class="btn btn-outline-primary" :class="{'active': this.rep_status == 1}" @click="rep_status = 1">Read</button>
          <button type="button" class="btn btn-outline-primary" :class="{'active': this.rep_status == 0}" @click="rep_status = 0">Un-read</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card border-0">
          <div class="card-header py-3 border-1 border d-flex justify-content-between">
            <h4 class="m-0 ml-3" v-if="rep_status == 'all'">All replies</h4>
            <h4 class="m-0 ml-3" v-if="rep_status == 1">Read replies</h4>
            <h4 class="m-0 ml-3" v-if="rep_status == 0">Unread replies</h4>
            <div class="d-flex align-items-center" v-if="replies_for_select.length > 0">
              <p class="m-0 mr-2 w-100">For video</p>
              <b-form-select class="text-capitalize" v-model="replies_for" :options="replies_for_select"></b-form-select>
            </div>
          </div>
          <div class="card-body" v-if="replyList != null && replyList.length > 0">
            <div
              class="d-flex my-2"
              v-for="(items, index) in replyList"
              :key="index"
            >
              <ReplyBox @deleted="fetchReplies" :reply="items" v-if="items.read_status == rep_status && rep_status != 'all' && replies_for == items.video_name"/>
              <ReplyBox @deleted="fetchReplies" :reply="items" v-if="rep_status == 'all' && replies_for == items.video_name"/>
              <ReplyBox @deleted="fetchReplies" :reply="items" v-if="items.read_status == rep_status && rep_status != 'all' && replies_for == 'All'"/>
              <ReplyBox @deleted="fetchReplies" :reply="items" v-if="rep_status == 'all' && replies_for == 'All'"/>
            </div>
          </div>
          <div class="card-body" v-if="replyList == null || replyList.length == 0">
            <p class="text-center h5">No Contact yet...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Replies",
  middleware:'auth',
  data() {
    return {
      replyList: null,
      rep_status:'all',
      replies_for_select:[],
      replies_for:'All',
      user:this.$store.state.auth.user
    }
  },
  watch:{
    replyList(){
      var nameList = ['All']
      var list = this.replyList 
      console.log(list)
      list.forEach((element,index)=>{
        nameList.push(element.video_name)
      })
      let unique = nameList.filter((item, i, ar) => ar.indexOf(item) === i);
      this.replies_for_select = unique
    }
  },
  async created() {  
      this.fetchReplies();
  },
  methods: {
    async fetchReplies() {
      

      // let user = store.state.auth.user;
      // console.log(JSON.parse(chek))
      await axios
        .get(`/${this.user}/get-replies`)
        .then((response) => {
          this.replyList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>