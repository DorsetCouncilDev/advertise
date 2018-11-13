import axios from 'axios'
  // web.dorsetcc.gov.uk

// Development
/*
var _test_fail = axios.create({
  baseURL: 'http://52.56.188.219/catalogue/v1/indexes',
  timeout: 1
});

var _security = axios.create({
  baseURL: 'http://52.56.188.219/catalogue/v1/public/users/login',  
  timeout: 10000
});

var _ = axios.create({
  baseURL: 'http://52.56.188.219/catalogue/v1/indexes',
  timeout: 10000
});

var _gazzeteer = axios.create({
  baseURL: 'https://apptest.dorsetcc.gov.uk/gazetteer/rest/address/postcode/',
  timeout: 10000
});


var _search = axios.create({
    baseURL: 'http://52.56.188.219/catalogue/v1/search/index/',
    timeout: 10000
});
*/


// Production

var _security = axios.create({
  baseURL: 'https://web.dorsetcc.gov.uk/catalogue/v1/public/users/login',  
  timeout: 10000
});

var _ = axios.create({
  baseURL: 'https://web.dorsetcc.gov.uk/catalogue/v1/indexes',
  timeout: 10000
});

var _search = axios.create({
    baseURL: 'https://web.dorsetcc.gov.uk/catalogue/v1/search/index/',
    timeout: 10000
});


var _gazzeteer = axios.create({
  baseURL: 'https://app.dorsetcc.gov.uk/gazetteer/rest/address/postcode/',
  timeout: 10000
});


export default {
    get(url){
        return _.get(url)
    },
    
    post(url,payload,authToken){
           var headers = {
                      headers: {
                            Authorization:  'Bearer ' + authToken
                      }
                   };
        return _.post(url,payload,headers)
    },
    postSearch(url,payload){
       /* var headers = {
                      headers: {
                            Authorization:  'Bearer ' + authToken
                      }
                   };
        */
        
        return _search.post(url,payload)
    },
     put(url,payload,authToken){ 
         var headers = {
                      headers: {
                            Authorization:  'Bearer ' + authToken
                      }
                   };
        return _.put(url,payload,headers)
    },
    
    delete(url,authToken){
        var headers = {
                      headers: {
                            Authorization:  'Bearer ' + authToken
                      }
                   };
        return _.delete(url,headers)
    },
    
    postSecurityCredentials(credentials){
        return _security.post("",credentials)
    },
    
    // temp solution
    postInitialSearch(){
        var headers = {
            headers: {
            Authorization:  'Bearer ' + authToken
                      }
                   };
        return _search.post(url,payload,headers)
    },
    
    // get location from postcode - first step in postcode asset search
    postcodeSearch(url){
        return _gazzeteer.get(url)
    },
    
    
    // test publish fail
 
    publishFailTest(url,payload,authToken){
         var headers = {
                      headers: {
                            Authorization:  'Bearer ' + authToken
                      }
                   };
        return _test_fail.put(url,payload,headers)
    }

}