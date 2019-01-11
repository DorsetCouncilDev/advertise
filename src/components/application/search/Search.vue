<template>
<div>
     <div class="info">
        <div class="contact"> 
            <span id="emailContact">email <a href="mailto:marketing@dorsetcc.gov.uk">marketing@dorsetcc.gov.uk</a></span> 
            <span id="telContact">tel. <a href="tel:+441305224125">01305 224125</a></span>
            <div id="menuLinksTwo">
                <router-link to="/advertise/info/contact">Contact us</router-link> 
                <router-link to="/advertise/info/mediapack">Media pack</router-link> 
            </div>
        </div>
        <div id="navRow">
            <div id="navLinks">
                <ol class="ad-breadcrumb">
                      <li><router-link :to="{ path: '/advertise'}">home</router-link></li>
                    <li aria-current="page">search</li>     
                </ol>
            </div>
            <div id="menuLinksOne">
                <router-link to="/advertise/info/contact">Contact us</router-link> 
                <router-link to="/advertise/info/mediapack">Media pack</router-link> 
            </div>
        </div>
    </div>

    <h1 id="searchTitle">Discover opportunities</h1>
    <div id="searchContainer">
        <SearchOptions  :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm"></SearchOptions>
        <Assets :showSearchForm="showSearchForm" :docs="documents" @onChangeShowSearchForm="changeShowSearchForm" ></Assets>
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

     
            changeShowSearchForm: function() {
                this.showSearchForm = !this.showSearchForm
            }

    },
         created(){
             
            if(!this.$store.state.initialSearch)
                this.$store.dispatch("setInitialDocumentTypesSearchOptions",this.indexRef)
             
             
            this.$store.commit("setIndexReference",this.indexRef);
            
        }
    }

</script>


<style scoped lang="scss">
    #searchTitle{
        margin-bottom:4px;
    }

    h1 {
        font-size: 26px;
        margin-bottom: 0;
    }

    #mapView {
        width: 700px;
        height: 700px;
    }

    @media only screen and (min-width: 805px) {
        h1{font-size:32px;
         margin-bottom: 20px;}
    }
    
      @media only screen and (min-width: 900px) {
           #searchContainer {
       display:flex;
    }
          
         
    }

</style>
