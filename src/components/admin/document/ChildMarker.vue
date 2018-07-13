<!-- ChildMarker.vue -->
<template></template>
<script>
    import image from '../../../assets/images/selected-pin.png'
    export default {
        props: {
            google: Object,
            map: Object,
            position: Object
        },
        data() {
            return {
                marker: null,
                selectedIcon: {
                url: image, // url
                scaledSize: new google.maps.Size(50, 50) // scaled size
    
            }
            }
        },
        watch: {
            position: {
                handler: function() {
                    console.log("watcher for marker")
                    if (this.position.deleted) {
                        console.log("deleting marker")
                        this.marker = null;
                    }else if(this.position.selected){
                        this.marker.setIcon(this.icon)
                    }
                },
                deep: true
            },
            currentLocation:{
                handler: function(){
                    if(this.currentLocation.reference == this.position.reference){
                        this.marker.setIcon(this.selectedIcon)
                        this.marker.setAnimation(this.google.maps.Animation.BOUNCE)
                        var m = this.marker
                        setTimeout(function(){
                            m.setAnimation(null)
                        },100)
                    }
                    else(this.marker.setIcon(''))
                }
            }
        },
        computed: {
           currentLocation: {
                get(){
                    return this.$store.state.admin.currentLocation     
                },
                set(value){
                    this.$store.commit("setAdminCurrentLocations",value)
                }
            } 
        },
        mounted() {

            const {
                Marker
            } = this.google.maps

            // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

            if(this.position.selected){
            this.marker = new Marker({
                position: {
                    "lat": this.position.latitude,
                    "lng": this.position.longitude
                },
                map: this.map,
                title: this.position.name,
                draggable: true,
                icon: this.icon
            })
            }else{
                  this.marker = new Marker({
                position: {
                    "lat": this.position.latitude,
                    "lng": this.position.longitude
                },
                map: this.map,
                title: this.position.name,
                draggable: true,
                      label: '1'
            })
            }

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
                ChildMarker.$emit("markerClicked", pos)
            })
        }
    }

</script>
