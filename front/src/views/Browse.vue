<template>
  <div class="browse">
    <h3>Browse Listings</h3>
    <Filter
      :listings="listingStore"
      @categoryFilter="displayFilteredCategory"
      @clearCategories="getListings"
    />
    <Search
      :listings="listings"
      @searched="displayFilteredListings"
      @showAll="getListings"
    />
    <a
      id="clear-search"
      @click="clearSearch"
    >Clear Search</a>

    <!-- View List Code Here -->

    <div
      v-for="listing of listings"
      :key="listing._id"
    >
      <h2>{{ listing.title }}</h2>
      <h2>{{ listing._id }}</h2>
    </div>

    <div class="greeting">
      <h2>Welcome {{ user.email }}!!</h2>
      <h2>Browse Listings Here !!</h2>
    </div>
    <div class="filter-search-group">
      <select name="filter">
        <option value="">
          Filter by
        </option>
        <option value="">
          Filter by Price
        </option>
        <option value="">
          Filter by tea
        </option>
        <option value="">
          Filter by ...
        </option>
      </select>
      <Search
        :listings="listings"
        @searched="displayFilteredListings"
        @showAll="getListings"
      />
      <a
        id="clear-search"
        @click="clearSearch"
      >Clear Search</a>
    </div>
    <ul>
      <li
        v-for="listing of listings"
        :key="listing._id"
      >
        <div class="first-group">
          <p>{{ listing.author.name }}</p>
          <div class="heart-group">
            <i
              v-if="!listing.favourited"
              class="far fa-heart heart-btn"
              @click="listing.favourited=!listing.favourited"
            />
            <i
              v-else
              class="fas fa-heart filled-heart-btn"
              @click="listing.favourited=!listing.favourited"
            />
          </div>
        </div>
        <img :src="listing.imageUrl">
        <div class="second-group">
          <p>{{ listing.title }}</p>
          <p>${{ listing.price }}</p>
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
      </li>
    </ul>
    <h2
      v-if="message"
      id="search-error"
    >
      {{ message }}
    </h2>
  </div>
</template>

<script>
import Search from '../components/Search.vue';
import Filter from '../components/Filter.vue';

export default {
  components: {
    Search,
    Filter,
  },
  props: {
    user: Object,
  },
  emits: ['categoryFilter'],
  data() {
    return {
      listingStore: [],
      listings: [],
      message: null,
      filter: 'all',
    };
  },
  created() {
    this.getListings();
  },
  mounted() {
    this.getListings();
  },
  methods: {
    async getListings() {
      const response = await fetch('http://localhost:3000/listings');
      const data = await response.json();
      console.log(data);
      this.listings = data;
      this.listingStore = data;
      const dataWithFavs = data.map((element) => {
        const item = element;
        item.favourited = false;
        return item;
      });
      console.log(dataWithFavs);
      this.listings = dataWithFavs;
      this.message = null;
      document.getElementById('clear-search').style.display = 'none';
    },
    displayFilteredListings(filteredArray) {
      if (filteredArray.length >= 1) {
        this.listings = filteredArray;
        this.message = null;
        document.getElementById('clear-search').style.display = 'block';
      } else {
        this.listings = null;
        this.message = 'Sorry, No Matches';
        document.getElementById('clear-search').style.display = 'block';
      }
    },
    clearSearch() {
      document.getElementById('clear-search').style.display = 'none';
      this.getListings();
    },

    displayFilteredCategory(filteredArray) {
      this.listings = filteredArray;
    },
  },
};
</script>

<style scoped>
#clear-search {
  display: none;
  margin: 1em;
  padding: 0;
  background-color: transparent;
  text-align: center;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.greeting {
  font-size: 0.8em;
  padding: 1em;
  color: #a26360;
}
select {
  border: #a26360 thin solid;
  width: 50%;
  padding: 0.5em;
  border-radius: 5px;
  background-color: transparent;
}
select > option {
  text-align: center;
}
.filter-search-group {
  display: flex;
  justify-content: space-around;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}
li {
  width: 80%;
  background-color: #fff;
  margin: 1em;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 1px 3px 5px -2px #000000;
}
.first-group,
.second-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.first-group > p {
  text-transform: uppercase;
  padding: 0.2em;
}
.second-group {
  border-bottom: #a26360 thin solid;
  padding-bottom: 0.3em;
}
img {
  width: 100%;
  height: 30vh;
  border-radius: 10px;
  margin: 1em 0;
}
.desc {
  padding: 1em;
  text-align: left;
}
.heart-group {
  font-size: 1.2em;
}
.heart-btn,
.filled-heart-btn {
  padding: 0.2em;
}
#app {
  font-family: 'Questrial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b463c;
}
body {
  background-color: #f4f1e9;
}
h2 {
  font-family: 'Cormorant', serif;
  color: #a26360;
}
h3 {
  font-family: 'Cormorant', serif;
  color: #2b463c;
  font-weight: 500;
}
button {
  background-color: #a9c596;
  height: 2.7em;
  color: #2b463c;
  padding: 0.8em 2.3em;
  border-radius: 4px;
  border: none;
}
a {
  color: #2b463c;
  text-decoration: none;
}
i {
  color: #a26360;
}
@media screen and (min-width: 768px) {
  .browse{
    font-size: 1.2em;
  }
  select{
    width: 60%;
  }
  button{
    background-color:red;
  }
}
@media screen and (min-width: 1024px) {
  .browse{
    font-size: 1.2em;
  }
  .filter-search-group{
    display: flex;
    justify-content: end;
  }
  select{
    width: 30%;
    margin-right: 1.5em;
  }
  ul{
    border: red thin solid;
    flex-direction: row;
    flex-wrap: wrap;
  }
  li{
    width: 18%;
    margin: 1em auto;
  }
  li>.desc{
    max-height: 5vh;
    overflow: scroll;
  }
  button{
    background-color:blue;
  }
}

</style>
