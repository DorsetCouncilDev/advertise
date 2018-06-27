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
        postcode: ""
    },
    initialSearch: false
}
