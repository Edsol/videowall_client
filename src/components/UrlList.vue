<template>
  <div>
    <div>
      <span class="text-bold h3">Url histories:</span>
      <button class="btn btn-sm btn-danger float-end pr-5" v-on:click="clearUrlList" title="Clear all">Clear</button>
    </div>
    <table id="urlHistories" class='table table-hover'>
      <thead>
        <th>date</th>
        <th>url</th>
        <th>port</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{formatDatetime(item.datetime)}}</td>
          <td>{{item.url}}</td>
          <td>{{item.display.port}}</td>
          <td>
            <font-awesome-icon icon="times-circle" v-if="item.close === false" class="text-danger"/>
            <font-awesome-icon icon="trash-alt" class="text-danger cursor-pointer" v-on:click="removeUrl(item.id)" title="delete url"/>
            <font-awesome-icon icon="retweet" class="cursor-pointer" v-on:click="useLink(item.id)" title="use this URL"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as moment from 'moment';

var backendUrl = null;

export default {
  data() {
    return {
      items: [],
    }
  },
    created:function(){
      this.emitter.on('reloadUrlHistories-event', (evt) =>{
        console.log('reloadUrlHistories-event');
        this.loadUrlHistories();
      })
      backendUrl = this.backendUrl;
      this.$nextTick(this.loadUrlHistories)
     
  },
  methods:{
    formatDatetime:function(value){
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
    loadUrlHistories(){
      
      this.axios.get(backendUrl + 'urlHistorylist/10')
      .then((response) =>{
        console.log('loadUrlHistories method',response.data)
        this.items = response.data;
      })
    },
    clearUrlList(){
      this.axios.get(backendUrl + 'clearHistoryList')
      .then((response) =>{
        if(response.data){
          this.items = [];
          this.$toast.open({
              message: "Url list has been cleaned",
              type: "success",
              duration: 5000,
              dismissible: true
          })
        }
      })
    },
    removeUrl(urlId){
      this.axios.get(backendUrl + 'removeUrl/'+urlId)
      .then((response) =>{
        if(response.statusText === "OK"){
          this.$toast.open({
            message: "Url has been removed",
            type: "success",
            duration: 1000,
            dismissible: true
          })

          this.loadUrlHistories()
        }
      })
    },
    useLink(urlId){
      var item = this.items.find(element => element.id === urlId);
      this.emitter.emit('updateUrl-event',{url:item.url})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
thead th{
  text-transform: capitalize;
}
</style>
