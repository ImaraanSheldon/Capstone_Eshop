<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <!-- Display user profile if loggedUser is available -->
          <div v-if="!isEditing && loggedUser" class="card">
            <div class="card-body text-center">
              <h1 class="card-title mb-4">Welcome, {{ loggedUser.username }}</h1>
              <p class="card-text">Email: {{ loggedUser.email }}</p>
              <p class="card-text">Full Name: {{ loggedUser.full_name }}</p>
              <button class="btn btn-primary" @click="editProfile">Edit Profile</button>
            </div>
          </div>
  
          <!-- Edit form -->
          <div v-if="isEditing" class="card">
            <div class="card-body">
              <h5 class="card-title">Edit Profile</h5>
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    v-model="form.username"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="full_name" class="form-label">Full Name</label>
                  <input
                    type="text"
                    id="full_name"
                    v-model="form.full_name"
                    class="form-control"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary ms-2" @click="cancelEdit">Cancel</button>
              </form>
            </div>
          </div>
  
          <!-- Show a loading message or message when no user data is available -->
          <div v-else class="text-center">
            <p>Loading user profile...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCookies } from 'vue3-cookies';
  import { onMounted, ref } from 'vue';
  
  const { cookies } = useCookies();
  const token = cookies.get('LegitUser');
  const loggedUser = ref(null);
  const isEditing = ref(false);
  
  const form = ref({
    username: '',
    email: '',
    full_name: ''
  });
  
  // Initialize form with loggedUser data
  onMounted(() => {
    if (token && token.result) {
      loggedUser.value = token.result;
      form.value = { ...loggedUser.value }; // Initialize form with user data
      console.log(loggedUser.value);
    }
  });
  
  // Switch to edit mode
  const editProfile = () => {
    isEditing.value = true;
  };
  
  // Handle form submission
  const submitForm = () => {
    // Here, you would typically make an API request to save the changes
    console.log('Submitting form with:', form.value);
    
    // Simulate a successful save operation
    loggedUser.value = { ...form.value };
    isEditing.value = false;
  };
  
  // Cancel editing and reset form
  const cancelEdit = () => {
    isEditing.value = false;
    form.value = { ...loggedUser.value };
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  
  