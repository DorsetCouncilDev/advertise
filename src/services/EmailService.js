import axios from 'axios';
var _axios = axios.create({
    timeout: 10000
});
export default {
    
    sending(message,token) {
        return new Promise(function (resolve, reject) {
             var formObject = {
            "subject": "Advertise Mail Form",
            "text": message
        };
        _axios.post("https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/advertise/mail/contact-form", formObject, {headers: { "recaptcha-response": token }}).then((response) => {
            resolve("worked")
        }).catch((err) => {
            reject("failed " +  err)
        });
        })
    },
    sendEmail(message, token) {
        var formObject = {
            "subject": "Advertise Mail Form",
            "text": message
        };
        _axios.post("https://apptest.dorsetcc.gov.uk/catalogue/indexes/advertise/mail/contact-form", formObject,{headers: { "recaptcha-response": token }}).then((response) => {
            return new Promise();
        }).catch((err) => {
            return new Promise();
        });
    }
}