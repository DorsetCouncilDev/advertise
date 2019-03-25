<template>
<div>
          <div class="info">
        <div class="contact"> 
            <span id="emailContact">email <a href="mailto:marketing@dorsetcc.gov.uk">marketing@dorsetcc.gov.uk</a></span> 
            <span id="telContact">tel. <a href="tel:+441305224125">01305 224125</a></span>
            <div id="menuLinksTwo">
                <router-link :to="{path: '/advertise/info/contact/' + ''}">Contact us</router-link> 
                <router-link class="selected" to="/advertise/info/mediapack">Media pack</router-link> 
                   <router-link to="/advertise/info/faq">FAQs</router-link> 
            </div>
        </div>
        <div id="navRow">
            <div id="navLinks">
                <ol class="ad-breadcrumb">
                    <li><router-link :to="{path: '/advertise'}">home</router-link></li>
                <li aria-current="page">media pack</li>   
                </ol>
            </div>
            <div id="menuLinksOne">
                <router-link to="/advertise/info/contact">Contact us</router-link> 
                <router-link class="selected" to="/advertise/info/mediapack">Media pack</router-link> 
                   <router-link to="/advertise/info/faq">FAQs</router-link> 
            </div>
        </div>
    </div>
<h1 id="mediapackHeading">Media pack</h1>
    <p>We can offer your organisation unique promotional opportunities to reach your target audience in Dorset.   Advertising offers in Dorset include outdoor, digital and print. For further details download our current Media Pack and sign up for latest updates below</p>
  
    <div class="row" v-show="!formSent">
<form class="col-sm-8" id="demo-form"  @submit.prevent="onSubmit" novalidate>
    
        <div class="form-group">
            <label for="name"><span class="form-label-bold">Name</span></label>
            <input class="form-control form-bold-border" id="name" name="name" type="text" required v-model="name">
        </div>
            <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control form-bold-border" id="email" name="email" type="email" v-model="email" required>
        </div>
        <div class="form-group">
            <label for="tel">Phone <span>(optional)</span></label>
            <input class="form-control form-bold-border" id="tel" name="tel" type="tel" v-model="phone">
        </div>
    <hr>
          <div class="form-group">
                <div class="multiple-choice" title="available assets">
                    <input type="checkbox" id="keepInTouchBox" class="form-control"  v-model="keepInTouch" required>
                    <label for="keepInTouchBox"  class="mutliple-choice-label form-ck">Tick to confirm you are happy for us to keep in touch with you regarding advertising and sponsorship opportunities. </label>
                </div>
            </div> 
        <hr>
        <p id="privacyStatement">The details you provide in this form will not be used for any other purpose and will not be shared with third parties unless required to by law. Under the General Data Protection Regulations (GDPR) you have the right to ask that your details are removed. More information about how we process your data under GDPR is available in our <a href="https://www.dorsetforyou.gov.uk/your-council/about-your-council/data-protection/privacy-policy/dorset-county-council/dorset-county-council-privacy-notice.aspx" target="_blank">privacy notice</a>. </p>
    <hr>
    <vue-recaptcha ref="invisibleRecaptcha"
            @verify="onVerify"
            size="invisible"
            :sitekey="sitekey">
    
     <button @click="openPDF" type="submit" class="btn btn-success">View media pack</button>
    </vue-recaptcha>
       
    </form>
        </div>
    <div v-show="formSent" id="formSentMessage">
        <p>Thank you for signing up, we'll be in touch soon.</p>
   <a href="http://52.56.188.219/advertise/static/pdf/mediapack.pdf" target="_blank">View media pack</a>
    
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
                sitekey: '6LfEWXgUAAAAAIbGKOj88SgEapHW3BmmcDk2EB8P',
                formSent: false,
                formError: false,
                mediapackPdf: pdf
            }
        },
        components: {
            VueRecaptcha
        },
        methods: {
            onSubmit: function() {
                this.formError = false;
                this.$refs.invisibleRecaptcha.execute()
            },
            onVerify: function(securityToken) {
                if (this.name != null || this.name != "" || this.email != null || this.email != "" || this.phone != null || this.phone != "") {
                    var text = this.name + "\n" + this.email + "\n" + this.phone + "\n";
                    if (this.keepInTouch)
                        text += "Add to mailing list.\n";
                    text += "Has viewed mediapack";
                    var formObject = {
                        "subject": "Advertise Mail Form",
                        "text": text,
                        "token": securityToken
                    };

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
            letter-spacing:1px;

        }
    }

    .form-bold-border {
        border-color: black;
        &:focus {
            border-color: orange;
        }
    }

    @media only screen and (min-width: 600px) {
    
      #mediapackHeading{
       font-size:42px; 
    }
    #privacyStatement{
        font-size:18px;
    }
        
    }
</style>
