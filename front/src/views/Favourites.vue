<template>
  <div class="app-wrapper">
    <div
      v-if="user"
      class="favourites"
    >
      <BackButton />
      <h2>Favourites</h2>
    </div>
    <UserErrorMessage v-else />
  </div>
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

<style scoped>
.app-wrapper{
  background-color: #F4F1E9;
  position: absolute;
  top: 0;
  left: 0;
  width: 102vw;
  height: 102vh;
  overflow-x: hidden;
}
.favourites{
  margin-top: 5.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
