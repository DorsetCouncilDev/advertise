<template>
<div>
<ol class="breadcrumb">
    <li class="breadcrumb-item" aria-current="page"><router-link to="/advertise/admin/indexes">Indexes</router-link></li>
    <li class="breadcrumb-item" aria-current="page">{{indexRef}}</li>
    <li class="breadcrumb-item" aria-current="page">{{documentRef}}</li>
    <li class="breadcrumb-item active" aria-current="page">locations</li>
</ol>
<h1 class="locations-header">{{documentRef}} locations <small><span class="text-muted"> ({{locations.length}})</span></small></h1>
    <hr>
<div class="row">
    <div class="col-sm-6">
        <div v-if="locations.length == 0">This asset has no locations</div>
        <ul v-else-if="locations.length == 1">
        <li><span v-if="locations[0].name != null && locations[0].name != ''">{{locations[0].name}}</span><span v-else class="text-muted">no name</span><span v-if="locations[0].primaryLocation" class="font-weight-bold"> (primary)</span>
        </li>
            </ul>
        <div class="form-group" v-else>
            <label for="locations" class="font-weight-bold">Select a location</label>
            <select name="locations"  class="form-control" v-model="currentLocation">
                <option :value="loc" v-for="(loc, index) in locations"><span v-if="loc.name != null && loc.name != '' ">{{loc.name}}</span><span v-else class="text-muted">no name</span><span v-if="loc.primaryLocation" class="font-weight-bold"> (primary)</span></option>
            </select>
        </div>     
    </div>
</div>

<hr>
     <p class="font-weight-bold">Right click at a point on the map to create a new location</p>
<div class="row" v-show="currentLocation.latitude != null">
  
    <div id="currentLocationToolbar">
    <div class="form-group row col-sm-5" >
   
        <div class="col-sm-12">
            <div class="input-group">
            <input placeholder="no name" type="text" id="name" class="form-control" v-model="currentLocationCopy.name" title="name of location">
                <div class="input-group-append">
    <button title="Save location name" class="btn btn-success" type="button" id="button-addon2" :disabled="disableNameButton" @click="saveLocation">save</button>
  </div>
    </div>
            
        </div>
    </div>

    <div class="col-sm-2" >
        <div v-if="currentLocation.primary">
    </div>
    <div v-else>
        <button v-if="!currentLocation.primaryLocation" class="btn btn-outline-primary" @click="setPrimaryLocation">Set as primary</button>
    </div>
    </div>
    <div class="stv-radio-tabs-wrapper col-sm-3" >
        <input  type="radio" class="stv-radio-tab" id="one" name="tickme" value="map" v-model="view">
        <label for="one" id="mapViewLabel">Map</label>
        <input type="radio" class="stv-radio-tab" id="two" name="tickme" value="street" v-model="view">
        <label for="two" id="gridViewLabel">Streetview</label>
    </div>
        <div class="col-sm-2">
   <button v-if="currentLocation.primaryLocation" class="btn btn-outline-primary" @click="toggleStreetview"><span v-if="currentLocationCopy.streetviewLatitude != null" title="show streetview on asset page">Streetview Active</span><span v-else>Streetview Not active</span></button>
    </div>
        </div>
    </div>

   
    <div class="status" id="needsSaving" :class="{'show':unsaved}"><div id="messge"><div>Unsaved changes  <button class="btn-success" @click="saveLocation" >Save changes</button></div></div></div>
    <div class="status" id="saved" :class="{'show':saved}"><div>{{savedMessage}}</div></div>
  

<div class="row">
    <div class="col-sm-12">
        <my-map :view="view" :updating="updatingMap" :currentLocationCopy="currentLocationCopy" :deletion="deletion" :newLocation="newLocation" @locationChangeFromMarker="onLocationChangeFromMarker" @newLocationSelected="onNewLocationSelected" @locationChangedFromMap="onLocationChangeFromMap" @markerClicked="onMarkerClicked"
        @povChange="onPovChange" @newLocationAdded="onNewLocationAdded" > </my-map>
    </div>
</div>

    <div class="mt-4">
         <div class="col-sm-2" >
        <button class="btn btn-danger mb-4" @click="requestDeleteLocation">Delete selected location</button>
    </div>
    <b-link v-b-toggle.collapse1 >Edit location details</b-link>
<b-collapse id="collapse1" class="mt-2">
    <form>
    <div class="form-group">
        <label for="lat">Location name</label>
        <input type="text" id="lat" class="form-control" v-model="currentLocationCopy.name">
    </div>
    <div class="form-group">
        <label for="lat">Latitude</label>
        <input type="text" id="lat" class="form-control" v-model="currentLocationCopy.latitude">
    </div>
    <div class="form-group">
        <label for="long">Longitude</label>
        <input type="text" id="long" class="form-control" v-model="currentLocationCopy.longitude">
    </div>
    <div class="form-group">
        <label for="pitch">Pitch</label>
        <input type="text" id="pitch" class="form-control" v-model="currentLocationCopy.streetviewPitch">
    </div>
    <div class="form-group">
        <label for="heading">Heading</label>
        <input type="text" id="heading" class="form-control" v-model="currentLocationCopy.streetviewHeading">
    </div>
    <button class="btn btn-success" @click.prevent="saveLocation">Save</button>
</form>
    </b-collapse>
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
                streetview: false,
                currentLocationCopy: {},
                view: 'map',
                unsaved: false,
                saved: false,
                disableNameButton: true,
                deletion: false,
                newLocation: false,
                savedMessage: "",
                map: null
            }
        },
        watch: {
            currentLocation: {
                handler: function() {
                    this.unsaved = false;
                    this.saved = false;
                },
                deep: true
            },
            'currentLocationCopy.name': {
                handler: function() {
                    if (this.currentLocationCopy.name == this.currentLocation.name)
                        this.disableNameButton = true
                    else
                        this.disableNameButton = false

                },
                deep: true
            }
        },
        computed: {

            locations: {
                get() {
                    return this.$store.state.admin.locations;
                },
                set(value) {
                    this.$store.commit("setAdminLocations", value)
                }
            },
            currentLocation: {
                get() {
                    if (this.$store.state.admin.currentLocation != null)
                        return this.$store.state.admin.currentLocation
                    else {
                        this.currentLocationCopy = {}
                        return {
                            name: null
                        }
                    }
                },
                set(value) {
                    if (value != null && typeof(value) != "undefined") {
                        if (value.name == null)
                            value.name = ''
                        this.currentLocationCopy = _.cloneDeep(value);
                        this.$store.dispatch("setAdminCurrentLocation", value)
                    } else {
                        this.$store.dispatch("setAdminCurrentLocation", null)
                    }
                }
            },

          
        },
        methods: {
      
            setPrimaryLocation(){
                 var securityToken = this.$store.state.securityToken;
                DocumentService.setPrimaryLocation(this.indexRef,this.documentRef,this.currentLocationCopy.reference,securityToken).then((response)=>{
                    this.getDocument().then((response)=>{
                        var index = this.locations.findIndex(l =>l.primaryLocation == true)
                        this.currentLocation = this.locations[index];
                    });
                })
            },
            toggleStreetview(){
                if(this.currentLocationCopy.streetviewLatitude == null){
                    this.currentLocationCopy.streetviewLatitude = this.currentLocationCopy.latitude;
                    this.currentLocationCopy.streetviewLongitude = this.currentLocationCopy.longitude;
                }else{
                    this.currentLocationCopy.streetviewLatitude = null;
                    this.currentLocationCopy.streetviewLongitude = null;
                }
                this.saveLocation();
                
            },
            onNewLocationAdded() {  
                this.newLocation = false;
            },
            onPovChange(pov) {
                this.currentLocationCopy.streetviewHeading = pov.heading;
                this.currentLocationCopy.streetviewPitch = pov.pitch;
                this.unsaved = true
            },
            onMarkerClicked(selectedLocation) {
                this.currentLocation = _.cloneDeep(selectedLocation);
                this.currentLocationCopy = _.cloneDeep(this.currentLocation);

            },
            saveLocation() {
                var securityToken = this.$store.state.securityToken;
                this.updatingMap = true;
                var request = {
                    "indexRef": this.indexRef,
                    "documentRef": this.documentRef
                }

                DocumentService.createNewUnpublishedVersion(request, securityToken).then((response) => {
                    var unpublishedVersion = response.data;

                    var index = this.locations.findIndex(l => l.reference == this.currentLocationCopy.reference)

                    var updateLocationRequest = {
                        "locationRef": unpublishedVersion.locations[index].reference,
                        "indexRef": this.indexRef,
                        "documentRef": this.documentRef,
                        "location": {
                            "latitude": this.currentLocationCopy.latitude,
                            "longitude": this.currentLocationCopy.longitude,
                            "streetviewPitch": this.currentLocationCopy.streetviewPitch,
                            "streetviewHeading": this.currentLocationCopy.streetviewHeading,
                            "streetviewLongitude":this.currentLocationCopy.streetviewLongitude,
                            "streetviewLatitude":this.currentLocationCopy.streetviewLatitude,
                            'name': this.currentLocationCopy.name
                        }
                    }

                    DocumentService.updateLocation(updateLocationRequest, securityToken).then((response) => {
                        DocumentService.publishSpecificVersion(this.indexRef, this.documentRef, unpublishedVersion.versionNumber, securityToken).then((response) => {
                            this.updatingMap = false;
                            this.unsaved = false;
                            this.saved = true;

                            this.savedMessage = "Location changes saved"
                            this.locations = _.cloneDeep(response.data.locations);
                            this.currentLocation = _.cloneDeep(this.locations[index])
                        })
                    })
                })
            },
            onLocationChangeFromMap(pos) {
                this.currentLocationCopy.latitude = pos.lat();
                this.currentLocationCopy.longitude = pos.lng();
                this.unsaved = true
            },
            onDeleteLocation(locationRef) {
                var securityToken = this.$store.state.securityToken;
                this.updatingMap = true;
                this.deletion = true;
                DocumentService.deleteLocation(this.indexRef, this.documentRef, locationRef, securityToken).then((response) => {
                    DocumentService.publishSpecificVersion(this.indexRef, this.documentRef, response.data.unpublishedVersionNumber, securityToken).then((response) => {
                        this.showConfirmDeleteLocationModal = false;
                        this.getDocument();
                        this.currentLocation = null;
                        this.deletion = false;
                    })
                })
                this.updatingMap = false;
            },

            onCloseConfirmDeleteLocationModal() {
                this.showConfirmDeleteLocationModal = false;
                this.locationToDelete = {};
            },
            requestDeleteLocation() {
                this.showConfirmDeleteLocationModal = true;
                this.locationToDelete = this.currentLocationCopy;
            },

            onLocationChangeFromMarker(changedLocation) {
                this.locations.forEach((l) => console.log(l.reference))
                this.updatingMap = true;
                var securityToken = this.$store.state.securityToken;

                var request = {
                    "indexRef": this.indexRef,
                    "documentRef": this.documentRef
                }
                var index = this.locations.findIndex(l => l.reference == changedLocation.oldLocation.reference)

                DocumentService.createNewUnpublishedVersion(request, securityToken).then((response) => {
                    var unpublishedVersion = response.data;
                    var newRef = unpublishedVersion.locations[index].reference

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
                            this.getDocument();
                        })
                    })
                })

            },
            async onNewLocationSelected(newLocation) {
                this.updatingMap = true;
                this.newLocation = true
                var locationRequest = {
                    "location": newLocation,
                    "indexRef": this.indexRef,
                    "documentRef": this.documentRef
                }

                var securityToken = this.$store.state.securityToken;
                await DocumentService.createLocation(locationRequest, securityToken).then(async (response) => {
                    await DocumentService.publishLatestVersion(locationRequest.indexRef, locationRequest.documentRef, securityToken).then((response) => {
                        this.getDocument();
                        this.updatingMap = false;
                        this.saved = true;
                        this.savedMessage = "New location added"
                    })
                })
            },

            getLocations() {
                this.locations = _.cloneDeep(this.document.locations);
                if (this.newLocation || this.locations.length == 1)
                    this.currentLocation = this.locations[this.locations.length - 1]
          
                  
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
        destroyed() {
            this.locations = [];
            this.currentLocation = {};
        }
    }

</script>


<style scoped lang="scss">
    /* .active {
       color: red;
    }
*/

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

    .stv-radio-tabs-wrapper {
        clear: both;
        display: inline-block;
        padding: 0;
        position: relative;
        float: right;
    }

    input.stv-radio-tab {
        position: absolute;
        left: -99999em;
        top: -99999em;
        &:focus {
            &+label {
                border: orange solid 1px;
            }
        }
        &+label {
            cursor: pointer;
            float: left;
            border: solid 1px #ced4da;
            background-color: #fff;
            margin-right: -1px;
            padding-left: 40px;
            padding-top: 5px;
            padding-right: 5px;
            padding-bottom: 10px;
            position: relative;
            &:before {
                position: absolute;
                left: -1px;
                margin-left: 4px;
            }


            &#gridViewLabel {

                &:before {
                    margin-top: 5px;
                    margin-left: 10px;
                    content: url(../../../assets/images/streetview.svg);
                }
                &:focus {
                    border: orange solid 1px;
                }
            }

            &#mapViewLabel {
                &:before {
                    margin-top: 5px;
                    margin-left: 10px;
                    content: url(../../../assets/images/map.svg);
                }
                &:focus {
                    border: orange solid 1px;
                }
            }
            &:hover {
                background-color: #eee;
            }
        }

        &:checked+label {
            background-color: lightblue;
            z-index: 1;
        }
    }

    .status {

        transition: max-height .3s;
        overflow: hidden;
        display: flex;
        justify-content: center;
        height: 0;
        max-height: 0;

        &.show {
            height: auto;
            max-height: 100px;
            padding: 15px;
            width: 100%;
        }
        &#saved {
            background: #99C199;
            animation: showMessage 2s;
        }
        &#needsSaving {
            color: darkred;
            background: #fafafa;
        }
        .message {}
    }

    @keyframes showMessage {
        from {
            max-height: auto
        }
        to {
            max-height: 0
        }
    }

    .locations-header {
        font-size: 26px;

    }

    #currentLocationToolbar {
        background: #f6f6f6;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-top: 15px;
        margin-left: 15px;
        margin-right: 15px;
        padding-bottom: 5px;

    }

</style>
