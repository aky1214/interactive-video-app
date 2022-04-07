<template>
  <div class="card">
      <div class="card-header">
        <p class="m-0 text-capitalize" v-if="items.name != 'undefined'">{{items.name}}</p>
        <p class="m-0 text-capitalize" v-else>video</p>
        
      </div>
      <div class="card-body d-flex justify-content-between">
        <p class="text-wrap pr-2" style="word-break:break-all!important;">
          {{ checkValid(`${items.url}`) }}
        </p>
      </div>
      <div class="card-footer">
            <b-button
          variant="btn btn-outline-primary mx-2"
          :to="`/create?id=${items.id}&edit=false`"
          >Create</b-button
        >
            <b-button
          variant="btn btn-outline-danger"
          @click="deleteVideo({id:items.id,user:items.user,name:items.name})"
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
    };
  },
  mounted() {
    this.webSite = location.origin;
  },
  methods: {
    // getData(){
    //     if(process.client){
    //        return JSON.parse(localStorage.getItem('urlData'))
    //     }
    // },
    async deleteVideo(val){
      await axios.get(`/delete-uploaded/${val.user}/${val.name}/${val.id}`).then((response)=>{
        console.log('deleted :', response.data)
        this.$emit('deleted')
      }).catch((error)=>{
        console.log('error :', error)
      })
    },
    checkValid(val) {
        if(this.isValidHttpUrl(val)){
            return `${val}`
        }else{
            return `${this.webSite}${val}`
        }
        },
       isValidHttpUrl(val) {
        let url;

        try {
          url = new URL(val);
        } catch (_) {
          return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
      }
  },
};
</script>