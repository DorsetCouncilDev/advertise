import axios from 'axios';
var emailService = axios.create({
    timeout: 10000
});
export default {
    
    sending(message, token) {
        return new Promise(function (resolve, reject) {
             var formObject = {
            "subject": "Advertise Mail Form",
            "text": message,
            "token": token
        };
        emailService.post("https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/brokerage/mail/contact-form", formObject).then((response) => {
            resolve("worked")
        }).catch((err) => {
            reject("failed")
        });
        })
    },
    sendEmail(message, token) {
        var formObject = {
            "subject": "Advertise Mail Form",
            "text": message,
            "token": token
        };
        emailService.post("https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/brokerage/mail/contact-form", formObject).then((response) => {
            return new Promise();
        }).catch((err) => {
            return new Promise();
        });
    }
}