import Sorting from './utils/sorting.js'
import GazetteerService from './../services/GazetteerService'
import AdvertiseService from './../services/AdvertiseService'

export const actions = {

    async setIndex(context,payload){
        await AdvertiseService.getIndex().then((response)=>{
            response.data.documentTypes.forEach((type)=>{
                type.selected = true;
            })
            context.commit("SET_INDEX", response.data);
            context.commit("SET_DOCUMENT_TYPES",response.data.documentTypes);
            context.dispatch("search");
        }).catch((err)=>{
            // EMIT ERROR
        })
    },
    setDocumentTypesSearchParameter(context){
        var documentTypesSelected = [];
        var documentTypes = context.state.documentTypes;
        if(documentTypes != null && documentTypes.length > 0){
            documentTypes.forEach((type)=>{
                if(type.selected)
                    documentTypesSelected.push(type.reference);
            })
        }
        context.commit("SET_DOCUMENT_TYPE_SEARCH_PARAMETERS",documentTypesSelected)
    },

    async setLocationSearchParameter(context){
        context.commit("SET_IS_LOCATION_SEARCHED", false);
        var postcode = context.state.searchPostcode;
        if(postcode != null && postcode != "" && postcode.length > 4){
            var locationSearchParmeter = await GazetteerService.setLocationSearch(postcode);
            console.log("search param: " + locationSearchParmeter)
            context.commit("SET_IS_LOCATION_SEARCHED", true);
            if(locationSearchParmeter != null){
                if(locationSearchParmeter.noAddress){
                    console.log("no addresses found")
                    context.commit("SET_NO_ADDRESS",true);
                    context.commit("SET_SEARCHED_POSTCODE", postcode);
                }
                else{
                    context.commit("SET_NO_ADDRESS",false);
                    context.commit("SET_LOCATION_SEARCH_PARAMETER",locationSearchParmeter);
                    context.commit("SET_SEARCHED_POSTCODE", postcode);
                  
                }
            }
        }
        //else
          //  context.commit("CLEAR_SEARCHED_POSTCODE", postcode);
    },

    async setAvailableSearchParameter(context){
        var searchAvailable = context.state.searchAvailable;
        if(searchAvailable)
            context.commit("SET_AVAILABLE_SEARCH_PARAMETER");
        else
            context.commit("REMOVE_AVAILABLE_SEARCH_PARAMETER");
    },

    async search(context){
     
        context.commit("REMOVE_LOCATION_SEARCH_PARAMETER"); 
        await context.dispatch("setLocationSearchParameter");
        await context.dispatch("setAvailableSearchParameter");
        await context.dispatch("setDocumentTypesSearchParameter");

        await AdvertiseService.search(context.state.searchParameters).then((response)=>{
            var documents = response.data;
            
            context.commit("SET_SEARCH_RESULTS",documents);
            
            context.dispatch("sortSearchResults")
        }).catch((err)=>{
            console.log(err);
        })
    },

    async getAdvertisePostcodeSearchCoordinates(context){

        var postcode = context.state.searchPostcode;
        await GazetteerService.search(postcode).then((response) => {
            
            var address = response.data.address[0];
            context.dispatch("createAdvertiseLocationSearchParameter",address);
        })
    },
    sortSearchResults(context,params){
        var documents = context.state.searchResults;
        var sortSetting = context.state.sort;
        var sortedDocuments =  Sorting.sortAdvertiseDocuments(documents,sortSetting);
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
        context.commit("REMOVE_LOCATION_SEARCH_PARAMETER");
        context.commit("REMOVE_DOCUMENT_TYPE_SEARCH_PARAMETERS");
        context.commit("SET_AVAILABLE",false);
    },
    
    async setSingleDocumentTypeOnlySearch(context,param){
        context.commit("REMOVE_LOCATION_SEARCH_PARAMETER");
        context.commit("REMOVE_DOCUMENT_TYPE_SEARCH_PARAMETERS");
        context.commit("SET_AVAILABLE",false);
        context.commit("SET_POSTCODE","");
        var documentTypes = context.state.documentTypes;
        if(documentTypes == null){
            await this.dispatch("setIndex");
            documentTypes = context.state.documentTypes;

        }
        documentTypes.forEach((type)=>{
            type.selected = false;
            if(param == type.reference)
                type.selected = true;
        })
        
        await context.commit("SET_DOCUMENT_TYPES",documentTypes);
    }
}
