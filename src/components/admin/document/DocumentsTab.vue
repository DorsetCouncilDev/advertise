<template>
<div class="assets-list-tab">
<h2 class="display-4 document-list-heading">Assets list</h2>
<button class="btn btn-primary mt-3 mb-3"  @click="openNewDocumentModal()">Create new asset</button>
<div v-if="documents.length > 0">
    <div class="row">
        <div class="input-group mb-3 mt-4 col-sm-4" title="search for asset by name">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><img src="../../../assets/images/search-black.svg"></img></span>
            </div>
            <input type="text" class="form-controlt" id="searchDocument" placeholder="Asset name" aria-label="Username" aria-describedby="basic-addon1" v-model="searchQuery">
        </div>
    </div>
      
<div class="row">
    <div class="col-sm-10">
        <table class="table">
            <thead>
                <tr>
                    <th class="sortable-head" @click="sort('name','asc')"><img src="../../../assets/images/order-swap.svg"> Name</th>
                    <th class="sortable-head" @click="sort('documentType','asc')"><img src="../../../assets/images/order-swap.svg"> Type</th>
                    <th>Locations</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody name="fade-list" is="transition-group">
                <tr v-for="document in filteredBySearch" :key="document.reference">
                    <td><span class="view-link" @click="openDocumentViewModal(document)">{{document.name}}</span></td>
                    <td>{{document.documentType}}</td>
                    <td class="locations-column"><router-link :to="{path: '/advertise/admin/indexes/' + indexRef + '/' + document.reference + '/locations'}">{{document.publishedVersion.locations.length}}</router-link></td>
                    <td> <span  v-if="document.publishedVersion != null && document.publishedVersion.published" class="text-success">published</span><span v-else> unpublished</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</div>
            
<NewDocumentModal  :indexRef="indexRef" :show="showNewDocumentModal" @created="onCreated" @close="onCloseNewDocumentModal" @create="create"></NewDocumentModal>
        
<ViewDocumentModal :docRef="currentDocumentRef" :indexRef="indexRef" :show="showDocumentViewModal" :locationAdded ="locationAdded" :locationUpdated="locationUpdated"  @deleted="onDocumentDeleted" @close="onCloseDocumentViewModal" @update="updateDocument" @locationAdded="addLocation" @locationUpdated="locationUpdate" @locationDeletion="deleteLocation" ></ViewDocumentModal>                                                                                          
</div>
</template>


<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import _ from 'lodash'
    import IndexService from '../../../services/IndexService'
    import DocumentService from '../../../services/DocumentService'
    import ViewDocumentModal from './ViewDocumentModal'
    import NewDocumentModal from './NewDocumentModal'
    import InfoMessage from '../../info-message'
    import ManageLocations from './ManageLocations'
    export default {

        name: 'DocumentsTab',
        props: {
            indexRef: {
                type: String,
                required: true
            },
            documents: {
                type: Array,
                required: true
            }
        },
        components: {
            ViewDocumentModal,
            NewDocumentModal,
            InfoMessage
        },
        data() {
            return {
                currentDocumentRef: "",
                showDocumentViewModal: false,
                showNewDocumentModal: false,
                locationAdded: false,
                locationUpdated: false,
                locationRef: "",
                info: {
                    show: false,
                    message: "",

                },
                orderBy: 'name',
                orderOption: 'asc',
                searchQuery: ''
            }
        },
        computed: {
            filteredBySearch: function() {
                let self = this
                return this.sortedAssets.filter((asset) => (
                    asset.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1
                ))
            },
            sortedAssets: function() {
                return _.orderBy(
                    this.documents,
                    this.orderBy,
                    this.orderOption
                )
            }
        },
        methods: {
            sort: function(by, option) {
                if (this.orderBy == by) {
                    if (this.orderOption == 'asc') {
                        this.orderOption = 'desc'
                    } else if (this.orderOption == 'desc') {
                        this.orderOption = 'asc'
                    }
                } else {
                    this.orderOption = option;
                    this.orderBy = by;
                }
            },
            onDocumentDeleted() {
                this.$emit('updated')
                this.currentDocumentRef = ""
                this.showDocumentViewModal = false
            },
            onDocumentUpdated() {
                this.$emit('updated')
                this.currentDocumentRef = ""
                this.showDocumentViewModal = false
            },
            openNewDocumentModal() {
                this.showNewDocumentModal = true
            },
            onCloseNewDocumentModal() {
                this.showNewDocumentModal = false
            },
            onCreated() {
                this.showNewDocumentModal = false
                this.$emit('updated')
            },
            openDocumentViewModal(doc) {
                this.currentDocumentRef = doc.reference
                this.showDocumentViewModal = true
            },
            onCloseDocumentViewModal() {
                this.currentDocumentRef = ""
                this.showDocumentViewModal = false
            },
            create(newDocument) {
                this.info.show = true;
                this.info.message = "New asset created"
                this.$emit('updated');
                this.showNewDocumentModal = false;

            },
            async updateDocument() {
                this.$emit('updated');

            },
            async addLocation(locationRequest) {

                var securityToken = this.$store.state.securityToken;
                await DocumentService.createLocation(locationRequest, securityToken).then(async (response) => {
                    await DocumentService.publishLatestVersion(locationRequest.indexRef, locationRequest.documentRef, securityToken).then((response) => {
                        this.locationAdded = true;
                        this.locationRef = response
                        this.$emit('updated')
                    })
                })
            },
            async locationUpdate(locationRequest) {
                var securityToken = this.$store.state.securityToken;
                await DocumentService.updateLocation(locationRequest, securityToken).then(async (response) => {
                    await DocumentService.publishLatestVersion(locationRequest.indexRef, locationRequest.documentRef, securityToken).then((response) => {
                        this.locationUpdated - true;
                        this.$emit("updated")
                    })
                })
            },
            async deleteLocation(locationRequest) {
                var securityToken = this.$store.state.securityToken;
                await DocumentService.deleteLocation(locationRequest, securityToken).then(async (response) => {
                    await DocumentService.publishLatestVersion(locationRequest.indexRef, locationRequest.documentRef, securityToken).then((response) => {
                        this.locationUpdated - true;
                        this.$emit("updated")
                    })
                })
            }
        }
    }

</script>

<style scoped lang="scss">
    #searchDocument {
        border: none;
        background-color: #fafafa;
        padding: 10px;
        &:focus {
            background-color: #fafafa;
            outline: none;
            box-shadow: 0 4px 2px -2px gray;
        }
    }

    .input-group-text {
        border: none;
        background-color: #fafafa;
    }

    .sortable-head {
        white-space: nowrap;
    }

    .locations-column {
        text-align: center;
    }

    .document-list-heading {
        font-size: 32px;
    }

    b-list-group-item {
        &:hover {
            cursor: pointer;
        }
    }

    #infoMessageHolder {}

    .view-link {
        color: #005ea5;
        &:hover {
            color: #003259;
            cursor: pointer;
            text-decoration: underline;
        }
    }

    .fade-list {
        transition: all 2s;
    }

    .fade-list-move {
        opacity: 0.7;
        color: grey;
        transition: all .3s;
    }

    .fade-list-move {
        transition: transform 0.25s ease;
    }

    .fade-list-leave-to {
        transition: all 0.5s ease;
        opacity: 0;
    }

</style>
