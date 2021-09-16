<template>
  <div>
    <h2>Contact Us</h2>
    <form @submit.prevent="resetForm">
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
          type="text"
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
    };
  },
  methods: {
    resetForm() {
      this.contact = null;
    },
  },
};
</script>

<style scoped>
form {
  width: 80vw;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
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
  height: 10vh;
  font-family: 'Questrial', sans-serif;
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
  margin-left: 20vw;
}
</style>
