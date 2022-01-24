<template>
  <div>
    <a
      class="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Displays
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li v-for="display in displays" v-bind:key="display.id">
          <a class="dropdown-item" href="#" v-on:click="reloadService(display.id)">Identify display {{display.id}}</a>
        </li>
    </ul>
  </div>
</template>

<script>
var backendUrl = null;

export default {
  data: function () {
    return {
      displays: [],
    };
  },
  created: function () {
    backendUrl = this.backendUrl;
  },
  mounted(){
    this.axios.get(backendUrl + "getDisplayList").then((response) => {
			this.displays = this.displays = response.data;
		});
  },
	methods:{
		reloadService(id){
			this.axios/get(backendUrl + "")
		}
	}
}
</script>
