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

      

    },

    setAdvertiseSearchAvailableParameters(context){

        if(!context.state.advertiseSearchParams.properties.Available)
            context.commit("advertiseAddSearchParamAvailable");
        else
            context.commit("advertiseRemoveSearchParamAvailable");
    },

    async advertiseSearch(context,params){

        context.commit("removeAdvertiseLocationSearchParameter");
 
        var postcode = context.state.advertiseSearchPostcode;
        if(postcode != null && postcode != "" && postcode.length > 4){
            var locationSearchParmeter = await GazetteerService.setLocationSearch(context.state.advertiseSearchPostcode);
            if(locationSearchParmeter != null)
                context.commit("setAdvertiseLocationSearchParmeter",locationSearchParmeter);
        }

        var searchAvailable = context.state.advertiseSearchAvailable;
        if(searchAvailable)
            context.commit("advertiseAddSearchParamAvailable");
        else
            context.commit("advertiseRemoveSearchParamAvailable");

        await AdvertiseService.search(context.state.advertiseSearchParams).then((response)=>{
            var documents = response.data;
            var params = {};
            params.documents = documents;
            params.sortSetting = null;
            context.dispatch("sortDocumentsFromSearch",params)
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
