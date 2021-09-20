<template>
  <div class="edit">
    <h2>Edit</h2>
    <form
      v-if="listing.title"
      @submit.prevent="updateListing"
    >
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
          <input
            v-model="listing.price"
            type="number"
            name="price"
            placeholder="$"
          >
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
      <div class="form-group">
        <label for="image-url">Image URL</label>
        <input
          v-model="listing.imageUrl"
          type="text"
          name="image-url"
          placeholder="eg: https://image-url"
        >
      </div>
      <button type="submit">
        Save Changes
      </button>
    </form>
    <div v-else>
      <h3>Error!</h3>
      <h4>Sorry this page isn't avalible, please check the link and try again</h4>
      <button>Return to Home</button>
    </div>
    <Delete :listing-id="listingId" />
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
  },
  data() {
    return {
      listing: [],
    };
  },
  mounted() {
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
      this.$router.push(`/listings/${this.listingId}`);
    },
  },
};
</script>

<style>

</style>
