<template>
    <div class=" my-5">
      <h1 class="mb-4">Your Cart</h1>
      <!-- <p class="text-white">{{ cartItems }} {{ typeof cartItems }}</p> -->
      <div v-if="cartItems && cartItems.length">
        <div class=" mb-4">
          <div class="row" v-for="item in cartItems" :key="item.id">
            <div class="col-md-2"></div>
            <div class="col-md-8 d-flex justify-content-center">
                <img :src="item.cover_image" alt="Game Cover">
              <strong>{{ item.title }}</strong>
              <p class="mb-1">Quantity: {{ item.stock_quantity }}</p>
            </div>
            <div class="col-md-2"></div>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(item.id)">Delete</button>
        </div>
        </div>
        <button class="btn btn-primary w-100" @click="proceedToPurchase">Proceed to Purchase</button>
      </div>
      <div v-else>
        <p class="text-muted">Your cart is empty.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue'; // Import Vue features
  import { useStore } from 'vuex'; // Import Vuex store hook
  import { useCookies } from 'vue3-cookies'; // Import cookies hook
  import Swal from 'sweetalert2';
  
  const store = useStore(); // Access Vuex store
  const { cookies } = useCookies(); // Access cookies object
  
  const cartItems = computed(() => store.state.cart);
  
  // Function to load cart items from cookies
  const loadCartFromCookies = () => {
    const cartData = cookies.get('cart');
    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData);
        store.commit('setCart', parsedCart); // Update store with cart items from cookies
      } catch (error) {
        console.error('Failed to parse cart data from cookies', error);
        store.commit('setCart', []);
      }
    } else {
      store.commit('setCart', []);
    }
  };
  
  // Function to remove an item from the cart
//   const removeItem = (itemId) => {
//     store.commit('removeFromCart', itemId); // Adjust this mutation according to your Vuex store setup
//     updateCookies();
//   };
  
  // Function to update cart cookies
  const updateCookies = () => {
    cookies.set('cart', JSON.stringify(store.state.cart), '1d'); // Update cookie with new cart data
  };
  
  // Function to proceed to purchase
  const proceedToPurchase = () => {
    // Handle the proceed to purchase logic, like navigating to checkout page
    console.log('Proceeding to purchase');
  };

  const removeItem = (itemId) => {
        store.commit('removeFromCart', itemId); // Adjust this mutation according to your Vuex store setup
    updateCookies();
//   store.commit('removeFromCart', itemId);
//   store.dispatch('saveCartToCookies', cookies); // Save updated cart to cookies
};

  const confirmDelete = async (itemId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {

    removeItem(itemId);
    Swal.fire(
      'Deleted!',
      'Your item has been deleted.',
      'success'
    );
  }
};
  
  // Load cart items on component mount
  onMounted(() => {
    loadCartFromCookies();
  });
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  
  