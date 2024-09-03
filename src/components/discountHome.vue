<template>

    <div class="container row border" v-if="discounts">

                <!-- Loop through each published item -->
                <div class="col-lg-6" v-for=" dis in discounts" :key="dis.id">
                    <div class="card border">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Title: {{ dis.title }}</h5>
                            <p class="card-text">Genre: {{ dis.genre }}</p>
                            <p class="card-text">Price: {{ dis.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const discounts = computed(() => store.state.discounts)
onMounted(() => {
    store.dispatch('fetchDiscount')
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