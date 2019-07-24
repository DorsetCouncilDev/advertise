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


        }).catch((err)=>{
            // EMIT ERROR
        })
    },
    selectAllDocumentTypes(context,param){
          const documentTypes = context.state.index.documentTypes;
          documentTypes.forEach((type)=>{
            type.selected = param;
        })
        context.commit("SET_DOCUMENT_TYPES",documentTypes);

    },
    /*
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
            context.commit("SET_IS_LOCATION_SEARCHED", true);
            if(locationSearchParmeter != null){
                if(locationSearchParmeter.noAddress){
                    context.commit("SET_NO_ADDRESS",true);
                    context.commit("SET_SEARCHED_POSTCODE", postcode);
                }
                else{
                    context.commit("SET_NO_ADDRESS",false);
                    context.commit("SET_LOCATION_SEARCH_PARAMETER",locationSearchParmeter);
                    context.commit("SET_SEARCHED_POSTCODE", postcode);
                    context.commit("SET_SORT","nearest");


                }
            }
        }else{
          if(context.state.sort == "nearest" || context.state.sort == "furthest")
                context.commit("SET_SORT","");
        }
    },

    async setAvailableSearchParameter(context){
        var searchAvailable = context.state.searchAvailable;
        if(searchAvailable)
            context.commit("SET_AVAILABLE_SEARCH_PARAMETER");
        else
            context.commit("REMOVE_AVAILABLE_SEARCH_PARAMETER");
    },

    async search(context){

        var allSelected = true;

        var types = context.state.documentTypes;
        types.forEach((type)=>{
            if(!type.selected)
              allSelected = false;
        })
        console.log("all Selected: " + allSelected)
        context.commit("SET_ALL_DOCUMENT_TYPES_SELECTED",allSelected);

        context.commit("SET_IS_SEARCHING",true)
        context.commit("REMOVE_LOCATION_SEARCH_PARAMETER");
        await context.dispatch("setLocationSearchParameter");
        await context.dispatch("setAvailableSearchParameter");
        await context.dispatch("setDocumentTypesSearchParameter");

        AdvertiseService.search(context.state.searchParameters).then((response)=>{
            var documents = response.data;

            context.commit("SET_SEARCH_RESULTS",documents);

            context.dispatch("sortSearchResults")
            context.commit("SET_IS_SEARCHING",false)
        }).catch((err)=>{
            console.log(err);
            context.commit("SET_IS_SEARCHING",false)
        })
    },

    async getAdvertisePostcodeSearchCoordinates(context){

        var postcode = context.state.searchPostcode;
        await GazetteerService.search(postcode).then((response) => {

            var address = response.data.address[0];
            context.dispatch("createAdvertiseLocationSearchParameter",address);
        })
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

    async setLocationSearchOnly(context){
        await context.commit("SET_SORT","nearest");
        await context.commit("REMOVE_LOCATION_SEARCH_PARAMETER");
        await context.commit("REMOVE_DOCUMENT_TYPE_SEARCH_PARAMETERS");
        await context.dispatch("selectAllDocumentTypes",true);
        await context.commit("SET_AVAILABLE",false);

    },

    async setSingleDocumentTypeOnlySearch(context,param){
        await context.commit("REMOVE_LOCATION_SEARCH_PARAMETER");
        await context.commit("REMOVE_DOCUMENT_TYPE_SEARCH_PARAMETERS");
        await context.commit("SET_AVAILABLE",false);
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
    },
    setAllSelectedCheckbox(context,param){
        context.dispatch("selectAllDocumentTypes",param);
        context.commit("SET_ALL_DOCUMENT_TYPES_SELECTED",param);
    },

    searchAdvertise(context,params){
      AdvertiseService.search(params).then((response)=>{
      var documents = response.data;

        context.commit("SET_SEARCH_RESULTS",documents);

        context.dispatch("sortSearchResults")
        context.commit("SET_IS_SEARCHING",false)
    }).catch((err)=>{
        console.log(err);
        context.commit("SET_IS_SEARCHING",false)
    })
    }
}*/

sortSearchResults(context,params){
  var documents = context.state.searchResults;
  var sortedDocuments = Sorting.sortAdvertiseDocuments(documents,params);
  context.commit("SET_SEARCH_RESULTS",sortedDocuments);
  context.commit("SET_SORT",params);
},
removePostcodeSearch(context){
    context.commit("RESET_POSTCODE_ERRORS");
    context.commit("REMOVE_POSTCODE");
    context.commit("REMOVE_LOCATION_PARAMETER");

}
}
