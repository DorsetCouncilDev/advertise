import axios from 'axios'




var advertise_axios = axios.create({
  baseURL: // 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/advertise',
   'https://app.dorsetcouncil.gov.uk/catalogue/api/indexes/advertise',
  timeout: 10000,
  headers: { post: { "Content-Type": "application/json", "accept": "application/json" }
  }
});

var _gazzeteer = axios.create({
  baseURL: 'https://apptest.dorsetcc.gov.uk/gazetteer/rest/address/postcode/',
  timeout: 10000
});



export default {
    // get location from postcode - first step in postcode asset search
    postcodeSearch(url){
        return _gazzeteer.get(url)
    },
    getAdvertiseIndex(){
      return advertise_axios.get();
    },
    advertiseSearch(payload){
      return advertise_axios.post("documents",payload);
    },
    get(url){
      return advertise_axios.get(url);
    }
}
