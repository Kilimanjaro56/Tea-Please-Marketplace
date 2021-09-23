<template>
  <div>
    <i
      id="search-icon"
      class="fa fa-search"
      @click="newSearch"
    />
    <form @submit.prevent="searchFilter">
      <div
        id="search-bar"
        class="form-group"
      >
        <input
          id="search-input"
          v-model="searchInput"
          type="text"
          name="search-input"
        >
        <i
          class="fa fa-times"
          @click="closeSearch"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    listings: Object,
  },
  emits: ['searched', 'showAll'],
  data() {
    return {
      filteredListings: [],
      searchInput: null,
    };
  },
  methods: {
    searchFilter() {
      if (this.searchInput.length >= 1) {
        const filteredArray = this.listings.filter((
          listing,
        ) => listing.title.toLowerCase().includes(this.searchInput.toLowerCase()));
        this.filteredListings = filteredArray;
        this.$emit('searched', this.filteredListings, this.searchInput);
        this.searchInput = null;
        this.showAll = false;
      }
      document.getElementById('search-bar').style.display = 'none';
      document.getElementById('search-icon').style.display = 'block';
    },
    newSearch() {
      this.searchInput = null;
      this.filteredListings = null;
      document.getElementById('search-icon').style.display = 'none';
      document.getElementById('search-bar').style.display = 'block';
      this.showAll = true;
      this.$emit('showAll', this.showAll);
    },
    closeSearch() {
      this.searchInput = null;
      document.getElementById('search-bar').style.display = 'none';
      document.getElementById('search-icon').style.display = 'block';
    },
  },
};
</script>

<style scoped>
#search-bar{
  display: none;
}
#search-input{
  border-radius: 5px;
  border: thin #A26360 solid;
  padding: 0.3em 3em;
  text-align: center;
  position: absolute;
  left:20%;
   z-index: 50;
}
form i{
  position: relative;
  left: 1em;
  top: 0.25em;
  font-size: 1.1em;
  z-index: 50;
}
#search-icon{
  position: relative;
  font-size: 1.4em;
  margin-left: 1em;
}
</style>
