<template>
<div>
   <h1>Locations</h1>
    <div class="row">
        <ul class="col-sm-12">
            <li :class="{active: hover}" v-for="location in locations" @click="openLocation(location)">{{location.latitude}} {{location.longitude}}  <span v-if="location.primaryLocation" class="font-weight-bold"> Primary location</span></li>
        </ul> 
        <br>
        <h2>Select a new location the map below</h2>        <hr>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <LocationPicker :location="currentLocation" @selected="selected"></LocationPicker>
        </div>
    <div class="col-sm-6">
        <form>
            <p>Location: {{currentLocation.reference}}</p>
            
            <div class="form-group">
                <label for="lat">Latitude</label>
                <input type="text" id="lat" class="form-control" v-model="currentLocation.latitude">
            </div>
            <div class="form-group">
                <label for="long">Longitude</label>
                <input type="text" id="long" class="form-control" v-model="currentLocation.longitude">
            </div>
    </form>
    </div>
    </div>
</div>
</template>


<script>
    import Vue from 'vue'
    const EventBus = new Vue();
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import DocumentService from '../../../services/DocumentService';
    import LocationPicker from '../LocationPicker';
    
    export default {

        name: 'ManageLocations',
        components: {LocationPicker},
        props: {
            indexRef: {
                type: String,
                required: true
            },
            documentRef: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                locations: [],
                document: {},
                currentLocation: {},
                hover: false
            }
        },
        methods: {
            selected(){
               console.log("selected init") 
            },
            openLocation(location){
                this.currentLocation = location;  
            },
            getLocations(){
                this.locations = this.document.locations;
            },
            getDocument(){
                DocumentService.getDocument(this.indexRef,this.documentRef).then((response)=>{
                    this.document = response.data;
                    this.getLocations();
                })
            }
        },
        mounted(){
            this.getDocument();
        },
        mounted(){
            
        }
        
    }

</script>


<style scoped lang="scss">
    .active {
         color: red;
    }

</style>
