<template>
<div id="searchCriteria" :class="{'hide-search-criteria': isSearching}" >
        <h2 id="numberOfResultsMessage">{{numberOfResultsMessage}}</h2>
        <div id="criteriaTagContainer">
            <div v-for="documentType in documentTypes" class="criteria-tag" v-bind:key="documentType">
                <span class="criteria-name">{{documentType}}</span>
                <span role="button" class="remove-criteria" @click="removeDocumentType(documentType)" tabindex="0" title="'Remove'">X</span>     
            </div>
            <div v-show="isLocationSearch" class="criteria-tag">
                <span class="criteria-name">Postcode: <span :class="{'no-postcode-found' : noAddressesFound}">{{postcodeSearched}}</span></span>
                <span role="button" class="remove-criteria" tabindex="0" @click="removeLocationSearch()" title="'Remove'">X</span>     
            </div>
               <div v-show="$store.state.searchAvailable" class="criteria-tag">
                <span class="criteria-name">Available only</span>
                <span role="button" class="remove-criteria" tabindex="0" @click="removeAvailableSearch()" title="'Remove'">X</span>     
            </div>
        </div>
        <h2 v-show="noAddressesFound" id="noAddressFound">We can not find that postcode</h2>
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
            "numberOfResults",
            "searchMessage"

        ],
        methods: {
            removeProperty: function(propertyToRemove) {

            },
            removeDocumentType: function(type) {
                this.$store.commit("DESELECT_DOCUMENT_TYPE",type);
                this.$emit("onSearch")
            },
            removePostcodeSearch: function() {

            },
            toggleSearchForm() {
                this.$emit("onChangeShowSearchFom", !this.showSearchForm)
            },
            removeLocationSearch(){
                this.$store.commit("SET_POSTCODE","")
                this.$emit("onSearch")
            },
            removeAvailableSearch(){
                this.$store.commit("SET_AVAILABLE",false);
                this.$emit("onSearch");
            }
            
           
        },
        computed: {
             documentTypes(){
                return this.$store.state.searchParameters.documentTypes;
            },
            isLocationSearch() {
                return this.$store.state.isLocationSearched;
            },
    
            numberOfResultsMessage(){
                if(this.numberOfResults == 1)
                    return "1 Opportunity found";
                if(this.numberOfResults > 1)
                    return this.numberOfResults + " Opportunities found";
            },
            postcodeSearched(){
                return this.$store.state.searchedPostcode;
            },
            isSearching(){
                return this.searchMessage == 'Searching opportunities';
            },
            isSearchedAvailable(){
                return this.$store.state.searchAvailable;
            },
            noAddressesFound(){
                return this.$store.state.noAddressesFound;
            }
        }
    }

</script>

<style scoped lang="scss">
.no-postcode-found{
    text-decoration: line-through;
}
#noAddressFound{
    font-size:22px;
    text-align:center;
    color:darkred;
}
   #searchCriteria{
       background:#fafafa;
       padding:15px;
       transition:opacity .8s;
       &.hide-search-criteria{
           opacity:.4;
       }
       #numberOfResultsMessage{
           font-size:19px;
           text-align: center;
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
