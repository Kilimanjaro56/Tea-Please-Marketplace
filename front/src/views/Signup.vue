<template>
  <div class='signup'>
    <!-- Keely Sign Up Front + Validation -->
    <h2>Sign Up</h2>
    <hr>
    <p id='errors' v-if='errors.length'>
    <b>Please check the following field(s):</b>
    <ul>
    <li v-for='error in errors' :key='error'>{{ error }}</li>
    </ul>
    </p>
    <form @submit.prevent='checkForm'>
      <div class='form-group'>
        <label for='name'>User Name</label>
        <input
          v-model='user.name'
          type='text'
          name='name'
          pattern="[a-zA-Z]*[a-zA-Z]"
          placeholder='e.g: John Doe'
          id='name'
        />
      </div>
      <div class='form-group'>
        <label for='password'>Password</label>
        <input
          v-model='user.password'
          type='password'
          name='password'
          placeholder='e.g: i10veT3a'
          id='password'
        />
      </div>
      <div class='form-group'>
        <label for='email'>Email Address</label>
        <input
        @keyup="this.message.message = null"
          v-model='user.email'
          type='email'
          name='email'
          placeholder='e.g: example@eg.com'
          id='email'
        />
      </div>
      <p id ='error-message' v-if="message">{{message.message}}</p>
      <div class='form-group'>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
    <div>
      <p>Already have an account?<br>
        <router-link id='login-link' to='/login'>Click here to Login</router-link>
      </p>
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
      errors: [],
      message: [],
    };
  },
  methods: {
    async registerUser() {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user),
      });
      const data = await response.json();
      this.message = data;
      this.resetForm();
    },
    checkForm() {
      this.errors = [];
      if (!this.user.name) {
        this.errors.push('Name required.');
      }
      if (!this.user.password) {
        this.errors.push('Password required. Minimum eight characters, at least one letter and one number:');
      }
      if (!this.user.email) {
        this.errors.push('Email required.');
      } else {
        this.registerUser();
        this.errors = [];
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
.signup{
  margin-top: 3em;
  text-align: center;
}
hr{
  width: 80vw;
  border: 1px #A26360 solid;
  margin: 0;
  margin-left: 8vw;
}
h2{
  margin-bottom: 0.2em;
}
form {
  margin-left: 9vw;
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
p, #login-link{
  font-weight: 400;
  text-decoration: none;
  margin-top: 1.4em;
  line-height: 120%;
}
</style>
