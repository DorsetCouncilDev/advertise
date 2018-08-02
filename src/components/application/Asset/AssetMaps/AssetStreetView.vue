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
        data(){
            return {
            panorama: null
        }
        },
        mounted: function() {   
            this.panorama = new google.maps.StreetViewPanorama(document.getElementById('streetView'), {
                position: {
                    lat: this.location.latitude,
                    lng: this.location.longitude
                },
                pov: {
                    // direction facing, in degrees from north
                    heading: this.location.streetviewHeading,
                    // vertical angle, 0 - straight forward
                    pitch: this.location.streetviewPitch
                },
                zoom: 1
            });  
        }
    }

</script>


<style scoped lang="scss">
  

    #streetView {
        min-width: 400px;
        height: 50vh;
        margin-right:15px;

    }
     @media only screen and (min-width: 700px) {
         #streetView{  width:45%;  }
    }

</style>
