<template>
  <footer class="container">
    <div class="row p-4">
        <div class="col-sm-6 text-center">

          <h6 class="text-brand">IMARAAN SHELDON &copy; Rights Reserved <span>{{cYear}}</span></h6>
          <div class="text-brand p-2 socials">
           <a target="blank" href="https://www.linkedin.com/in/imaraan-sheldon-5b41492a5/"> <i class="lab la-linkedin"></i></a>
            <a target="blank" href="https://github.com/ImaraanSheldon"><i class="lab la-github"></i></a>
          </div>

        </div>
        <div class="col-sm-6 text-center ">

          <div class="d-flex align-items-baseline footer-icon">
            <i class="las la-envelope"></i>
            <a class="ms-1" href="#">imaraansheldonis2302003@gmail.com</a>
          </div>

          <div class="d-flex align-items-baseline footer-icon">
            <i class="las la-address-book"></i>
            <a class="ms-1" href="#Contact">Contact me: 081 3198 4877</a>
          </div>

          <div class="d-flex align-items-baseline footer-icon">
            <i class="las la-map-marker"></i>
            <a class="ms-1" href="#Contact">Ottery, Cape Town, Western Cape</a>
          </div>

        </div>

        <div class="col-12">

        </div>
      </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      cYear: new Date().getUTCFullYear(),
    };
  },
};
</script>

<style scoped>
 @media (min-width: 768px){
  .container{
  background-color:var(--Color-Accent-Pinot);
  margin-left:240px;
}

  }
.container{
  background-color:var(--Color-Accent-Pinot);
}
  /* Base styling on Header tags */
  h1,h2,h3,h4,h5,h6{
      color: var(--Color-Header-Blossom);
      font-weight: 700;
    }
   /* btn */
   .btn{
      padding: 12px 28px;
      font-weight: 700;
      color: var(--Color-Text-Fondant);
    }
  
    .btn-brand{
      background-color: var(--Color-Accent-Pinot);
      color: var(--Color-Header-Blossom);
      border-color: var(--Color-Header-Blossom);
      &:hover,
       :focus{
        background-color: var(--Color-Background-Charcoal);
        color: var(--Color-Header-Blossom);
        border-color: var(--Color-Header-Blossom);
       }
    }
    /* Base styling on achor tag */
    a{
      text-decoration: none;
      color: var(--Color-Text-Fondant);
      transition: all 0.4s ease;
      font-family: var(--Font-Main-Hammersmith);
    }
    a:hover{
      color: var(--Color-Header-Blossom);
    }
    .socials{
      font-size:2rem;
    }
</style>
