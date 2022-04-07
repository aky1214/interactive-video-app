<template>
    <div class="container py-5">
        <div class="card my-2" v-for="(items, index) in createdVideos" :key="index">
            <CompletedList :items="items" @deleted="loadList"/>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'List',
    middleware:'auth',
    data(){
        return{
            createdVideos:null
        }
    },
    async created(){
        this.loadList();
    },
    methods:{
        async loadList(){
            let user = this.$store.state.auth.user;
            if(user!=null){
                await axios
                .get(`/created-videos/${user}`)
                .then((response) => {
                  this.createdVideos = response.data;
                //   console.log(response.data);
                });
            }
        }
    }
}
</script>