<template>
  <div class="app-wrapper">
    <div
      v-if="user"
      class="payment-confirmation"
    >
      <h2>Thank you for your purchase!</h2>
      <div
        v-if="listing.author"
        class="listing"
      >
        <div class="container1">
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
        </div>
        <div class="container2">
          <div class="listing-details">
            <h3>{{ listing.title }}</h3>
            <h4>${{ listing.price }}.00</h4>
          </div>
          <hr>
          <p>{{ listing.description }}</p>
        </div>
      </div>
      <div class="bottom-buttons">
        <button @click="$router.push('/listings')">
          Back to Home
        </button>
        <button>
          <LogOutButton />
        </button>
      </div>
    </div>
    <UserErrorMessage v-else />
  </div>
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
.app-wrapper{
  background-color: #F4F1E9;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 102vh;
  overflow-x: hidden;
}
.payment-confirmation{
  margin-top: 5.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item-detail{
  margin-top: 3em;
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
  border-top: 1px #A26360 solid;
  margin: 0;
  margin-top: 0.5em;
}
h2{
  margin: 2em 1em;
  margin-bottom: 0;
}
.listing{
  width:80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 0.4em 1em;
  border-radius: 10px;
  margin-top: 3.5vh;
  margin-bottom: 3.5vh;
    box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
  -webkit-box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
  -moz-box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
}

#content-above-image{
  height: 2.5em;
  display: flex;
  width: 75vw;
  justify-content: space-between;
  align-items: center;
}
.bottom-buttons{
  margin-top: 1em;
  display: flex;
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
  margin-left: 0.2em;
  margin-bottom: -2.5em;
}
@media screen and (min-width: 768px) {
  .payment-confirmation{
    font-size: 1.2em;
    margin-top: 3em
  }
  #seller-container{
    margin-left: 0.2em;
  }
  button{
    height: 6vh;
  }
}
@media screen and (min-width: 1024px) {
  *{
    margin: 0;
    padding: 0;
  }
  #seller-container{
    margin-left: 0.2em;
  }
  .image-container{
    width: 20vw;
  }
  .listing{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    position: relative;

  }
  .container2{
    position: absolute;
    right: 5%;
    top: 20%;
    width: 50vw;
    margin-left: 5em;
    text-align: center;
  }
  .listing-details{
    display: flex;
    justify-content: space-between;
    width: 50vw;
  }
  .container2>hr{
    margin-bottom: 1em;
    width: 50vw;
  }
}
</style>
