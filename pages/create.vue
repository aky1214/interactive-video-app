<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <!-- <div>{{urlObject}}</div> -->
        <VideoContainer :events="events" :videoUrl="video_url" v-if="urlObject" @currentTime="currentTime" @videoLength="videoLength"/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card my-4">
          <div class="d-flex flex-column p-4" v-if="!nameSaved">
            <label class="form-label text-center h5 font-weight-normal mb-4" for="video_name">Enter a name for Video</label>
            <input class="form-control mb-4" type="text" placeholder="Enter video name..." v-model="video_name">
            <button class="btn btn-outline-success m-auto" @click="nameSaved = true">Save video name</button>
          </div>
          <div class="card-body" v-if="nameSaved">
            <EventAdder :editEventObj="editEventObj" @eventSave="eventSave" :video_length="video_length" :current_time="current_time"/>
          </div>
        </div>
      </div>
    </div>
    <EventSidebar
      :eventList="events"
      @createVideo="createVideo"
      @deleteEvent="deleteEvent"
      @editEvent="editEvent"
      v-if="events.length > 0 && nameSaved"
    />
  </div>
</template>

<script>
import axios from "axios";
import eventSidebar from "../components/eventSidebar.vue";
export default {
  components: { eventSidebar },
  name: "create",
  middleware: "auth",
  data() {
    return {
      urlObject: null,
      video_url:null,
      events: [],
      video_length:0,
      current_time:0,
      video_name:null,
      nameSaved:false,
      editEventObj:null,
    };
  },
  mounted() {
    let videoId = this.$route.query.id;
    let editStatus = this.$route.query.edit;
      // alert(typeof editStatus)
    if(editStatus == 'false'){
      axios.get(`/get-video/${videoId}`).then((response) => {
        this.urlObject = response.data[0];
        this.video_url = response.data[0].url;
        console.log(response.data);
      });
    }else if(editStatus == 'true'){
      axios.get(`/play-video/${videoId}`).then((response) => {
        this.urlObject = response.data[0];
        this.video_url = response.data[0].video_url;
        this.video_name = response.data[0].video_name;
        this.events = JSON.parse(response.data[0].events);
        console.log('response data',response.data);
      });
    }

  },
  methods: {
    videoLength(val){
      this.video_length = val;
    },
    currentTime(val){
      this.current_time = val;
    },
    eventSave(value) {
      this.events.push(value);
      this.editEventObj=null;
    },
    deleteEvent(val) {
      this.events.splice(val, 1);
    },
    editEvent(val){
      this.editEventObj = this.events[val]
      this.events.splice(val, 1);
    },
    async createVideo() {
        const hashCode = s =>
      s.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
      const formData = new FormData();
      if(this.$route.query.edit == 'false'){formData.append("video_id", hashCode(this.urlObject.url+this.video_name));}
      if(this.$route.query.edit == 'true'){formData.append("video_id", this.$route.query.id)};
      formData.append("video_name", this.video_name);
      formData.append("video_url", this.urlObject.url);
      formData.append("user", this.urlObject.user);
      formData.append("events", JSON.stringify(this.events));
      try {
        await axios.post(`/create-video/${this.$route.query.edit}`, formData);
        this.$router.push(
          this.$route.query.redirectFrom || {
            path: "/list",
          }
        );
        // this.message = "Uploaded!!";
      } catch (err) {
        console.log(err);
        // this.message = err.response.data.error;
      }
    },
  },
};
</script>