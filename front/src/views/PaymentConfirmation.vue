<template>
  <div
    v-if="user"
    class="payment-confirmation"
  >
    <h2>Thank you for your purchase!</h2>
    <div
      v-if="listing.author"
      class="listing"
    >
      <div id="content-above-image">
        <div id="seller-container">
          <h3>Seller: {{ listing.author.name }}</h3>
        </div>
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
    </div>
    <button @click="$router.push('/')">
      Back to Home
    </button>
    <button @click="$router.push(`/profile`)">
      Back to Profile
    </button>
    <button>
      <LogOutButton />
    </button>
  </div>
  <UserErrorMessage v-else />
</template>

<script>
import LogOutButton from '../components/LogOut.vue';
import UserErrorMessage from '../components/UserErrorMessage.vue';

export default {
  components: {
    UserErrorMessage,
    LogOutButton,
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
        console.log(data);
        this.listing = await data;
      }
    },
  },
};
</script>

<style scoped>
.item-detail{
  margin-top: 3em;
  margin-left: 8vw;
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
  border: 1px #A26360 solid;
  margin: 0;
  margin-top: 0.5em;
}
h2{
  margin: 2em 1em;
}
.listing{
  width:80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 0.4em 1em;
  border-radius: 10px;
  margin-left: 3.5vw;
  margin-top: 3.5vh;
  margin-bottom: 3.5vh;
}

#content-above-image{
  height: 3em;
  display: flex;
  width: 75vw;
  justify-content: space-between;
  align-items: center;
}
button{
  width: 11.1em;
  margin: 1em;
  margin-bottom: 2em;
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
