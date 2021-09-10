<template>
<!-- Create Listing Front End + Validation + Styling - Keely -->
  <div class="create-listing-component">
    <div class="form">
      <h2>Create a Listing</h2>
      <form @submit.prevent="checkForm">
          <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" name="title" v-model="listing.title" />
        </div>
        <div id="price-and-category">
          <div class="form-group">
            <label for="price">Price</label>
            <div id="wrap-price">
              <input type="text" id="price-sign" value="$" readonly="readonly" />
              <input
                id="price-input"
                type="number"
                name="price"
                max="999"
                min="1"
                v-model="listing.price"
              />
              <input type="text" id="price-static" value=".00" readonly="readonly" />
            </div>
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select name="category" id="category" placeholder="select" v-model="listing.category">
              <option value="Tea">Tea</option>
              <option value="Teacups">Teacups</option>
              <option value="Teapots">Teapots</option>
              <option value="Tea Sets">Tea Sets</option>
              <option value="Misc">Misc</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="description">Product Description</label>
          <textarea
            maxlength="200"
            row="50"
            name="description"
            v-model="listing.description"
          />
        </div>
        <div class="form-group">
          <label for="image-url">Image URL</label>
          <input
            type="url"
            name="image-url"
            placeholder="eg: https://image-url"
            v-model="listing.imageUrl"
          />
        </div>
        <button type="submit">Upload Listing</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listing: {
        title: null,
        price: null,
        author: null,
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
      listing.author = 'Test User'; // testing purposes until users are added

      console.log(listing);
      const response = await fetch('http://localhost:3000/create-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing),
      });
      const data = await response.json();
      console.log(data);
      this.resetCreate();
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
.form {
  color: #2b463c;
  width: 75vw;
  margin-left: 2vw;
}

form {
  width: 75vw;
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
  width: 9em;
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
</style>
