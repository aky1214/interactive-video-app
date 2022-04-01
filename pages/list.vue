<template>
    <div class="container">
        <CompletedList :urlDataList="this.createdVideos"/>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'List',
    data(){
        return{
            createdVideos:null
        }
    },
    async created(){
        if(process.client){
            let user = JSON.parse(localStorage.getItem("user")).login_user;
        await axios
        .get(`/created-videos/${user}`)
        .then((response) => {
          this.createdVideos = response.data;
          console.log(response.data);
        });
        }
    }
}
</script>