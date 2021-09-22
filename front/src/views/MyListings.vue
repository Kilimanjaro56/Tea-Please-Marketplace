<template>
  <div
    v-if="user"
    class="my-listings"
  >
    <BackButton />
    <h2>My Listings</h2>
  </div>
  <UserErrorMessage v-else />
</template>

<script>
import BackButton from '../components/BackButton.vue';
import UserErrorMessage from '../components/UserErrorMessage.vue';

export default {
  components: {
    BackButton,
    UserErrorMessage,
  },
  props: {
    user: Object,
  },
};
</script>

<style>

</style>
