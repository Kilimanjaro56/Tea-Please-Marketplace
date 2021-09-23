<template>
  <!-- Listing Detail Front End + Styling - Keely -->
  <div class="app-wrapper">
    <div
      v-if="user"
      class="item-detail"
    >
      <BackButton />
      <h2>Listing Details</h2>
      <div
        v-if="listing.title"
        class="listing"
      >
        <div id="content-above-image">
          <div id="seller-container">
            <h3>Seller: {{ listing.author.name }}</h3>
          </div>
          <button
            v-if="listing.isAvaliable && user.id !== listing.author._id"
            @click="$router.push(`/payment/${listingId}`);"
          >
            Purchase
          </button>
        </div>
        <div class="image-container">
          <img
            :src="listing.imageUrl"
            alt=""
          >
        </div>
        <div class="listing-details">
          <h3>{{ listing.title }}</h3>
          <h4>${{ listing.price }}.00</h4>
        </div>
        <hr>
        <p>{{ listing.description }}</p>
        <div
          v-if="listing.isAvaliable"
          class="comments"
        >
          <Comments
            :user="user"
            :listing-id="listingId"
            :listing="listing"
          />
        </div>
        <div
          v-else
          class="reviews"
        >
          <Reviews
            :listing-id="listingId"
            :listing="listing"
            :user="user"
          />
        </div>
      </div>
      <div v-else>
        <h3>Error!</h3>
        <h4>Sorry this listing isn't avalible, please check the link and try again</h4>
        <button>Return to Home</button>
      </div>
    </div>
    <UserErrorMessage v-else />
  </div>
</template>

<script>
import BackButton from '../components/BackButton.vue';
import UserErrorMessage from '../components/UserErrorMessage.vue';
import Comments from '../components/Comments.vue';
import Reviews from '../components/Reviews.vue';

export default {
  components: {
    BackButton,
    UserErrorMessage,
    Comments,
    Reviews,
  },
  props: {
    listingId: String,
    user: Object,
  },
  data() {
    return {
      listing: [],
    };
  },
  mounted() {
    this.getListingDetail();
  },
  methods: {
    async getListingDetail() {
      if (this.user) {
        const response = await fetch(
          `http://localhost:3000/listings/${this.listingId}`,
        );
        const data = await response.json();
        this.listing = data;
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
  width: 100vw;
  height: 105vh;
}
.item-detail{
  margin-top: 5.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.image-container{
  width: 80vw;
  height: 40vh;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 0.4em;
}
p{
  text-align: left;
  line-height: 125%;
  font-size: 0.9em;
}

img{
  width: 140%;
  min-height: 100%;
}
h4{
font-size: 1.1em;
font-weight: 400;
}
h3,h4{
  margin-bottom: 0.2em;
  margin-top: 0.6em;
}
h3{
  margin-top: 0.3em;
}
hr{
  width: 80vw;
  border-top: 1px #A26360 solid;
  margin: 0;
  margin-top: 0.5em;
}
.listing{
  width:80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#content-above-image{
  height: 3em;
  display: flex;
  width: 75vw;
  justify-content: space-between;
  align-items: center;
}
button{
  margin-right: -2vw;
}

.listing-details{
  display: flex;
  width: 75vw;
  justify-content: space-between;
  align-items: center;
}

#seller-container{
  background-color: #E0D3BD;
  padding: 0 1em 2em 0.5em;
  border-radius: 10px 10px 0 0;
  margin-left: -0.6em;
  margin-bottom: -2.5em;
}
</style>
