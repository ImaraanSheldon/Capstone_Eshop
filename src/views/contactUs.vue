<template>
    <div>
     <div class="full-height">
      
      <div class="row justify-content-center text-lg-center text-center text-md-start" data-aos="fade-up" data-aos-duration="1000">
        <div class="col-lg-8 pb-4">
          <h6 class="headerTxt text-brand">CONTACT</h6>
          <h1 class="headerTxt">Let's Connect About our love for videogames and our passion for improving the gameplay experience</h1>
        </div>
 
        <div class="col-lg-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          <form class="row g-lg-3 gy-3" action="https://formspree.io/f/mnqerayp" method="POST">
          <div class="form-group col-md-6">
            <input type="text" name="Name" class="form-control" placeholder="Enter Your Name" required>
          </div>
 
          <div class="form-group col-md-6">
            <input type="email" name="Email" class="form-control" placeholder="Enter Your Email" required>
          </div>
 
          <div class="form-group col-md-12">
            <input type="text" name="Subject" class="form-control" placeholder="Enter Subject" required>
          </div>
 
          <div class="form-group col-md-12">
            <textarea name="message" rows="4" class="form-control" placeholder="Enter Your Message" required></textarea>
          </div>
 
          <div class="form-group col-6">
            <button type="submit" data-bs-target="blank" class="btn btn-brand">Contact Me</button>
          </div>
          <div class="form-group col-6">
            <button type="reset" class="btn btn-brand">Clear</button>
          </div>
 
        </form>
 
        </div>
      </div>
    </div>
    </div>
   </template>
   
   <script>
   export default {
   
   };
   </script>
   
   <style scoped>
   .card{
       width: 18rem;
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
 
     .las{
         font-size:2.5rem;
         color: white;
     }
   </style>