<template>
  <div
    v-if="user"
    class="about"
  >
    <BackButton />
    <h2>About</h2>
    <Contact />
  </div>
  <UserErrorMessage v-else />
</template>

<script>
import Contact from '../components/Contact.vue';
import BackButton from '../components/BackButton.vue';
import UserErrorMessage from '../components/UserErrorMessage.vue';

export default {
  components: {
    BackButton,
    UserErrorMessage,
    Contact,
  },
  props: {
    user: Object,
  },
};
</script>

<style>

</style>
