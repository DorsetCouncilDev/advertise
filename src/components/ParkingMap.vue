<!-- Map component to show search results  -->

<template>
<div id="map">

    </div>


</template>



<script>
    import axios from 'axios';
    export default {
        name: 'ParkingMap',
        data() {
            return {
                locations: [],
                map: {},
                markers: [],
                // marker positions used to centre map
                bounds: new google.maps.LatLngBounds()
            }
        },
        methods: {

            // loop through locations adding marker for each
            setMarkers: function() {
                this.locations.forEach((asset) => {
                   

                        var infoContent = '<p class="lead">' + asset.name + '</p>';
                        this.addMarker(asset.location, infoContent)
                
                })
                this.fitMapToBounds();
                this.map.setZoom(10);
                var markerCluster = new MarkerClusterer(this.map, this.markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

            },
            // Sets the map on all markers in the array.
            setMapOnAll: function(map) {
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(map);

                }
            },
            addMarker: function(location, infoContent) {
                var position = new google.maps.LatLng(location.latitude, location.longitude);
                var marker = new google.maps.Marker({
                    position: position,
                    map: this.map,
                    icon: require('../assets/images/icons/park-pin-xsmall.png')
                });


                var infowindow = new google.maps.InfoWindow({
                    content: infoContent
                });
                marker.addListener('click', function() {
                    infowindow.open(this.map, marker);
                });
                this.markers.push(marker);


            },
            fitMapToBounds() {
                this.markers.forEach((marker) => {
                    this.bounds.extend(marker.position)
                })
                this.map.fitBounds(this.bounds);

            },
            clearMarkers: function() {
                setMapOnAll(null);
            },
            setMapOnAll: function(gmap) {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(gmap);
                }
            },
            deleteMarkers: function() {


            }
        },

        mounted() {

            // Create initial map with no markers
            const element = document.getElementById('map');
            const options = {
                zoom: 10,
                center: new google.maps.LatLng(50.563110932545825, -2.4489365380248693),
                gestureHandling: 'greedy'
            };
            this.map = new google.maps.Map(element, options);

            this.locations = [ 
                          {"name" : "Acland Road", "location": { "latitude" : 50.713449, "longitude": -2.435556}},
                          {"name" : "County Hall", "location": { "latitude" : 50.716136, "longitude": -2.440467}},                   
                          {"name" : "Glyde Path Road", "location": { "latitude" : 50.716464, "longitude": -2.439470}},
                          {"name" : "Great Western Road", "location": { "latitude" : 50.711551, "longitude": -2.437976}},
                          {"name" : "High East Street", "location": { "latitude" : 50.715582, "longitude": -2.434931}},
                          {"name" : "High West Street", "location": { "latitude" : 50.715230, "longitude": -2.439024}},                   
                          {"name" : "History Centre", "location": { "latitude" : 50.714472, "longitude": -2.445348}},
                          {"name" : "Linden Avenue", "location": { "latitude" : 50.713048, "longitude": -2.433482}},
                          {"name" : "Little Keep", "location": { "latitude" : 50.715455, "longitude": -2.445558}},
                          {"name" : "North Square", "location": { "latitude" : 50.716037, "longitude": -2.436670}},                   
                          {"name" : "Prince’s Street", "location": { "latitude" : 50.714565, "longitude": -2.439633}},
                          {"name" : "School Lane", "location": { "latitude" : 50.716820, "longitude": -2.441944}},
                          {"name" : "South Walks", "location": { "latitude" : 50.712074, "longitude": -2.437362}},
                          {"name" : "The Grove", "location": { "latitude" : 50.716931, "longitude": -2.441977}},                   
                          {"name" : "Trinity Street", "location": { "latitude" : 50.713815, "longitude": -2.437873}},
                          {"name" : "West Walks", "location": { "latitude" : 50.712999, "longitude": -2.440703}},             
                          {"name" : "Weymouth Avenue", "location": { "latitude" : 50.707387, "longitude": -2.441796}},
                          {"name" : "Woolaston Road", "location": { "latitude" : 50.713363, "longitude": -2.433697}}
        ]
            this.setMarkers();
        }
    }

</script>


<style scoped lang="scss">
    #map {
        width: 100%;
        height: 60vh;
        box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      
    }
      .gmnoprint{
            width:12px;
            height:12px;
        }

</style>
