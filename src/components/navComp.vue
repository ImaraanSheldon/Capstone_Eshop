<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container flex-lg-column">
        <!-- <a class="navbar-brand mx-lg-auto mb-lg-4" href="#landing">
            <span class="h3 fw-bold d-block d-lg-none">Imaraan Sheldon</span>
            <img src="https://imaraansheldon.github.io/allImages/portfolio-Images/Imaraan.jpg" class="d-none d-lg-block rounded-circle" alt="#">
        </a> -->
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
              <router-link class="nav-link active" aria-current="page" to="/search">
                <i class="las la-search"></i>
                search</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Discover</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/recent">Recent Releases</router-link>
            </li>
            <!-- <li class="nav-item"> -->
              <!-- <router-link class="nav-link" to="/featured">Featured</router-link> -->
            <!-- </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/deals">Current Offers</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/sellers">Charts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/coming">Coming Soon</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#testimonials">Enter Code</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
</script>
<style scoped>
nav{
  max-width:100vw;
}
</style>