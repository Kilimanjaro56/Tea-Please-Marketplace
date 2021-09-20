<template>
  <div>
    <!-- Filter front End - Annabel -->
    <select
      id="category-filter"
      v-model="key"
      name=""
      @change="onChange($event)"
    >
      <option
        value=""
        selected
      >
        Filter By
      </option>
      <option value="all">
        All Listings
      </option>
      <option value="Tea">
        Tea
      </option>
      <option value="Teacups">
        Tea Cups
      </option>
      <option value="Teapots">
        Tea Pots
      </option>
      <option value="Teasets">
        Tea Sets
      </option>
      <option value="Misc">
        Misc
      </option>
      <span>
        <i class="fas fa-caret-up" />
        <i class="fas fa-caret-down" />
      </span>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    listings: Object,
    filter: String,
  },
  emits: ['filtered', 'showAll'],
  // methods: onChange,
  function(event) {
    console.log(event.target.value);
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
