<template>
    <section class="full-height">
        <div class="d-flex justify-content-between">
            <h1>Game Deals</h1>
            <div>
                <router-link to="/login">
                    <userImage/>
                </router-link>
            </div>
        </div>
        <discountHome/>
    </section>
</template>

<script setup>
import userImage from '@/components/userImage.vue';
import discountHome from '@/components/discountHome.vue';
</script>