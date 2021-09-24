<template>
  <div class="contact">
    <h2>Contact Us</h2>
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
        <label for="title">First Name</label>
        <input
          v-model="contact.firstname"
          type="text"
          name="title"
        >
      </div>
      <div class="form-group">
        <label for="title">Surname</label>
        <input
          v-model="contact.surname"
          type="text"
          name="title"
        >
      </div>
      <div class="form-group">
        <label for="title">Email Address</label>
        <input
          v-model="contact.email"
          type="email"
          name="title"
        >
      </div>
      <div class="form-group">
        <label for="description">How can we help?</label>
        <textarea
          v-model="contact.message"
          maxlength="800"
          row="50"
          name="description"
        />
      </div>
      <button type="submit">
        Submit Enquiry
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        firstname: null,
        surname: null,
        email: null,
        message: null,
      },
      errors: [],
    };
  },
  methods: {
    resetForm() {
      this.contact.firstname = null;
      this.contact.surname = null;
      this.contact.email = null;
      this.contact.message = null;
    },
    checkForm() {
      this.errors = [];
      if (!this.contact.firstname) {
        this.errors.push('First Name required.');
      }
      if (!this.contact.surname) {
        this.errors.push('Surname required');
      }
      if (!this.contact.email) {
        this.errors.push('Email required');
      }
      if (!this.contact.message) {
        this.errors.push('Message required.');
      } else {
        this.resetForm();
        this.errors = [];
      }
    },
  },
};
</script>

<style scoped>
ul{
  list-style-type: none;
  padding: 0;
}
form {
  width: 80vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  justify-content: space-between;
  margin-left: 11%;
}

input,
textarea {
  width: 100%;
  resize: none;
}

input,
textarea,
select {
  border: thin #a26360 solid;
  border-radius: 3px;
  padding: 0.6em 0.4em;
}

select {
  background-color: white;
  padding: 0.5em 0.4em;
}

textarea {
  height: 15vh;
  font-family: 'Questrial', sans-serif;
  resize: none;
}
.form-group {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 0.3em;
}

button {
  background-color: #a9c596;
  color: #2b463c;
  padding: 0.8em 1.5em;
  border-radius: 5px;
  border: none;
  margin-top: 2em;
  margin: 1em auto;
}
@media screen and (min-width: 768px) {
  .contact{
    font-size: 1.2em;
  }
  label{
    margin-top: 0.5em;
  }
  input{
    height: 3vh;
  }
  button{
    padding-bottom: 1.8em;
    font-size: 0.8em;
    margin: 1.5em auto;
  }
    @media screen and (min-width: 1024px){
    .container{
      display: flex;
      flex-direction: row;
      justify-content: center;
      /* grid-template-columns: repeat(2,1fr); */
      border: red thin solid;
    }
    .contact{
      display: flex;
      flex-direction: row;
      justify-content: center;
      /* grid-template-columns: repeat(2,1fr); */
      /* border: red thin solid; */
    }
  }
}
</style>
