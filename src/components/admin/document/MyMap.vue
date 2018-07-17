<!-- MyMap.vue -->
<template>
  <div>
    <map-loader 
      :updating="updating"
      :map-config="{
        zoom: 12,
        center: {'lat':50.712174,'lng':-2.470366}
      }"
      :view="view"
                :currentLocationCopy="currentLocationCopy"
      apiKey="AIzaSyB20tzMpjwPqs2eiqh_XmNRCanoaHNzfsk"
                @newLocationRequested = "onNewLocationRequested"
                @locationChangeFromMap = "onLocationChangeFromMap"
                @povChange = "onPovChange"
    >
      <template slot-scope="scopeProps" >
        <child-marker v-for="(location,i) in locations"
          :key="i"
          :position="location" 
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
            updating: Boolean,
            view: String,
            currentLocationCopy: Object
        },
        data() {
            return {
             
            }
        },
        computed:{
            locations: {
                get(){
                    return this.$store.state.admin.locations;
                },
                set(value){
                    this.$store.commit("setAdminLocations",value)
                }
            },
            currentLocation: {
                get(){
                    return this.$store.state.admin.currentLocations;
                },
                set(value){
                    this.$store.commit("setAdminCurrentLocations",value)
                }
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
            },
            onPovChange(pov){
                this.$emit("povChange",pov)
            }
        },
       beforeMount() {
        
        }
    }

</script>
