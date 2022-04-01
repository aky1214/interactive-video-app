<template>
  <div class="container pt-5">
    <GatherUrl :dataObjArray="dataObjArray" :createdVideos="createdVideos" @deleted="refreshList" @refreshList="refreshList"/>
  </div>
</template>

<script>
import GatherUrl from "../components/GatherUrl.vue";
import axios from "axios";
export default {
  components: { GatherUrl },
  name: "IndexPage",
  middleware: "check",
  props:{
    userData:String,
  },
  data() {
    return {
      dataObjArray: [],
      createdVideos:[]
    };
  },
  async created() {
    if (process.client) {
      if (localStorage.getItem("user") == null) {
        this.$router.push(
          this.$route.query.redirectFrom || {
            path: "/login",
          }
        );
      }
      this.refreshList()
    }
  },
  methods:{
    async refreshList(){
      let user = JSON.parse(localStorage.getItem("user")).login_user;
      // alert(user)
      await axios
        .get(`/videos/${user}`)
        .then((response) => {
          this.dataObjArray = response.data;
          console.log(response.data);
        });
      await axios
        .get(`/created-videos/${user}`)
        .then((response) => {
          this.createdVideos = response.data;
          console.log(response.data);
        });

    }
  }
};
</script>
  