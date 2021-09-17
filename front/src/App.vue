<template>
  <div>
    <Navbar v-if="user" />
    <router-view
      :user="user"
      @loggedin="checkLoggedIn"
    />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default ({
  components: {
    Navbar,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.checkLoggedIn();
  },
  methods: {
    checkLoggedIn() {
      if (window.localStorage.getItem('email')) {
        this.user = {
          email: window.localStorage.getItem('email'),
          id: window.localStorage.getItem('id'),
        };
      }
    },
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@500;700&family=Questrial&display=swap');

#app {
  font-family: 'Questrial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2B463C;
}
body{
  background-color: #F4F1E9;
}
h2{
  font-family: 'Cormorant', serif;
  color: #A26360;
}
h3{
  font-family: 'Cormorant', serif;
  color: #2B463C;
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
a{
  color: #2B463C;
  text-decoration: none;
}
i{
  color: #A26360;
}
</style>
