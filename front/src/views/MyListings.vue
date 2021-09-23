<template>
  <div class="app-wrapper">
    <div
      v-if="user"
      class="my-listings"
    >
      <BackButton />
      <h2>My Listings</h2>
      <div v-if="listings.length === 0">
        <h3>Sorry!</h3>
        <p>You haven't posted any listings! Try creating one from your profile</p>
      </div>
      <div v-else>
        <div
          v-for="listing in listings"
          :key="listing.id"
          class="wrap-listings"
        >
          <div
            v-if="listing.author._id === user.id"
            class="listings"
          >
            <p id="seller">
              {{ listing.author.name }}
              <span id="edit-delete">
                <DeleteIcon :listing-id="listing._id" />
                <router-link
                  :to="{ name: 'EditListing', params:{ listingId: listing._id } }"
                  class="view-detail-btn"
                >
                  <i class="fas fa-edit" />
                </router-link>
              </span>
            </p>
            <div class="image-container">
              <img :src="listing.imageUrl">
            </div>
            <div class="second-group">
              <p>{{ listing.title }}</p>
              <p id="price">
                ${{ listing.price }}
              </p>
            </div>
            <p class="desc">
              {{ listing.description }}
            </p>
            <button>
              <router-link
                :to="{ name: 'ListingDetail', params:{ listingId: listing._id } }"
                class="view-detail-btn"
              >
                View Details
              </router-link>
            </button>
          </div>
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
      listings: [],
    };
  },
  created() {
    this.getMyListings();
  },
  methods: {
    async getMyListings() {
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
  height: 105vh;
  overflow-x: hidden;
}
.my-listings{
  margin-top: 5.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrap-listings{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F4F1E9;
  padding: 0.3em 1em;

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
.second-group p{
margin: 0;
margin-bottom: 0.5em;
margin-right: 1em;
text-align: left;

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
  margin-top: 0.5em;
}
img{
  width: 140%;
  min-height: 100%;
  border-radius: 10px;
  margin: 1em 0;
}
.desc {
  font-size: 0.9em;
  width: 80vw;
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
font-family: 'Cormorant', serif;
font-size: 1.1em;
}
button{
  margin: 0;
}
.listings{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background-color: #fff;
  margin: 1em;
  margin-top: 0em;
  padding: 0.5em 1em;
  border-radius: 10px;
  box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
  -webkit-box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
  -moz-box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
}
#edit-delete{
  width: 5em;
  padding: 0.5em 0;
  display: flex;
  justify-content: space-between;
}
</style>
