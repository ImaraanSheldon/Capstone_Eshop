<template>
    <section class="full-height">
        <div class="d-flex justify-content-between">
            <h1 class="display-4">Search</h1>
            <div>
                <userImage/>
            </div>
        </div>
        <!-- Search Form -->
        <form @submit.prevent="applyFilters">
          <div class="row m-4">
            <div class="col-md-12 pb-3 mt-sm-5">
              <input type="text" v-model="searchTerm" class="form-control box rounded-pill" placeholder="Search by title">
            </div>
            <div class="col-md-4">
              <select v-model="genre" class="form-select box rounded-pill">
                <option value="">All Genres</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Shooter">Shooter</option>
                <option value="RPG">RPG</option>
                <option value="Fighting">Fighting</option>
                <option value="Racing">Racing</option>
                <!-- Add more genres as needed -->
              </select>
            </div>
            <div class="col-md-4 ">
              <input type="number" v-model.number="minPrice" class="form-control box rounded-pill" placeholder="Min Price" step="1">
            </div>
            <div class="col-md-4">
              <input type="number" v-model.number="maxPrice" class="form-control box rounded-pill" placeholder="Max Price" step="1">
            </div>
          </div>
          <div class="col-md-12 d-flex justify-content-center">
            <button type="submit" class="btn btn-primary p-3 rounded-pill">SEARCH</button>
          </div>
        </form>
    
        <!-- Sorting Options -->
        <div class="mt-5 row text-center">
          <label for="sortBy" class="form-label h2">Sort By:</label>
          <select v-model="sortOption" @change="applyFilters" class="form-select box rounded-pill">
            <option value="">Select Sorting Option</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="releaseDateAsc">Release Date: Old to New</option>
            <option value="releaseDateDesc">Release Date: New to Old</option>
          </select>
        </div>
    
        <!-- Display Filtered and Sorted Games -->
        <div class="row gy-4" v-if="filteredGames?.length">
    <div class="col-md-6 mb-4" v-for="x in filteredGames" :key="x.id">
      <div class="custom-card h-100 rounded-4 p-2 bg-base shadow-effect">
        <div class="custom-card-image rounded-4">
          <img :src="x.cover_image" alt="Game Cover">
        </div>
        <div class="custom-card-content internal-screaming">
          <h3 class="my-3 text-center">{{ x.title }}</h3>
          <p class="text-center">{{ x.description }}</p>
          <h4 class="text-center">$ {{ x.price }}</h4>
          <div class="d-flex justify-content-evenly">
            <!-- View Game Button -->
            <router-link :to="{ name: 'ProductDetail', params: { id: x.id } }" class="btn btn-brand">View Game</router-link>
            <!-- Add To Cart Button -->
            <button @click="addToCart(x)" class="btn btn-brand">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="spinner-border mx-auto mt-5" role="status">
    <span class="visually-hidden">Loading...</span>
    <span class="visually-hidden">No Games Found</span>
  </div>
    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import userImage from '@/components/userImage.vue';

const store = useStore()

const searchTerm = ref('')
const genre = ref('')
const minPrice = ref(null)
const maxPrice = ref(null)
const sortOption = ref('')

const filteredGames = computed(() => store.state.filteredGames)

const applyFilters = () => {
  store.dispatch('searchGames', {
    searchTerm: searchTerm.value,
    genre: genre.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value
  }).then(() => {
    store.dispatch('sortGames', { sortBy: sortOption.value })
  })
}

watch(sortOption, () => {
  store.dispatch('sortGames', { sortBy: sortOption.value })
})
</script>

  
  <style scoped>
  .border {
    border: 1px solid #dee2e6;
  }

  .box{
    height: 50px;
    border: 5px solid var(--Color-Accent-Pinot);
  }


.card-head {
    padding: 15px;
}

/* btn */
.btn {
    padding: 12px 28px;
    font-weight: 700;
    color: var(--Color-Text-Fondant);
}

.btn-brand {
    background-color: var(--Color-Accent-Pinot);
    color: var(--Color-Header-Blossom);
    border-color: var(--Color-Header-Blossom);

    &:hover,
    :focus {
        background-color: var(--Color-Background-Charcoal);
        color: var(--Color-Header-Blossom);
        border-color: var(--Color-Header-Blossom);
    }
}

/* /btn/ */

.link-custom {
    font-weight: 700;
    position: relative;

    &:hover {
        color: var(--Color-Header-Blossom);
    }

}

.link-custom::after {
    content: "";
    width: 0%;
    height: 2px;
    background-color: var(--Color-Header-Blossom);
    position: absolute;
    left: 0;
    top: 110%;
    transition: all 0.5s ease;
}

.link-custom:hover::after {
    width: 100%;
    transition: all 0.5 ease-in;
}
  </style>
  