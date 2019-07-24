export const state = {
    index: null,
    documentTypes: null,
    indexReference: "",


    searchResults: [],


    sort:"bestmatch",
    view: "list",


    postcodeSearchErrors:{
      invalidPostscode:false,
      noAddressFound:false
    },
    lastPostcodeSearched:"",
    searchParams:{}
}
