<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container flex-lg-column m-auto">

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto flex-lg-column text-lg-start">
            <li class="nav-item">
              <router-link class="nav-link nav-text" aria-current="page" to="/search">
                <i class="las la-search"></i>search</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-text" aria-current="page" to="/">Discover</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-text" aria-current="page" to="/recent">Recent Releases</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-text" to="/deals">Current Offers</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-text" to="/sellers">Charts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-text" to="/coming">Coming Soon</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link nav-text" to="/cart">Cart</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
</script>
<style scoped>
li{
  padding: auto;
}
nav{
  max-width:100vw;
}
</style>