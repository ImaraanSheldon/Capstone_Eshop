<template>
    <section class="full-height">
        <div class="d-flex justify-content-between">
            <h1>Recent Releases</h1>
            <div>
                <router-link to="/login">
                    <userImage/>
                </router-link>
            </div>
        </div>

        <recentHome/>

    </section>
</template>

<script setup>
import userImage from '@/components/userImage.vue';
import recentHome from '@/components/recentHome.vue';
</script>