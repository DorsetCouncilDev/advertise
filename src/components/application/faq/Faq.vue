<template>
<div>
             <div class="info">
        <div class="contact"> 
            <span id="emailContact">email <a href="mailto:marketing@dorsetcc.gov.uk">marketing@dorsetcc.gov.uk</a></span> 
            <span id="telContact">tel. <a href="tel:+441305224125">01305 224125</a></span>
            <div id="menuLinksTwo">
                <router-link :to="{path: '/advertise/info/contact/' + ''}">Contact us</router-link> 
                <router-link to="/advertise/info/mediapack">Media pack</router-link> 
                <router-link class="selected" to="/advertise/info/faq">FAQs</router-link> 
            </div>
        </div>
        <div id="navRow">
            <div id="navLinks">
                <ol class="ad-breadcrumb">
                    <li><router-link :to="{path: '/advertise'}">home</router-link></li>
                <li aria-current="page">FAQ</li>   
                </ol>
            </div>
            <div id="menuLinksOne">
                <router-link to="/advertise/info/contact">Contact us</router-link> 
                <router-link to="/advertise/info/mediapack">Media pack</router-link> 
                    <router-link to="/advertise/info/faq">FAQs</router-link> 
            </div>
        </div>
    </div>

<h1 id="faqHeading">Frequently asked questions about Roundabout Sponsorship</h1>

<p>Below is a list of frequently asked questions about sponsoring roundabouts in Dorset. If your questions are not addressed on this page, please contact us, we’re always happy to help.</p>


<QuestionSection  v-for="qs in questionSections" v-bind:key="qs.id" :questions="qs.questions" :title="qs.title"></QuestionSection>

</div>
</template>

<script>
//var pdf = require('../../../assets/pdf/examples.pdf');
   import QuestionSection from './QuestionSection';
   import QuestionsData from './questions.json';
    export default {
            name: 'Faq',
        data() {
            return {
               // examplesPdf : pdf
               questionSections:QuestionsData
            }
        },
        components:{QuestionSection},

    metaInfo () {
            return {
                title: "Roundabout sponsorship FAQs | Dorset Council",
                meta: [ {
                    name:"description", content:"Answers to your questions about roundabout sponsorship and advertising in Dorset, from how much it costs, to how to apply and display your message."
                } ]
            }
        }
            }

</script>
<style scoped lang="scss">

#exampleLink{
    text-decoration: underline;
    font-weight:500;
}
#faqHeading{
    font-size:24px;
    margin-top:10px;
}

 @media only screen and (min-width: 600px) {
     #faqHeading{
    font-size:32px;
    margin-top:30px;
}

 }
          
</style>
