<template>
  <!-- Create Listing Front End + Validation + Styling - Keely -->
  <div class="app-wrapper">
    <div class="cover-img">
      <img src="https://picsum.photos/200/300" alt="">
    </div>
    <div
      v-if="user"
      class="create-listing-component"
    >
      <BackButton />
      <div class="form">
        <h2>Create a Listing</h2>
        <form @submit.prevent="checkForm">
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
            <div class="form-group category-group">
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
          <span id="description-error"><p>Please Enter A Product Description</p></span>
          <div class="form-group">
            <label for="image-url">Image URL</label>
            <input
              v-model="listing.imageUrl"
              type="url"
              name="image-url"
              placeholder="eg: https://image-url"
            >
          </div>
          <span id="image-error"><p>Please Enter A Valid Image URL</p></span>
          <button type="submit">
            Upload Listing
          </button>
        </form>
      </div>
    </div>
    <UserErrorMessage v-else />
  </div>
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
      isError: false,
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
      if (!this.listing.title) {
        document.getElementById('title-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('title-error').style.display = 'none';
        this.isError = false;
      }
      if (!this.listing.price) {
        document.getElementById('price-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('price-error').style.display = 'none';
        this.isError = false;
      }
      if (!this.listing.description) {
        document.getElementById('description-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('description-error').style.display = 'none';
        this.isError = false;
      }
      if (!this.listing.imageUrl) {
        document.getElementById('image-error').style.display = 'block';
        this.isError = true;
      } else {
        document.getElementById('image-error').style.display = 'none';
        this.isError = false;
      }
      if (this.isError === false) {
        this.sendListing();
      }
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
  height: 105vh;
}
.create-listing-component{
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form {
  color: #2b463c;
  width: 75vw;
}
h2{
  margin-bottom: 2em;
}
form {
  width: 80vw;
  height: 60vh;
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
  height: 15vh;
  font-family: 'Questrial', sans-serif;
  resize: none;
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
  margin-left: 22vw;
  /* margin: 1em auto; */
  cursor: pointer;
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
b{
  color: #a26360;
}
#title-error, #price-error, #description-error, #image-error{
  display: none;
  color: red;
  text-align: left;
}
.cover-img{
  display: none;
}
@media screen and (min-width: 768px) {
  .create-listing-component{
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
}

@media screen and (min-width: 1024px) {
  .app-wrapper{
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .cover-img{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50vw;
    overflow: hidden;
  }
  .cover-img>img{
    margin-top: 5em;
    width: 40vw;
    height: 60vh;
    border-radius: 10px;
  }
  .create-listing-component{
    margin-top: 2em;
  }
  .category-group{
    /* border: red thin solid; */
    padding-right: 16%;
  }
  .edit{
    width: 50vw;
  }
  .form-group,h2{
    width: 50%;
  }
  button{
    margin-left: 15em;
  }
}
</style>
