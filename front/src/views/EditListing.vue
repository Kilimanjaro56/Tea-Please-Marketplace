<template>
  <div class="edit">
    <h2>Edit</h2>
    <Delete :listing-id="listingId" />
  </div>
</template>

<script>
import Delete from '../components/Delete.vue';

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
