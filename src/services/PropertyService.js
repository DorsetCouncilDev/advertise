import api from './api'

export default{
    
    createProperty(indexRef,property,token){
       return api.post(indexRef + '/properties',property,token)
    },
    deleteProperty(indexRef,propertyRef,token){
        return api.delete(indexRef + '/properties/' + propertyRef,token)
    },
    getAllProperties(indexRef){
       return api.get(indexRef + '/properties/')
    },   
    editProperty(indexRef,propertyRef,property,token){
        return api.put(indexRef + '/properties/' + propertyRef,property,token)
    },
    getProperty(indexRef,propertyRef){
        return api.get(indexRef + '/properties/' + propertyRef)
    }
    
}