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
                else {
                    locationSearchParameters  = { "noAddress":true }
                    return locationSearchParameters;
                }
             })
        }
        return locationSearchParameters;
    },
    createLocationSearchParameter(address){
        var location = {
            "latitude": address.latitude,
            "longitude": address.longitude,
            "distanceUnit": "MILE",
            "range": 10
        }
        return location;
    },


    async checkValidPostcode(postcode){

      var validPostcode = null;
      await api.postcodeSearch(postcode).then((response)=>{
        validPostcode = response.data.address && response.data.address.length > 0;

      }).catch((err)=>{

      })
      return validPostcode;
    }
}
