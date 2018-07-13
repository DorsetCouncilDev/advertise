<!-- MyMap.vue -->
<template>
  <div>
    <map-loader 
      :updating="updating"
      :map-config="{
        zoom: 12,
        center: {'lat':50.712174,'lng':-2.470366}
      }"
      :streetviewLocation="streetviewLocation"
      apiKey="AIzaSyB20tzMpjwPqs2eiqh_XmNRCanoaHNzfsk"
                @newLocationRequested = "onNewLocationRequested"
                @locationChangeFromMap = "onLocationChangeFromMap"
    >
      <template slot-scope="scopeProps" >
        <child-marker v-for="(marker,i) in mapMarkers"
          :key="i"
          :position="marker" 
          :google="scopeProps.google"
          :map="scopeProps.map"
          @locationChangeFromMarker="onLocationChangeFromMarker"
          @markerClicked="onMarkerClicked"
                      />
      </template>
</map-loader>
</div>
</template>

<script>
    import _ from 'lodash'
    import MapLoader from './MapLoader.vue'
    import ChildMarker from './ChildMarker'

    export default {
        props: {
            markers: Array,
            updating: Boolean,
            streetviewLocation: Object
        },
        data() {
            return {
                mapConfig: {
                    zoom: 12,
                    center: this.markers[0]
                },
                mapMarkers: []
            }
        },
        watch:{
           markers:{
               handler: function(after, before){
                  console.log("markersChanged")
                   this.mapMarkers = []
                  this.mapMarkers = _.cloneDeep(after)
               },
               deep:true
            }
        },
        components: {
            MapLoader,
            ChildMarker
        },
        methods: {
            onLocationChangeFromMap(newLocation){
                this.$emit("locationChangedFromMap",newLocation)
            },
            onLocationChangeFromMarker(movedLocation){
                console.log("moved location" + movedLocation)
                this.$emit("locationChangeFromMarker", movedLocation)
            },
            onNewLocationRequested(newLocation) { 
                this.$emit( "newLocationSelected", newLocation)
            },
            onMarkerClicked(location){
                this.$emit("markerClicked",location)
            }
        },
       beforeMount() {
        
        }
    }

</script>
