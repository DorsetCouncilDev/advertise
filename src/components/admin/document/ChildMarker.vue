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
                    if (this.position.deleted) {
                        this.marker = null;
                    }else if(this.position.selected){
                        this.marker.setIcon(this.icon)
                    }
                    this.marker.setTitle(this.position.name)
                    
                },
                deep: true
            },
            currentLocation:{
                handler: function(){
                    if(this.currentLocation != null){
                    if(this.currentLocation.reference == this.position.reference){
                        this.marker.setIcon(this.selectedIcon)
                        this.marker.setAnimation(this.google.maps.Animation.BOUNCE)
                        var m = this.marker
                        this.marker.setZIndex(4)
                        setTimeout(function(){
                            m.setAnimation(null)
                        },100)
                    }
                    else{
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
                get(){
                    return this.$store.state.admin.currentLocation     
                },
                set(value){
                    this.$store.commit("setAdminCurrentLocations",value)
                }
            } 
        },
        methods:{
            locationClicked(){
                console.log("clicked::: " + this.position.name)
                this.$emit("markerClicked",this.position)
            }
        },
        mounted() {

            const {Marker} = this.google.maps

            // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            // var labelNumber = this.key + 1 
            // console.log(labelNumber)
            if(this.position.selected){
            this.marker = new Marker({
                position: {
                    "lat": this.position.latitude,
                    "lng": this.position.longitude
                },
                map: this.map,
                title: this.position.name,
                draggable: true,
                icon: this.icon,
                zIndex: 4
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
                      zIndex: 0
                 
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
                console.log("child marker emitting: " + pos.reference)
                console.log(pos.name)
                ChildMarker.locationClicked()
                
            })
        }
    }

</script>
