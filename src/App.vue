<template>
  <div id="app">
    <hr>
    <UrlList/>
  </div>
</template>

<script>
import UrlList from './components/UrlList.vue'

export default {
  name: 'App',
  components: {
    UrlList
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding:20px;
}
</style>
