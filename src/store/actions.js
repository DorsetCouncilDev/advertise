import Sorting from './utils/sorting.js'
import SearchService from './../services/SearchService'
import DocumentTypeService from './../services/DocumentTypeService'
import DocumentService from './../services/DocumentService'
import GazetteerService from './../services/GazetteerService'
import AdvertiseService from './../services/AdvertiseService'
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
        var newParameter = param;

        var updated = false
        var index = 0;
        var parameters = context.state.searchCriteria.parameters;

        parameters.forEach((parameter) => {
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
    async setDocumentTypesSearchOptions({
        dispatch,
        state,
        commit
    }, param) {
        var documentTypeOptions = [];
        await DocumentTypeService.getTypes(param).then((response) => {
            var types = response.data;
            var typesSelected = state.searchCriteria.documentTypes;
            types.forEach((type) => {
                if (typesSelected.length)
                    type.selected = false;
                if (_.includes(typesSelected, type.reference)) {
                    type.selected = true;
                }
            })
            commit("setDocumentTypes", types)
        })
    },


    // Set the search options on the form. based on document types available and those currently selected.
    async setInitialDocumentTypesSearchOptions({
        dispatch,
        state,
        commit
    }, param) {
        var documentTypeOptions = [];
        await DocumentTypeService.getTypes(param).then((response) => {
            var types = response.data;
            var typesSelected = state.searchCriteria.documentTypes;
            types.forEach((type) => {
                if (type.display) {
                    state.searchCriteria.documentTypes.push(type.reference)
                    type.selected = true;
                }
            })
            commit("setInitialSearch")
            commit("setDocumentTypes", types)
        })
    },

    // Get the current selected document types selected for search
    getDocumentTypeSearchOptions(context) {
        return context.state.searchCriteria.documentTypes;
    },

    // A document type has been selected or deselected. recalculate types selected list.
    setTypesSearchChange({
        commit,
        dispatch
    }, param) {
        var typesSelected = []
        param.forEach((type) => {
            if (type.selected) {
                typesSelected.push(type.reference)
            }
        })
        commit("setDocumentTypeSearchParameters", typesSelected)
    },
    removeSearchDocumentType(context, param) {
        var typesSelected = context.state.searchForm.documentTypes
        typesSelected.forEach((type) => {
            if (type.reference == param.reference)
                type.selected = false
        })

    },
    // new search 
    async aSearch({
        state,
        commit,
        dispatch
    }) {
console.log("searching....")
        commit("setCurrentlySearching",true);
        var postcode = state.searchForm.postcode;
        if (postcode != null && postcode != "") {
            await GazetteerService.search(postcode).then((response) => {
                // Use first address from results - possible better way ?
                var address = response.data.address[0];
                var location = {
                    "latitude": address.latitude,
                    "longitude": address.longitude,
                    "unit": "MILE",
                    "range": 10
                }
                commit("setPostcodeSearchCriteria", location);

            })
        }
        SearchService.search(state.indexReference, state.searchCriteria).then((response) => {
            commit("setASearchResults", response.data.results)
            commit("setCurrentlySearching",false);
        }, (error) => {
            /* TODO Handle error */
            console.log("error searching caught")
            commit("setCurrentlySearching",false);
        });
    },

    async setPostcodeSearchCriteria({
        state,
        commit,
        dispatch
    }) {
        var postcode = state.searchForm.postcode;

        if (postcode != null && postcode != "") {
            await GazetteerService.search(postcode).then((response) => {

                // Use first address from results - possible better way ?
                var address = response.data.address[0];

                var location = {
                    "latitude": address.latitude,
                    "longitude": address.longitude,
                    "distanceUnit": "MILE",
                    "range": 10
                }
                commit("setPostcodeSearchCriteria", location);

            })
            dispatch("aSearch");
        } else {

            var locationNull = null
            commit("setPostcodeSearchCriteria", locationNull);
            dispatch("aSearch");
        }
    },
    setAvailableSearch(context, payload) {
      
        var searchCriteriaParameters = context.state.searchCriteria.parameters;
        if (searchCriteriaParameters.length > 0 && !payload) {
            console.log("set available search");
            searchCriteriaParameters.splice(0, 1)
        } else if (searchCriteriaParameters.length == 0 && payload) {
            searchCriteriaParameters.push({
                "reference": "available",
                "value": true
            });
        }
        context.commit("setSearchParameters", searchCriteriaParameters);
        context.commit("setAvailableSearch",payload);
    },

    // Preperation for postcode only search - from homepage
    removeAllOtherSearchCriteria({
        state,
        dispatch
    }) {
        dispatch("removeAllDocumentTypesFromSearchCriteria");
    },
    // Remove types to search postcode only 
    removeAllDocumentTypesFromSearchCriteria(context) {
        var typesSelected = context.state.searchForm.documentTypes
        typesSelected.forEach((type) => type.selected = false);
        context.commit("setDocumentTypes", typesSelected);
    },


    async searchSingleDocumentType( {dispatch,state,commit},payload){
        await DocumentTypeService.getTypes("advertise").then((response) => {
            var types = response.data;
            var typesSelected = state.searchCriteria.documentTypes;
            types.forEach((type) => {
                if (type.display) {
                    state.searchCriteria.documentTypes.push(type.reference)
                    if(type.reference == payload)
                        type.selected = true;
                }
            })
            commit("setInitialSearch");
            commit("setDocumentTypes", types);
    })
},

    /*************************************************************************/

    setAdminCurrentLocation(context, payload) {
        context.commit("setAdminCurrentLocation", payload)

        
    },




    /* NEW CATALOGUE  */


    async setAdvertiseIndex(context,payload){
        await AdvertiseService.getIndex().then((response)=>{
            response.data.documentTypes.forEach((type)=>{
                type.selected = false;
            })
            context.commit("setAdvertiseIndex", response.data);
            context.commit("setAdvertiseDocumentTypes",response.data.documentTypes);

        }).catch((err)=>{
            // EMIT ERROR
        })
    },

    setAdvertiseSearchDocumentTypesParameters(context,params){
     

        var documentTypes = context.state.advertiseDocumentTypes;
        var selectedDocumentTypes = [];
        documentTypes.forEach((type)=>{
            if(type.selected)
                selectedDocumentTypes.push(type.reference);
        })
        context.commit("setAdvertiseSearchDocumentTypesParameters",selectedDocumentTypes);

        context.dispatch("advertiseSearch");

    },

    setAdvertiseSearchAvailableParameters(context){

        if(!context.state.advertiseSearchParams.properties.Available)
            context.commit("advertiseAddSearchParamAvailable");
        else
            context.commit("advertiseRemoveSearchParamAvailable");

        context.dispatch("advertiseSearch");
    },

    async advertiseSearch(context,params){

        context.commit("setCurrentlySearching",true);
        context.commit("removeAdvertiseLocationSearchParameter");
        var postcode;
 
        postcode = params;

        if(postcode == null || postcode == "")
            postcode = context.state.advertiseSearchPostcode;
        if(postcode != null && postcode != "" && postcode.length > 4){
            var locationSearchParmeter = await GazetteerService.setLocationSearch(context.state.advertiseSearchPostcode);
            if(locationSearchParmeter != null)
                context.commit("setAdvertiseLocationSearchParmeter",locationSearchParmeter);
        }



        await AdvertiseService.search(context.state.advertiseSearchParams).then((response)=>{
            var documents = response.data;
            var params = {};
            params.documents = documents;
            params.sortSetting = null;
            context.dispatch("sortDocumentsFromSearch",params)
            context.commit("setCurrentlySearching",false);
            

            
        }).catch((err)=>{
            console.log(err);
        })
    },

    setAdvertiseSearchPostcode(context,payload){
        context.commit("setAdvertiseSearchPostcode",payload);
    },

    async getAdvertisePostcodeSearchCoordinates(context){

        var postcode = context.state.advertiseSearchPostcode;
        await GazetteerService.search(postcode).then((response) => {
            
            var address = response.data.address[0];
            context.dispatch("createAdvertiseLocationSearchParameter",address);
        })
    },
    sortDocumentsFromSearch(context,params){
        var sortSetting = context.state.advertiseSort;
        var sortedDocuments =  Sorting.sortAdvertiseDocuments(params.documents,sortSetting);
        context.commit("setAdvertiseSearchResults",sortedDocuments);
    },
    sortDocumentsFromSortChange(context,params){
        var documents = context.state.advertiseSearchResults;
        var sortedDocuments = Sorting.sortAdvertiseDocuments(documents,params);
        context.commit("setAdvertiseSearchResults",sortedDocuments);
        context.commit("setAdvertiseSort",params);
    }
    
  
}
