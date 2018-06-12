import api from './api'

export default{
    search(postcode) {
        return api.postcodeSearch(postcode)
    }
}