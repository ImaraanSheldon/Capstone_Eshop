<template>

       <!-- plan B -->
       <div class="row gy-4" v-if="games?.length">
  
  <div class="col-md-6 mb-4" v-for="x in games" :key="x.id">
    <div class="custom-card h-100 rounded-4 p-2 bg-base shadow-effect">
      <div class="custom-card-image rounded-4">
        <img :src="x.cover_image" alt="Ikumi<3">
      </div>
      <div class="custom-card-content internal-screaming">
          <h4 class="my-3">{{ x.title }}</h4>
          <p>{{ x.description }}</p>
          <p>{{ x.price }}</p>
          <div class="d-flex justify-content-evenly">
              <a href="#" class="btn btn-brand" target="_blank">View Github</a>
              <a href="#" class="btn btn-brand" target="_blank">View Project</a>
          </div>
      </div>
      <!-- <a href="#About" class="link-custom">{{ x.services_Type }}</a> -->
    </div>
  </div>
</div>
<div v-else class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const games = computed(() => store.state.games)
onMounted(() => {
    store.dispatch('fetchGames')
});
</script>

<style scoped>
.border {
    border: 1px solid #dee2e6;
}

.card-head {
    padding: 15px;
}
</style>