<template>
  <div class="container mt-4">
    <!-- Search Form -->
    <form @submit.prevent="applyFilters">
      <div class="row mb-4">
        <div class="col-md-4">
          <input type="text" v-model="searchTerm" class="form-control" placeholder="Search by title">
        </div>
        <div class="col-md-3">
          <select v-model="genre" class="form-select">
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <!-- Add more genres as needed -->
          </select>
        </div>
        <div class="col-md-2">
          <input type="number" v-model.number="minPrice" class="form-control" placeholder="Min Price" step="0.01">
        </div>
        <div class="col-md-2">
          <input type="number" v-model.number="maxPrice" class="form-control" placeholder="Max Price" step="0.01">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Apply Filters</button>
    </form>

    <!-- Sorting Options -->
    <div class="mt-4">
      <label for="sortBy" class="form-label">Sort By:</label>
      <select v-model="sortOption" @change="applyFilters" class="form-select">
        <option value="">Select Sorting Option</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="releaseDateAsc">Release Date: Old to New</option>
        <option value="releaseDateDesc">Release Date: New to Old</option>
      </select>
    </div>

    <!-- Display Filtered and Sorted Games -->
    <div class="row mt-4 border" v-if="filteredGames?.length > 0">
      <div class="col-lg-6" v-for="game in filteredGames" :key="game.id">
        <div class="card border mb-3">
          <div class="card-body">
            <h5 class="card-title fw-bold">Title: {{ game.title }}</h5>
            <p class="card-text">Genre: {{ game.genre }}</p>
            <p class="card-text">Price: ${{ game.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No games found.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

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
  
  .card-head {
    padding: 15px;
  }
  </style>
  