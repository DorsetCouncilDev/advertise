<!-- Google street view component for an individual asset -->

<template>

        <div id="streetView">
        </div>
 
</template>

<script>
    export default {
        name: 'AssetStreetView',
        props: {
                location: {
                    type: Object
                }
        },
        mounted: function() {   
            var panorama = new google.maps.StreetViewPanorama(document.getElementById('streetView'), {
                position: {
                    lat: this.location.latitude,
                    lng: this.location.longitude
                },
                pov: {
                    // direction facing, in degrees from north
                    heading: 0,
                    // vertical angle, 0 - straight forward
                    pitch: 0
                },
                zoom: 1
            });  
        }
    }

</script>


<style scoped lang="scss">
  

    #streetView {
        min-width: 300px;
        height: 50vh;
        margin-right:15px;

    }
     @media only screen and (min-width: 700px) {
         #streetView{  width:45%;  }
    }

</style>
