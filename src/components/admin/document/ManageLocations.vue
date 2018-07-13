<template>
<div>
   <h1>Locations</h1>
    <div class="row">
        <ul class="col-sm-12">
            
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>no</th>
                        <th>name</th>
                        <th>primary</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  :class="{'selected': currentLocation != null && loc.reference == currentLocation.reference}" class="location-select-row" v-for="(loc, index) in locations" @click="openLocation(loc)">
                        <td>{{index+1}}</td>
                        <td><span v-if="loc.name == null" class="text-muted">no name</span><span v-else>{{loc.name}}</span></td>
                        <td><span v-if="loc.primaryLocation" class="font-weight-bold">Primary</span></td>
                        <td class="delete-link"><span class="delete-link-text" @click="requestDeleteLocation(loc)">delete</span></td>
                    </tr>
                </tbody>
            </table>
          
        </ul> 
   
         
    </div>
      <hr>
    <h2 class="display-4 mb-3"><span v-if="currentLocation == null || currentLocation.name == null">All locations</span><span v-else>Location: {{currentLocation.name}}</span></h2>
    <div class="row">
        <div class="col-sm-8">
            <button class="btn btn-primary" @click="setStreetview">Open streetview</button>
             <my-map  :streetviewLocation="streetviewLocation"  :updating="updatingMap" @locationChangeFromMarker="onLocationChangeFromMarker" @newLocationSelected="onNewLocationSelected" @locationChangedFromMap="onLocationChangeFromMap" @markerClicked="onMarkerClicked"> </my-map>
        </div>
    <div class="col-sm-4">
        <form>
           
            
            <div class="form-group">
                <label for="lat">Location name</label>
                <input type="text" id="lat" class="form-control" v-model="currentLocation.name">
            </div>
            
            <div class="form-group">
                <label for="lat">Latitude</label>
                <input type="text" id="lat" class="form-control" v-model="currentLocation.latitude">
            </div>
            <div class="form-group">
                <label for="long">Longitude</label>
                <input type="text" id="long" class="form-control" v-model="currentLocation.longitude">
            </div>
             <div class="form-group">
                <label for="pitch">Pitch</label>
                <input type="text" id="pitch" class="form-control" v-model="currentLocation.streetviewPitch">
            </div>
             <div class="form-group">
                <label for="heading">Heading</label>
                <input type="text" id="heading" class="form-control" v-model="currentLocation.streetviewHeading">
            </div>
            <button class="btn btn-success" @click.prevent="saveLocation">Save</button>
    </form>
    </div>
    </div>
    <div class="row">
        
    
    </div>
    <ConfirmDeleteLocationModal :show="showConfirmDeleteLocationModal" :location="locationToDelete" @close="onCloseConfirmDeleteLocationModal" @deleteLocation="onDeleteLocation"></ConfirmDeleteLocationModal>
</div>
</template>


<script>
    import _ from 'lodash'
    import Vue from 'vue'
    const EventBus = new Vue();
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import DocumentService from '../../../services/DocumentService';
    import LocationPicker from '../LocationPicker';
    import ConfirmDeleteLocationModal from './ConfirmDeleteLocationModal';
    import MyMap from './MyMap'

    export default {

        name: 'ManageLocations',
        components: {
            LocationPicker,
            MyMap,
            ConfirmDeleteLocationModal
        },
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
                document: {},        
                updatingMap: false,
                showConfirmDeleteLocationModal: false,
                locationToDelete: {},
                streetviewLocation: {},
                currentLocationCopy: {}
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
                    if(this.$store.state.admin.currentLocation != null)
                        return this.$store.state.admin.currentLocation
                    else
                        return {name:null}
                },
                set(value){
                    this.$store.commit("setAdminCurrentLocations",value)
                }
            }
        },
        methods: {
            setStreetview() {
                this.streetviewLocation = this.currentLocation
            },
            onMarkerClicked(selectedLocation) {
                this.currentLocation = _.cloneDeep(selectedLocation);
            },
            saveLocation() {
                var securityToken = this.$store.state.securityToken;

                var request = {
                    "indexRef": this.indexRef,
                    "documentRef": this.documentRef
                }

                DocumentService.createNewUnpublishedVersion(request, securityToken).then((response) => {
                    var unpublishedVersion = response.data;
                    var newRef = this.findLocationReference(unpublishedVersion.locations, this.currentLocationCopy)

                    var updateLocationRequest = {
                        "locationRef": newRef,
                        "indexRef": this.indexRef,
                        "documentRef": this.documentRef,
                        "location": {
                            "latitude": this.currentLocation.latitude,
                            "longitude": this.currentLocation.longitude,
                            "streetviewPitch": this.currentLocation.streetviewPitch,
                            "streetviewHeading": this.currentLocation.streetviewHeading,
                            'name': this.currentLocation.name
                        }
                    }

                    DocumentService.updateLocation(updateLocationRequest, securityToken).then((response) => {
                        DocumentService.publishSpecificVersion(this.indexRef, this.documentRef, unpublishedVersion.versionNumber, securityToken).then((response) => {})
                    })
                })
            },
            onLocationChangeFromMap(newLocation) {
                this.currentLocation.streetviewPitch = newLocation.pitch;
                this.currentLocation.streetviewHeading = newLocation.heading;
                this.currentLocation.latitude = newLocation.lat;
                this.currentLocation.longitude = newLocation.lng;
            },
            onDeleteLocation(locationRef) {
                var securityToken = this.$store.state.securityToken;

                var index = this.locations.findIndex(l => l.reference == locationRef)

                DocumentService.deleteLocation(this.indexRef, this.documentRef, locationRef, securityToken).then((response) => {

                    DocumentService.publishSpecificVersion(this.indexRef, this.documentRef, response.data.unpublishedVersionNumber, securityToken).then((response) => {
                        this.locations[index].deleted = true;
                        this.showConfirmDeleteLocationModal = false;
                        this.locationToDelete = {};
                        this.getDocument();
                    })
                })
            },

            onCloseConfirmDeleteLocationModal() {
                this.showConfirmDeleteLocationModal = false;
                this.locationToDelete = {};
            },
            requestDeleteLocation(loc) {
                this.showConfirmDeleteLocationModal = true;
                this.locationToDelete = loc;
            },
            updateName() {
                var securityToken = this.$store.state.securityToken;

                var request = {
                    "indexRef": this.indexRef,
                    "documentRef": this.documentRef
                }
                DocumentService.createNewUnpublishedVersion(request, securityToken).then((response) => {
                    var unpublishedVersion = response.data;
                    var newRef = this.findLocationReference(unpublishedVersion.locations, this.currentLocation)

                    var updateLocationRequest = {
                        "locationRef": newRef, // unpublishedVersion.locations[0].reference,
                        "indexRef": this.indexRef,
                        "documentRef": this.documentRef,
                        "location": {
                            'latitude': this.currentLocation.latitude,
                            'longitude': this.currentLocation.longitude,
                            'name': this.currentLocation.name
                        }
                    }

                    DocumentService.updateLocation(updateLocationRequest, securityToken).then((response) => {
                        DocumentService.publishSpecificVersion(this.indexRef, this.documentRef, unpublishedVersion.versionNumber, securityToken).then((response) => {
                            this.getDocument();
                        })
                    })
                })
            },
            onLocationChangeFromMarker(changedLocation) {
                this.updatingMap = true;
                var securityToken = this.$store.state.securityToken;

                var request = {
                    "indexRef": this.indexRef,
                    "documentRef": this.documentRef
                }
                DocumentService.createNewUnpublishedVersion(request, securityToken).then((response) => {
                    var unpublishedVersion = response.data;
                    var newRef = this.findLocationReference(unpublishedVersion.locations, changedLocation.oldLocation)

                    var updateLocationRequest = {
                        "locationRef": newRef, // unpublishedVersion.locations[0].reference,
                        "indexRef": this.indexRef,
                        "documentRef": this.documentRef,
                        "location": {
                            'latitude': changedLocation.location.lat(),
                            'longitude': changedLocation.location.lng(),
                            'streetviewPitch': 0,
                            'streetviewHeading': 0,
                            'name': changedLocation.oldLocation.name
                        }
                    }

                    DocumentService.updateLocation(updateLocationRequest, securityToken).then((response) => {
                        DocumentService.publishSpecificVersion(this.indexRef, this.documentRef, unpublishedVersion.versionNumber, securityToken).then((response) => {
                            this.updatingMap = false;
                        })
                    })
                })

            },
            async onNewLocationSelected(newLocation) {
                this.updatingMap = true;
                console.log("creating new location")
                var locationRequest = {
                    "location": {
                        "latitude": newLocation.lat(),
                        "longitude": newLocation.lng()
                    },
                    "indexRef": this.indexRef,
                    "documentRef": this.documentRef
                }

                var securityToken = this.$store.state.securityToken;
                await DocumentService.createLocation(locationRequest, securityToken).then(async (response) => {
                    await DocumentService.publishLatestVersion(locationRequest.indexRef, locationRequest.documentRef, securityToken).then((response) => {
                        this.getDocument();
                        this.updatingMap = false;
                    })
                })
            },
            findLocationReference(locations, locationToFind) {
                var ref = null;
                locations.forEach((loc) => {
                    console.log("loc lat: " + loc.latitude)
                    console.log("ltf lat: " + locationToFind.latitude)
                    if (loc.latitude == locationToFind.latitude && loc.longitude == locationToFind.longitude)
                        ref = loc.reference;
                })
                return ref;
            },
            onSelected(location) {

            },
            openLocation(selectedLocation, index) {
                this.streetviewLocation = null;
                this.currentLocationCopy = _.cloneDeep(selectedLocation);
                this.currentLocation = _.cloneDeep(selectedLocation);
            },
            getLocations() {
                this.locations = _.cloneDeep(this.document.locations);
            },
            async getDocument() {
                await DocumentService.getDocument(this.indexRef, this.documentRef).then((response) => {
                    this.document = response.data;
                    this.getLocations();
                })
            }
        },
        created() {
            this.getDocument();
        },
        destroyed(){
            this.locations = [];
            this.currentLocation = {};
        }
    }

</script>


<style scoped lang="scss">
    .active {
        color: red;
    }

    .location-select-row {
        &:hover {
            background-color: #eef7fa;
            cursor: pointer;
        }
        &.selected {
            background: #deeff5;
        }
    }

    .delete-link {
        color: darkred;
        &:hover {
            color: white;
            background: darkred
        }
        cursor:default;
    }

    .delete-link-text {
        &:hover {
            color: lightgrey;
            text-decoration: underline;
            cursor: pointer;
        }
    }

</style>
