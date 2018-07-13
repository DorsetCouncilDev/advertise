<template>
<div id="map"></div>
</template>

<script>
    import _ from 'lodash'
    import Vue from 'vue'
    var EventBus = new Vue();

    export default {
        name: 'Location',
        props: {
            currentLocation: {
                type: Object,
                required: false
            }
        },
        data() {
            return {
                map: null,
                select: false,
                defaultLocation: {
                    latitude: 50.837374,
                    longitude: -2.341566
                },
                clickCount: 0,
                location: {},
                marker: false
            }
        },
        watch: {
            currentLocation: {
                handler: function()
                {
                    if(this.currentLocation.latitude != null)
                         this.location = _.cloneDeep(this.currentLocation)
                    },
                    deep: true
            }
        },
        methods: {
            sendBack() {
                this.$emit('markerSelected');
            },
            initMap() {

                this.marker = null;

                if (this.currentLocation.latitude != null){
                    this.location = _.cloneDeep(this.currentLocation)
                    console.log("cloning cLocation")
                }
                else
                    this.location = _.cloneDeep(this.defaultLocation)
                //The center location of our map.
            

                var centerOfMap = new google.maps.LatLng(this.location.latitude, this.location.longitude);

                //Map options.
                var options = {
                    center: centerOfMap, //Set center.
                    zoom: 9, //The zoom value.
                    gestureHandling: 'greedy'
                };

                //Create the map object.
                this.map = new google.maps.Map(document.getElementById('map'), options);

                

                if (this.currentLocation.latitude != null) {
                    console.log("GOT CURRENT LOCATION")
                    var position = new google.maps.LatLng(this.location.latitude, this.location.longitude);
                    this.marker = new google.maps.Marker({
                        position: position,
                        map: this.map,
                        draggable: true //make it draggable
                    });
                }

                //Listen for any clicks on the map.
                google.maps.event.addListener(this.map, 'click', function(event) {

                    // var loc = event.latLng;
                    EventBus.$emit('i-got-clicked', event.latLng);

                    //Get the location that the user clicked.
                    var clickedLocation = event.latLng;

                    //If the marker hasn't been added.
                    if (this.marker === false) {
                        //Create the marker.
                        this.marker = new google.maps.Marker({
                            position: clickedLocation,
                            map: this.map,
                            draggable: true //make it draggable
                        });
                        //Listen for drag events!
                        google.maps.event.addListener(this.marker, 'dragend', function(event) {
                            markerLocation();
                        });
                    } else {
                        //Marker has already been added, so just change its location.
                 
                        this.marker.setPosition(clickedLocation);
                    }
                    //Get the marker's location.
                    // markerLocation();
                });

            }
        },
        mounted() {

            this.initMap();

        },
        created() {
            EventBus.$on('i-got-clicked', location => {
                this.$emit("selected", location)
            });
        }
    }

</script>

<style scoped lang="scss">
    #map {
        width: 100%;
        height: 60vh;
    }

</style>
