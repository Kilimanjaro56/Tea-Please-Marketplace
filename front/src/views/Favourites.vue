<template>
  <div class="app-wrapper">
    <!-- /
    this page was attempted
    but priorities had to be rearranged
    for more essential elements to the site
    - Annabel 24/09
    -->
    <div
      v-if="user"
      class="favourites"
    >
      <BackButton />
      <h2>Favourites</h2>
      <p>{{ currentUser }}</p>
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

  data() {
    return {
      currentUser: [],
      favouritesArray: [],
    };
  },

  mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      if (this.user) {
        const response = await fetch(
          `http://localhost:3000/profile/${this.user.id}`,
        );
        const data = await response.json();
        this.currentUser = data;
      }
    },
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
