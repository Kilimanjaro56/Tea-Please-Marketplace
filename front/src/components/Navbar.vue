<template>
  <div class="navbar-wrapper">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <div
      v-if="user"
      class="navbar"
    >
      <router-link to="/listings">
        <img
          src="../assets/Logo.png"
          alt=""
        >
      </router-link>
      <div
        id="links"
        @click="closeMenu"
      >
        <router-link
          id="no-shadow"
          to="/listings"
          class="alt-link"
        >
          Home
        </router-link>
        <router-link to="/favourites">
          Favourites
        </router-link>
        <router-link
          to="/profile"
          class="alt-link"
        >
          My Profile
        </router-link>
        <router-link to="/about">
          About Us
        </router-link>
        <LogOutButton />
      </div>
      <a
        id="open-icon"
        class="icon"
        @click="openMenu(); openIcon();"
      >
        <i class="fa fa-bars" />
      </a>
      <a
        id="close-icon"
        class="icon"
        @click="closeMenu(); closeIcon();"
      >
        <i class="fa fa-times" />
      </a>
    </div>
  </div>
</template>

<script>
import LogOutButton from './LogOut.vue';

export default {
  components: {
    LogOutButton,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.userLoggedIn();
  },
  methods: {
    openMenu() {
      const items = document.getElementById('links');
      if (items.style.display === 'flex') {
        items.style.display = 'none';
      } else {
        items.style.display = 'flex';
      }
    },
    closeMenu() {
      const items = document.getElementById('links');
      if (items.style.display === 'none') {
        items.style.display = 'flex';
      } else {
        items.style.display = 'none';
      }
      this.closeIcon();
    },
    openIcon() {
      const openIcon = document.getElementById('open-icon');
      const closeIcon = document.getElementById('close-icon');
      if (openIcon.style.display === 'none') {
        openIcon.style.display = 'block';
      } else {
        openIcon.style.display = 'none';
      }
      if (closeIcon.style.display === 'block') {
        closeIcon.style.display = 'none';
      } else {
        closeIcon.style.display = 'block';
      }
    },
    closeIcon() {
      const openIcon = document.getElementById('open-icon');
      const closeIcon = document.getElementById('close-icon');
      if (closeIcon.style.display === 'block') {
        closeIcon.style.display = 'none';
      }
      if (openIcon.style.display === 'none') {
        openIcon.style.display = 'block';
      }
    },
    userLoggedIn() {
      if (window.localStorage.getItem('email')) {
        this.user = window.localStorage.getItem('email');
      }
    },
  },
};
</script>

<style scoped>
img {
  height: 3.3em;
  margin-top: 0.5em;
  padding-left: 1.5em;
}
.navbar {
  background-color: white;
  text-align: left;
  font-family: 'Cormorant', serif;
  font-weight: bold;
  position: relative;
  right: 1.2em;
  bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5em;
  width: 105vw;
  z-index: 50;
  box-shadow: 0px 6px 17px -8px rgba(0,0,0,0.35);
-webkit-box-shadow: 0px 6px 17px -8px rgba(0,0,0,0.35);
-moz-box-shadow: 0px 6px 17px -8px rgba(0,0,0,0.35);
}
.navbar #links {
  display: none;
  flex-direction: column;
  justify-content: space-evenly;
  width: 105vw;
  position: absolute;
  top: 6em;
  height: 35vh;
}
.navbar a {
  text-decoration: none;
  display: block;
  color: #a26360;
}
#links a {
  font-size: 1.2em;
  padding: 1.15em 2em;
  background-color: white;
  border-bottom: thin #a26360 solid;
  box-shadow: 0px -3px 24px -2px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 0px -3px 24px -2px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px -3px 24px -2px rgba(0, 0, 0, 0.08);
}
#links .alt-link {
  background-color: #f4f1e9;
}
.navbar a.icon {
  display: block;
}
i {
  font-size: 1.5em;
  padding-right: 1em;
  color: #a26360;
}
#close-icon {
  display: none;
}
</style>
