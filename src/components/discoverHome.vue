<template>
    <div class="container row border" v-if="published">
        <!-- Left Block -->
        <div class="col-lg-6 border">
            Add Here
        </div>

        <!-- Right Block -->
        <div class="col-lg-6 border">
            <div class="row g-3">
                <!-- Loop through each published item -->
                <div class="col-lg-6" v-for="pub in published" :key="pub.id">
                    <div class="card border">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Title: {{ pub.title }}</h5>
                            <p class="card-text">Genre: {{ pub.genre }}</p>
                            <p class="card-text">Price: {{ pub.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="text-center">Play Games Published By Nintendo</p> 
    </div>

    <div class="container row border" v-if="developed">

                <!-- Loop through each published item -->
                <div class="col-lg-6" v-for="dev in developed" :key="dev.id">
                    <div class="card border">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Title: {{ dev.title }}</h5>
                            <p class="card-text">Genre: {{ dev.genre }}</p>
                            <p class="card-text">Price: {{ dev.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const published = computed(() => store.state.published)
const developed = computed(() => store.state.developed)
onMounted(() => {
    store.dispatch('fetchPublished')
    store.dispatch('fetchDeveloped')
});
</script>

<style scoped>
.border {
    border: 1px solid #dee2e6;
}

.card-head {
    padding: 15px;
}
</style>