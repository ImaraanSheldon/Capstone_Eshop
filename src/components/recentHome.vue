<template>

    <div class="container row border" v-if="recent">

                <!-- Loop through each published item -->
                <div class="col-lg-6" v-for=" rec in recent" :key="rec.id">
                    <div class="card border">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Title: {{ rec.title }}</h5>
                            <p class="card-text">Genre: {{ rec.genre }}</p>
                            <p class="card-text">Price: {{ rec.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const recent = computed(() => store.state.recent)
onMounted(() => {
    store.dispatch('fetchRecent')
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