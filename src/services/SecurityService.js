import api from './api'

export default{
    
    loginToAdmin(credentials){
         return api.postSecurityCredentials(credentials)
    }
}