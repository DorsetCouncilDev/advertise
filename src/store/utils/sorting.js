export default {


    sortAdvertiseDocuments( documents,sortSetting) {

        var sortedDocuments = [];

        if (sortSetting == 'name-az')
            sortedDocuments = this.sortByAZ(documents);
        else if (sortSetting == 'name-za')
            sortedDocuments = this.sortByZA(documents);
        else {
            var sortValueArray = sortSetting.split("-");
            var sortType = sortValueArray[1];
            sortedDocuments = this.sortResultsByProperty(documents,sortType);
        }

        return sortedDocuments;
    },

    sortResultsByProperty(documents, type) {
        return documents.sort(function (a, b) {

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

    sortByAZ(documents){
        console.log("sorting A-Z");
        return documents.sort(function (a, b) {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
    },
    sortByZA(documents){
        console.log("sorting Z-A");
        return documents.sort(function (a, b) {
            if(a.name < b.name) { return 1; }
            if(a.name > b.name) { return -1; }
            return 0;
        })
    },
    
    
    // test method
    getLocations(){
        return [ 
                          {"latitude" : 50.713449, "longitude": -2.435556},
                          { "latitude" : 50.716136, "longitude": -2.440467},                   
                          { "latitude" : 50.716464, "longitude": -2.439470},
                          { "latitude" : 50.711551, "longitude": -2.437976},
                          {  "latitude" : 50.715582, "longitude": -2.434931},
                          {"latitude" : 50.715230, "longitude": -2.439024},                   
                          {"latitude" : 50.714472, "longitude": -2.445348},
                          { "latitude" : 50.713048, "longitude": -2.433482},
                          { "latitude" : 50.715455, "longitude": -2.445558},
                          { "latitude" : 50.716037, "longitude": -2.436670},                   
                          {   "latitude" : 50.714565, "longitude": -2.439633},
                          { "latitude" : 50.716820, "longitude": -2.441944},
                          {  "latitude" : 50.712074, "longitude": -2.437362},
                          {  "latitude" : 50.716931, "longitude": -2.441977},                   
                          {"latitude" : 50.713815, "longitude": -2.437873},
                          { "latitude" : 50.712999, "longitude": -2.440703},             
                          { "latitude" : 50.707387, "longitude": -2.441796},
                          { "latitude" : 50.713363, "longitude": -2.433697}
        ] 
    }
}