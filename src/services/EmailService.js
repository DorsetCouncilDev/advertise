import axios from 'axios';
var emailService = axios.create({
    baseURL: 'http://52.56.188.219/catalogue/v1/public/mail',
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
        emailService.post("http://52.56.188.219/catalogue/v1/public/mail", formObject).then((response) => {
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
        emailService.post("http://52.56.188.219/catalogue/v1/public/mail", formObject).then((response) => {
            return new Promise();
        }).catch((err) => {
            return new Promise();
        });
    }
}