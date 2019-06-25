<template>
<div id="content">
<SiteTopNav currentPage="mediapackPage"></SiteTopNav>

<h1 id="mediapackHeading">Media pack</h1>
    <p class="mediapck-text">We can offer your organisation unique promotional opportunities to reach your target audience in Dorset.   Advertising offers in Dorset include outdoor, digital and print. For further details download our current Media Pack and sign up for latest updates below</p>
  
    <div class="row" v-show="!formSent">
<form class="col-sm-8" id="demo-form"  @submit.prevent="onSubmit" novalidate>
    
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
    <vue-recaptcha ref="invisibleRecaptcha"
            @verify="onVerify"
            size="invisible"
            :sitekey="sitekey">
    
     <button type="submit" class="btn btn-success">View media pack</button>
    </vue-recaptcha>
       
    </form>
        </div>
    <div v-show="formSent" id="formSentMessage">
        <p>Thank you for signing up, we'll be in touch soon.</p>
   <a href="/advertise/static/pdf/mediapack.pdf" rel="noopener noreferrer" target="_blank">View media pack</a>
    
    </div>
     <div v-show="formError"><p class="text-danger">Sorry something went wrong submitting this form. Please try again.</p></div>
</div>
</template>

<script>
    import VueRecaptcha from 'vue-recaptcha';
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
                sitekey: '6LfEWXgUAAAAAIbGKOj88SgEapHW3BmmcDk2EB8P',
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
        components: {
            VueRecaptcha
        },
        methods: {
            openPDF: function(){
                this.formSent = true;
            },
            onSubmit: function() {
                this.formError = false;
                this.$refs.invisibleRecaptcha.execute()
            },
            onVerify: function(securityToken) {
               
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
           

                    emailService.sending(text, securityToken).then((resp) => {
                        this.formSent = true;
                    }).catch((err) => {
                        this.formError = true;
                        this.$refs.recaptcha.reset();
                    })
                }

            },
            onCaptchaExpired: function() {
                this.$refs.recaptcha.reset();
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
