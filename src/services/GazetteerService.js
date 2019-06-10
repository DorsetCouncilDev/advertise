import api from './api'

export default{

    async setLocationSearch(postcode){
        var locationSearchParameters = null;
        if(postcode.length > 4){
            await  api.postcodeSearch(postcode).then((response)=>{
                if(response.data.address && response.data.address.length > 0){
                    var address = response.data.address[0];
                    locationSearchParameters = this.createLocationSearchParameter(address);
                }
             })
        }
        return locationSearchParameters;
    },
    createLocationSearchParameter(address){
        var location = {
            "latitude": address.latitude,
            "longitude": address.longitude,
            "unit": "MILE",
            "range": 10
        }
        return location;
    }
}