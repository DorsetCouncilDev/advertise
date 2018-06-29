<template>
<div>
    <ol class="breadcrumb">
   
        <li class="breadcrumb-item" aria-current="page"><router-link to="/advertise/admin/indexes">Indexes</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{index.name}}</li>
    </ol>
    <h1>{{index.name}}</h1>

    <b-tabs>
        <b-tab title="Details" active>
           <IndexTab v-bind:index="index" @updated="onUpdateIndex"></IndexTab>
        </b-tab>
        <b-tab title="Assets">
          <DocumentsTab  v-bind:indexRef="indexRef" v-bind:documents="documents" v-on:updated="onDocumentUpdate"></DocumentsTab>
        </b-tab>
       <b-tab title="Assset types">
            <DocumentTypesTab v-bind:indexRef="indexRef" v-bind:documentTypes="index.documentTypes" :properties="index.properties" v-on:updated="onDocumentTypeUpdate" v-on:update="onDocumentUpdate"></DocumentTypesTab>
        </b-tab>
        
        <b-tab title="Asset properties">
             <PropertiesTab v-bind:indexRef="indexRef" v-bind:properties="index.properties" v-on:updated="onPropertyUpdate"></PropertiesTab>
        </b-tab>
    </b-tabs>
  
    
 <!--  <router-link :to="{path:'/admin/indexes/' + indexRef + '/assets'}">Assets</router-link>  -->
    
    

</div>
</template>


<script>
    import _ from 'lodash'
    
    // api services
    import IndexService from '../../../services/IndexService'
    import DocumentService from '../../../services/DocumentService'

    // Tab content
    import DocumentsTab from '../document/DocumentsTab'
    import DocumentTypesTab from '../documentType/DocumentTypesTab'
    import PropertiesTab from '../property/PropertiesTab'
    import IndexTab from './IndexTab'

    export default {
        name: 'Index',
        props: ['indexRef'],
        components: {
            DocumentsTab,
            DocumentTypesTab,
            PropertiesTab,
            IndexTab
        },
        data() {
            return {
                index: {
                    documentTypes: [],
                    properties: []
                },
                documents: []
            }
        },

        methods: {
             onDocumentUpdate: function(){
       
                  this.getIndex(this.indexRef);
            },
            onPropertyUpdate: function(){
         
                  this.getIndex(this.indexRef);
            },
            onDocumentTypeUpdate: function(){
        
                this.getIndex(this.indexRef);
            },
            onUpdateIndex: function(ref) {
                this.$router.push("/admin/indexes/" + ref)
                this.documents = []

                this.getIndex(ref);
            },
            getDocuments: async function(typeRef) {
              return DocumentService.getDocuments(this.indexRef, typeRef);

            },

            getIndex: async function(ref) {
                await IndexService.getIndex(ref).then((response) => {
                    this.index = response.data;
                    this.documents = [];
                    this.index.documentTypes.forEach(async(type) => {
                        await this.getDocuments(type.reference).then((response)=>{
             
                            response.data.forEach((doc)=>{
                                console.log("reload documents")
                                this.documents.push(_.cloneDeep(doc))
                            })       
                        })
                    })
                })    
            }
        },
        created: function() {

            this.getIndex(this.indexRef);
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }

    .collapseLink {
        color: black;

        &:hover {
            text-decoration: none;
        }

        &:before {
            content: '+';
            margin-right: 10px;


        }
        &[aria-expanded=true] {
            &:before {
                content: '-';
                top: 0;

            }
        }
    }

</style>
