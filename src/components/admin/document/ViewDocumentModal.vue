<template>

  <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Asset" size="lg">
      <div class="ad-modal-body"> 
          <div class="row">
              <div class="unpublished-message col-sm-12" v-if="!document.published"><p class="text-danger">This asset is not published</p>
                  <button class="btn btn-success" @click="publishDocument">Publish now</button></div>
      
    </div>
          <div class="row" v-if="updated">Updated</div>
      
      <div class="row">
        <div class="col-sm-6">
            <div class="form-group">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="document.name" >
            </div>
            <div class="form-group">    
                <label for="longText">Long text</label>
                <b-form-textarea id="longText"
                     v-model="document.longText"
                     placeholder=""
                     :rows="3"
                     :max-rows="6">
                </b-form-textarea>  
            </div>
            
            <p><strong>{{document.documentType}}</strong></p>
            
            <legend>Properties</legend>
            
            <div v-for="property in properties">
                <div class="form-group mb-4 mt-4" v-if="property.propertyType == 'Boolean'">
       
                <div class="multiple-choice">
                 
                    <input type="checkbox" class="form-control" :id="property.propertyReference"  v-model="property.publishedValue"  v-bind:true-value="'true'"
  v-bind:false-value="'false'">
                    <label  :for="property.propertyReference" :title="property.longText">{{property.propertyName}}</label>
                </div>
        
    </div>
                  <div class="form-group" v-else-if="property.propertyType == 'TextArea'">
                       <label :for="property.propertyReference" >{{property.propertyName}}</label>
                      <b-form-textarea :id="property.propertyReference"
                     v-model="property.publishedValue"
                     placeholder=""
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
                      
                     
    </div>
         <div class="form-group" v-else>
                <div class="form-group">
                     <label :for="property.propertyReference" >{{property.propertyName}}</label>
                    <input class="form-control" :type="property.propertyType" :id="property.propertyReference" :name="property.propertyReference"  v-model="property.publishedValue">
                   
                </div>
            </div>
    </div>
    </div>
        <div class="col-sm-6" id="locationSide">
            <legend>Location</legend>
            <label class="col-sm-5">Latitude</label>
            <label class="col-sm-5">Longitude</label>
            <div class="input-group location-input">
                <input class="form-control" type="text" id="longitude" @input="locationChanged = true" name="longitude" v-model="location.latitude">
                <input class="form-control" type="text" id="latitude" @input="locationChanged = true" name="latitude" v-model="location.longitude">
            </div>   
            <div class="mt-4 mb-4 d-flex justify-content-between location-actions">
                <button class="btn btn-outline-primary" v-if="!hasLocation" @click="addLocation" >Submit location</button>
                <button class="btn btn-primary" v-if="hasLocation" :disabled="!locationChanged" @click="updateLocation">Save location</button>
                <button class="btn btn-outline-danger" v-if="hasLocation" @click="deleteLocation">Delete location</button>
                <ModalErrorMessage :error="locationError"></ModalErrorMessage>
                <ModalInfoMessage :info="locationInfo"></ModalInfoMessage>
            </div>
            
            <div class="mt-4 mb-4">
                <button class="btn btn-primary" @click="openLocationPicker">Pick a location</button>
            </div>          
        </div>
    </div> 
             
    </div>
        <div id="mfooter" v-bind:class="{'doingStuff':isDoingStuff}">
            <button  class="btn btn-outline-secondary" @click="closeModal()"> Close </button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="updateDocument">Save</button>
            <button type="button" class="btn btn-danger" @click="deleteDocument">Delete</button>
            <ModalErrorMessage :error="error"></ModalErrorMessage>
            <ModalInfoMessage :info="info"></ModalInfoMessage>
    </div>
      <LocationPickerModal :show="showLocationPickertModal"></LocationPickerModal>
    </b-modal>

</template>


<script>
    import _ from 'lodash'
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import DocumentTypeService from '../../../services/DocumentTypeService'
    import DocumentService from '../../../services/DocumentService'
    import Location from './Location'
    import ModalErrorMessage from '../../modal-error-message'
    import ModalInfoMessage from '../../modal-info-message'
    import LocationPickerModal from './LocationPickerModal'
    
    export default {

        name: 'ViewDocumentModal',
        props: {
            docRef: {
                type: String,
                required: true
            },
            show: {
                type: Boolean,
                required: true
            },
            indexRef: {
                type: String,
                required: true
            },
            locationAdded: {
                type: Boolean,
                required: true
            },
            locationUpdated: {
                type: Boolean,
                required: true
            }
        },

        components: {
            Location,
            ModalErrorMessage,
            ModalInfoMessage,
            LocationPickerModal
        },
        data() {
            return {
                document: {},
                properties: [],
                showModal: false,
                location: {
                    latitude: "",
                    longitude: "",
                    ref: ""
                },
                locationChanged: false,
                locationError: false,
                hasLocation: false,
                documentTypeProperties: [],
                updated: false,
                isDoingStuff: false,
                doingStuffMessage: "",
                error: {
                    show: false,
                    message: "",
                    detail: ""
                },
                nameError: false,
                info: {
                    message: "",
                    show: false
                },
                locationError: {
                    show: false,
                    message: ""
                },
                locationInfo: {
                    show: false,
                    message: ""
                },
                showLocationPickertModal: false
            }
        },
        watch: {
            show: function() {
                this.showModal = this.show
            },
            locationAdded: function() {
                if (this.locationAdded) {
                    this.hasLocation = true
                    this.getDocument()
                }
            },
            locationUpdated: function() {
                if (this.locationUpdated) {
                    this.getDocument()
                    this.locationUpdated = false;
                }
            },
            // awful hack to reload document - FIX
            documentUpdated: function() {
                if (this.documentUpdated) {
                    this.getDocument();
                    this.$emit("resetUpdate");
                }
            }
        },
        filters: {
            convertBoolean: {
                read: function(val) {
                    if (val == 'true')
                        return true;
                    else
                        return false;
                },
                write: function(val) {
                    return val
                }
            }
        },
        methods: {
            deleteDocument: async function() {
                var securityToken = this.$store.state.securityToken;
                await DocumentService.deleteDocument(this.indexRef, this.docRef, securityToken).then((response) => {
                    this.$emit('updated', {
                        'indexRef': this.indexRef,
                        'doc': this.document,
                        'properties': this.properties
                    })
                })
            },
            closeModal: function() {
                this.clearAllMessages()
                this.$emit('close');
            },
            addLocation: async function() {
                this.$emit('locationAdded', {
                    "location": {
                        "latitude": this.location.latitude,
                        "longitude": this.location.longitude
                    },
                    "indexRef": this.indexRef,
                    "documentRef": this.docRef
                })
            },
            updateLocation: function() {



                var securityToken = this.$store.state.securityToken;

                var request = {
                    "indexRef": this.indexRef,
                    "documentRef": this.docRef
                }
                DocumentService.createNewUnpublishedVersion(request, securityToken).then((response) => {
                    var unpublishedVersion = response.data;
                    this.location.ref = unpublishedVersion.reference;
                    var updateLocationRequest = {
                        "locationRef": unpublishedVersion.locations[0].reference,
                        "indexRef": this.indexRef,
                        "documentRef": this.docRef,
                        "location": this.location
                    }

                    DocumentService.updateLocation(updateLocationRequest, securityToken).then((response) => {
                        DocumentService.publishSpecificVersion(this.indexRef, this.docRef, unpublishedVersion.versionNumber, securityToken).then((response) => {
                            this.$emit('update');
                            this.locationInfo.show = true;
                            this.locationInfo.message = "Location updated"
                        })
                    })
                })
            },
            deleteLocation: function() {
                /* this.$emit('locationDeletion', {
                     "indexRef": this.indexRef,
                     "documentRef": this.docRef,
                     "locationRef": this.location.ref
                 })
                 
                 */
                var securityToken = this.$store.state.securityToken;
                var request = {
                    "indexRef": this.indexRef,
                    "documentRef": this.docRef
                }



                DocumentService.createNewUnpublishedVersion(request, securityToken).then((response) => {
                    var unpublishedVersion = response.data;

                    var deleteLocationRequest = {
                        "indexRef": this.indexRef,
                        "documentRef": this.docRef,
                        "locationRef": unpublishedVersion.locations[0].reference
                    }

                    DocumentService.deleteLocation(deleteLocationRequest, securityToken).then((response) => {

                        DocumentService.publishSpecificVersion(this.indexRef, this.docRef, unpublishedVersion.versionNumber, securityToken).then((response) => {

                            this.$emit('update');
                        })
                    })
                })

            },
            updateDocument: async function() {
                this.clearInfoMessage()
                this.clearErrorMessage()

                this.isDoingStuff = true;




                if (this.document.name == null || this.document.name == "") {
                    this.clearActionMessage();
                    this.error.show = true;
                    this.error.message = "Name is required";
                    this.error.detail = "";
                    this.nameError = true;

                } else {
                    var securityToken = this.$store.state.securityToken;
                    var updatedDocument = {
                        'indexRef': this.indexRef,
                        'reference': this.docRef,
                        'doc': this.document,
                        'properties': this.properties
                    };

                    await DocumentService.updateDocument(updatedDocument, securityToken).then((response) => {
                        this.$emit('update')
                        this.clearActionMessage();
                        this.info.show = true;
                        this.info.message = "Changes have been saved"
                    }, (error) => {
                        this.clearActionMessage();
                        this.error.show = true;
                        this.error.message = "Sorry something's gone wrong"
                    })
                }
            },
            createProperties: async function() {

                var propertiesSubmitted = [];

                this.properties.forEach((p) => {
                    var props = {
                        'reference': p.propertyReference,
                        'value': p.value
                    };

                    propertiesSubmitted.push(props);
                })

                var securityToken = this.$store.state.securityToken;

                await DocumentService.setDocumentProperties(this.indexRef, this.docRef, propertiesSubmitted, securityToken).then((response) => {

                    this.publishDocument(response.data.reference)

                })

            },
            publishDocument: async function() {
                var securityToken = this.$store.state.securityToken;
                await DocumentService.publishLatestVersion(this.indexRef, this.docRef, securityToken).then((response) => {

                    this.document = {}
                    this.properties = {}
                    this.showModal = false
                    this.$emit('update')
                })
            },
            onHidden(evt) {
                this.document = {}
                this.properties = {}
                this.showModal = false
                this.clearAllMessages();
                this.$emit('close')
            },
            getDocumentType: async function() {
                await DocumentTypeService.getType(this.indexRef, this.document.documentType).then((response) => {
                    if (response.data.documentTypeProperties != null) {
                        this.allProperties = response.data.documentTypeProperties

                    }
                })

            },
            getDocument: async function() {
                await DocumentService.getDocument(this.indexRef, this.docRef).then(async (response) => {
                    this.document = response.data
                    this.hasLocation = false;
                    if (this.document.published) {
                        this.properties = this.document.properties

                        this.properties.forEach((p) => {
                            if (p.propertyType == 'Boolean') {

                            }
                        })

                        if (this.document.locations != null && this.document.locations.length > 0) {
                            this.location.latitude = this.document.locations[0].latitude
                            this.location.longitude = this.document.locations[0].longitude
                            this.location.ref = this.document.locations[0].reference
                            this.locationChanged = false
                            this.hasLocation = true
                        }

                    }
                })
            },
            onShow(evt) {
                //this.getDocumentType();
                this.getDocument();
                this.clearAllMessages();
            },
            onHidden(evt) {
                this.location.latitude = ""
                this.location.longitude = ""
                this.location.ref = ""
                this.locationChanged = false
                this.document = {}
                this.properties = []
                if (this.show)
                    this.$emit('close')
                this.clearAllMessages()
            },
            clearAllMessages() {
                this.clearActionMessage()
                this.clearInfoMessage()
                this.clearErrorMessage()
            },
            clearActionMessage() {
                this.isDoingStuff = false;
            },
            clearInfoMessage() {
                this.info.show = false;
                this.info.message = "";
            },
            clearErrorMessage() {
                this.error.show = false;
                this.error.message = "";
                this.error.detail = "";
                this.nameError = false;
            },
            openLocationPicker(){
                this.showLocationPickertModal = true;
            }
        },
        mounnted() {

        }
    }

</script>

<style scoped lang="scss">
    .unpublished-message {
        border-left: darkred 2px solid;
        background-color: #F1F1F1;
        padding: 10px;

    }

    h2.display-4 {
        font-size: 32px;
    }

    #locationSide {
        border-left: solid 1px lightgrey;
    }

    .messageShown {
        margin-bottom: 100px;
    }

    .ad-modal-body {
        height: 600px;
        overflow: scroll;
    }

    .location-actions {
        padding-bottom: 15px;
        position: relative;
    }

</style>
