<template>
<div class="map-container" :class="{'wide-map': wide}">
        <div :class="{'wide-map': wide}" id="map">

        </div>
</div>
</template>

<script>
    import AssetMap from './AssetMap'
    import AssetStreetView from './AssetStreetView'

    export default {
        name: 'AssetMap',
        data(){
            return {
                map:{}
            }
        },
        props: {
                locations:{
                    type: Array

                },
            name: {
                type:String
            },
            wide:{
              type:Boolean
            }

        },
        mounted: function() {

            const element = document.getElementById('map');
            const options = {
                zoom: 15,
                center: new google.maps.LatLng(this.locations[0].latitude, this.locations[0].longitude),
                // gestureHandling: 'greedy',
                streetViewControl: true
            };



          this.map = new google.maps.Map(element, options);


          this.locations.forEach((location) => {
                var position = new google.maps.LatLng(location.latitude, location.longitude);
                var infoContent = '' + this.name;
                var infowindow = new google.maps.InfoWindow({
                    content: infoContent
                });
                var marker = new google.maps.Marker({
                    position: position,
                    map: this.map
                });
                marker.addListener('click', function() {
                    infowindow.open(this.map, marker);
                });
            })
        }
    }

</script>


<style scoped lang="scss">

.map-container{
  display:flex;
  justify-content: center;
  width: 100%;
  height: 40vh;
  margin-bottom:30px;
}
  #map {
    width:90%;
    height: 100%;
  }

    @media only screen and (min-width: 700px) {

      .map-container{
        display:block;
        width:60%;
        height:40vh;
        &.wide-map{
          width:600px;
          height:600px
        }
}
#map{
  width:100%;
}
    }
  @media only screen and (min-width: 700px) {
    .map-container{
      margin-right:30px;
    }
  }

  @media only screen and (min-width: 900px) {
    .map-container{
      display:block;
      width:65%; height:50vh;
      &.wide-map{
              width:100%;
            }
}
    }

</style>
