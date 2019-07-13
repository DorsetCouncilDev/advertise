export const mutations = {

    SET_INDEX(state,payload){
        state.index = payload;
    },



    // Search options form
    SET_DOCUMENT_TYPES(state,payload){
        state.documentTypes = payload;
    },
    SET_AVAILABLE(state,payload){
        state.searchAvailable = payload;
    },
    SET_POSTCODE(state,payload){
        state.searchPostcode = payload;
    },


    // Search parameters
    SET_DOCUMENT_TYPE_SEARCH_PARAMETERS(state,payload){
        state.searchParameters.documentTypes = payload;
    },
    SET_AVAILABLE_SEARCH_PARAMETER(state){
        state.searchParameters.properties["Available"] = "true";
    },
    REMOVE_AVAILABLE_SEARCH_PARAMETER(state){
        delete state.searchParameters.properties.Available;
    },

    REMOVE_DOCUMENT_TYPE_SEARCH_PARAMETERS(state){
        state.searchParameters.documentTypes = [];
    },

    SET_LOCATION_SEARCH_PARAMETER(state,payload){
        state.searchParameters["location"] = payload;
    },
    REMOVE_LOCATION_SEARCH_PARAMETER(state){
        if(state.searchParameters.location){
            delete state.searchParameters.location;
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
    },

    DESELECT_DOCUMENT_TYPE(state,payload){
        state.documentTypes.forEach((type)=>{
            if(type.reference == payload)
                type.selected = false;
        })
    },

    SET_SEARCHED_POSTCODE(state,payload){
        state.searchedPostcode = payload;
    },
    SET_IS_LOCATION_SEARCHED(state,payload){
        state.isLocationSearched = payload;
    },
    SET_NO_ADDRESS(state,payload){
        state.noAddressesFound = payload;
    }
}
