<template>
  <!-- <div class="card"> -->
  <div class="card-body px-0 my-1">
    <div class="card my-1" v-for="(items, index) in urlDataList" :key="index">
      <!-- <nuxt-link :to="{name:'create', params:{obj:items}}"> -->
      <div class="card-title px-3 pt-3 m-0">
        <h3 class="h5 m-0">Video {{ index }}</h3>
      </div>
      <div class="card-body">
        <p>{{ webSite }}/watch?id={{ items.video_id }}</p>
        <b-button
          variant="btn btn-outline-primary"
          :to="`${webSite}/watch?id=${items.video_id}`"
          >Open</b-button
        >
        <b-button
          variant="btn btn-outline-primary"
          @click="copySomething(`${webSite}/watch?id=${items.video_id}`)"
          >Copy Link</b-button
        >
      </div>
      <!-- </nuxt-link> -->
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
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
      copied:false
    };
  },
  mounted() {
    this.webSite = location.host;
  },
  methods: {
    async copySomething(text) {
      try {
          this.copied = true
          setTimeout(()=>{this.copied=false},2500)
        await this.$copyText(text);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>