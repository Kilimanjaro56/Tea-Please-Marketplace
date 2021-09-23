<template>
  <div class="app-wrapper">
    <div
      v-if="user"
      class="browse">
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

  <div
    v-if="user"
    class="browse"
  >
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
      id="search-error">
      <div class="greeting">
        <h2>Welcome {{ currentUser.name }}!</h2>
        <h2>Browse Listings Here!</h2>
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
        </li>
      </ul>
      <h2
        v-if="message"
        id="search-error"
      >
        {{ message }}
      </h2>
    </div>
    <UserErrorMessage v-else />
  </div>
</template>

<script>
import Search from '../components/Search.vue';
import Filter from '../components/Filter.vue';
import UserErrorMessage from '../components/UserErrorMessage.vue';

export default {
  components: {
    UserErrorMessage,
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
      currentUser: [],
      message: null,
      filter: 'all',
    };
  },
  created() {
    this.getListings();
    this.getUser();
  },
  mounted() {
    this.getListings();
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
      if (this.user) {
        const response = await fetch('http://localhost:3000/listings');
        const data = await response.json();
        const dataWithFavs = data.map((element) => {
          const item = element;
          item.favourited = false;
          return item;
        });
        this.listings = dataWithFavs;
        this.message = null;
        document.getElementById('clear-search').style.display = 'none';
      }
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
.app-wrapper{
  background-color: #F4F1E9;
  position: absolute;
  top: 0;
  left: 0;
  width: 102vw;
  height: 105vh;
  overflow-x: hidden;
}
.browse{
  margin-top: 5.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#clear-search {
  display: none;
  margin: 1em;
  padding: 0;
  background-color: transparent;
  text-align: center;
}
#price{
  font-family: inherit;
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
p{
  font-family: 'Cormorant', serif;
  font-size:1.1em ;
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
  background-color: #F4F1E9;
}
li {
  width: 80%;
  background-color: #fff;
  margin: 1em;
  padding: 1em;
  border-radius: 10px;
    box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
  -webkit-box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
  -moz-box-shadow: 0px 0px 25px -14px rgba(0,0,0,0.42);
}
.first-group,
.second-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.first-group > p {
  padding: 0.2em;
}
.second-group {
  border-bottom: #a26360 thin solid;
  padding-bottom: 0.3em;
  padding-top: 0.3em;
  text-align: left;
  align-items: flex-end;
}
.second-group p{
  margin-right: 1em;
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
  padding: 1em;
  padding-left: 0;
  text-align: left;
  font-family: 'Questrial', sans-serif;
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
  font-size: 1em;
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
