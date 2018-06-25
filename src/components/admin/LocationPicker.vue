<template>

</template>

<script>
    export default {
        name: 'AssetView',
        created() {
            //The center location of our map.
            var centerOfMap = new google.maps.LatLng(52.357971, -6.516758);

            //Map options.
            var options = {
                center: centerOfMap, //Set center.
                zoom: 7 //The zoom value.
            };

            //Create the map object.
            map = new google.maps.Map(document.getElementById('map'), options);

            //Listen for any clicks on the map.
            google.maps.event.addListener(map, 'click', function(event) {
                //Get the location that the user clicked.
                var clickedLocation = event.latLng;
                //If the marker hasn't been added.
                if (marker === false) {
                    //Create the marker.
                    marker = new google.maps.Marker({
                        position: clickedLocation,
                        map: map,
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
                markerLocation();
            });
        }
    }

</script>

<style scoped lang="scss">


</style>
