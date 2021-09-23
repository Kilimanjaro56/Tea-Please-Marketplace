<template>
  <div
    v-if="user"
    class="about"
  >
    <BackButton />
    <h2>About</h2>
    <p>
      Welcome to Tea Please! We created this app for the tea lovers and for the love of tea. Tea
      Please is an online buy and sell exchange between tea lovers and thrifters alike. Connect with
      other users who are also interested in Tea and Tea related products.
      <br><br>
      Head over to the
      home page to browse listings uploaded by other users and purchase some sweet tea goods!
    </p>
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
  p{
    text-align: start;
    margin: 2em
  };

</style>
