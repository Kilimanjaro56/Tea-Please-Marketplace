<template>
  <div>
    <!-- Filter front End - Annabel -->
    <select
      v-model="filteredCategory"
      @change="getFilteredListings()"
    >
      <option
        v-for="category of categories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
    <span>
      <i class="fas fa-caret-up" />
      <i class="fas fa-caret-down" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    listings: Object,
    // filter: String,
  },

  emits: ['categoryFilter', 'clearCategories'],
  data() {
    return {
      categories: ['Tea', 'Teapots', 'Teacups', 'Matching Sets', 'All Listings'],
      filteredCategory: 'All Listings',
    };
  },

  methods: {
    getFilteredListings() {
      if (this.filteredCategory !== 'All Listings') {
        const filteredArray = this.listings.filter(
          (listing) => listing.category === this.filteredCategory,
        );
        console.log(filteredArray);
        this.$emit('categoryFilter', filteredArray);
      } else {
        this.$emit('clearCategories');
      }
    },
  },
};
</script>

<style scoped>
#category-filter {
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  align-items: center;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  border-radius: 5px;
  border: thin #a26360 solid;
  padding: 0.3em 3em;
  text-align: center;
}

option {
  color: #2b463c;
  font-family: "Questrial", sans-serif;
}

span {
  position: absolute;
  display: flex;
  flex-direction: column;
  flex: flex-end;
  color: #2b463c;
}

i {
  color: #2b463c;
  font-size: 0.75em;
}
</style>
