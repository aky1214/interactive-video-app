<template>
  <div class="card w-100" :class="{ open: replyOpened == true }">
    <div
      class="card-header d-flex align-items-center justify-content-between"
      :class="{ 'bg-secondary': reply.read_status == 0 }"
    >
      <div class="d-flex align-items-baseline">
        <h5 class="m-0">Video id:</h5>
        <p class="m-0 ml-2">{{ reply.video_id }}</p>
      </div>
      <div class="d-flex align-items-baseline">
        <h5 class="m-0">Date:</h5>        
        <p class="m-0 ml-2">{{ formatDate(reply.date) }}</p>
      </div>
      <div class="d-flex align-items-baseline">
        <h5 class="m-0">Sender IP:</h5>        
        <p class="m-0 ml-2">{{reply.sender_ip}}</p>
      </div>
      <button
        class="btn btn-outline-success"
        @click="replyRead(), replyOpen()"
        v-if="replyOpened == false"
      >
        Open
      </button>
      <button
        class="btn btn-outline-danger"
        @click="replyOpen()"
        v-if="replyOpened == true"
      >
        Close
      </button>
      
    </div>
    <div class="card-body text-capitalize">
      <div
        class="border-bottom border-1 mb-1"
        v-for="(items, index) in formData"
        :key="index"
      >
        <div class="d-flex my-1 font-weight-bold">
          <p class="m-0 mx-2">Q:</p>
          <p class="m-0 mx-2"> {{ items.ques }}</p>
        </div>
        <div class="d-flex my-1 fw-normal" v-if="typeof items.ans == 'string'">
          <p class="m-0 mx-2">A:</p>
          <p class="m-0 mx-2"> {{ items.ans }}</p>
        </div>
        <div class="d-flex my-1 fw-normal" v-else>
          <p class="m-0 mx-2">A:</p>
          <p class="m-0 mx-2" v-for="(item,index) in items.ans" :key="index"> {{ item }}<span v-if="index < items.ans.length-1">,</span></p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <b-button
          variant="btn btn-outline-danger"
          @click="deleteMessage(reply.id)"
          >Delete</b-button
        >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { DateTime } from "luxon";
export default {
  name: "ReplyBox",
  props: {
    reply: Object,
  },
  data() {
    return {
      formData: [],
      replyOpened: false,
    };
  },
  async mounted() {
    this.formData = JSON.parse(this.reply.form_data);
  },
  methods: {
    async deleteMessage(val){
      await axios.get(`/delete-message/${val}`).then((response)=>{
        console.log('response :', response)
        this.$emit('deleted')
      }).catch((error)=>{
        console.log('error :', error)
      })
    },
    async replyRead() {
      if (this.reply.read_status == 0) {
        await axios
          .post(`/read/${this.reply.id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    replyOpen() {
      this.replyOpened = !this.replyOpened;
    },
    formatDate(val) {
      const dateObj = new Date(val);
      var hours = dateObj.getHours();
      var minutes = dateObj.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return (
        dateObj.getMonth() +
        1 +
        "/" +
        dateObj.getDate() +
        "/" +
        dateObj.getFullYear() +
        "  " +
        strTime
      );

      //   .toFormat("MM/dd/yyyy h:mm a");

    },
  },
};
</script>

<style scoped>
.open {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80% !important;
}
</style>