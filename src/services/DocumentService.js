import api from './api'

export default{
    
    getDocuments(indexRef,typeRef){
        var url = indexRef + '/documenttypes/' + typeRef + '/documents'
        return api.get(url);
    },
    getDocument(indexRef,documentRef){
        var url = indexRef + '/documents/' + documentRef
        return api.get(url)
    },
    async updateDocument(updatedDocument,token){
        
        // Prepare new document details
        var updatedDoc = {
            'name': updatedDocument.doc.name,
            'longText': updatedDocument.doc.longText
        }
        
         var properties = [];   
        
        console.log("number of updated properties: " + updatedDocument.properties.length)
        updatedDocument.properties.forEach((p) => {
            var property = {
                'reference': p.propertyReference,
                'value': p.publishedValue };
            properties.push(property);
        })
        
        var url = updatedDocument.indexRef + '/documents/' + updatedDocument.reference
        await api.put(url,updatedDoc,token).then((response)=>{
             return  this.setDocumentProperties(updatedDocument.indexRef,response.data.reference,properties,token)
        })
    },
    createDocument(newDocument,token){
        
        // Prepare new document details
        var newDoc = {
            'name': newDocument.doc.name,
            'longText': newDocument.doc.longText
        }
        
        // Prepare document properties
       
        
        // Prepare url
        var url = newDocument.indexRef + '/documenttypes/' + newDocument.typeRef + '/documents';
        
        // Create document
        return api.post(url,newDoc,token);
    },
    
    async setDocumentProperties(indexRef,documentRef,properties,token){
       var url = indexRef + '/documents/' + documentRef + '/properties'
       return api.put(url,properties,token);
    },
    publishLatestVersion(indexRef,documentRef,token){
        var url = indexRef + '/documents/' + documentRef + '/publish'
      // return api.publishFailTest(url,null,token); 

      return api.put(url,null,token);
       
    },
    deleteDocument(indexRef,documentRef,token){
        var url = indexRef + '/documents/' + documentRef;
        return api.delete(url,token)
    },
    
    
    publishSpecificVersion(indexRef,documentRef,versionNum,token){
        var url = indexRef + '/documents/' + documentRef + '/versions/' + versionNum + '/publish'
        return api.put(url,{},token)
    },
    unpublishDocument(indexRef,documentRef){
        var url = indexRef + '/documents/' + documentRef + '/unpublish'
        return api.put(url)
    },
    simpleSearch(indexRef,params){
        
        /* TODO */
    },
    complexSearch(indexRef,criteria){
        var url = indexRef + '/documents'
        return api.post(url,criteria)
    },
    createLocation(locationRequest,token){
        var url = locationRequest.indexRef + '/documents/' + locationRequest.documentRef + '/locations'
        return api.post(url,locationRequest.location,token)
    },
    setPrimaryLocation(indexRef,documentRef,locationRef,token){
        var url = indexRef + '/documents/' + documentRef + '/locations/' + locationRef + '/primary'
        return api.put(url,null,token)
    },
    deleteLocation(indexRef,documentRef,locationRef,token){
        var url = indexRef + '/documents/' + documentRef + '/locations/' + locationRef;
        return api.delete(url,token) 
    },
    updateLocation(locationRequest,token){
        var url = locationRequest.indexRef + '/documents/' + locationRequest.documentRef + '/locations/' + locationRequest.locationRef
        return api.put(url,locationRequest.location,token)
    },
    createNewUnpublishedVersion(request,token){
        var url = request.indexRef + '/documents/' + request.documentRef + '/versions'
        return api.post(url,{},token)
    }
    
}