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
      Options
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><a class="dropdown-item" href="#" v-on:click="reloadService">Reload service</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="reboot">Reboot device</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="closeAllBrowser">Close all browser</a></li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "UtilsDropdown",
    methods:{
        reloadService(){
            this.axios.get(this.apiUrl + 'reload')
            .then((response) =>{
              console.log('reloadService',response.data)
              if(response.data.execute === true){
                this.$toast.open({
                    message: "Service correctly reloaded",
                    type: "success",
                    duration: 5000,
                    dismissible: true
                })
              }else{
                this.$toast.open({
                    message: response.data.error,
                    type: "error",
                    duration: 5000,
                    dismissible: true
                })
              }
                
            })
        },
        reboot(){
            console.log('reboot')
            this.axios.get(this.apiUrl + 'reboot')
        },
        closeAllBrowser(){
          console.log('closeAllBrowser')
          this.axios.get(this.apiUrl + 'closeBrowser')
        }
    }
}
</script>