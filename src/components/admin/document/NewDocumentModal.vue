<template>
  <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Create new Asset">
      <div class="ad-modal-body">      
       
            <div class="form-group" :class="{'hasError':errorMessages.name}">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="document.name" >
                <div v-if="errorMessages.name" class="text-danger">{{errorMessages.name}}</div>
            </div>
            <div class="form-group">    
                <label for="longText">Long text</label>
                <input class="form-control" type="text" id="longText" v-model="document.longText">
            </div>
      <div class="form-group mb-3" :class="{'hasError':errorMessages.type}">
            <label>Asset Type</label>
            <select class="form-control" v-model="type" >
                <option v-for="docType in documentTypes" :value="docType">
                    {{docType.name}}
                </option>
            </select>
           <div v-if="errorMessages.type" class="text-danger">{{errorMessages.type}}</div>
    </div>
       <b-card :title="type.name + ' properties'" v-if="type != null && type.properties != null && type.properties.length > 0" class="mb-3">
           <div v-for="p in type.properties">
            <div class="form-group" v-if="p.property.reference == 'available'">
                <div class="multiple-choice">
                 
                    <input type="checkbox" class="form-control" :id="p.property.reference" :value="p.property.value" v-model="p.property.value">
                    <label  :for="p.property.reference" :title="p.property.longText">{{p.property.name}}</label>
                </div>
        
    </div>
            <div v-else class="form-group">
                <label :for="p.property.reference">{{p.property.name}} <span class="font-weight-light text-lowercase"> ({{p.property.type}})</span></label>
                <input class="form-control" :type="p.property.type" v-model="p.property.value" :name="p.property.reference">
            </div>
          </div>
        </b-card>
   
    </div> 
        <div id="mfooter" v-bind:class="{'doingStuff':isDoingStuff}">
            <button type="button" class="btn btn-outline-secondary" @click="closeModal()"> Close </button>
            <button type="button" class="btn btn-success pull-right" data-dismiss="modal" @click="createDocument">Submit</button>
        <!--    <ModalErrorMessage :error="error" :publishOption="document.reference != null && !document.published"></ModalErrorMessage> -->
            <ModalInfoMessage :info="info"></ModalInfoMessage>
            <ModalPublishedErrorMessage v-show="publishError" @publish="publish"></ModalPublishedErrorMessage>
        </div>
  </b-modal>
</template>


<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import DocumentTypeService from '../../../services/DocumentTypeService'
    import DocumentService from '../../../services/DocumentService'

    import ModalErrorMessage from '../../modal-error-message'
    import ModalInfoMessage from '../../modal-info-message'
    import ModalPublishedErrorMessage from './PublishedError'
    export default {

        name: 'NewDocumentModal',
        components: {
            ModalErrorMessage,
            ModalInfoMessage,
            ModalPublishedErrorMessage
        },
        props: {
            show: {
                type: Boolean,
                required: true
            },
            indexRef: {
                type: String,
                required: true
            }
        },
        watch: {
            show: function() {
                this.showModal = this.show

            }
        },
        data() {
            return {
                showModal: false,
                document: {
                    name: "",
                    longText: ""
                },
                documentTypes: [],
                type: {
                    properties: []
                },
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
                errorMessages: {
                    name: "",
                    type: ""
                },
                publishError: false,
                document: {}
            }
        },

        methods: {
            publish : function(){
                 var securityToken = this.$store.state.securityToken;
                  DocumentService.publishLatestVersion(this.indexRef, this.document.reference,  securityToken).then((response) => {
                                this.$emit('create');
                            }, (error) => {
                                this.clearActionMessage();
                                this.error.show = true;
                                this.error.message = "Asset was created, but failed to publish";
                            });
            },
            closeModal: function() {
                this.$emit('close');
            },
            createDocument: async function() {
                this.clearInfoMessage()
                this.clearErrorMessage()
                this.isDoingStuff = true;
                var numberOfErrors = 0;
                if (this.document.name == null || this.document.name == "") {
                    this.clearActionMessage();
                    this.error.show = true;
                    this.error.message = "Name is required. ";
                    this.error.detail = "";
                    this.errorMessages.name = "Name is required"
                    numberOfErrors++

                }
                if (this.type.reference == null) {
                    this.clearActionMessage();
                    this.error.show = true;
                    this.error.detail = "";
                    this.error.message += "Type is required. ";
                    this.errorMessages.type = "Asset type is required"
                    numberOfErrors++
                }

                if (numberOfErrors == 0) {
                    var newDocument = {
                        'indexRef': this.indexRef,
                        'typeRef': this.type.reference,
                        'doc': this.document,
                        'properties': this.type.properties
                    };

                    var securityToken = this.$store.state.securityToken;


                    DocumentService.createDocument(newDocument, securityToken).then((response) => {

                        var properties = [];
                        newDocument.properties.forEach((p) => {
                            var property = {
                                'reference': p.property.reference,
                                'value': p.property.value
                            };
                            properties.push(property);
                            console.log("setting properpert: " + p.property.reference + " : " + p.property.value)
                            this.document = response.data
                        })
                        DocumentService.setDocumentProperties(newDocument.indexRef, response.data.reference, properties,  securityToken).then((response) => {
                            
                            DocumentService.publishLatestVersion(newDocument.indexRef, response.data.reference,  securityToken).then((response) => {
                                this.$emit('create');
                            }, (error) => {
                                this.clearActionMessage();
                                this.publishError = true;
                                this.error.message = "Asset was created, but failed to publish";
                            });
                        })


                    }).catch((error) => {
                        this.clearActionMessage();
                        this.error.show = true;
                        this.error.message = "Failed to create asset";
                        
                        if(error.response)
                            this.error.detail = "Error status code: " + error.response.status
                        else if(error.request && error.config.timeout == 1) 
                            this.error.detail = "Request took too long. May be a network problem. Please try again.";
                        else
                            this.error.detail = "Something went wrong. Please try again.";
                            
                        this.error.show = true;
                    })
                }
            },
            onShow(evt) {
                this.getDocumentTypes();
                this.document.name = "";
                this.document.longText = "";
                this.clearAllMessages();
            },
            onHidden(evt) {
                this.$emit("create");
               this.type.properties.length = 0
                this.document.name = "";
                this.document.longText = "";
                this.document.reference = null;
                this.$emit('close');
                this.clearAllMessages();
            },
            getDocumentTypes: async function() {
                await DocumentTypeService.getDocumentTypes(this.indexRef).then((response) => {
                    this.documentTypes = response.data

                })
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
                this.publishError = false;
                this.error.show = false;
                this.error.message = "";
                this.error.detail = "";
                this.nameError = false;
                this.errorMessages.name = "";
                this.errorMessages.type = "";
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }

    .ad-modal-body {
        height: 600px;
        overflow: scroll;
    }

</style>
