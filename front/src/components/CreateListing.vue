<template>
  <div class="create-listing-component">
    <div class="form">
      <h2>Create Listing</h2>
      <form @submit.prevent="sendListing">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" name="title" v-model="listing.title" />
        </div>
        <div id="price-and-category">
          <div class="form-group">
            <label for="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="$"
              v-model="listing.price"
            />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select name="category" id="category" v-model="listing.category">
              <option selected hidden value="Select Category">
                Select category...
              </option>
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
            type="text"
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
      const response = await fetch('http://localhost:3000/listings', {
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
      this.listing.category = null;
      this.listing.description = null;
      this.listing.imageUrl = null;
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
  padding: 0.4em;
}
textarea {
  height: 10vh;
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
</style>
