<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Client</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item dropdown">
            <UtilsDropdown/>
          </li>
           <li class="nav-item dropdown">
            <!-- <DisplayUtilsDropdown/> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import UtilsDropdown from './NavbarComponents/UtilsDropdown.vue';
// import DisplayUtilsDropdown from './NavbarComponents/DisplayUtilsDropdown.vue';

export default {
  name: "Navbar",
  components: {
    UtilsDropdown,
    // DisplayUtilsDropdown
  },
};
</script>