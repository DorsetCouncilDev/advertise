<template>
<div>
    <div class="info">
        <div class="contact"> email <a href="mailto:marketing@dorsetcc.gov.uk">
          marketing@dorsetcc.gov.uk</a> - tel.
          <a href="tel:+18506484200">01305224125</a>
        </div>
        <ol class="ad-breadcrumb">
            <li aria-current="page">
                <router-link :to="{ path: '/'}">home</router-link>
            </li>
            <li aria-current="page">search</li>   
        </ol>
    </div>
    <h1>Discover opportunities</h1>
    <div id="searchContainer">
        <SearchOptions  :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm"></SearchOptions>
        <Assets  :showSearchForm="showSearchForm" :docs="documents" @onChangeShowSearchForm="changeShowSearchForm" ></Assets>
    </div>
</div>
</template>



<script>
    import Toolbar from './Toolbar';
    import Assets from './Assets';
    import SearchOptions from './SearchOptions';

    import DocumentTypeService from '../../../services/DocumentTypeService';
    import DocumentService from '../../../services/DocumentService';
    import SecurityService from '../../../services/SecurityService'

    export default {
        name: 'Search',
        data() {
            return {
                map: null,
                documentTypes: [],
                searchResults: {
                    results: [],
                    numberOfResults: 0
                },
                documents: [],
                showSearchForm: false,
                indexRef: "advertise"
            }
        },
        components: {
            Toolbar,
            Assets,
            SearchOptions
        },
        computed: {
            view() {
                return this.$store.state.view
            }
        },
        methods: {
            getDocumentTypes: async function() {
                await DocumentTypeService.getTypes(this.indexRef).then((response) => {
                    this.documentTypes = response.data;
                    this.getDocuments();
                }, (error) => {
                    console.log("Error getting document types")
                })
            },

            getDocuments: function() {
                this.documentTypes.forEach(async(type) => {
                   await DocumentService.getDocuments(this.indexRef, type.reference).then((response) => {
                        var currentDocuments = response.data;
                        currentDocuments.forEach((doc) => {
                            this.documents.push(doc);
                        })
                    },(error)=>{
                        console.log("Error getting initial documents")
                    })
                })
            },
            changeShowSearchForm: function() {
                this.showSearchForm = !this.showSearchForm
            }

    },
         created(){
            this.getDocumentTypes();
             
            if(!this.$store.state.initialSearch)
                this.$store.dispatch("setInitialDocumentTypesSearchOptions",this.indexRef)
             else
                this.$store.dispatch("setDocumentTypesSearchOptions",this.indexRef); 
             
            this.$store.commit("setIndexReference",this.indexRef);
            
        }
    }

</script>


<style scoped lang="scss">
    #searchContainer {
        display: flex;
    }

    h1 {
        font-size: 26px;
        margin-bottom: 20px;
    }

    #mapView {
        width: 700px;
        height: 700px;
    }
    .contact{float:right;}
    @media only screen and (min-width: 805px) {
        h1{font-size:32px;}
    }

</style>
