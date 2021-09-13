<template>
  <div class='edit'>
    <h2>Edit</h2>
    <Delete :listingId="listingId"/>
  </div>
</template>

<script>
import Delete from '../components/delete.vue';

export default {
  components: {
    Delete,
  },
  props: {
    listingId: String,
  },
};
</script>

<style>

</style>
