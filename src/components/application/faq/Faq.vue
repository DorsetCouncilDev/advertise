<template>
<div id="content">
<SiteTopNav currentPage="faqPage"></SiteTopNav>

<h1 id="faqHeading">Frequently asked questions about Roundabout Sponsorship</h1>

<p>Below is a list of frequently asked questions about sponsoring roundabouts in Dorset. If your questions are not addressed on this page, please contact us, we’re always happy to help.</p>


<QuestionSection  v-for="qs in questionSections" v-bind:key="qs.id" :questions="qs.questions" :title="qs.title"></QuestionSection>

</div>
</template>

<script>
//var pdf = require('../../../assets/pdf/examples.pdf');
   import QuestionSection from './QuestionSection';
    import Answer from './Answer';
   import QuestionsData from './questions.json';
    export default {
            name: 'Faq',
        data() {
            return {
               // examplesPdf : pdf
               questionSections:QuestionsData,
               testAnswer:"<div><p>Council manages the sponsorship of 70 roundabouts across the area. You can view the locations and availability of the roundabouts on our <router-link :to='/advertise/search/view/map'>map</router-link>.</p></p>The scheme only covers the roads the council is responsible for, and does not include any of the roundabouts on the trunk roads running through the county (the A31 and the A35 from Bere Regis to the Devon border), which are the responsibility of the Highways Agency, who do not promote advertising on their network.</div>"
               }
        },
        components:{QuestionSection, Answer},

    metaInfo () {
            return {
                title: "Roundabout sponsorship FAQs | Dorset Council",
                meta: [ {
                    name:"description", content:"Answers to your questions about roundabout sponsorship and advertising in Dorset, from how much it costs, to how to apply and display your message."
                } ]
            }
        },
        computed:{
            answerObject(){
                return {
                    template:"<div><p>Council manages the sponsorship of 70 roundabouts across the area. You can view the locations and availability of the roundabouts on our <router-link to='/advertise/search/view/map'>map</router-link>.</p></p>The scheme only covers the roads the council is responsible for, and does not include any of the roundabouts on the trunk roads running through the county (the A31 and the A35 from Bere Regis to the Devon border), which are the responsibility of the Highways Agency, who do not promote advertising on their network.</div>"
                }
            },
            answerWithLinks(){
                return
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
