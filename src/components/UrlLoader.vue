<template>
  <form id="urlForm" @submit="checkForm" action="#">
  <div class="row">
    <div class="col-8">
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
        <option disabled value="">Please select one</option>
        <option v-for="display in displays" :key="display.id" :value="display.id">
          {{ display.port }}
        </option>
      </select>
    </div>
    <div class="col-1">
      <label for="display">Refresh time (min)</label>
      <select name="refreshTime" id="refreshTime" class="form-select" v-model="selectedRefreshTime">
        <option disabled value="">Please select one</option>
        <option v-for="time in refreshTimes" :key="time">
          {{ time }}
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

export default {
  data: function () {
    return {
      refreshTimes:[1,5,30,60],
      displays: [],
      url: null,
      selectedDisplay: null,
      selectedRefreshTime: null
    };
  },
  created: function () {
    backendUrl = this.backendUrl;
    apiUrl = this.apiUrl;

    this.emitter.on('updateUrl-event', (evt) =>{
      this.url = evt.url;
    })
  },
  mounted: function(){
    this.$nextTick(this.loadDisplayList)
  },
  methods: {
    loadDisplayList(){
      this.axios.get(backendUrl + "getDisplayList").then((response) => {
        console.log('Load displayList data',response.data);
        this.displays = response.data;
      });
    },
    openUrl(url,displayId,refreshTime){
      console.log('openUrl',url,displayId,refreshTime)
      
      this.axios.post(apiUrl+'openUrl', {
        url: url,
        display: displayId,
        refreshTime: refreshTime
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
          this.emitter.emit('reloadUrlHistories-event')

          this.url = null;
        } else {
          console.log(response.data.errors)
        }
      })
    },
    checkForm(e){
      e.preventDefault();

      this.openUrl(this.url, this.selectedDisplay, this.selectedRefreshTime)
      this.selectedDisplay = null;
      this.url = null;
      this.selectedRefreshTime = null;
    }
  },
};
</script>
