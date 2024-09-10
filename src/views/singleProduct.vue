<template>
    <div class="full-height my-5">
      <div v-if="product" class="row border">
        <!-- Left Block: Product Image -->
        <div class="col-lg-6 border">
          <img :src="product.cover_image" alt="Product Image" class="img-fluid">
        </div>
  
        <!-- Right Block: Product Details -->
        <div class="col-lg-6 border">
          <h2>{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <h3>$ {{ product.price }}</h3>
          <button @click="addToCart(product)" class="btn btn-primary">Add To Cart</button>
        </div>
      </div>
      <button class="btn btn-secondary mt-4" @click="$router.go(-1)">Back</button>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  
  const store = useStore()
  const route = useRoute()
  const product = computed(()=> store.state.product) 

  
  onMounted(() => {
    store.dispatch('fetchProductById', route.params.id)
  })
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  