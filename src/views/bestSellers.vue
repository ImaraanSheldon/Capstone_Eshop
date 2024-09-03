<template>
    <section class="full-height">
        <div class="d-flex justify-content-between">
            <h1>Best Sellers</h1>
            <div>
                <userImage/>
            </div>
        </div>

        <chartsHome/>
    </section>
</template>

<script setup>
    import userImage from '@/components/userImage.vue';
    import chartsHome from '@/components/chartsHome.vue';
</script>