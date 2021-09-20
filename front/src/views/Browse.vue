<template>
  <div class="browse">
    <h3>Browse Listings</h3>
    <Filter
      :listings="listings"
      @filtered="getListings"
    />
    <Search
      :listings="listings"
      @searched="displayFilteredListings"
      @showAll="getListings"
    />
    <a
      id="clear-search"
      @click="clearSearch"
    >Clear Search</a>

    <!-- View List Code Here -->

    <!-- <div
      v-for="listing of listings"
      :key="listing._id"
    >
      <h2>{{ listing.title }}</h2>
      <h2>{{ listing._id }}</h2>
    </div> -->

    <h2
      v-if="message"
      id="search-error"
    >
      {{ message }}
    </h2>
  </div>
</template>

<script>
import Search from '../components/Search.vue';
import Filter from '../components/Filter.vue';

export default {
  components: {
    Search,
    Filter,
  },
  data() {
    return {
      listings: [],
      message: null,
      filter: 'all',
    };
  },
  created() {
    this.getListings();
  },
  methods: {
    async getListings() {
      const response = await fetch(`http://localhost:3000/listings/${this.filter}`);
      const data = await response.json();
      this.listings = data;
      this.message = null;
      document.getElementById('clear-search').style.display = 'none';
    },

    displayFilteredListings(filteredArray) {
      if (filteredArray.length >= 1) {
        this.listings = filteredArray;
        this.message = null;
        document.getElementById('clear-search').style.display = 'block';
      } else {
        this.listings = null;
        this.message = 'Sorry, No Matches';
        document.getElementById('clear-search').style.display = 'block';
      }
    },

    clearSearch() {
      document.getElementById('clear-search').style.display = 'none';
      this.getListings();
    },
  },
};
</script>

<style scoped>
#clear-search {
  display: none;
  margin: 1em;
  padding: 0;
  background-color: transparent;
  text-align: center;
}
</style>
