<template>
  <div id='nav'>
    <router-link to='/listings'>Home</router-link>
    <router-link to='/about'>About</router-link>
    <router-view />
  </div>
</template>

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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
button {
  background-color: #a9c596;
  height: 2.7em;
  color: #2b463c;
  padding: 0.8em 2.3em;
  border-radius: 4px;
  border: none;
}
</style>
