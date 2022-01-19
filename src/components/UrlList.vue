<template>
  <table id="urlHistories" class='table'>
        <thead>
          <th>ID</th>
          <th>date</th>
          <th>url</th>
          <th>port</th>
        </thead>
        <tbody>
          <tr v-for="item in items" v-bind:key="item">
            <td>{{item.id}}</td>
            <td>{{item.datetime}}</td>
            <td>{{item.url}}</td>
            <td>{{item.display.port}}</td>
          </tr>
        </tbody>
      </table>
</template>

<script>
import * as axios from 'axios';

export default {
  data(){
    return{
      items: [],
    }
  },
  created:function(){
    axios.get('http://localhost:3000/frontend/urlHistorylist/10')
    .then((response) =>{
      this.items = response.data;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
