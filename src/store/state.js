export const state = {
  

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
        },
        status: null
    },
    currentlySearching:true,


    advertiseIndex: null,
    advertiseDocumentTypes: null,
    advertiseSearchParams: { documentTypes: ["bin-lid-advertising", "roundabout-sponsorship"],properties: {}},
    advertiseSearchResults: [],
    advertiseSearchPostcode:"",
    advertiseSort:"bestmatch",
    advertiseView: "listView"
}
