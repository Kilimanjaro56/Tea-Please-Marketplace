<template>
  <div>
    <!-- Filter front End - Annabel -->
    <select
      v-model="filteredCategory"
      @change="$emit('categoryFilter',filteredCategory)"
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
    filter: String,
  },

  emits: ['categoryFilter'],
  data() {
    return {
      categories: ['Tea', 'Teapots', 'Teacups', 'Matching Sets', 'All Listings'],
      filteredCategory: 'All Listings',
    };
  },

};

</script>

<style scoped>
#category-filter{
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
  border: thin #A26360 solid;
  padding: 0.3em 3em;
  text-align: center;
}

option {
  color: #2B463C;
  font-family: 'Questrial', sans-serif;
}

span{
  position: absolute;
  display: flex;
  flex-direction: column;
  flex: flex-end;
  color: #2B463C;
}

i{
  color: #2B463C;
  font-size: 0.75em;
}
</style>
