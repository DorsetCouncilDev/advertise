<!-- Google street view component for an individual asset -->

<template>
<div class="streetview-container">

        <div id="streetView">
        </div>
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

.streetview-container{
  display:flex;
  justify-content: center;
}
       #streetView {
        width: 90%;
        height: 50vh;
    }



     @media only screen and (min-width: 700px) {
         #streetView{  width:100%; height:100%;}
         .streetview-container{
  display:block;
  width:275px; height:275px;

}
    }

        @media only screen and (min-width: 900px) {
   .streetview-container{
  display:block;
  width:420px; height:420px;

}
    }

</style>
