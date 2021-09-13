<template>
  <div class="error">
    <h2>Sorry!</h2>
    <p>You must be logged in to use Tea Please!</p>
    <p>Log in or Sign up below!</p>
    <div id="error-buttons">
      <router-link id="login-link" to="/login">
        <button>Login</button>
      </router-link>
      <router-link id="signup-link" to="/signup">
        <button>Signup</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
button{
    margin: 1em;
}
.error{
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
