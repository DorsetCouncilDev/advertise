<template>
   <div>
        <h2 class="display-4">Assets list</h2>
       
       <button class="btn btn-primary mt-3 mb-3"  @click="openNewDocumentModal()">Create new asset</button>
       
       <transition name="component-fade" mode="out-in">
           <div class="row">
               <div class="col-sm-7">
         <b-list-group>   
           <b-list-group-item class="d-flex justify-content-between align-items-center" :button="true" v-for="document in documents" :key="document.id"  @click="openDocumentViewModal(document)">
                  {{document.name}}  
               <b-badge variant="light" pill v-if="document.publishedVersion != null && document.publishedVersion.published">published</b-badge>
               <b-badge variant="danger" v-else> unpublished</b-badge>
        </b-list-group-item>
           </b-list-group>
                   </div>
    </div>
        </transition>

       <button class="btn btn-primary mt-3"  @click="openNewDocumentModal()">Create new asset</button>
        
       <NewDocumentModal  :indexRef="indexRef" :show="showNewDocumentModal" @created="onCreated" @close="onCloseNewDocumentModal" @create="create"></NewDocumentModal>
        
       <ViewDocumentModal :docRef="currentDocumentRef" :indexRef="indexRef" :show="showDocumentViewModal" :locationAdded ="locationAdded" :locationUpdated="locationUpdated"  @deleted="onDocumentDeleted" @close="onCloseDocumentViewModal" @update="updateDocument" @locationAdded="addLocation" @locationUpdated="locationUpdate" @locationDeletion="deleteLocation" ></ViewDocumentModal>                                                                                          

    </div>
</template>


<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import IndexService from '../../../services/IndexService'
    import DocumentService from '../../../services/DocumentService'
    import ViewDocumentModal from './ViewDocumentModal'
    import NewDocumentModal from './NewDocumentModal'
    export default {
        
        name: 'DocumentsTab',
        props: {
            indexRef: {
                type: String,
                required: true
            },
            documents:{
                type:Array,
                required:true
            }
        },
        components: {
            ViewDocumentModal,NewDocumentModal
        },
        data() {
            return {
                currentDocumentRef: "",
                showDocumentViewModal: false,
                showNewDocumentModal:false,
                locationAdded:false,
                locationUpdated:false,
                locationRef: ""
            }
        },

        methods: {

            onDocumentDeleted(){
                this.$emit('updated')
                this.currentDocumentRef = ""
                this.showDocumentViewModal = false
            },
            onDocumentUpdated(){
                this.$emit('updated')
                this.currentDocumentRef = ""
                this.showDocumentViewModal = false
            },
            openNewDocumentModal(){
                this.showNewDocumentModal = true
            },
            onCloseNewDocumentModal(){
                this.showNewDocumentModal = false  
            },
            onCreated(){
                 this.showNewDocumentModal = false
                this.$emit('updated')
            },
            openDocumentViewModal(doc){
                 this.currentDocumentRef = doc.reference
                this.showDocumentViewModal = true
            },
            onCloseDocumentViewModal(){
                this.currentDocumentRef = ""
                this.showDocumentViewModal = false
            },
            create(newDocument){

            this.$emit('updated');
                this.showNewDocumentModal = false;

            },
            async updateDocument(){
                 this.$emit('updated');
                
            },
            async addLocation(locationRequest){
         
                var securityToken = this.$store.state.securityToken;
                await DocumentService.createLocation(locationRequest,securityToken).then(async(response)=>{
                    await DocumentService.publishLatestVersion(locationRequest.indexRef,locationRequest.documentRef,securityToken).then((response)=>{
                        this.locationAdded = true;
                        this.locationRef = response
                        this.$emit('updated')
                    })
                })  
            },
            async locationUpdate(locationRequest){
                var securityToken = this.$store.state.securityToken;
                await DocumentService.updateLocation(locationRequest,securityToken).then(async(response)=>{
                    await DocumentService.publishLatestVersion(locationRequest.indexRef,locationRequest.documentRef,securityToken).then((response)=>{
                        this.locationUpdated - true;
                        this.$emit("updated")
                    })
                })  
            },
            async deleteLocation(locationRequest){
                var securityToken = this.$store.state.securityToken;
                await DocumentService.deleteLocation(locationRequest,securityToken).then(async(response)=>{
                    await DocumentService.publishLatestVersion(locationRequest.indexRef,locationRequest.documentRef,securityToken).then((response)=>{
                        this.locationUpdated - true;
                        this.$emit("updated")
                    })
                })  
            }
        }
    }


</script>

<style scoped lang="scss">
    h2.display-4{
        font-size:32px;
    }
    b-list-group-item{
        &:hover{
            cursor:pointer;
        }
    }

</style>
