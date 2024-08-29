<template>
  <div class="Content-Wrapper">
    <navComp/>
    <main id="Content-Wrapper">
      <router-view/>
    </main>
    <footerComp/>
  </div>
  </template>

  <script>
  import navComp from '@/components/navComp.vue'
  import footerComp from '@/components/footerComp.vue'
  export default{
    components:{
      footerComp,
      navComp
    }
  }
</script>

<style  src="../src/assets/css/style.css"></style>
