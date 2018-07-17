export const state = {
    view: "listView",
    sort: "bestmatch",
    searchCriteria: {
        parameters: [],
        // Hard coded temp solution to pre populate browse list
        documentTypes: [],
        location: null
    },
    showSearchForm: false,
    searchResults: [],
    resultsMap:{},

    indexReference: "",
    securityToken: "",
    searchForm:{
        documentTypes: [],
        postcode: "",
        parameters: {
            "available": false
        }
      
    },
    initialSearch: false,
    admin: {
        locations:[],
        currentLocation: {},
        currentPov:{
            heading: 0,
            pitch: 0,
            zoom: 1
        }
    }
}
