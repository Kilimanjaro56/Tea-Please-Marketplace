<template>
  <div class='edit'>
    <h2>Edit</h2>
      <form @submit.prevent="updateListing" v-if="listing.title">
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
            type="text"
            name="image-url"
            placeholder="eg: https://image-url"
            v-model="listing.imageUrl"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
        <div v-else>
          <h3>Error!</h3>
          <h4>Sorry this page isn't avalible, please check the link and try again</h4>
          <button>Return to Home</button>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listing: [],
    };
  },
  props: {
    listingId: String,
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
  mounted() {
    this.getListingDetail();
  },
};
</script>

<style>

</style>
