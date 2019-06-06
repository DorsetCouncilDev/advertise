export default {

    sortResultsByProperty(results, propertyReq, type) {
        return results.sort(function (a, b) {

            if(typeof a.properties.Price == 'undefined' || a.properties.Price == null)
                return 1;
            if(typeof b.properties.Price == 'undefined' || b.properties.Price == null)
                return -1;
            
            var priceA = Number(a.properties.Price.value);
            var priceB = Number(b.properties.Price.value);

            if(isNaN(priceA))
                return 1;
            if(isNaN(priceB))
                return -1;
            if(priceA == 0)
                return 1
            if(priceB == 0)
                return -1
        
            if (type == 'high')
                return priceB - priceA;
            else
                return priceA - priceB;
        });
    },
    
    sortByBestMatch(results){
        return results.slice().sort(function (a, b) {
            return a.numberOfMatchingParameters < b.numberOfMatchingParameters 
        });
    },
    
    
    // test method
    getLocations(){
        return [ 
                          {"location": { "latitude" : 50.713449, "longitude": -2.435556}},
                          {"location": { "latitude" : 50.716136, "longitude": -2.440467}},                   
                          {"location": { "latitude" : 50.716464, "longitude": -2.439470}},
                          {"name" : "Great Western Road", "location": { "latitude" : 50.711551, "longitude": -2.437976}},
                          {"name" : "High East Street", "location": { "latitude" : 50.715582, "longitude": -2.434931}},
                          {"name" : "High West Street", "location": { "latitude" : 50.715230, "longitude": -2.439024}},                   
                          {"name" : "History Centre", "location": { "latitude" : 50.714472, "longitude": -2.445348}},
                          {"name" : "Linden Avenue", "location": { "latitude" : 50.713048, "longitude": -2.433482}},
                          {"name" : "Little Keep", "location": { "latitude" : 50.715455, "longitude": -2.445558}},
                          {"name" : "North Square", "location": { "latitude" : 50.716037, "longitude": -2.436670}},                   
                          {"name" : "Prince’s Street", "location": { "latitude" : 50.714565, "longitude": -2.439633}},
                          {"name" : "School Lane", "location": { "latitude" : 50.716820, "longitude": -2.441944}},
                          {"name" : "South Walks", "location": { "latitude" : 50.712074, "longitude": -2.437362}},
                          {"name" : "The Grove", "location": { "latitude" : 50.716931, "longitude": -2.441977}},                   
                          {"name" : "Trinity Street", "location": { "latitude" : 50.713815, "longitude": -2.437873}},
                          {"name" : "West Walks", "location": { "latitude" : 50.712999, "longitude": -2.440703}},             
                          {"name" : "Weymouth Avenue", "location": { "latitude" : 50.707387, "longitude": -2.441796}},
                          {"name" : "Woolaston Road", "location": { "latitude" : 50.713363, "longitude": -2.433697}}
        ] 
    }
}