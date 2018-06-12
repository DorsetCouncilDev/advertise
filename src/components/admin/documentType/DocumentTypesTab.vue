<template>
   <div>
        <h2 class="display-4">Asset types</h2> 
             
        <b-list-group>
            <b-list-group-item :button="true" v-for="documentType in documentTypes" :key="documentType.id" @click="openViewModal(documentType)">{{documentType.name}}</b-list-group-item>
        </b-list-group>
            
        <button class="btn btn-primary mt-5" @click="openNewDocumentTypeViewModal">Create new asset type</button>
  
        <ViewDocumentTypeModal :indexRef="indexRef" :show="showViewModal" :documentType="currentDocumentType" :properties="properties" @close="onCloseViewModal" @updated="onUpdated" ></ViewDocumentTypeModal>
         
        <NewDocumentTypeModal :indexRef="indexRef" :show="showNewDocumentTypeModal" @close="onCloseNewDocumentTypeViewModal" @created="onCreated"></NewDocumentTypeModal>
       
    </div>
</template>


<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import ViewDocumentTypeModal from './ViewDocumentTypeModal'
    import NewDocumentTypeModal from './NewDocumentTypeModal'
    
    export default {

        name: 'DocumentTypesTab',
        components: {
            ViewDocumentTypeModal, NewDocumentTypeModal
        },
        props: {
            indexRef: {
                type: String,
                required: true
            },
            documentTypes:{
                type:Array,
                required:true
            },
            properties:{
                type: Array,
                required: true
            }
        },
        data() {
            return {
                currentDocumentType: {},
                showViewModal: false,
                showNewDocumentTypeModal: false
            }
        },

        methods: {
            openViewModal: function(docType){
                this.currentDocumentType = docType
                    this.showViewModal = true
                /*
                this.currentDocumentType.name = docType.name;
                this.currentDocumentType.longText = docType.longText;
                this.currentDocumentType.reference = docType.reference;
                this.showViewModal = true
                */
            },
            onCloseViewModal: function() {
                this.showViewModal = false
                this.currentDocumentType = {}
            },
            
            onCloseNewDocumentTypeViewModal: function() {
                this.showNewDocumentTypeModal = false;
            },
            onCreated: function() {
                this.showNewDocumentTypeModal = false;
                this.$emit('updated')  
            },
         
            onUpdated: function() {
                this.$emit('updated') 
                 this.showViewModal = false
                this.currentDocumentType = {}
            },
       
            onDocumentTypeUpdate: async function(){
                this.$emit('update')
                 this.showNewDocumentTypeModal = false;
            },
         
            openNewDocumentTypeViewModal: function(){
                this.currentDocumentType.name = "";
                this.currentDocumentType.longText = "";
                this.currentDocumentType.reference = "";
                this.showNewDocumentTypeModal = true;
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4{
        font-size:32px;
    }

</style>
