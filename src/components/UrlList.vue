<template>
  <div>
    <h3 class="text-bold">Url histories:</h3>
    <button class="btn btn-sm btn-danger" v-on:click="clearUrlList">Clear</button>
    <table id="urlHistories" class='table table-hover'>
      <thead>
        <th>id</th>
        <th>date</th>
        <th>url</th>
        <th>port</th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{formatDatetime(item.datetime)}}</td>
          <td>{{item.url}}</td>
          <td>{{item.display.port}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as axios from 'axios';
import * as moment from 'moment';

var backendUrl = null;

export default {
  data() {
    return {
      items: [],
    }
  },
  methods:{
    formatDatetime:function(value){
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
    clearUrlList(){
      axios.get(backendUrl + 'clearHistoryList')
      .then((response) =>{
        if(response.data){
          this.items = [];
        }
        // alert(response.data)
      })
    }
  },
  created:function(){
    backendUrl = this.backendUrl;
    axios.get(backendUrl + 'urlHistorylist/10')
    .then((response) =>{
      this.items = response.data;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
thead th{
  text-transform: capitalize;
}
</style>
