<template>
  <!-- Create Listing Front End + Validation + Styling - Keely -->
  <div
    v-if="user"
    class="create-listing-component"
  >
    <BackButton />
    <div class="form">
      <h2>Create a Listing</h2>
      <form @submit.prevent="checkForm">
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
        <div class="form-group">
          <label for="title">Title</label>
          <input
            v-model="listing.title"
            type="text"
            name="title"
          >
        </div>
        <div id="price-and-category">
          <div class="form-group">
            <label for="price">Price</label>
            <div id="wrap-price">
              <input
                id="price-sign"
                type="text"
                value="$"
                readonly="readonly"
              >
              <input
                id="price-input"
                v-model="listing.price"
                type="number"
                name="price"
                max="999"
                min="1"
              >
              <input
                id="price-static"
                type="text"
                value=".00"
                readonly="readonly"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select
              id="category"
              v-model="listing.category"
              name="category"
              placeholder="select"
            >
              <option value="Tea">
                Tea
              </option>
              <option value="Teacups">
                Teacups
              </option>
              <option value="Teapots">
                Teapots
              </option>
              <option value="Tea Sets">
                Tea Sets
              </option>
              <option value="Misc">
                Misc
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="description">Product Description</label>
          <textarea
            v-model="listing.description"
            maxlength="800"
            row="50"
            name="description"
            placeholder="Max limit 800 characters"
          />
        </div>
        <div class="form-group">
          <label for="image-url">Image URL</label>
          <input
            v-model="listing.imageUrl"
            type="url"
            name="image-url"
            placeholder="eg: https://image-url"
          >
        </div>
        <button type="submit">
          Upload Listing
        </button>
      </form>
    </div>
  </div>
  <UserErrorMessage v-else />
</template>

<script>
import BackButton from '../components/BackButton.vue';
import UserErrorMessage from '../components/UserErrorMessage.vue';

export default {
  components: {
    BackButton,
    UserErrorMessage,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      listing: {
        title: null,
        price: null,
        category: null,
        description: null,
        imageUrl: null,
      },
      errors: [],
    };
  },
  methods: {
    async sendListing() {
      const listing = {};
      listing.title = this.listing.title;
      listing.price = this.listing.price;
      listing.category = this.listing.category;
      listing.description = this.listing.description;
      listing.imageUrl = this.listing.imageUrl;

      const response = await fetch('http://localhost:3000/create-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing),
        credentials: 'include',
      });
      const data = await response.json();
      this.resetCreate();
      window.location.assign(`http://localhost:8080/listings/${data._id}`);
    },
    resetCreate() {
      this.listing.title = null;
      this.listing.price = null;
      this.listing.category = 'Select...';
      this.listing.description = null;
      this.listing.imageUrl = null;
    },
    checkForm() {
      this.errors = [];
      if (!this.listing.title) {
        this.errors.push('Title required.');
      }
      if (!this.listing.price) {
        this.errors.push('Price required.');
      }
      if (!this.listing.category) {
        this.errors.push('Category required.');
      }
      if (!this.listing.description) {
        this.errors.push('Product Description required.');
      }
      if (!this.listing.imageUrl) {
        this.errors.push('Image URL required.');
      } else {
        this.sendListing();
        this.errors = [];
      }
    },
  },
};
</script>

<style scoped>
.create-listing-component{
  margin-top: 3em;
}
.form {
  color: #2b463c;
  width: 75vw;
  margin-left: 11vw;
}

form {
  width: 80vw;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  justify-content: space-between;
}

input,
textarea {
  width: 100%;
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

input:focus, textarea:focus {
  outline: none;
}

#price-and-category {
  width: 75vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#price-and-category input,
#price-and-category select {
  width: 10.2em;
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

#wrap-price{
  display: flex;
}

#wrap-price input{
  width: 5.9vw;
  padding: 0.56em 0.1em;
  padding-left: 0.2em;
}

#wrap-price input:focus{
  outline: none;
}

#price-sign{
  border-right: hidden;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: -1.2em;
  color: #2b463c77;
}

#price-input{
  border-right: hidden;
  border-left: hidden;
  border-radius: 0;
  margin-right: -0.1em;
}

#price-static{
  border-left: hidden;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: #2b463c77;
}
#errors{
  color: #2b463c;
}
b{
  color: #a26360;
}
</style>
