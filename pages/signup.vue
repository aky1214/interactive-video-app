<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5 col">
        <div class="card p-4 mt-5">
            <h1 class="f4 text-center mb-3">Sign Up</h1>
          <form @submit.prevent="onSubmit">
            <label for="username"> Enter user name: </label>
            <input
              type="text"
              placeholder="User Name"
              maxlength="50"
              class="form-control mb-2"
              name="username"
              v-model="userName"
            />
            <label for="email"> Enter email: </label>
            <input
              type="email"
              placeholder="E-mail"
              maxlength="50"
              class="form-control mb-2"
              name="email"
              v-model="email"
            />
            <!-- <label for="password"> Password: </label>
            <input
              type="password"
              placeholder="Password"
              maxlength="50"
              class="form-control mb-2"
              name="password"
              v-model="password"
            /> -->
            <!-- <label for="cpassword"> Confirm password: </label>
            <input
              type="password"
              placeholder="Confirm password"
              maxlength="50"
              class="form-control mb-2"
              name="cpassword"
              v-model="confirmPassword"
            /> -->
            <button class="btn btn-outline-primary mt-2" :disabled="!email">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "signup",
  data() {
    return {
      userName: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
      async onSubmit() {
    //     const hashCode = s =>
    //   s.split('').reduce((a, b) => {
    //     a = (a << 5) - a + b.charCodeAt(0);
    //     return a & a;
    //   }, 0);
    //   alert(hashCode(this.password))
      
      const formData = new FormData();
      formData.append('user',this.userName)
      formData.append('email',this.email)
    //   {
    //       user:this.username,
    //       email:this.email,
    //       password: hashCode(this.password)
    //   }
      try {
        await axios.post(`/user-signup`, formData);
        this.message = "Uploaded!!";
        window.location =  location.host;
      } catch (err) {
        console.log(err);
        // this.message = err.response.data.error;
      }
    },
  },
};
</script>