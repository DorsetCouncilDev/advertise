import api from './api'

export default{
    search(indexRef,searchParameters) {
        return api.postSearch(indexRef, searchParameters)
    }
}