import api from './api'
import store from '../store/index';

export default{

    async getLocationSearchParameter(postcode){
      store.commit("SET_NO_ADDRESSES_FOUND",false);
      let locationParameter = null;
      if(postcode.trim().length > 5){
        await  api.postcodeSearch(postcode).then((response)=>{
          if(response.data.address && response.data.address.length > 0){
            locationParameter =  this.createLocationSearchParameter(response.data.address[0]);
            if(locationParameter != null)
              store.commit("SET_IS_LOCATION_SEARCH",true);
          }
          else
            store.commit("SET_NO_ADDRESSES_FOUND",true);
        })
      }
      else
        store.commit("SET_IS_INVALID_POSTCODE",true);

      return locationParameter;
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
}
