<template>
  <div id="app">
    <Navbar/>
    <div class="wrapper">
      <UrlLoader />
      <hr class="mt-5 mb-5" />
      <UrlList />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import UrlList from "./components/UrlList.vue";
import UrlLoader from "./components/UrlLoader.vue";

export default {
  name: "App",
  components: {
    Navbar,
    UrlList,
    UrlLoader
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.wrapper{
  padding: 10px;
}
.cursor-pointer{
  cursor: pointer;
}
</style>
