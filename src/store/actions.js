import Sorting from './utils/sorting.js'
import GazetteerService from './../services/GazetteerService'
import AdvertiseService from './../services/AdvertiseService'
import _ from 'lodash'

export const actions = {
 

    /* NEW CATALOGUE  */


    async setIndex(context,payload){
        await AdvertiseService.getIndex().then((response)=>{
            response.data.documentTypes.forEach((type)=>{
                type.selected = false;
            })
            context.commit("SET_INDEX", response.data);
            context.commit("SET_DOCUMENT_TYPES",response.data.documentTypes);

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
        context.commit("SET_DOCUMENT_TYPE_SEARCH_PARAMETERS",selectedDocumentTypes);

      

    },

    setAdvertiseSearchAvailableParameters(context){

        if(context.state.available)
            context.commit("SET_AVAILABLE_SEARCH_PARAMETER");
        else
            context.commit("REMOVE_AVAILABLE_SEARCH_PARAMETER");
    },

    async advertiseSearch(context,params){
     
        context.commit("REMOVE_LOCATION_SEARCH_PARAMETER");
 
        var postcode = context.state.searchPostcode;
        if(postcode != null && postcode != "" && postcode.length > 4){
            var locationSearchParmeter = await GazetteerService.setLocationSearch(postcode);
            if(locationSearchParmeter != null)
                context.commit("SET_LOCATION_SEARCH_PARAMETER",locationSearchParmeter);
        }

        var searchAvailable = context.state.searchAvailable;
        if(searchAvailable)
            context.commit("SET_AVAILABLE_SEARCH_PARAMETER");
        else
            context.commit("REMOVE_AVAILABLE_SEARCH_PARAMETER");

        await AdvertiseService.search(context.state.advertiseSearchParams).then((response)=>{
            var documents = response.data;
            var params = {};
            params.documents = documents;
            params.sortSetting = null;
            context.dispatch("sortSearchResults",params)
        }).catch((err)=>{
            console.log(err);
        })
    },

    async getAdvertisePostcodeSearchCoordinates(context){

        var postcode = context.state.advertiseSearchPostcode;
        await GazetteerService.search(postcode).then((response) => {
            
            var address = response.data.address[0];
            context.dispatch("createAdvertiseLocationSearchParameter",address);
        })
    },
    sortSearchResults(context,params){
        var sortSetting = context.state.sort;
        var sortedDocuments =  Sorting.sortAdvertiseDocuments(params.documents,sortSetting);
        context.commit("SET_SEARCH_RESULTS",sortedDocuments);
    },
    sortCurrentSearchResults(context,params){
        var documents = context.state.searchResults;
        var sortedDocuments = Sorting.sortAdvertiseDocuments(documents,params);
        context.commit("SET_SEARCH_RESULTS",sortedDocuments);
        context.commit("SET_SORT",params);
    },

    removeAllAdvertiseSearchParams(context){
        context.commit("REMOVE_LOCATION_SEARCH_PARAMETER");
        context.commit("REMOVE_DOCUMENT_TYPE_SEARCH_PARAMETERS");
    },
    setLocationSearchOnly(context){
        this.removeAllAdvertiseSearchParams();
        context.commit("SET_AVAILABLE",false);
    }
    
  
}
