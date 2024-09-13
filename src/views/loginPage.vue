<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="login-container p-4 p-md-5 bg-white shadow rounded">
      <h1 class="text-center mb-4">Login</h1>
      <!-- <div v-if="token">
        {{ token }}
      </div> -->
      <form @submit.prevent="loginUser">
        <div class="mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input type="email" id="email" v-model="payload.email" class="form-control" placeholder="Enter your email" required />
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="payload.userPass" class="form-control" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
          <span v-if="isLoading">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <p v-if="errorMessage" class="text-danger mt-3" aria-live="assertive">{{ errorMessage }}</p>
      </form>
      <h6 class="text-center mt-3">
        No Account? <router-link to="/register" class="link-primary">Register Here</router-link>
      </h6>
      <button @click="logout" class="btn btn-secondary w-100 mt-3">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies';

const {cookies} = useCookies()
const store = useStore()
const router = useRouter()
const payload = reactive({
  email: "",
  userPass: ""
})
const isLoading = ref(false)
const token = cookies.get('LegitUser')
// const isAdmin = ref(false)
const loggedUser = ref(null)

const errorMessage = computed(() => store.state.errorMessage)

function loginUser() {
  isLoading.value = true
  store.dispatch('login', payload)
  if(payload === 'Illyna@example.com'){
    router.push('/admin')
  }else{
    router.push('/')
    // console.log(token.value);
    
  }
}
if (token && token.result){
  loggedUser.value = token.result;
  console.log(loggedUser.value.userType) 
}

function logout() {
  if (confirm("Are you sure you want to log out?")) {
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT");
    });
    
    // Optionally, you may want to dispatch a logout action to Vuex if needed
    onMounted(()=>{
      loginUser()
      store.dispatch('logout')

    })
    

    // Redirect to the Discover page
    // router.push('/')
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  width: 100%;
}
.btn-secondary {
  margin-top: 1rem;
}
</style>
