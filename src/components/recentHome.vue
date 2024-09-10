<template>

<div class="row gy-4" v-if="recent?.length">
    <div class="col-lg-4 mb-4" v-for="x in recent" :key="x.id">
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
  <div v-else class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const recent = computed(() => store.state.recent)
const addToCart = (game) => {
    store.dispatch('toCart', game)
}

onMounted(() => {
    store.dispatch('fetchRecent')
});
</script>

<style scoped>
.border {
    border: 1px solid #dee2e6;
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