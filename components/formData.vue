<template>
  <div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <label class="m-0 mr-2" for="file_input">Upload File</label><br />
          <input id="file_input" type="file" ref="file" accept="video/*" @change="onSelect" />
        </div>
        <div class="message">
          <h5>{{ message }}</h5>
        </div>
        <div class="fields">
          <button class="btn btn-outline-success">Submit</button>
          <b-button class="btn btn-outline-warning" :to="'/logout'">Logout</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FileUpload",
  data() {
    return {
      file: "",
      message: "",
    };
  },
  methods: {
    onSelect() {
      // const allowedTypes = ["video/*"];
      const file = this.$refs.file.files[0];
      this.file = file;
      // alert(file.type)
      // if(!allowedTypes.includes(file.type)){
      //   this.message = "Filetype is wrong!!"
      // }
      if (file.size > 302500000) {
        this.message = "Too large, max size allowed is 100mb";
      }
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("user", "user1");
      try {
        await axios.post(`/add-video`, formData);
        this.message = "Uploaded!!";
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
      }
      this.$emit('refreshList')
    },
  },
};
</script>