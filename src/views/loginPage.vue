<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div class="login-container p-4 p-md-5 bg-white shadow rounded">
        <h1 class="text-center mb-4">Login</h1>
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <label for="email" class="form-label">Email Address</label>
            <input type="email" id="email" v-model="payload.email" class="form-control" placeholder="Enter your email" required />
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="userPass" v-model="payload.userPass" class="form-control" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <!-- Uncomment the following line if you have an error message -->
          <!-- <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p> -->
        </form>
        <h6 class="text-center mt-3">
          No Account? <router-link to="/register" class="link-primary">Register Here</router-link>
        </h6>
        <router-link to="/logout"><button>button</button></router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useStore } from 'vuex'
  
  const store = useStore()
  const payload = reactive({
    email: "",
    userPass: ""
  })
  
  function loginUser() {
    store.dispatch('login', payload)
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    width: 100%;
  }
  </style>
  