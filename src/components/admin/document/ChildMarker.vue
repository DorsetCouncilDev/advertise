<!-- ChildMarker.vue -->
<template></template>
<script>
    export default {
        props: {
            google: Object,
            map: Object,
            position: Object
        },
        data() {
            return {
                marker: null
            }
        },
        watch: {
            position: {
                handler: function() {
                    console.log("watcher for marker")
                    if (this.position.deleted) {
                        console.log("deleting marker")
                        this.marker = null;
                    }
                },
                deep: true
            }
        },
        mounted() {

            const { Marker } = this.google.maps

            this.marker = new Marker({
                position: {
                    "lat": this.position.latitude,
                    "lng": this.position.longitude
                },
                map: this.map,
                title: this.position.name,
                draggable: true
            })

            this.marker.locationRef = this.position.reference;

            var pos = this.position;
            var ChildMarker = this;

            var currentLoation = this.position;

            this.marker.addListener('dragend', function(event) {
                var markerChange = {
                    "location": event.latLng,
                    "oldLocation": currentLoation
                };
                ChildMarker.$emit("locationChangeFromMarker", markerChange);
            })

            var lMap = this.map
            var lMarker = this.marker

            this.marker.addListener('click', function(event) {
            /*    var pan = lMap.getStreetView();
                pan.setPosition(lMarker.getPosition())
                pan.setPov({
                    heading: pos.streetviewHeading,
                    zoom: 1,
                    pitch: pos.streetviewPitch
                })
                pan.setVisible(true) */
                ChildMarker.$emit("markerClicked",pos)
            })
        }
    }

</script>
