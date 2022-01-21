<template>
  <form id="urlForm" @submit="checkForm" action="#">
  <div class="row">
    <div class="col-9">
      <label for="url">URL</label>
      <input
        type="url"
        id="url"
        class="form-control"
        placeholder="http://example.com"
        v-on:keyup.enter="checkUrl"
        v-model="url"
        required
      />
    </div>
    <div class="col-2">
      <label for="display">Display</label>
      <select name="display" id="display" class="form-select" v-model="selectedDisplay" required>
        <option v-for="display in displays" :key="display.id">
          {{ display.port }}
        </option>
      </select>
    </div>
    <div class="col-1">
      <button class="btn btn-primary mt-4" title="Load url on selected display">Load</button>
    </div>
  </div>
  </form>
</template>

<script>
var backendUrl = null;
var apiUrl = null;
var displays = {};

export default {
  data: function () {
    return {
      displays: [],
    };
  },
  created: function () {
    backendUrl = this.backendUrl;
    apiUrl = this.apiUrl;
  },
  mounted: function(){
    this.$nextTick(this.loadDisplayList)
  },
  methods: {
    loadDisplayList(){
      this.axios.get(backendUrl + "getDisplayList").then((response) => {
        console.log('Load displayList data',response.data);
        displays = this.displays = response.data;
      });
    },
    openUrl(url,displayId){
      console.log('openUrl',url,displayId,apiUrl)
      
      this.axios.post(apiUrl+'openUrl', { 
        url: url,
        display: displayId
      })
      .then((response) => {
        if (response.data.executed) {
          console.log('executed',response.data);
          this.$toast.open({
              message: "Url correctly open",
              type: "success",
              duration: 5000,
              dismissible: true
          })
          this.emitter.emit('reloadUrlHistories-event',{
            eventContent:'TEST'
          })
        } else {
          console.log(response.data.errors)
        }
      })
    },
    checkForm(e){
      e.preventDefault();
      var selectedDisplayObj = displays.find(element => element.port === this.selectedDisplay)
      
      this.openUrl(this.url, selectedDisplayObj.id)
    }
  },
};
</script>
