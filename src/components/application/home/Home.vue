<template>
<div class="mb-3">
      <div class="info">
        <div class="contact"> email <a href="mailto:marketing@dorsetcc.gov.uk">
          marketing@dorsetcc.gov.uk</a> - tel.
          <a href="tel:+18506484200">01305224125</a></div>
         <ol class="ad-breadcrumb">
        <li aria-current="page">Home</li>   
    </ol>  
    </div>
     <h1 class="display-4">Advertise in Dorset to promote your brand.</h1>
     

    <HomeSearch :indexRef="indexRef"></HomeSearch>
 <div data-aos="fade-up">
    <h3 class="mt-3 mb-1">Exposure for your brand</h3>
     <div class="ad-data-collection  mb-5">
       
            <div class="ad-data">1 <span class="ad-data-label display-3"> Million plus daily motorists</span></div>


            <div class="ad-data">18 <span class="ad-data-label display-3">Million yearly visitors</span>
            </div>
         

         <div class="ad-data">422,730 <span class="ad-data-label display-3">residents</span>
            </div>

          <div class="ad-data">22,000 <span class="ad-data-label display-3">businesses</span>
            </div>
         
          
        </div>
    </div>
    <div data-aos="fade-up">
    <h3>What others say</h3>
        <q>We'd recommend roundabout sponsorship in Dorset as a great way of raising brand awareness, and at Dorset Windows we find it provides good value for money. With the right roundabout, we're able to promote our brand as people travel around and be in the forefront of people's minds.</q>

        <p class="mb-5">Kath Pumfrey, Dorset Windows</p>
    </div>

</div>
</template>



<script>
    import HomeSearch from './HomeSearch'
    import AOS from 'aos'
    // import ParkingMap from './../../ParkingMap';
    export default {
        name: 'Home',
        props: ['indexRef'],
        data() {
            return {
                
            }
        },
        components: {
            HomeSearch
        },
        mounted()
        {
          /*  var locations = {
                "latitude": 50.711145,
                "longitude":-2.441108
            }
             this.$http.put('http://vmcrwebapptest2:18080/catalogue/v1/indexes/advertising/documents/dorchester-car-park-tickets/publish').then(response => {
                    console.log(response);
                })
                */
            AOS.init({once:true,
                      offset: 50,
                      duration: 300,
                      easing: 'ease-in-sine',
                      delay: 100});
        }

    }

</script>


<style scoped lang="scss">
        h1{font-size:1.8rem;margin-top:10px;}
    h3{
        font-size: 26px;
    }
   .ad-data-collection {
display: flex;
    flex-wrap: wrap;
       flex-direction: column;
    .ad-data {
        line-height:1;
        background-color: white;
        color: darkslategrey;
        position: relative;
    padding: 5px 5px;
        margin-bottom: 15px;
     
        font-size: 26px;
        margin-right:20px;
        .ad-data-label {
            font-size: 19px;
        }
    }
}
@media only screen and (min-width: 540px) {
     h1{font-size:2.2rem;margin-top:10px;}
.ad-data-collection {
flex-direction: row;
   
    .ad-data {
     padding: 5px 20px;
        font-size: 64px;
    
        .ad-data-label {
            font-size: 26px;
        }
    }
}
}



</style>
