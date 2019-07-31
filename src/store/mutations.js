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





    SET_ALL_DOCUMENT_TYPES_SELECTED(state,payload){
      state.allDocumentTypesSelected = payload
    },



    SET_SEARCH_PARAMS(state,payload){
      state.searchParams = payload;
    },


    REMOVE_SEARCH_PARAMETER(state){
      delete state.searchParams.location;
    },

    REMOVE_LOCATION_PARAMETER(state){
      delete state.searchParams.location;
    },





    SET_IS_LOCATION_SEARCH(state,payload){
      state.isLocationSearch = payload;
    },
    SET_IS_INVALID_POSTCODE(state,payload){
      state.isInvalidPostcode = payload;
    },
    SET_POSTCODE(state,payload){
      state.postcode = payload;
    },
    SET_NO_ADDRESSES_FOUND(state,payload){
      state.isNoAddressesFound = payload;
    }
}
