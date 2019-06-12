import { stat } from "fs";

export const mutations = {
  



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

    setAdvertiseSearchAvailable(state,payload){
        state.advertiseSearchAvailable = payload;
    },
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
        state.setAdvertiseSearchAvailable = "";
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

    SET_SORT(state,payload){
        state.advertiseSort = payload;
    },
    SET_DOCUMENTS_VIEW(state,payload){
        state.advertiseView = payload;
    }
    
}