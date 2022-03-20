<template>
    <!-- <div class="card"> -->
        <div class="card-body px-0 my-1">
            <div class="card my-1" v-for="(items, index) in urlDataList" :key="index" >
                <!-- <nuxt-link :to="{name:'create', params:{obj:items}}"> -->
                <div class="card-title px-3 pt-3 m-0">
                    <h3 class="h5 m-0">{{ items.name }}</h3>
                </div>
                <div class="card-body">
                    <p>
                        {{ webSite }}{{ items.url }}
                    </p>
                    <b-button variant="btn btn-outline-primary" :to="`/create?id=${items.id}`">Create</b-button>
                </div>
                <!-- </nuxt-link> -->
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
export default {
    name:'UrlList',
    middleware:'check',
    props:{
        urlDataList:Array
    },
    data(){
        return{
            // urlDataList:null,
            webSite: null,
        }
    },
    mounted(){
            this.webSite = location.host
    },
    methods:{
        // getData(){
        //     if(process.client){
        //        return JSON.parse(localStorage.getItem('urlData'))
        //     }
        // },
    }
}
</script>