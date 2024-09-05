<template>
    <div v-if="product">
      <h1>{{ product.title }}</h1>
      <img :src="product.cover_image" alt="Product Cover">
      <p>{{ product.description }}</p>
      <h2>$ {{ product.price }}</h2>
    </div>
    <div v-else class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  
  const store = useStore()
  const route = useRoute()
  const product = ref(null)
  
  onMounted(() => {
    const id = route.params.id
    const games = store.state.games
    product.value = games.find(game => game.id === id)
  })
  </script>
  