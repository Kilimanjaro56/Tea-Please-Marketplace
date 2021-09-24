<template>
  <div
    v-if="user"
    class="about"
  >
    <BackButton />
    <div class="container">
      <div class="container1">
        <h2>About</h2>
        <p>
          Welcome to Tea Please! We created this app for the tea lovers andfor the love of tea.Tea
          Please is online buy and sell exchange betweentea lovers and thrifters alike.Connect with
          other users who are also interested in Tea and Tea related products.
          <br><br>
          Head over to the
          home page to browse listings uploaded by other users and purchase some sweet tea goods!
        </p>
      </div>
      <div class="container2">
        <Contact />
      </div>
        </div>
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
  @media screen and (min-width: 1024px){
    .container{
      display: flex;
      flex-direction: row;
      justify-content: center;
      /* grid-template-columns: repeat(2,1fr); */
      /* border: red thin solid; */
    }
    .container2{
      /* border: red thin solid; */
    }
  }
</style>
