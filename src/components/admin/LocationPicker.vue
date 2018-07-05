<template>
<div id="map"></div>
</template>

<script>
    import Vue from 'vue'
    const EventBus = new Vue();
    
    export default {
        name: 'Location',
        props: {
            location: {
                type: Object,
                required: false
            }
        },
        data(){
            return {
                map: null,
                select: false,
                defaultLocation: {
                    lat: 50.837374, 
                    long: -2.341566
                }
            }
        },
        watch:{
          location(){
              this.initMap();
          }  
        },
        methods: {
            sendBack(){
                 this.$emit('markerSelected');
            },
            initMap() {
                //The center location of our map.
                var centerOfMap = null
                if(this.location.latitude != null)
                    centerOfMap = new google.maps.LatLng(this.location.latitude, this.location.longitude);
                else
                    centerOfMap = new google.maps.LatLng(this.defaultLocation.lat, this.defaultLocation.long);
                
                //Map options.
                var options = {
                    center: centerOfMap, //Set center.
                    zoom: 9, //The zoom value.
                    gestureHandling: 'greedy'
                };

                //Create the map object.
                this.map = new google.maps.Map(document.getElementById('map'), options);
                 
                var marker = null;
                
                if(this.location != null){
                    var position = new google.maps.LatLng(this.location.latitude, this.location.longitude);
                    marker = new google.maps.Marker({
                        position: position,
                        map: this.map,
                        draggable: true //make it draggable
                    }); 
                }
                
                //Listen for any clicks on the map.
                google.maps.event.addListener(this.map, 'click', function(event) {
                    
                    // var loc = event.latLng;
                    EventBus.$emit('selected');
                   
                    //Get the location that the user clicked.
                    var clickedLocation = event.latLng;
                    
                    //If the marker hasn't been added.
                    if (marker === false) {
                        //Create the marker.
                        marker = new google.maps.Marker({
                            position: clickedLocation,
                            map: this.map,
                            draggable: true //make it draggable
                        });
                        //Listen for drag events!
                        google.maps.event.addListener(marker, 'dragend', function(event) {
                            markerLocation();
                        });
                    } else {
                        //Marker has already been added, so just change its location.
                        marker.setPosition(clickedLocation);
                    }
                    //Get the marker's location.
                    // markerLocation();
                });
              
            }
        },
        mounted() {
           this.initMap();
               
        }
    }

</script>

<style scoped lang="scss">
    #map{
        width:100%;
        height:60vh;
    }

</style>
