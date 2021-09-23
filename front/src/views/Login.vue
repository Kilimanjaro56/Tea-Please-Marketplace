<template>
  <div class="app-wrapper">
    <div class="login">
      <!-- Keely Log In + Validation -->
      <h2>Login</h2>
      <hr>
      <p
        v-if="errors.length"
        id="errors"
      >
        <b>Please check the following field(s):</b>
        <ul>
          <li
            v-for="error in errors"
            :key="error"
          >
            {{ error }}
          </li>
        </ul>
      </p>
      <form @submit.prevent="checkForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="user.email"
            type="email"
            name="email"
            placeholder="e.g: example@eg.com"
            @keyup="message.message = null"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="user.password"
            type="password"
            name="password"
            placeholder="e.g: i10veT3a"
          >
        </div>
        <p
          v-if="message"
          id="error-message"
        >
          {{ message.message }}
        </p>
        <div class="form-group">
          <button
            type="submit"
            @click="checkForm"
          >
            Log In
          </button>
        </div>
      </form>
      <div>
        <p>
          <router-link
            id="signup-link"
            to="/signup"
          >
            Click here to Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['loggedin'],
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      errors: [],
      message: [],
    };
  },
  mounted() {
    this.resetForm();
  },
  methods: {
    async logIn() {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user),
        credentials: 'include',
      });
      const data = await response.json();
      this.message = data;
      if (data.email && data.id) {
        window.localStorage.setItem('email', data.email);
        window.localStorage.setItem('id', data.id);
      }
      if (window.localStorage.getItem('email')) {
        window.location.assign('http://localhost:8080/listings');
      }
      this.$emit('loggedin');
    },
    checkForm() {
      this.errors = [];
      if (!this.user.emaiil) {
        this.errors.push('Email required.');
      }
      if (!this.user.password) {
        this.errors.push('Password required.');
      } else {
        this.errors = [];
        this.logIn();
      }
    },
    resetForm() {
      this.user.email = null;
      this.user.password = null;
    },
  },
};
</script>

<style scoped>
.app-wrapper{
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.login{
  margin-top: 11em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
hr{
  width: 80vw;
  border-top: 1px #A26360 solid;
  margin: 0;
}
h2{
  margin-bottom: 0.2em;
}
form {
  width: 75vw;
  height: 35vh;
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  justify-content: space-between;
}
.form-group{
  width: 75vw;
}
input,
textarea {
  width: 100%;
}

input,
textarea,
select {
  margin: 1em 0;
  border: thin #a26360 solid;
  border-radius: 3px;
  padding: 0.6em 0.4em;
  height: 2.5vh;
  font-family: 'Questrial', sans-serif;
}

select {
  background-color: white;
  padding: 0.5em 0.4em;
}
button{
  width: 60vw;
  height: 5vh;
  font-size: 1em;
  margin-left: 8vw;
}
#error-message{
  margin-top: 2em;
  margin: 0;
  color: rgb(207, 42, 42);

}
#errors{
  color: #2b463c;
}
b{
  color: #a26360;
}
p, #signup-link{
  font-weight: 400;
  text-decoration: none;
  margin-top: 1.4em;
  line-height: 120%;
}
</style>
