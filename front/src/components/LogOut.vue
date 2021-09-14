<template>
  <a
    class="alt-link"
    @click="logOut"
  >Log Out</a>
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
      this.user = data;
      this.user = window.localStorage.removeItem('email');
      this.user = null;
      window.location.assign('http://localhost:8080/login');
    },
  },
};
</script>

<style>

</style>
