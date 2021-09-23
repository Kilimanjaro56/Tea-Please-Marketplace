<template>
  <div class="app-wrapper">
    <div class="signup">
      <!-- Keely Sign Up Front + Validation -->
      <h2>Sign Up</h2>
      <hr>
      <form @submit.prevent="checkForm">
        <div class="form-group">
          <label for="name">User Name</label>
          <input
            id="name"
            v-model="user.name"
            type="text"
            name="name"
            placeholder="e.g: John Doe"
          >
        </div>
        <span id="name-error"><p>Please Enter A Valid Name</p></span>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="user.password"
            type="password"
            name="password"
            placeholder="e.g: i10veT3a"
            minlength="8"
          >
        </div>
        <span id="password-error">
          <p>Please Enter A Valid Password.</p>
          <p>Minimum eight characters, at least one letter and one number</p>
        </span>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="user.email"
            type="email"
            name="email"
            placeholder="e.g: example@eg.com"
            @keyup="message.message = null"
          >
        </div>
        <span id="email-error"><p>Please Enter A Valid Email</p></span>
        <p
          v-if="message"
          id="error-message"
        >
          {{ message.message }}
        </p>
        <div class="form-group">
          <button type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div>
        <p>
          Already have an account?<br>
          <router-link
            id="login-link"
            to="/"
          >
            Click here to Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: null,
        password: null,
        email: null,
      },
      isError: false,
      message: [],
    };
  },
  methods: {
    async registerUser() {
      console.log(this.message);
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user),
      });
      const data = await response.json();
      this.message = data;
      if (this.message.message !== 'This email already exists, log in below') {
        window.location.assign('http://localhost:8080/');
      }
    },
    checkForm() {
      if (!this.user.name) {
        document.getElementById('name-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('name-error').style.display = 'none';
        this.isError = false;
      }
      if (!this.user.password) {
        document.getElementById('password-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('password-error').style.display = 'none';
        this.isError = false;
      }
      if (!this.user.email) {
        document.getElementById('email-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('email-error').style.display = 'none';
        this.isError = false;
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(this.user.password)) {
        document.getElementById('password-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('password-error').style.display = 'none';
        this.isError = false;
      }
      if (this.isError === false) {
        this.registerUser();
      }
    },
    resetForm() {
      this.user.name = null;
      this.user.password = null;
      this.user.email = null;
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
.signup{
  margin-top: 10em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  height: 45vh;
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
  width: 95%;
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
p, #login-link{
  font-weight: 400;
  text-decoration: none;
  margin-top: 1.4em;
  line-height: 120%;
}
#name-error, #password-error, #email-error{
  display: none;
  color: red;
}
</style>
