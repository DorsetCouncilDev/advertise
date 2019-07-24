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
    },
    SET_IS_SEARCHING(state,payload){
      state.isSearching = payload;
    },
    SET_ALL_DOCUMENT_TYPES_SELECTED(state,payload){
      state.allDocumentTypesSelected = payload
    },



    SET_SEARCH_PARAMS(state,payload){
      state.searchParams = payload;
    },

    SET_NO_ADDRESS_FOUND(state,payload){
      state.postcodeSearchErrors.noAddressFound = payload;
    },
    SET_NO_INVALID_POSTCODE(state,payload){
      state.postcodeSearchErrors.invalidPostscode = payload;
    },
    REMOVE_SEARCH_PARAMETER(state){
      delete state.searchParams.location;
    },
    RESET_POSTCODE_ERRORS(state){
       state.postcodeSearchErrors.invalidPostscode = false;
       state.postcodeSearchErrors.noAddressFound = false;
    },
    REMOVE_POSTCODE(state){
      state.lastPostcodeSearched = "",
      state.postcodeSearch = false;
    },
    REMOVE_LOCATION_PARAMETER(state){
      delete state.searchParams.location;

    }
}
