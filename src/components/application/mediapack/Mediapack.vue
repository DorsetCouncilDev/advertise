<template>
<div id="content">
<SiteTopNav currentPage="mediapackPage"></SiteTopNav>

<h1 id="mediapackHeading">Media pack</h1>
 <div class="row" v-show="!formSent">
   <form class="col-sm-8" id="demo-form"  @submit.prevent="onSubmit" novalidate>
    <p class="mediapck-text">We can offer your organisation unique promotional opportunities to reach your target audience in Dorset.   Advertising offers in Dorset include outdoor, digital and print. For further details download our current Media Pack and sign up for latest updates below</p>




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
    <hr>
          <div class="form-group">
                <div class="multiple-choice" title="available assets">
                    <input type="checkbox" id="keepInTouchBox" class="form-control"  v-model="keepInTouch" required>
                    <label for="keepInTouchBox"  class="mutliple-choice-label form-ck mediapck-text">Tick to confirm you are happy for us to keep in touch with you regarding advertising and sponsorship opportunities. </label>
                </div>
            </div>
        <hr>
        <p id="privacyStatement">The details you provide in this form will not be used for any other purpose and will not be shared with third parties unless required to by law. Under the General Data Protection Regulations (GDPR) you have the right to ask that your details are removed. More information about how we process your data under GDPR is available in our <a href="https://www.dorsetforyou.gov.uk/your-council/about-your-council/data-protection/privacy-policy/dorset-county-council/dorset-county-council-privacy-notice.aspx" target="_blank">privacy notice</a>. </p>
    <hr>


     <button class="btn btn-success" @click.prevent="recaptcha">View media pack</button>


    </form>
        </div>
    <div v-show="formSent" id="formSentMessage">
      <p>Thank you for leaving your details with us. Dorset Council can offer your organisation unique promotional opportunities, helping you reach your target audience in Dorset.</p>
        <p>Thank you for signing up, we'll be in touch soon.</p>
   <a href="/advertise/static/pdf/mediapack.pdf" rel="noopener noreferrer" target="_blank" style="font-size:24px">View media pack</a>
<h2 class="mt-5">Contact us</h2>
<p>Call: <a href="tel:+441305224125">01305 224125</a></p>
<p>Email: <a href="mailto:marketing@dorsetcouncil.gov.uk">marketing@dorsetcouncil.gov.uk</a></p>

    </div>
     <div v-show="formError"><p class="text-danger">Sorry something went wrong submitting this form. Please try again.</p></div>
</div>
</template>

<script>
    import Vue from 'vue'
    import { VueReCaptcha } from 'vue-recaptcha-v3'
    Vue.use(VueReCaptcha, { siteKey: '6LfEWXgUAAAAAIbGKOj88SgEapHW3BmmcDk2EB8P'})
    import emailService from '../../../services/EmailService';
    import pdf from './mediapack.pdf';

    export default {
        name:'Mediapack',
        data() {
            return {
                keepInTouch: false,
                name: "",
                email: "",
                phone: "",
                formError:false,
                formHasErrors:false,
                    errors: {
                    name:null,
                    email:null,
                    phone:null
                },
                formSent: false,
                formError: false,
                mediapackPdf: pdf
            }
        },
        metaInfo () {
            return {
                title: "Sponsorship & advertising media pack | Dorset Council",
                meta: [ {
                    name:"description", content:"Download our media pack and see how your business can benefit from roundabout sponsorship, bus shelter advertising, car parking ticket adverts and more."
                } ]
            }
        },
        methods: {
            openPDF: function(){
                this.formSent = true;
            },
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
                if (!this.formHasErrors) {
                    var text = this.name + "\n" + this.email + "\n" + this.phone + "\n";
                    if (this.keepInTouch)
                        text += "Add to mailing list.\n";
                    text += "Has viewed mediapack";

                    this.$recaptcha('login').then((token) => {
                        emailService.sending(text,token).then((resp) => {
                            this.formSent = true;
                        }).catch((err) => {
                            this.formError = true;
                            this.$refs.recaptcha.reset();
                        })
                    }).catch((err)=>{
                        console.log("error: " + err)
                    })
                }
            }
        }
    }

</script>
<style scoped lang="scss">
    .mediapck-text{
        font-size:16px;
    }
    #mediapackHeading{
       font-size:26px;
    }
    #privacyStatement{
        font-size:16px;
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

    @media only screen and (min-width: 600px) {
        .mediapck-text{
        font-size:19px;
    }
      #mediapackHeading{
       font-size:42px;
    }
    #privacyStatement{
        font-size:19px;
    }

    }
</style>
