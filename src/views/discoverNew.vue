<template>
    <section class="full-height">

        

        <div class="d-flex justify-content-between">
            <h1>Discover</h1>
            <div>
                <userImage/>
            </div>
        </div>
        <discoverHome/>

        <!-- For Users -->
        <!-- <div class="row" v-if="users">
            <div class="col-lg-6" v-for="user in users" :key="user.full_name">
                <div class="card-head">
                    <h1 class="display-4 fw-bold">Fullname: {{ user.full_name }}</h1>
                    <p class="lead mt-2 mb-4">Gender: {{ user.gender }}</p>
                </div>
            </div>
            </div> -->

            <!-- For All Games -->
        <!-- <div class="row" v-if="games">
            <div class="col-lg-6" v-for="game in games" :key="game.id">
                <div class="card-head">
                    <h1 class="display-4 fw-bold">Title: {{ game.title }}</h1>
                    <p class="lead mt-2 mb-4">Gender: {{ game.genre }}</p>
                    <p class="lead mt-2 mb-4">Price: {{ game.price }}</p>
                </div>
            </div>
          </div> -->

          <!-- For all Nintendo Published Games -->
        <!-- <div class="row" v-if="published">
            <div class="col-lg-6" v-for="pub in published" :key="pub.id">
                <div class="card-head">
                    <h1 class="display-4 fw-bold">Title: {{ pub.title }}</h1>
                    <p class="lead mt-2 mb-4">Gender: {{ pub.genre }}</p>
                    <p class="lead mt-2 mb-4">Price: {{ pub.price }}</p>
                </div>
            </div>
          </div> -->
    </section>
</template>

<script setup>
import discoverHome from '@/components/discoverHome.vue';
import userImage from '@/components/userImage.vue';
// import{computed, onMounted} from 'vue'
// import {useStore} from 'vuex'
// const store = useStore()
// const users = computed( ()=> store.state.users)
// const games = computed(()=> store.state.games)
// const published = computed(()=> store.state.published)
// onMounted(()=>{
    // store.dispatch('fetchUsers')
    // store.dispatch('fetchGames')
    // store.dispatch('fetchPublished')
// });
</script>