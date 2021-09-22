<template>
  <div
    v-if="user"
    class="favourites"
  >
    <BackButton />
    <h2>Favourites</h2>
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
