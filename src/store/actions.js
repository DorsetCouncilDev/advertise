
import Sorting from './utils/sorting.js'
import SearchService from './../services/SearchService'
import DocumentTypeService from './../services/DocumentTypeService'
import DocumentService from './../services/DocumentService'
import GazetteerService from './../services/GazetteerService'

import _ from 'lodash'
const BASE = 'http://vmcrwebapptest2:18080/catalogue/v1/'
const SEARCH = 'indexes/advertising/documents'
const TYPES = 'indexes/advertising/documenttypes?'

const POSTCODESEARCH = 'http://vmcrwebapptest1:8080/gazetteer/rest/address/postcode/'

const mutation_setSearchResults = 'setSearchResults'

export const actions = {
/*
    search(context, param) {
        console.log("searchings")
        SearchService.search(param, context.state.searchCriteria, context.state.securityToken).then((response) => {
            context.commit("setSearchResults", response.data);
            if (context.state.showSearchForm)
                context.commit("toggleSearchForm");
        }, (error) => {
           
            console.log("error searching caught")
        });
    },
    
*/
    setSearchParamater(context, param) {

        console.log("parameter to set: " + param.reference);

        var newParameter = param;

        var updated = false
        var index = 0;
        var parameters = context.state.searchCriteria.parameters;

        parameters.forEach((parameter) => {
            console.log("current parameter: " + parameter.reference);

            if (parameter.reference == param.reference) {
                parameter.value = param.value;
                updated = true;
            }
        })
        if (!updated && (newParameter.value != null || newParameter.value.trim() != ""))
            parameters.push(param)

        context.commit("setSearchParameters", parameters)
    },
    async RemoveSearchParameter({
        dispatch,
        commit,
        context
    }, param) {
        var index = 0;
        var found = false;
        context.state.searchCriteria.parameters.forEach((param) => {
            if (param.reference == payload.reference) {
                found = true;
            }
            if (!found)
                index++;
        })
        await commit("removeSearchParameter", index)
        dispatch("search");
    },
    
    
    
    sortResultsByProperty(context, param) {
        console.log("set sort: " + param.sortValue)
        context.commit("setSort", param.sortValue);
        var sortedResults = Sorting.sortResultsByProperty(context.state.searchResults.results, param.sortProperty, param.sortType)
        context.commit("setSortResults", sortedResults)
    },
    sortResultsByBestMatch(context) {
        console.log("actions-sort best match")
        context.commit("setSort", "bestmatch");
        var sortedResults = Sorting.sortByBestMatch(context.state.searchResults.results)
        context.commit("setSortResults", sortedResults)
    },
    
    /*
    searchPostcode(context) {
        var searchCriteria = {};
        api.get("" + POSTCODESEARCH + this.state.postcode).then((response) => {
            var address = response.data.address[0];
            searchCriteria = {
                documentTypes: [],
                parameters: [
                    {
                        reference: "available",
                        value: true
                        }],
                location: {
                    latitude: address.latitude,
                    longitude: address.longitude,
                    unit: "MILE",
                    range: 5
                }
            }
            api.post("" + BASE + SEARCH, searchCriteria).then((response) => {
                context.commit("setSearchCriteria", searchCriteria);
                context.commit("setSearchResults", response.data);
                if (context.state.showSearchForm)
                    context.commit("toggleSearchForm");
            });
        })
    },
    
    */
    removeSearchCriteriaProperty(context, param) {
        var index = 0;
        var parameters = context.state.searchCriteria.parameters;
        for (index; index < parameters.length; index++) {
            if (parameters[index].reference == param)
                context.commit("removeSearchParameter", index)
        }
    },
 
    


    /*************************************************************************************************/

    
    // Set the search options on the form. based on document types available and those currently selected.
    async setDocumentTypesSearchOptions({dispatch,state,commit}, param) {
        var documentTypeOptions = [];
        await DocumentTypeService.getTypes(param).then((response) => {
            var types = response.data;
            var typesSelected = state.searchCriteria.documentTypes;
            types.forEach((type) => {
                if(typesSelected.length )
                    type.selected = false;
                if(_.includes(typesSelected,type.reference)){
                    type.selected = true;
                }
            })
             commit("setDocumentTypes",types)
        }) 
    },
    
    // Get the current selected document types selected for search
    getDocumentTypeSearchOptions(context) {
        return context.state.searchCriteria.documentTypes;
    },
    
    // A document type has been selected or deselected. recalculate types selected list.
    setTypesSearchChange({commit,dispatch},param){
        var typesSelected = []
        param.forEach((type)=>{
            if(type.selected){
                typesSelected.push(type.reference)
            }
        })
        commit("setDocumentTypeSearchParameters",typesSelected)
      
    },
    removeSearchDocumentType(context, param) {
        var typesSelected = context.state.searchForm.documentTypes
        typesSelected.forEach((type)=>{
            if(type.reference == param.reference)
                type.selected = false
        })
     
    },
    // new search 
    aSearch(context){
          SearchService.search(context.state.indexReference, context.state.searchCriteria).then((response) => {
                context.commit("setASearchResults",response.data.results)
              
              console.log("search results: " + response.data.numberOfResults)
              
            
        }, (error) => {
            /* TODO Handle error */
            console.log("error searching caught")
        });
    },
    
    setPostcodeSearchCriteria({state,commit,dispatch}){
        var postcode = state.searchForm.postcode; 
        console.log("postcode:: " + postcode)
    
        if(postcode != null && postcode != "" )
        {
            GazetteerService.search(postcode).then((response)=>{
            
                // Use first address from results - possible better way ?
                var address = response.data.address[0];  
            
                var location = {
                    "latitude": address.latitude,
                    "longitude": address.longitude,
                    "unit": "MILE",
                    "range": 3
                } 
                commit("setPostcodeSearchCriteria",location);
            dispatch("aSearch");
            })
            
        }
        else{
            var locationNull = null
            commit("setPostcodeSearchCriteria",locationNull);
            dispatch("aSearch");
        }
        
        
    },
    
    
    // Preperation for postcode only search - from homepage
    removeAllOtherSearchCriteria({state,dispatch}){
        dispatch("removeAllDocumentTypesFromSearchCriteria");
    },
    // Remove types to search postcode only 
    removeAllDocumentTypesFromSearchCriteria(context){
        var typesSelected = context.state.searchForm.documentTypes
        typesSelected.forEach((type)=>type.selected = false);
        context.commit("setDocumentTypes",typesSelected);
    }

}
