<template>
<!-- Listing Detail Front End + Styling - Keely -->
<BackButton/>
  <div class='item-detail' >
    <h2>Listing Details</h2>
    <div class='listing' v-if='listing.title'>
      <div id='content-above-image'>
        <div id='seller-container' >
          <h3>Seller: {{this.listing.author}}</h3>
        </div>
            <button>Purchase</button>
      </div>
      <div class='image-container'><img :src='this.listing.imageUrl' alt='' /></div>
      <div class='listing-details'>
        <h3>{{this.listing.title}}</h3>
        <h4>${{this.listing.price}}.00</h4>
      </div>
        <hr>
        <p>{{this.listing.description}}</p>
    </div>
        <div v-else>
          <h3>Error!</h3>
          <h4>Sorry this page isn't avalible, please check the link and try again</h4>
          <button>Return to Home</button>
        </div>
  </div>
</template>

<script>
import BackButton from '../components/BackButton.vue';

export default {
  data() {
    return {
      listing: [],
    };
  },
  components: {
    BackButton,
  },
  props: {
    listingId: String,
  },
  methods: {
    async getListingDetail() {
      const response = await fetch(
        `http://localhost:3000/listings/${this.listingId}`,
      );
      const data = await response.json();
      this.listing = data;
    },
  },
  mounted() {
    this.getListingDetail();
  },
};
</script>

<style scoped>
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
  margin-left: 11vw;
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
