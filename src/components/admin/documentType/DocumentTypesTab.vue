<template>
   <div>
        <h2 class="display-4">Asset types</h2> 
             
        <b-list-group>
            <b-list-group-item :button="true" v-for="documentType in documentTypes" :key="documentType.id" @click="openViewModal(documentType.reference)">{{documentType.name}}</b-list-group-item>
        </b-list-group>
            
        <button class="btn btn-primary mt-5" @click="openNewDocumentTypeViewModal">Create new asset type</button>
  
        <ViewDocumentTypeModal :indexRef="indexRef" :show="showViewModal" :documentTypeRef="currentDocumentTypeRef" :properties="properties" @close="onCloseViewModal" @updated="onUpdated" ></ViewDocumentTypeModal>
         
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
                currentDocumentTypeRef: "",
                showViewModal: false,
                showNewDocumentTypeModal: false
            }
        },
        methods: {
            openViewModal: function(docTypeRef){
                console.log("dtype: " + docTypeRef)
                this.currentDocumentTypeRef = docTypeRef
                this.showViewModal = true
            },
            onCloseViewModal: function() {
                this.showViewModal = false
                this.currentDocumentTypeRef = ""
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
            },
       
            onDocumentTypeUpdate: async function(){
                this.$emit('update')
                this.showNewDocumentTypeModal = false;
            },
         
            openNewDocumentTypeViewModal: function(){
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
