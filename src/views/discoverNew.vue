<template>
    <section class="full-height">
        <div class="d-flex justify-content-between align-items-center pb-5">
            <strong class="display-5">Discover</strong>
            <div>
                <router-link to="/login">
                    <userImage/>
                </router-link>
            </div>
        </div>

        <discoverHome/>

    </section>
</template>

<script setup>
import discoverHome from '@/components/discoverHome.vue';
import userImage from '@/components/userImage.vue';
</script>