<!-- ChildMarker.vue -->
<template></template>
<script>
    import image from '../../../assets/images/selected-pin.png'
    export default {
        props: {
            google: Object,
            map: Object,
            position: Object,
            deletion: Boolean,
            newLocation: Boolean
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
            deletion(){     
              if(this.currentLocation != null && this.currentLocation.reference != null && this.currentLocation.reference == this.position.reference && this.deletion)
                  this.marker.setMap(null) 
            },
            currentLocation: {
                handler: function() {          
                    if (this.currentLocation != null) {
                       if (this.currentLocation.reference == this.position.reference) {
                            this.marker.setIcon(this.selectedIcon)
                            this.marker.setAnimation(this.google.maps.Animation.BOUNCE)
                            var m = this.marker
                            this.marker.setZIndex(4)
                            setTimeout(function() {  m.setAnimation(null) }, 100)
                        } else {
                            this.marker.setIcon('');
                            this.marker.setZIndex(0)
                        }
                    }
                },
                deep: true
            }
        },
        computed: {
            currentLocation: {
                get() {
                    return this.$store.state.admin.currentLocation
                },
                set(value) {
                    this.$store.commit("setAdminCurrentLocations", value)
                }
            },
            locations: {
                get() {
                    return this.$store.state.admin.locations;
                },
                set(value) {
                    this.$store.commit("setAdminLocations", value)
                }
            },
        },
        methods: {
            markerAdded(){
                    this.$emit("markerAdded")
            },
            locationClicked() {
                this.$emit("markerClicked", this.position)
            },
            locationChanged(latLng){
                var markerChange = {
                    "location": latLng,
                    "oldLocation": this.position
                };
                this.$emit("locationChangeFromMarker", markerChange);
            }
        },
        mounted() {

            const {Marker} = this.google.maps
            if (this.position.reference == this.currentLocation.reference || this.newLocation) {
                this.marker = new Marker({
                    position: {
                        "lat": this.position.latitude,
                        "lng": this.position.longitude
                    },
                    map: this.map,
                    title: this.position.name,
                    draggable: true,
                    icon: this.selectedIcon,
                    zIndex: 4     
                })
                 this.marker.setAnimation(this.google.maps.Animation.BOUNCE)
                var m = this.marker;
                setTimeout(function() { m.setAnimation(null) }, 100)
            } else {
                this.marker = new Marker({
                    position: {
                        "lat": this.position.latitude,
                        "lng": this.position.longitude
                    },
                    map: this.map,
                    title: this.position.name,
                    draggable: true,
                    zIndex: 0,
                })
            }

            this.marker.locationRef = this.position.reference;
            var ChildMarker = this;

            this.marker.addListener('dragend', function(event) {
                ChildMarker.locationChanged(event.latLng)
            })

            var lMap = this.map
            var lMarker = this.marker

            this.marker.addListener('click', function(event) {
                ChildMarker.locationClicked()
            })

            this.markerAdded()
        }
    }

</script>
