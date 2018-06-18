export const state = {
    view: "listView",
    sort: "bestmatch",
    searchCriteria: {
        parameters: [],
        // Hard coded temp solution to pre populate browse list
        documentTypes: ["roundabout-sponsorship","car-parking-ticket-advertising","bus-shelter-advertising","enewsletter-sponsorship","bin-lid-advertising","vehicle-advertising"],
        location: null
    },
    showSearchForm: false,
    searchResults: [],
    resultsMap:{},

    indexReference: "",
    securityToken: "",
    searchForm:{
        documentTypes: [],
        postcode: ""
    }
}
