<template>
<div id="content">
    <div id="navRow">
        <div id="navLinks">
            <ol class="ad-breadcrumb">
                <li><router-link :to="{ path: '/advertise'}">home</router-link></li>
                <li aria-current="page">search</li>     
            </ol>
        </div>
        <div id="menuLinks">
            <ul id="menuList">
                <li><router-link to="/advertise/info/contact">Contact us</router-link></li>
                <li><router-link to="/advertise/info/mediapack">Media pack</router-link></li>
                <li><router-link to="/advertise/info/faq">FAQs</router-link></li> 
            </ul> 
        </div>
    </div>
 

    <h1 id="searchTitle">Discover opportunities</h1>
    <div id="searchContainer">
        <SearchOptions :searchPostcode="postcode" :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm" @onStartingSearch="setSearchingMessage" @onfinishedSearching="setFinishedSearching"></SearchOptions>
        <Assets  :searchMessage="searchMessage" :showSearchForm="showSearchForm" :docs="documents" @onChangeShowSearchForm="changeShowSearchForm" ></Assets>
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
                indexRef: "advertise",
                postcode:"",
                searchMessage: ""
            }
        },
        metaInfo () {
            return {
                title: "Find advertising options in Dorset | Dorset Council" ,
                meta: [ {
                    name:"description", content:"Find cost effective local advertising locations in Dorset.  Promote your business with Dorset Council by sponsoring a roundabout or advertising in Dorset."

                } ]
            }
        },
         props: [ 'documentTypeRef','initialView'],
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
         
            setSearchingMessage:function(){
                this.searchMessage = "Searching opportunities"
            },
            setFinishedSearching:function(){
                this.searchMessage = "Finished searching";
            },
            changeShowSearchForm: function() {
                this.showSearchForm = !this.showSearchForm
            }

    },
        async beforeMount(){
            var searchSingleType;
            if(this.$store.state.advertiseIndex == null){
                await this.$store.dispatch("setAdvertiseIndex",this.indexRef)
            }
            
   
            if(this.documentTypeRef != null)
                this.$store.commit("setSingleDocumentTypeSearch",this.documentTypeRef);

            this.postcode = this.$store.state.advertiseSearchPostcode;
           

            if(this.initialView != null){
                var view = this.initialView + "View";
                this.$store.commit("setView",view)
            }
   
                
            this.$store.dispatch("advertiseSearch");

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
       align-items: start;
    }
          
         
    }

</style>
