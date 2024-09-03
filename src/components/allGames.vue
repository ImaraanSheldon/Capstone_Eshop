<template>

    <div class="container row border" v-if="games">

                <!-- Loop through each published item -->
                <div class="col-lg-6" v-for=" game in games" :key="game.id">
                    <div class="card border">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Title: {{ game.title }}</h5>
                            <p class="card-text">Genre: {{ game.genre }}</p>
                            <p class="card-text">Price: {{ game.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const games = computed(() => store.state.games)
onMounted(() => {
    store.dispatch('fetchGames')
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