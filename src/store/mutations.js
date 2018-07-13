
export const mutations = {
    setCurrentIndex(state,payload){
        state.currentIndex = payload;  
    },
    setDocumentTypes(state,payload){
        state.types = payload;
    },
    removeSearchParameter(payload){
        state.searchCriteria.parameters.splice(payload);
    },
    updateSearchParameter(state,payload){
        console.log("update: " + payload.reference + " with " + payload.value)
        
        state.searchCriteria.parameters.forEach((param) => {
            if(param.reference == payload.reference){
                
            }
                param.value = payload.value
        })
    },
    addSearchParameter(state,payload){
         state.searchCriteria.parameters.push(payload);
    },
    setSearchResults(state,payload){
        state.searchResults = payload;
    },
    setView(state,payload){
        state.view = payload;
    },
    setSearchParameters(state,payload){
        state.searchCriteria.parameters = payload;
    },
    toggleSearchForm(state){
        state.showSearchForm = !state.showSearchForm
    },
    setSortResults(state,payload){
        state.searchResults = payload;
    },
    setSort(state,payload){
        state.sort = payload
    },
    setSearchLocation(state,payload){
        state.searchCriteria.location.latitude = payload.latitude;
        state.searchCriteria.location.longitude = payload.longitude;
    },
   
    setSearchCriteria(state,payload){
        state.searchCriteria = payload;
    },
    removeSearchParameter(state,payload){
        state.searchCriteria.parameters.splice(payload,1);
    },
    removeDocumentTypeFromSearch(state,payload){
        state.searchCriteria.documentTypes.splice(payload,1)
    },
    addDocumentTypeToSearch(state,payload){
        state.searchCriteria.documentTypes.push(payload);
    },
    revoveSearchDocumentType(state,payload){
        state.searchCriteria.documentTypes.splice(payload,1)
    },
    removeLocationSearch(state){
        delete state.searchCriteria.location;
    },
    removePostcode(state){
        state.postcode = null;
    },
    setSecurityToken(state,payload){
        state.securityToken = payload
    },
     clearSecurityToken(state){
        state.securityToken = ""
    },
     setDocumentTypeSearchParameters(state,param){
      state.searchCriteria.documentTypes = param
    },
    setResults(state,param){
        state.searchResults = param;
     
    }, 
    
    
    
    /***************************************/
    setIndexReference(state,param){
      state.indexReference = param  
    },
    
    setDocumentTypes(state,param){
        state.searchForm.documentTypes = param
    },
    setDocumentTypesSearchCriteria(state,param){
        state.searchCriteria.documentTypes = param
    },
    
    setASearchResults(state,param){
        state.searchResults = param
    },
    setPostcodeSearchCriteria(state,param){
        state.searchCriteria.location = param
    },
    setPostcode(state,payload){
        state.searchForm.postcode = payload;
    },
    setInitialSearch(state){
        state.initialSearch = true
    },
    setAvailableSearch(state,payload){
        state.searchForm.parameters.available = payload
    },
    
    
    /**********************************************************/
    /******  ADMIN   ******************************************/
    
    setAdminLocations(state,payload){
        state.admin.locations = payload
    },
    setAdminCurrentLocations(state,payload){
        state.admin.currentLocation = payload
    }
    
}