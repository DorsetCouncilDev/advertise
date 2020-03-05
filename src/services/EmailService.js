import axios from 'axios';

const TEST_CATALOGUE_ADVERTISE = 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/advertise/mail/contact-form';
const LIVE_CATALOGUE_ADVERTISE = 'https://app.dorsetcouncil.gov.uk/catalogue/api/indexes/advertise/mail/contact-form';

var _axios = axios.create({
    baseURL: TEST_CATALOGUE_ADVERTISE,  // LIVE_CATALOGUE_ADVERTISE,
    timeout: 10000
});
export default {

    sending(message,token) {
        return new Promise(function (resolve, reject) {
             var formObject = {
            "subject": "Advertise Mail Form",
            "body": message
        };
        _axios.post("", formObject, {headers: { "Recaptcha-Response": token }}).then((response) => {
            resolve("worked")
        }).catch((error) => {
          if (error.response) {
            reject(error.response.status)
          }
          else
            reject("0")

        });
        })
    },
    sendEmail(message, token) {
        var formObject = {
            "subject": "Advertise Mail Form",
            "body": message
        };
        _axios.post("", formObject,{headers: { "Recaptcha-Response": token }}).then((response) => {
            return new Promise();
        }).catch((err) => {
            return new Promise();
        });
    }
}
