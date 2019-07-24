import api from './api'

export default{

    async getLocationSearchParameter(postcode){
        var locationSearchParameter = null;

        if(postcode.trim().length > 5){

            await  api.postcodeSearch(postcode).then((response)=>{
                if(response.data.address && response.data.address.length > 0){
                    var address = response.data.address[0];
                    locationSearchParameter = this.createLocationSearchParameter(address);
                    locationSearchParameter.postcode = postcode;
                }
                else if(response.data.address.length == 0)
                    locationSearchParameter  = { "noAddressFound":true }
                else
                    locationSearchParameter = {"invalidPostscode":true}
             })
        }
        else
          locationSearchParameter = {"invalidPostscode":true,postcode}

          locationSearchParameter.postcode = postcode;
          return locationSearchParameter;
    },


    createLocationSearchParameter(address){
        var location = {
            "latitude": address.latitude,
            "longitude": address.longitude,
            "distanceUnit": "MILE",
            "range": 10,
            "noAddressFound":false,
            "invalidPostscode":false,
            "postcode":""
        }
        return location;
    },
}
