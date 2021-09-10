<template>
  <div class='signup'>
    <!-- Keely Sign Up Front + Validation -->
    <h2>Signup</h2>
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
          pattern="[a-zA-Z]*"
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
        <label for='email'>Email</label>
        <input
          v-model='user.email'
          type='email'
          name='email'
          placeholder='e.g: example@eg.com'
          id='email'
        />
      </div>
      <div class='form-group'>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
    <div>
      <p>Already have an account?<br>
        <router-link id='login-link' to='/login'>Click here to Log In</router-link>
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
      console.log(data);
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
#errors{
  color: #2b463c;
}
b{
  color: #a26360;
}
p, #login-link{
  font-weight: 400;
  text-decoration: none;
}
</style>
