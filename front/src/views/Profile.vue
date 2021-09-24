<template>
  <div class="app-wrapper">
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
      <h2>My Latest Listing</h2>
      <div>
        <div
          v-if="listings[0]"
          class="listings"
        >
          <p id="seller">
            {{ listings[0].author.name }}
            <span id="edit-delete">
              <DeleteIcon :listing-id="listings[0]._id" />
              <router-link
                :to="{ name: 'EditListing', params:{ listingId: listings[0]._id } }"
                class="edit"
              >
                <i class="fas fa-edit" />
              </router-link>
            </span>
          </p>
          <div class="image-container">
            <img :src="listings[0].imageUrl">
          </div>
          <div class="second-group">
            <p>{{ listings[0].title }}</p>
            <p id="price">
              ${{ listings[0].price }}
            </p>
          </div>
          <p class="desc">
            {{ listings[0].description }}
          </p>
          <button>
            <router-link
              :to="{ name: 'ListingDetail', params:{ listingId: listings[0]._id } }"
              class="view-detail-btn"
            >
              View Details
            </router-link>
          </button>
        </div>
        <div v-else>
          <h4>Sorry!</h4>
          <p>You haven't posted any listings! Try creating one above!</p>
        </div>
      </div>
    </div>
    <UserErrorMessage v-else />
  </div>
</template>

<script>
import BackButton from '../components/BackButton.vue';
import UserErrorMessage from '../components/UserErrorMessage.vue';
import DeleteIcon from '../components/DeleteIcon.vue';

export default {
  components: {
    BackButton,
    UserErrorMessage,
    DeleteIcon,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      currentUser: [],
      listings: [],
    };
  },
  mounted() {
    this.getUser();
  },
  created() {
    this.getMyListing();
  },
  methods: {
    async getMyListing() {
      if (this.user) {
        const response = await fetch('http://localhost:3000/listings');
        const data = await response.json();
        for (const listing of data) {
          if (listing.author._id === this.user.id) {
            this.listings.push(listing);
          }
        }
      }
    },
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
      this.currentUser.bio = data.bio;
      this.getUser();
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
  height: 120vh;
  overflow-x: hidden;
}
.profile{
  margin-top: 5.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#user-name{
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: 1em;
  margin-top: 1em;
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
h2{
  margin-bottom: 0;
}
.desc {
  font-size: 0.9em;
  width: 75vw;
  text-align: left;
  font-family: 'Questrial', sans-serif;
  padding: 0;
  margin: 0;
}
h4{
  color: #A26360;
  font-family: 'Cormorant', serif;
  font-size: 1.2em;
}
textarea{
  background-color: white;
  width: 80vw;
  height: 20vh;
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
  margin-left: 5em;
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
.second-group {
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: #a26360 thin solid;
  font-family: 'Cormorant', serif;
  font-size: 1.1em;
}
.image-container{
  width: 80vw;
  height: 40vh;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 0.4em;
  margin-top: 0.2em;
}
img{
  width: 140%;
  min-height: 100%;
  border-radius: 10px;
  margin: 0.1em 0;
}
.desc {
  font-size: 0.9em;
  padding: 1em;
  padding-left: 0;
  text-align: left;
  font-family: 'Questrial', sans-serif;
}
#price{
  font-family: 'Questrial', sans-serif;
}
#seller{
width: 79vw;
display: flex;
justify-content: space-between;
align-items: center;
margin: 0;
margin-top: 0.2em;
font-family: 'Cormorant', serif;
font-size: 1.1em;
}
.listings{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background-color: #fff;
  margin: 1.3em;
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 0 1em;
  border-radius: 10px;
  box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
  -webkit-box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
  -moz-box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
}
#edit-delete i{
  margin: 0;
}
#edit-delete{
  width: 5em;
  padding: 0.5em 0;
  display: flex;
  justify-content: space-between;
}
#edit-bio-icon{
  margin-right: 2.5em;
}
#update-bio-icon{
  margin-right: 2.5em;
}
p{
  margin: 0.4em 0;
}
</style>
