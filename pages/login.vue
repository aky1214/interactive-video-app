<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5 col">
        <div class="card p-4 mt-5">
          <h1 class="f4 text-center mb-3">Login</h1>
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
            <!-- <label for="email"> Enter user name: </label>
            <input
              type="email"
              placeholder="E-mail"
              maxlength="50"
              class="form-control mb-2"
              name="email"
              v-model="email"
            />
            <label for="password"> Password: </label>
            <input
              type="password"
              placeholder="User Name"
              maxlength="50"
              class="form-control mb-2"
              name="password"
              v-model="password"
            /> -->
            <button class="btn btn-outline-primary mt-2 w-100">Login</button>
          </form>
            <a class="btn btn-outline-primary mt-2" href='/signup'>Sign up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  layout:'LayoutWatch',
  data() {
    return {
      userName: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async onSubmit() {
      const formData = new FormData();
      formData.append("user", this.userName);
      try {
        await axios
          .post(`/user-login`, formData)
          .then((response) => {
            if (response.data.login == true) {
              this.$store.commit('auth/setUser', this.userName)
              window.localStorage.setItem('user', JSON.stringify({login_user: this.userName}))
              this.$router.push({name: 'index'})
            }else{
                alert('User name not found')
            }
            console.log(response.data);
          });
      } catch (err) {
        console.log(err);
        // this.message = err.response.data.error;
      }
    },
  },
};
</script>