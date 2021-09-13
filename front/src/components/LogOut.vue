<template>
  <router-link to="/login" class="alt-link-styling" @click="logOut">Log Out</router-link>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async logOut() {
      const response = await fetch('http://localhost:3000/logout', {
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      this.user = window.localStorage.removeItem('email');
      this.user = null;
    },
  },
};
</script>

<style>

</style>
