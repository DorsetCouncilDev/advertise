<!-- Map component to show search results  -->

<template>
<div id="map">

    </div>


</template>



<script>
    export default {
        name: 'Map',
        props: ['assets'],
        watch: {
            assets: function(newVal, oldVal) {
                this.setMarkers();
            }
        },
        data() {
            return {
                map: {},
                markers: [],   
                // marker positions used to centre map
                bounds:new google.maps.LatLngBounds()
            }
        },
        methods: {

            // loop through locations adding marker for each
            setMarkers: function() {
            
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);   
                }
                this.markers.length = 0;
                
                if(this.assets != null){
                this.assets.forEach((asset) => {
                    if (asset.document.locations != null && asset.document.locations.length > 0) {
                        var price = asset.document.properties.find(function(element){
                                        return element.propertyReference == 'price'
                                    })
                        
                        price.publishedValue = parseInt(price.publishedValue, 10);
                        
                        var infoContent = '<p style="font-size:16px; margin-bottom:5px">' + asset.document.name + '</p><p style="font-size:16px; margin-bottom:5px">£' + this.getPrice(price.publishedValue) + '</p>' +
                            '<p><a style="font-size:14px; text-decoration: underline; margin-bottom:5px" href="/advertise/' + asset.document.reference + '">View this opportunity</a></p>';
                        this.addMarker(asset.document,infoContent)
                    }
                })
                this.fitMapToBounds();
                this.map.setZoom(10);
                }
               
            },
            getPrice: function(value) {
                // || value.trim() == "" || value == "0" || value == 0 || isNaN(value))

                if (value == null) {
                    return 'P.O.A'
                }

                if (isNaN(value))
                    return 'P.O.A'
                else {
                    var decimals = 1;
                    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
                    return value;
                }
            },
            // Sets the map on all markers in the array.
            setMapOnAll: function(map) {
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(map);

                }
            },
            addMarker: function(document,infoContent) {
                var iconFileName = "pin-" + document.documentTypeReference + ".svg";
                var pinImage = {
                    url: require("../../../assets/images/icons/map-pins/" + iconFileName),
                    scaledSize: new google.maps.Size(45, 55)
                } 
                var location = document.locations[0];  
                var position = new google.maps.LatLng(location.latitude, location.longitude);
                var marker = new google.maps.Marker({
                    position: position,
                    map: this.map,
                    icon: pinImage
                });
                

                var infowindow = new google.maps.InfoWindow({
                    content: infoContent
                });
                marker.addListener('click', function() {
                    infowindow.open(this.map, marker);
                }); 
                
           
                this.markers.push(marker);
                

            },
            fitMapToBounds(){
               this.markers.forEach((marker) =>{
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
                center: new google.maps.LatLng(50.742607, -2.494768),
                gestureHandling: 'greedy'
            };
            this.map = new google.maps.Map(element, options);

            // set markers if any to set
            if(this.assets != null && this.assets.length > 0)
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
    .markerLink{
        font-size:16px;text-decoration: underline;
    }
</style>
