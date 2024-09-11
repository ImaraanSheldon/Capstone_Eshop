<template>
  <section class="full-height">
    <div class="container my-5">
      <h1 class="mb-4">Your Cart</h1>
      
      <!-- Show cart items if there are any -->
      <div v-if="cartItems && cartItems.length" class="cart-container mb-4">
        <div class="cart-item mb-3" v-for="item in cartItems" :key="item.id">
          <div class="row align-items-center">
            <div class="col-md-3 d-flex justify-content-center">
              <img :src="item.cover_image" alt="Game Cover" class="img-fluid">
            </div>
            <div class="col-md-6">
              <h5>{{ item.title }}</h5>
              <p class="mb-1">Quantity: {{ item.stock_quantity }}</p>
            </div>
            <div class="col-md-3 text-end">
              <button class="btn btn-danger btn-sm" @click="confirmDelete(item.id)">Delete</button>
            </div>
          </div>
        </div>
        <button class="btn btn-warning w-100 mb-3" @click="confirmDeleteAll">Delete All</button>
        <button class="btn btn-primary w-100" @click="confirmProceedToPurchase">Proceed to Purchase</button>
      </div>
      
      <!-- Show message if the cart is empty -->
      <div v-else>
        <p class="text-muted">Your cart is empty.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useCookies } from 'vue3-cookies';
import Swal from 'sweetalert2';

const store = useStore();
const { cookies } = useCookies();

const cartItems = computed(() => store.state.cart);

// Load cart items from cookies
const loadCartFromCookies = () => {
  const cartData = cookies.get('cart');
  if (cartData) {
    try {
      const parsedCart = JSON.parse(cartData);
      store.commit('setCart', parsedCart);
    } catch (error) {
      console.error('Failed to parse cart data from cookies', error);
      store.commit('setCart', []);
    }
  } else {
    store.commit('setCart', []);
  }
};

// Function to update cart cookies
const updateCookies = () => {
  cookies.set('cart', JSON.stringify(store.state.cart), '1d');
};

// Remove an item from the cart
const removeItem = (itemId) => {
  store.commit('removeFromCart', itemId);
  updateCookies();
};

// Remove all items from the cart
const removeAllItems = () => {
  store.commit('setCart', []);
  cookies.remove('cart'); // Remove cart from cookies
};

// Confirm deletion of an item
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
    Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
  }
};

// Confirm deletion of all items
const confirmDeleteAll = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this! All items will be deleted.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete all!',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    removeAllItems();
    Swal.fire('Deleted!', 'All items have been deleted.', 'success').then(() => {
      // Optionally redirect to checkout page or refresh
      window.location.href = '/cart'; // Replace with actual checkout URL
    });
  }
};

// Confirm and proceed to purchase
const confirmProceedToPurchase = async () => {
  const result = await Swal.fire({
    title: 'Proceed to Purchase',
    text: "Are you sure you want to proceed? The cart will be cleared.",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed!',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    removeAllItems(); // Clear the cart
    Swal.fire('Cleared!', 'Your cart has been cleared and you are now proceeding to purchase.', 'success').then(() => {
      // Optionally redirect to checkout page or refresh
      window.location.href = '/cart'; // Replace with actual checkout URL
    });
  }
};

// Load cart items on component mount
onMounted(() => {
  loadCartFromCookies();
});
</script>

<style scoped>
.cart-container {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
}

.cart-item {
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}

.cart-item:last-child {
  border-bottom: none;
}

.img-fluid {
  max-width: 100px;
  height: auto;
}
</style>
