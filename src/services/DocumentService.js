import api from './api'

export default{

    getDocuments(indexRef,typeRef){
        var url = indexRef + '/documenttypes/' + typeRef + '/documents'
        return api.get(url);
    },
    getDocument(indexRef,documentRef){
        var url = '/documents/' + documentRef
        return api.get(url)
    },
}
