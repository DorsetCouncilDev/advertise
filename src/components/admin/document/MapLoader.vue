<template>
  <div>
    <div id="map" :class="{'updating':updating}"></div>
    <template v-if="!!this.google && !!this.map">
      <slot :google="google" :map="map"/>
    </template>
<div id="pano"></div>
<button class="btn btn-primary">switch</button>
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
            streetviewLocation: Object
        },
        components: {
            MapProvider
        },
        data() {
            return {
                google: null,
                map: null,
                panorama: null,
                location: {
                    lat: null,
                    lng: null,
                    heading: null,
                    pitch: null
                }
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
            location: {
                handler: function() {
                    this.$emit("locationChangeFromMap", this.location)
                },
                deep: true
            },
            streetviewLocation: {
                handler: function(){
                    if(this.streetviewLocation != null)
                    {
                        const {
                    LatLng
                } = this.google.maps
                        var position = new LatLng( {"lat":this.streetviewLocation.latitude, "lng":this.streetviewLocation.longitude})
                        this.panorama.setPosition(position)
                        this.panorama.setPov({
                            heading: this.streetviewLocation.streetviewHeading,
                            zoom: 1,
                            pitch: this.streetviewLocation.streetviewPitch
                        })
                        this.panorama.setVisible(true) 
                    }else{
                        this.panorama.setVisible(false) 
                    }
                },
                deep: true
            }
        },
        methods: {

            povChange(pov) {
                this.location.heading = pov.heading;
                this.location.pitch = pov.pitch;
            },
            positionChange(pos) {
                this.location.lat = pos.lat();
                this.location.lng = pos.lng();
            },
            initializeMap() {
                var mapL = this;
                const mapContainer = this.$el.querySelector('#map') // point 1
                const {
                    Map
                } = this.google.maps
                this.map = new Map(mapContainer, this.mapConfig)

                var locationDetails = this.location;

                this.map.addListener('click', function(e) {
                    mapL.$emit('newLocationRequested', e.latLng)
                });
                this.panorama = this.map.getStreetView();
                var pan = this.panorama;
                var mapLoader
                this.panorama.addListener('pov_changed', function() {
                    mapL.povChange(pan.getPov())
                })
                this.panorama.addListener('position_changed', function() {
                    mapL.positionChange(pan.getPosition())
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
