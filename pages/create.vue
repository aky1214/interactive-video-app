<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <!-- <div>{{urlObject}}</div> -->
        <VideoContainer :videoUrl="urlObject.url" v-if="urlObject" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <EventAdder @eventSave="eventSave" />
          </div>
        </div>
      </div>
    </div>
    <EventSidebar
      :eventList="events"
      @createVideo="createVideo"
      @deleteEvent="deleteEvent"
      v-if="events.length > 0"
    />
  </div>
</template>

<script>
import axios from "axios";
import eventSidebar from "../components/eventSidebar.vue";
export default {
  components: { eventSidebar },
  name: "create",
  middleware: "check",
  data() {
    return {
      urlObject: null,
      events: [],
    };
  },
  mounted() {
    let videoId = this.$route.query.id;
    axios.get(`/get-video/${videoId}`).then((response) => {
      this.urlObject = response.data[0];
      console.log(response.data);
    });
  },
  methods: {
    eventSave(value) {
      this.events.push(value);
    },
    deleteEvent(val) {
      this.events.splice(val, 1);
    },
    async createVideo() {
        const hashCode = s =>
      s.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
      const formData = new FormData();
      formData.append("video_id", hashCode(this.urlObject.url));
      formData.append("video_url", this.urlObject.url);
      formData.append("user", this.urlObject.user);
      formData.append("events", JSON.stringify(this.events));
      try {
        await axios.post(`/create-video`, formData);
        // this.message = "Uploaded!!";
      } catch (err) {
        console.log(err);
        // this.message = err.response.data.error;
      }
    },
  },
};
</script>