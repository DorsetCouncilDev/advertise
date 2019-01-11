<template>
<div class="mb-3">
   <div class="info">
        <div class="contact"> 
            <span id="emailContact">email <a href="mailto:marketing@dorsetcc.gov.uk">marketing@dorsetcc.gov.uk</a></span> 
            <span id="telContact">tel. <a href="tel:+441305224125">01305 224125</a></span>
            <div id="menuLinksTwo">
                <router-link to="/advertise/info/contact">Contact us</router-link> 
                <router-link to="/advertise/info/mediapack">Media pack</router-link> 
            </div>
        </div>
        <div id="navRow">
            <div id="navLinks">
                <ol class="ad-breadcrumb">
                    <li aria-current="page">home</li> 
                </ol>
            </div>
            <div id="menuLinksOne">
                <router-link to="/advertise/info/contact">Contact us</router-link> 
                <router-link to="/advertise/info/mediapack">Media pack</router-link> 
            </div>
        </div>
    </div>
<h1 class="display-4 home-header">Advertise in Dorset to promote your brand.</h1>     
<HomeSearch :indexRef="indexRef"></HomeSearch>
<section data-aos="fade-up">
    <h1 class="mt-3 mb-1 home-second-header">Exposure for your brand</h1>
     <div class="ad-data-collection  mb-5">
        <div class="ad-data">1 <span class="ad-data-label display-3"> Million plus daily motorists</span></div>
        <div class="ad-data">18 <span class="ad-data-label display-3">Million yearly visitors</span></div>
        <div class="ad-data">424,670 <span class="ad-data-label display-3">residents</span></div>
        <div class="ad-data">22,000 <span class="ad-data-label display-3">businesses</span></div>
    </div>
</section>
<section data-aos="fade-up">
<h1 class="third-header">What others say</h1>
<q>We'd recommend roundabout sponsorship in Dorset as a great way of raising brand awareness, and at Dorset Windows we find it provides good value for money. With the right roundabout, we're able to promote our brand as people travel around and be in the forefront of people's minds.</q>

<p class="mb-5">Kath Pumfrey, of Dorset Windows</p>
</section>
</div>
</template>

<script>
    import HomeSearch from './HomeSearch'
    import AOS from 'aos'
    // import ParkingMap from './../../ParkingMap';
    export default {
        name: 'Home',
        data() {
            return {
                indexRef: "advertise"
            }
        },
        components: {
            HomeSearch
        },
        mounted() {
            /*  var locations = {
                  "latitude": 50.711145,
                  "longitude":-2.441108
              }
               this.$http.put('http://vmcrwebapptest2:18080/catalogue/v1/indexes/advertising/documents/dorchester-car-park-tickets/publish').then(response => {
                      console.log(response);
                  })
                  */
            AOS.init({
                once: true,
                offset: 50,
                duration: 300,
                easing: 'ease-in-sine',
                delay: 100
            });
        }
    }

</script>


<style scoped lang="scss">
    .home-second-header{
        font-size: 2rem;
        text-align:left;
    }
    
    .home-header {
        font-size: 1.8rem;
        margin-top: 10px;
    }
 
    .third-header {
        font-size: 26px;
    }

    .ad-data-collection {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        .ad-data {
            line-height: 1;
            background-color: white;
            color: darkslategrey;
            position: relative;
            padding: 5px 5px;
            margin-bottom: 15px;

            font-size: 26px;
            margin-right: 20px;
            .ad-data-label {
                font-size: 19px;
            }
        }
    }

    @media only screen and (min-width: 540px) {
        .home-header {
            font-size: 2.2rem;
            margin-top: 10px;
        }
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
