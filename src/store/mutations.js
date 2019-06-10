import { stat } from "fs";

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
        state.searchCriteria.parameters.forEach((param) => {
            if(param.reference == payload.reference){
                
            }
                param.value = payload.value
        })
    },
    addSearchParameter(state,payload){
         state.searchCriteria.parameters.push(payload);
    },
    setSearchResultsResults(state,payload){
        state.searchResults = payload;
    },
 
    setSearchParameters(state,payload){
        state.searchCriteria.parameters = payload;
    },
    toggleSearchForm(state){
        state.showSearchForm = !state.showSearchForm
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
    setASearchResults(state,param){
        state.currentlySearching = param;
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
    setSearchTypesForm(state,payload){
        state.searchForm.documentTypes = payload;
    },
    

    setCurrentlySearching(state,payload){
        state.currentlySearching = payload;
    },




/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */

    /* NEW CATALOGUE  */

    setAdvertiseIndex(state,payload){
        state.advertiseIndex = payload;
    },
    setAdvertiseDocumentTypes(state,payload){
        state.advertiseDocumentTypes = payload;
    },



    /********************************************************/
    // Searching 

    setAdvertiseSearchDocumentTypesParameters(state,payload){
        state.advertiseSearchParams.documentTypes = payload;
    },
    advertiseAddSearchParamAvailable(state){
        state.advertiseSearchParams.properties["Available"] = "true";
    },
    advertiseRemoveSearchParamAvailable(state){
        delete state.advertiseSearchParams.properties.Available;
    },
    setAdvertiseSearchResults(state,payload){
        state.advertiseSearchResults = payload;
    },
    setSingleDocumentTypeSearch(state,payload){
        state.advertiseSearchParams = { "documentTypes": [],properties: {}}
        state.advertiseSearchParams.documentTypes.push(payload);
        state.setAdvertiseSearchPostcode = "";
        state.advertiseDocumentTypes.forEach((type)=>{
            type.selected = false;
            if(type.reference == payload)
            type.selected = true;
        })
 
        
    },

    /*****************************************/
    // Location search state

    setAdvertiseSearchPostcode(state,payload){
        state.advertiseSearchPostcode = payload;
        console.log("SET ADVERTISE SEARCH POSTCODE")
    },
    setAdvertiseLocationSearchParmeter(state,payload){
        state.advertiseSearchParams["location"] = payload;
    },
    removeAdvertiseLocationSearchParameter(state){
        console.log("remove location param")
        if(state.advertiseSearchParams.location){
            console.log("delete location param")
            delete state.advertiseSearchParams.location;
        }
    },



    /*******************************/
    // Sorting and View Display state

    setAdvertiseSort(state,payload){
        state.advertiseSort = payload;
    },
    setDocumentsView(state,payload){
        state.advertiseView = payload;
    }
    
}