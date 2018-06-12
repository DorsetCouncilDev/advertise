//getters.js


import sorting from './utils/sorting.js'

const BASE = 'http://vmcrwebapptest2:18080/catalogue/v1/'
const SEARCH = 'indexes/advertising/documents?'
const TYPES = 'indexes/advertising/documenttypes'

export const getters = {
    getParameter: (state) =>  (param) =>{
        var val = "";
        state.searchCriteria.parameters.forEach((parameter)=>{
            console.log("here " + parameter.value);
            if(parameter.reference == param){
                 val = parameter.value;
            }
        })
        return val;
    },
    numberOfResults: (state) => state.searchResults.numberOfResults,
    getSearchResults: (state) => state.searchResults.results,
    getMockLocations: (state) => sorting.getLocations()

}
