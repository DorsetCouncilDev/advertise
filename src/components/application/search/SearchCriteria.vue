<template>
<div id="searchCriteria" >
        <h2 id="numberOfResultsMessage" v-show="!isSearching && ((isLocationSearch && numberOfResults > 0) || !isLocationSearch)">{{numberOfResultsMessage}}</h2>
        <div id="criteriaTagContainer">
            <div v-for="documentType in documentTypes" class="criteria-tag" v-bind:key="documentType">
                <span class="criteria-name">{{documentType}}</span>

            </div>

               <div v-show="isSearchAvailableOnly" class="criteria-tag">
                <span class="criteria-name">Available only</span>

            </div>
        </div>
        <div v-show="isNoAddressesFound && !isSearching" class="noAddressFound" role="alert">Postcode not recognised</div>
         <div v-show="isInvalidPostcode && !isSearching" class="noAddressFound" role="alert">Invalid postcode</div>
        <div v-show="isLocationSearch && numberOfResults == 0 && !isSearching" class="noAddressFound" role="alert">No opportunities found within 10 miles of {{postcode}}</div>
</div>
</template>

<script>
    import Vuex from 'vuex'
    import Toolbar from './Toolbar'
    export default {
        name: 'SearchCriteria',
        props: [
            "parameters",
            "documnetTypes",
            "location",
            "isSearching"
        ],
        methods: {
            removeProperty: function(propertyToRemove) {

            },
            removeDocumentType: function(type) {
                this.$store.commit("DESELECT_DOCUMENT_TYPE",type);
                //this.$emit("onSearch")
            },

            toggleSearchForm() {
                this.$emit("onChangeShowSearchFom", !this.showSearchForm)
            },
        removeLocationSearch(){
               this.$store.dispatch("removeisLocationSearch");


 this.$emit("search");
            },
            removeAvailableSearch(){
                this.$store.commit("SET_AVAILABLE",false);

                // this.$emit("onSearch");
            }
        },
        computed: {
          documentTypes(){
            return this.$store.state.searchParams.documentTypes;
          },
          postcode(){
            return this.$store.state.postcode;
          },
          numberOfResults(){
            return this.$store.state.searchResults.length;
          },
          numberOfResultsMessage(){
            var numberOfResults = this.numberOfResults;
            var resultsMessage = "";
            if(numberOfResults == 0)
              resultsMessage = "No opportunities found";
            else if(numberOfResults == 1)
              resultsMessage = "1 Opportunity found";
            else if(numberOfResults > 1)
              resultsMessage = numberOfResults + " Opportunities found";

            if(this.isLocationSearch && numberOfResults > 0)
              resultsMessage += " within 10 miles of " + this.postcode;



            return resultsMessage;
          },

            isSearchAvailableOnly(){
              if(this.$store.state.searchParams && this.$store.state.searchParams.properties && this.$store.state.searchParams.properties.Available)
                return true;
              return false;
            },

            isInvalidPostcode(){
              return this.$store.state.isInvalidPostcode;
            },
            isNoAddressesFound(){
              return this.$store.state.isNoAddressesFound;
            },
            isLocationSearch() {
              return this.$store.state.isLocationSearch;
            }

        }
    }

</script>

<style scoped lang="scss">
#postcode{
  font-weight:700;
}
.no-postcode-found{
    text-decoration: line-through;
}
.noAddressFound{
    font-size:22px;
    text-align:center;
    color:darkred;
    margin-top:10px;
}
   #searchCriteria{
       background:#fafafa;
       padding:15px;
      // transition:opacity .8s;

       #numberOfResultsMessage{
           font-size:19px;
           text-align: center;
           font-weight:500;
           color:#2a2a2a;
       }
       #criteriaTagContainer{
           display:flex;
           flex-wrap: wrap;
           justify-content: center;
       }
       .criteria-tag{
           margin-right:15px;
           margin-bottom:5px;
           font-size:16px;
           border-bottom:grey solid 1px;
           &:hover{
                .remove-criteria{
                    color:black;
                    &:hover{
                        font-weight: 700;
                        color:darkred;
                        cursor:default;
                    }
                }
            }
            .criteria-name{
                height:22px;
            }
            .remove-criteria{
                color:#545454;
            }
       }
   }

  @media only screen and (max-width: 1000px) {
        #searchCriteria{
            #criteriaTagContainer{
                display: none;
            }
        }
    }
</style>
