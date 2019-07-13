<template>
<div id="content">
  <SiteTopNav currentPage="searchPage"></SiteTopNav>


    <h1 id="searchTitle">Discover opportunities</h1>
    <div id="searchContainer">
        <SearchOptions :showSearchForm="showSearchForm"  @onChangeShowSearchForm="changeShowSearchForm" @onStartingSearch="setSearchingMessage" @onfinishedSearching="setFinishedSearching" @onSearch="search"  ></SearchOptions>
        <Assets  :searchMessage="searchMessage" :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm" @onSearch="search"></Assets>
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
                documents: [],
                showSearchForm: false,
                indexRef: "advertise",
                searchMessage: "",
                test:""
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
        components: {
            Toolbar,
            Assets,
            SearchOptions
        },
        computed: {
            view() {
                return this.$store.state.view;
            }
        },
        methods: {
            async search() {
                this.setSearchingMessage();
                await this.$store.dispatch("search");
                this.setFinishedSearching();
            },
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
        beforeMount(){
            if(this.$route.query.postcode){
                this.$store.dispatch("setLocationSearchOnly");
                     this.search();
                this.setFinishedSearching();
            }
            else{
              this.$store.commit("SET_NO_ADDRESS",false);
            }
            if(this.$route.query.documentType != null){
               this.$store.dispatch("setSingleDocumentTypeOnlySearch",this.$route.query.documentType);
                 this.search();
                this.setFinishedSearching();
            }
             if(this.$route.query.view)
                this.$store.commit("SET_VIEW",this.$route.query.view);
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
