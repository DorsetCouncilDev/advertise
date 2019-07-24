import api from './api'

export default{

    getIndex(){
        return api.getAdvertiseIndex();
    },

    search(params){
        return api.advertiseSearch(params);
    }
}
