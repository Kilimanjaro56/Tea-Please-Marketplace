<template>
  <span class="back-button">
    <button @click="goBack"><i class="fas fa-chevron-left" /></button>
  </span>
</template>

<script>
export default {
  name: 'BackButton',
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
button{
  background-color: transparent;
  font-size: 1.8em;
  height: 1em;
  color: #A26360;
  padding: 0;
  border-radius: 0;
  border: none;
  position: absolute;
  top: 3.5em;
  left: 1em;
}

</style>
