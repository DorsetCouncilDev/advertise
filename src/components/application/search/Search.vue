<template>
<div id="content">
  <SiteTopNav currentPage="searchPage"></SiteTopNav>


    <h1 id="searchTitle">Discover opportunities</h1>
    <div id="searchContainer">
        <SearchOptions :showSearchForm="showSearchForm" :isSearching="isSearching"  @onSearch="search" @onChangeShowSearchForm="changeShowSearchForm"></SearchOptions>
        <Assets :showSearchForm="showSearchForm" :isSearching="isSearching" @search="search" @onChangeShowSearchForm="changeShowSearchForm"></Assets>
    </div>
</div>
</template>



<script>
    import Toolbar from './Toolbar';
    import Assets from './Assets';
    import SearchOptions from './SearchOptions';
    import DocumentTypeService from '../../../services/DocumentTypeService';
    import DocumentService from '../../../services/DocumentService';
 import advertiseService from '../../../services/AdvertiseService';

      export default {
        name: 'Search',
        data() {
            return {
                map: null,
                showSearchForm: false,
                isSearching:true
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
            Toolbar,Assets,SearchOptions
        },

        computed: {
            view() {
                return this.$store.state.view;
            }
        },
        methods: {

          search(params){
            this.isSearching = true;

            if(params.location){

              if(!params.location.latitude)
                  delete params.location;
            }
                  advertiseService.search(params).then((response)=>{

                 this.$store.commit("SET_SEARCH_RESULTS",response.data);
              this.$store.commit("SET_SEARCH_PARAMS",params);
                  this.isSearching = false;
                  this.showSearchForm = false;
              })
              .catch((err)=>{
                console.log(err);
                  this.$store.commit("SET_SEARCH_PARAMS",params);
                  this.isSearching = false;
                  this.showSearchForm = false;

              })



          },
          changeShowSearchForm: function() {
                this.showSearchForm = !this.showSearchForm
            }
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
