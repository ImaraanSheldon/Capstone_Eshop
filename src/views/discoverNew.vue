<template>
    <section class="full-height">

        <div class="d-flex justify-content-between">
            <h1>Discover</h1>
            <div>
                <userImage/>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8" v-if="users">
                <div v-for="user in users" :key="user.full_name">
                    <h1 class="display-4 fw-bold">Fullname: {{ user.full_name }}</h1>
                    <p class="lead mt-2 mb-4">Gender: {{ user.gender }}</p>
                </div>
              <!-- <h1 class="display-4 fw-bold">{{ users.id }}</h1>
              <p class="lead mt-2 mb-4">{{ users.username }}</p>
              <div>
                <a href="#" class="btn btn-brand">Test Example</a>
              <a href="#" class="link-custom px-2">{{ Home.full_name }}</a>
              </div> -->
            </div>
          </div>
    </section>
</template>

<script setup>
import userImage from '@/components/userImage.vue';
import{computed, onMounted} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
const users = computed( ()=> store.state.users)
onMounted(()=>{
    store.dispatch('fetchUsers')
});
</script>