import axios from 'axios';
var _axios = axios.create({
    timeout: 10000
});
export default {
    
    sending(message) {
        return new Promise(function (resolve, reject) {
             var formObject = {
            "subject": "Advertise Mail Form",
            "text": message,
            // "token": token
        };
        _axios.post("https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/advertise/mail/contact-form", message).then((response) => {
            resolve("worked")
        }).catch((err) => {
            reject("failed " +  err)
        });
        })
    },
    sendEmail(message, token) {
        var formObject = {
            "subject": "Advertise Mail Form",
            "text": message,
            "token": token
        };
        _axios.post("https://apptest.dorsetcc.gov.uk/catalogue/indexes/advertise/mail/contact-form", formObject).then((response) => {
            return new Promise();
        }).catch((err) => {
            return new Promise();
        });
    }
}