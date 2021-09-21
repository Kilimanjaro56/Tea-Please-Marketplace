<template>
  <div class="edit">
    <h2>Edit</h2>
    <div v-if="!listing.author">
      <h3>Error!</h3>
      <h4>Sorry this page isn't avalible, please check the link and try again</h4>
      <button>Return to Home</button>
    </div>
    <div v-else-if="user.id === listing.author._id">
      <form
        @submit.prevent="checkForm"
      >
        <div class="form-group">
          <label for="title">Title</label>
          <input
            v-model="listing.title"
            type="text"
            name="title"
          >
        </div>
        <span id="title-error"><p>Please Enter A Title</p></span>
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
            <span id="price-error"><p>Please Enter A Valid Price</p></span>
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
            maxlength="200"
            row="50"
            name="description"
          />
        </div>
        <span id="description-error"><p>Please Enter A Description</p></span>
        <div class="form-group">
          <label for="image-url">Image URL</label>
          <input
            v-model="listing.imageUrl"
            type="text"
            name="image-url"
            placeholder="eg: https://image-url"
          >
        </div>
        <span id="image-error"><p>Please Enter A Valid Image URL</p></span>
        <button type="submit">
          Save Changes
        </button>
        <Delete :listing-id="listingId" />
      </form>
    </div>
    <div v-else>
      <h3>Error!</h3>
      <h4>Sorry you don't have the authorization to view this page</h4>
      <button>Return to Home</button>
    </div>
  </div>
</template>

<script>
import Delete from '../components/delete.vue';
// discussed with Simon - 14/09

export default {
  components: {
    Delete,
  },
  props: {
    listingId: String,
    user: Object,
  },
  data() {
    return {
      listing: [],
      isError: false,
    };
  },
  created() {
    this.getListingDetail();
  },
  methods: {
    async getListingDetail() {
      const response = await fetch(
        `http://localhost:3000/listings/${this.listingId}`,
      );
      const data = await response.json();
      this.listing = data;
    },
    checkForm() {
      this.isError = false;
      if (!this.listing.title) {
        document.getElementById('title-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('title-error').style.display = 'none';
      }
      if (!this.listing.price) {
        document.getElementById('price-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('price-error').style.display = 'none';
      }
      if (!this.listing.description) {
        document.getElementById('description-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('description-error').style.display = 'none';
      }
      if (!this.listing.imageUrl) {
        document.getElementById('image-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('image-error').style.display = 'none';
      }
      if (this.isError === false) {
        this.updateListing();
      }
    },
    async updateListing() {
      const response = await fetch(
        `http://localhost:3000/listings/edit/${this.listingId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: this.listing.title,
            author: this.listing.author,
            price: this.listing.price,
            category: this.listing.category,
            imageUrl: this.listing.imageUrl,
            description: this.listing.description,
          }),
        },
      );
      const data = await response.json();
      console.log(data);
      window.location.assign(`/listings/${this.listingId}`);
    },
  },
};
</script>

<style>
form {
  width: 80vw;
  margin-left: 11vw;
  height: 70vh;
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
  margin-bottom: 1.5em;
  margin-top: 0em;
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
#title-error, #price-error, #description-error, #image-error{
  display: none;
  color: red;
  text-align: left;
}
</style>
