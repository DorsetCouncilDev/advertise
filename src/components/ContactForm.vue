<template>
<div>
    <SiteTopNav currentPage="contactPage"></SiteTopNav>

      <section id="content">
        <h1 id="contactHeading">Get in touch</h1>
    <div v-show="formSent" id="formSentMessage">
    Thank you, we'll be in touch soon.

    </div>
    <div id="contactSection"  v-show="!formSent">
        <p class="contact-text">Looking to discuss advertising options in the Dorset area?</p>
        <p class="contact-text">Give us a call on <a href="tel:+441305224125" class="faq-link">01305 224125</a>, email <a href="mailto:marketing@dorsetcouncil.gov.uk" class="faq-link">marketing@dorsetcouncil.gov.uk</a> or fill in the form below and we will get back to you shortly.</p>
        <div class="row">


            <form class="col-sm-8" id="demo-form" action="homepage" method="POST"  @submit.prevent="onSubmit" novalidate>

                <div class="form-group">
                    <label for="name"><span class="form-label-bold">Name</span><span v-if="errors.name != null && errors.name != '' " class="form-error-message">{{errors.name}}</span></label>
                    <input class="form-control form-bold-border" id="name" name="name" type="text" required v-model="name">
                </div>
                <div class="form-group">
                    <label for="email"><span class="form-label-bold">Email</span><span v-if="errors.email != null && errors.email != '' " class="form-error-message">{{errors.email}}</span></label>
                    <input class="form-control form-bold-border" id="email" name="email" type="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="tel"><span class="form-label-bold">Phone (optional)</span></label>
                    <input class="form-control form-bold-border" id="tel" name="tel" type="tel" v-model="phone">
                </div>
                <div class="form-group">
                    <label for="message"><span class="form-label-bold">Message</span><span v-if="errors.message != null && errors.message != '' " class="form-error-message">{{errors.message}}</span></label>
                    <textarea rows="12" class="form-control form-bold-border" id="message" v-model="message" required></textarea>
                </div>
                <hr>
                <div class="form-group">
                    <div class="multiple-choice" title="available assets">
                        <input type="checkbox" id="keepInTouchBox" class="form-control"  v-model="keepInTouch" required>
                        <label for="keepInTouchBox"  class="mutliple-choice-label form-ck contact-text">Tick to confirm you are happy for us to keep in touch with you regarding advertising and sponsorship opportunities. </label>
                    </div>
                </div>
                <hr>
                <p id="privacyText" class="contact-text">The details you provide in this form will not be used for any other purpose and will not be shared with third parties unless required to by law. Under the General Data Protection Regulations (GDPR) you have the right to ask that your details are removed. More information about how we process your data under GDPR is available in our <a href="https://www.dorsetforyou.gov.uk/your-council/about-your-council/data-protection/privacy-policy/dorset-county-council/dorset-county-council-privacy-notice.aspx" target="_blank" rel="noopener noreferrer" class="faq-link">privacy notice</a>. </p>
                <hr>

                 <button class="btn btn-success" @click.prevent="recaptcha">Send</button>

                   <!-- <button class="btn btn-success" @click.prevent="contactTest">Submit</button> -->
            </form>
     </div>
    </div>
    <div v-show="formSendError"><p class="text-danger">Sorry something went wrong submitting this form. Please try again.</p></div>
    </section>
    </div>
</template>

<script>
    // Secret Key  6LfEWXgUAAAAAMONIvKr8aDqCWZ00iUn6a73ipZf

    import Vue from 'vue'
    import { VueReCaptcha } from 'vue-recaptcha-v3'
    Vue.use(VueReCaptcha, { siteKey: '6LfEWXgUAAAAAIbGKOj88SgEapHW3BmmcDk2EB8P'})
    import axios from 'axios';
    import emailService from '../services/EmailService';
    export default {
               name:"ContactForm",
        data() {

            return {
                formSent: false,
                keepInTouch: false,
                name: "",
                email: "",
                phone: "",
                message: "",
                sitekey: '6LfEWXgUAAAAAIbGKOj88SgEapHW3BmmcDk2EB8P',
                formSendError: false,
                errors: {
                    name:null,
                    email:null,
                    phone:null
                },
                formHasErrors: false
            }
        },
        metaInfo () {
            return {
                title: "Contact us to advertise in Dorset | Dorset Council",
                meta: [ {
                    name:"description", content:"Dorset Council offers prominent roundabout advertising locations in Dorset. Contact us today for details about locations, costs and availability."
                } ]
            }
        },
        methods: {
            recaptcha() {


                this.formError = false;
                this.formHasErrors = false;
                if (this.name == null || this.name.trim() == "") {
                    this.errors.name = "Name is required";
                    this.formHasErrors = true;
                }
                if (this.email == null || this.email.trim() == "") {
                    this.errors.email = "email is required";
                    this.formHasErrors = true;
                }
                if (this.message == null || this.message.trim() == "") {
                    this.errors.message= "message is required";
                    this.formHasErrors = true;
                }
                if (!this.formHasErrors) {
                    this.formSendError = false;
                    var text = this.name + "\n" + this.email + "\n" + this.phone + "\n";
                    if (this.keepInTouch)
                        text += "Add user to mailing list.\n";
                    else
                        text += "User did not opt to be added to the mailing list\n";
                    text += this.message;

                    this.$recaptcha('login').then((token) => {
                        emailService.sending(text,token).then((resp) => {
                            this.formSent = true;
                        }).catch((err) => {
                            this.formSendError = true;
                            this.$refs.recaptcha.reset();
                        })
                    }).catch((err)=>{
                        console.log("error: " + err)
                    })
                }

            },
        },
        mounted() {
            if (this.$route.query.documentRef != null && this.$route.query.documentRef != '') {
                if(this.$route.query.action == "waiting")
                    this.message = "Add me to the waiting list for " + this.$route.query.documentRef;
                else if(this.$route.query.action == "book")
                    this.message = "I would like to book " + this.$route.query.documentRef;
            }

        }
    }

</script>

<style scoped lang="scss">

.contact-text{
font-size:16px;
}

    #privacyText{
        font-size:16px;
    }


    #contactHeading{
        font-size:26px;
    }

    .multiple-choice {
        .form-ck {
            &:before {
                border-color: black;
                top: 15px;
            }
            &:after {
                border-color: black;
                top: 25px;
            }
            line-height: 1.5;
        }
    }

    .form-bold-border {
        border-color: black;
        &:focus {
            border-color: orange;
        }
    }

    .subHeading {
        font-size: 18px;
    }

     @media only screen and (min-width: 600px) {
          #privacyText{
        font-size:18px;
    }
    .contact-text{
font-size:19px;
}


    #contactHeading{
        font-size:42px;
    }
    }


</style>
