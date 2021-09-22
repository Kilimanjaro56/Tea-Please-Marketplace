<template>
  <div
    v-if="user"
    class="profile"
  >
    <BackButton />
    <h2>Profile</h2>
    <div id="user-name">
      <h3>{{ currentUser.name }}</h3>
      <i
        id="edit-bio-icon"
        class="fas fa-edit"
        @click="editBio"
      />
      <i
        id="update-bio-icon"
        class="fas fa-check"
        @click="updateBio"
      />
    </div>
    <textarea
      id="inactive-bio"
      v-model="currentUser.bio"
      name="bio"
      cols="30"
      rows="10"
      disabled
    />
    <textarea
      id="active-bio"
      v-model="currentUser.bio"
      name="bio"
      cols="30"
      rows="10"
    />
    <hr>
    <div>
      <button @click="$router.push('/my-listings')">
        My Listings
      </button>
      <button @click="$router.push('/create-listing')">
        Create Listing
      </button>
    </div>
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
  data() {
    return {
      currentUser: [],
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
    editBio() {
      document.getElementById('active-bio').style.display = 'inline';
      document.getElementById('inactive-bio').style.display = 'none';
      document.getElementById('update-bio-icon').style.display = 'block';
      document.getElementById('edit-bio-icon').style.display = 'none';
    },
    async updateBio() {
      document.getElementById('inactive-bio').style.display = 'inline';
      document.getElementById('active-bio').style.display = 'none';
      document.getElementById('update-bio-icon').style.display = 'none';
      document.getElementById('edit-bio-icon').style.display = 'block';
      const response = await fetch(
        `http://localhost:3000/profile/${this.user.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bio: this.currentUser.bio,
          }),
        },
      );
      const data = await response.json();
      this.currentUser = data;
    },
  },
};
</script>

<style scoped>
#user-name{
  width: 87vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
h3{
  background-color: #E0D3BD;
  padding: 0.5em 1em 1.5em 0.5em;
  border-radius: 10px 10px 0 0;
  margin-left: 1.5em;
  margin-bottom: -1em;
  text-align: left;
  width: 8em;
}
textarea{
  background-color: white;
  width: 80vw;
  border: transparent;
  border-radius: 10px;
  resize: none;
  box-sizing: border-box;
  padding: 1em;
  margin-left: -0.2em;
  font: inherit;
  margin-bottom: 1em;
}
i{
  font-size: 1.2em;
  margin-bottom: 0.5em;
}
#update-bio-icon{
  display: none;
}
#active-bio{
  display: none;
  border: 1px #A26360 solid;
}
hr{
  border-top: thin #A26360 solid;
  width: 70vw;
  margin-bottom: 1em;
  text-align: center;
}
button{
  width:39vw;
  margin: 0.5em;
}
</style>
