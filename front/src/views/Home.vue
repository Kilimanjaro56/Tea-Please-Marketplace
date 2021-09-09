<template>
  <div class="home">
    <CreateListing/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateListing from '../components/CreateListing.vue';

export default {
  name: 'Home',
  components: {
    CreateListing,
  },
};
</script>
