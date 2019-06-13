export const mutations = {

    SET_INDEX(state,payload){
        state.index = payload;
    },
    


    // Search options form
    SET_DOCUMENT_TYPES(state,payload){
        state.advertiseDocumentTypes = payload;
    },
    SET_AVAILABLE(state,payload){
        state.searchAvailable = payload;
    },
    SET_POSTCODE(state,payload){
        state.searchPostcode = payload;
    },


    // Search parameters
    SET_DOCUMENT_TYPE_SEARCH_PARAMETERS(state,payload){
        state.advertiseSearchParams.documentTypes = payload;
    },
    SET_AVAILABLE_SEARCH_PARAMETER(state){
        state.advertiseSearchParams.properties["Available"] = "true";
    },
    REMOVE_AVAILABLE_SEARCH_PARAMETER(state){
        delete state.advertiseSearchParams.properties.Available;
    },
  
    SET_SINGLE_DOCUMENT_TYPE_SEARCH_PARAMETER(state,payload){
        state.advertiseSearchParams = { "documentTypes": [],properties: {}}
        state.advertiseSearchParams.documentTypes.push(payload);
        state.searchPostcode = "";
        state.searchAvailable = "";
        state.advertiseDocumentTypes.forEach((type)=>{
            type.selected = false;
            if(type.reference == payload)
            type.selected = true;
        })   
    },
    REMOVE_DOCUMENT_TYPE_SEARCH_PARAMETERS(){
        state.asvertiseadvertiseSearchParams.documentTypes = [];
    },

    SET_LOCATION_SEARCH_PARAMETER(state,payload){
        state.advertiseSearchParams["location"] = payload;
    },
    REMOVE_LOCATION_SEARCH_PARAMETER(state){
        if(state.advertiseSearchParams.location){
            delete state.advertiseSearchParams.location;
        }
    },

    SET_SEARCH_RESULTS(state,payload){
        state.searchResults = payload;
    },


    SET_SORT(state,payload){
        state.sort = payload;
    },
    SET_VIEW(state,payload){
        state.view = payload;
    }
    
}