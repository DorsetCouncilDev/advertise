<template>
  <div>
    <div id="map" :class="{'updating':updating}"></div>
    <template v-if="!!this.google && !!this.map">
      <slot :google="google" :map="map"/>
    </template>
</div>
</template>

<script>
    import GoogleMapsApiLoader from 'google-maps-api-loader'
    import MapProvider from './MapProvider'

    export default {
        props: {
            mapConfig: Object,
            apiKey: String,
            updating: Boolean,
            view: String,
            currentLocationCopy:Object
        },
        components: {
            MapProvider
        },
        data() {
            return {
                google: null,
                map: null,
                panorama: null
            }
        },
        mounted() { // point 3
            GoogleMapsApiLoader({
                apiKey: this.apiKey
            }).then((google) => {
                this.google = google
                this.initializeMap()
            })
        },
        watch: {       
            view() {
                this.setMapView();  
            },
            currentLocation:{
                handler: function(){
                    if(this.currentLocation != null)
                        this.setMapView()
                },
                deep:true
            }
        },
        computed: {
            currentLocation: {
                get() {
                    if (this.$store.state.admin.currentLocation != null){
                        return this.$store.state.admin.currentLocation
                    }
                    else
                        return null
                }
            }
            
        },
        methods: {
            setMapView(){
                if (this.view == 'street') {
                    var heading = 0 
                    if(this.currentLocationCopy.streetviewHeading != null && (!isNaN(this.currentLocationCopy.streetviewHeading)) && this.currentLocationCopy.streetviewHeading != 0)
                        heading = this.currentLocationCopy.streetviewHeading;
                    var pitch = 0
                    if(this.currentLocationCopy.streetviewHeading != null && (!isNaN(this.currentLocationCopy.streetviewHeading)) && this.currentLocationCopy.streetviewPitch != 0)
                        pitch =this.currentLocationCopy.streetviewPitch;
                    
                    const {LatLng} = this.google.maps
                    var position = new LatLng({ 
                        "lat": this.currentLocationCopy.latitude,
                        "lng": this.currentLocationCopy.longitude
                    })
                    
                    this.panorama.setPosition(position)
                
                    var pov = {
                        "heading":heading,
                        "zoom":1,
                        "pitch":pitch
                    }
                    
                    this.panorama.setPov(pov)
                    this.panorama.setVisible(true)
                    
                } else {
                   this.panorama.setVisible(false)
                }
            },

            povChange(pov) {
                if (pov != null && 
                    (this.currentLocationCopy.streetviewHeading != pov.heading || this.currentLocationCopy.streetviewPitch!= pov.pitch)) {
                    this.$emit("povChange",pov)
                }
            },
            positionChanged(pos) {
                if(this.currentLocation.latitude != pos.lat() || this.currentLocation.longitude != pos.lng())
                    this.$emit("locationChangeFromMap",pos)
            },
            initializeMap() {
                var mapL = this;
                const mapContainer = this.$el.querySelector('#map') // point 1
                
                const { Map }    = this.google.maps
                const { LatLng } = this.google.maps
                const { Marker } = this.google.maps
                
                this.map = new Map(mapContainer, this.mapConfig)
                
                this.panorama = this.map.getStreetView();
                
                var mapRef = this.map
                
                this.map.addListener('rightclick', function(e) {
                    var marker = new Marker({
                        position: {
                            "lat":  e.latLng.lat(),
                            "lng": e.latLng.lng()
                        },map: mapRef
                    })
                    
                    var position = new LatLng({
                        "lat": e.latLng.lat(),
                        "lng": e.latLng.lng()
                    })
               
                    var newLocation = {
                        "latitude": e.latLng.lat(),
                        "longitude": e.latLng.lng(),
                        "streetviewHeading": marker.getMap().getStreetView().getPov().heading,
                        "streetviewPitch": marker.getMap().getStreetView().getPov().pitch
                    }
                    mapL.$emit('newLocationRequested', newLocation)
                
                    marker.setMap(null);
                });
                
                var pan = this.panorama;    
                this.panorama.addListener('pov_changed', function() {
                    mapL.povChange(pan.getPov())
                })
                this.panorama.addListener('position_changed', function() {
                        mapL.positionChanged(pan.getPosition())
                })      
            }
        }
    }

</script>

<style scoped>
    #map {
        height: 600px;
        width: 100%;
    }

    .updating {
        opacity: .4;
    }

    #pano {
        width: 600px;
        height: 600px;
    }

</style>
