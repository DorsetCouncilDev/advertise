import api from './api'

export default{
    
    getIndexes(){
       return api.get("")
    },
    getIndex(indexRef){
        return api.get(indexRef)
    },
    createIndex(index,token){
       return api.post("",index,token)
    },
    updateIndex(indexRef,index,token){
        return api.put(indexRef,index,token)
    },
    deleteIndex(indexRef,token){
        return api.delete(indexRef,token)
    }
    
}