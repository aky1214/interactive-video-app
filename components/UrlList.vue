<template>
  <!-- <div class="card"> -->
    <div class="card-body" v-if="!urlDataList || urlDataList.length == 0">
      <h4 class="text-center my-4">No videos uploaded yet...</h4>
    </div>
  <div class="card-body px-0 my-1" v-else>
    <div class="card my-1" v-for="(items, index) in urlDataList" :key="index">
      <!-- <nuxt-link :to="{name:'create', params:{obj:items}}"> -->
      <!-- <div class="card-title px-3 pt-3 m-0">
                    <h3 class="h5 m-0">{{ items.name }}</h3>
                </div> -->
      <div class="card-body d-flex justify-content-between">
        <p class="text-wrap pr-2" style="word-break:break-all!important;">
          {{ checkValid(`${items.url}`) }}
        </p>
        <div>
            <b-button
          variant="btn btn-outline-primary"
          :to="`/create?id=${items.id}`"
          >Create</b-button
        >
            <b-button
          variant="btn btn-outline-danger"
          @click="deleteVideo({id:items.id,user:items.user,name:items.name})"
          >Delete</b-button
        >
        </div>
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
    };
  },
  mounted() {
    this.webSite = location.host;
  },
  methods: {
    // getData(){
    //     if(process.client){
    //        return JSON.parse(localStorage.getItem('urlData'))
    //     }
    // },
    async deleteVideo(val){
      await axios.get(`/delete-uploaded/${val.user}/${val.name}/${val.id}`).then((response)=>{
        console.log('response :', response)
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