import api from './api'

export default{
    getType(indexRef,typeRef){
        return api.get(indexRef + '/documenttypes/' + typeRef)
    },
    getTypes(indexRef){
        return api.get(indexRef + '/documenttypes')
    },
    deleteType(indexRef,typeRef,token){
        return api.delete(indexRef + '/documenttypes/' + typeRef,token)
    },
    updateType(indexRef,typeRef,token,type){
        return api.put(indexRef + '/documenttypes/' + typeRef,type,token)
    },
    addProperty(indexRef,typeRef,propertyRef,token){
        return api.post(indexRef + '/documenttypes/' + typeRef + '/properties/' + propertyRef,null,token)
    },
    addProperties(indexRef,typeRef,properties,token){
        return api.put(indexRef + '/documenttypes/' + typeRef + '/properties/',properties,token)
    },
    RemovePorperty(indexRef,typeRef,propertyRef){
        return api.delete(indexRef + '/documenttypes/' + typeRef + '/properties/' + propertyRef)
    },
    movePropertyUp(indexRef,typeRef,propertyRef,token){
        return api.put(indexRef + '/documenttypes/' + typeRef + '/properties/' + propertyRef + '/moveup',null,token)
    },
    showProperty(indexRef,typeRef,propertyRef,token){
        return api.put(indexRef + '/documenttypes/' + typeRef + '/properties/' + propertyRef + '/show',null,token)
    },
    hideProperty(indexRef,typeRef,propertyRef,token){
        return api.put(indexRef + '/documenttypes/' + typeRef + '/properties/' + propertyRef + '/hide',null,token)
    },
   getDocumentTypes(indexRef){
        return api.get(indexRef + '/documenttypes')
    },
    movePropertyUp(indexRef,documentTypeRef,propertyRef,token){
        var url = indexRef + '/documenttypes/' + documentTypeRef + '/properties/' + propertyRef + '/moveup'

        return api.put(url,null,token);
    }

}
