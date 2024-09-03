<template>

    <div class="container row border" v-if="charts">

                <!-- Loop through each published item -->
                <div class="col-lg-6" v-for=" chart in charts" :key="chart.id">
                    <div class="card border">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Title: {{ chart.title }}</h5>
                            <p class="card-text">Genre: {{ chart.genre }}</p>
                            <p class="card-text">Price: {{ chart.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const charts = computed(() => store.state.charts)
onMounted(() => {
    store.dispatch('fetchCharts')
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