<template>
  <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Create new Asset" size="lg">
      <div class="ad-modal-body">      
      
            <div class="form-group">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="document.name" >
            </div>
            <div class="form-group">    
                <label for="longText">Long text</label>
                <input class="form-control" type="text" id="longText" v-model="document.longText">
            </div>
      <div class="form-group mb-3">
            <label>Asset Type</label>
            <b-form-select v-model="type" >
                <option v-for="docType in documentTypes" :value="docType">
                    {{docType.name}}
                </option>
            </b-form-select>
    </div>
       <b-card :title="type.name + ' properties'" v-if="type.documentTypeProperties.length > 0" class="mb-3">
           <div v-for="p in type.documentTypeProperties">
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
        <div id="mfooter">
            <button type="button" class="btn btn-outline-secondary" @click="closeModal()"> Close </button>
            <button type="button" class="btn btn-success pull-right" data-dismiss="modal" @click="createDocument">Submit</button>
        </div>
  </b-modal>
</template>


<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import DocumentTypeService from '../../../services/DocumentTypeService'
    import DocumentService from '../../../services/DocumentService'
    export default {

        name: 'NewDocumentModal',
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
                    documentTypeProperties: []
                }
            }
        },

        methods: {
            closeModal: function() {
                this.$emit('close');
            },
            createDocument: async function() {
                console.log("create")
                var newDocument = {
                    'indexRef': this.indexRef,
                    'typeRef': this.type.reference,
                    'doc': this.document,
                    'properties': this.type.documentTypeProperties
                };

                var securityToken = this.$store.state.securityToken;

                await DocumentService.createDocument(newDocument, securityToken).then((response) => {
                    this.$emit('create');
                })




            },
            onShow(evt) {
                this.getDocumentTypes();
                this.document.name = "";
                this.document.longText = "";
            },
            onHidden(evt) {
                this.type.documentTypeProperties.length = 0
                this.document.name = "";
                this.document.longText = "";
                this.$emit('close')
            },
            getDocumentTypes: async function() {
                await DocumentTypeService.getDocumentTypes(this.indexRef).then((response) => {
                    this.documentTypes = response.data

                })
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }
      .ad-modal-body{
        height:600px;
        overflow:scroll;
    }

</style>
