<template>
<div>
             <div class="info">
        <div class="contact"> 
            <span id="emailContact">email <a href="mailto:marketing@dorsetcc.gov.uk">marketing@dorsetcc.gov.uk</a></span> 
            <span id="telContact">tel. <a href="tel:+441305224125">01305 224125</a></span>
            <div id="menuLinksTwo">
                <router-link :to="{path: '/advertise/info/contact/' + ''}">Contact us</router-link> 
                <router-link class="selected" to="/advertise/info/mediapack">Media pack</router-link> 
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
            </div>
        </div>
    </div>

<h1 id="faqHeading">Frequently asked questions about Roundabout Sponsorship</h1>

<p>Below is a list of frequently asked questions regarding the sponsoring of roundabouts in Dorset. If your questions are not addressed on this FAQ page, please contact us, we’re always happy to help.</p>
<button class="btn btn-turq float-right" id="toggleAll" @click="toggleAll">Open all answers</button>

<section class="questions-category-section">
    <h3 class="section-heading">Roundabout sponsorship general</h3>
    
    <div class="question-block hide">
        <a id="questionOne" class="question" title="Toggle answer"  @click="toggleViewAnswer" tabindex="0">  Why should we sponsor a roundabout in Dorset?</a>
        <div class="answer" aria-labelledby="questionOne">
            <p>Sponsoring Dorset’s roundabouts offers you cost-effective out-of-home (OHH) local advertising to raise your organisation’s profile and promote your products and services, whilst making a positive contribution to the county’s landscape. Your brand will be seen by thousands of motorists using the roads 24 hours a day, 365 days a year.</p>
            <ul>
                <li>Target your local audience, including residents and visitors.</li>
                <li>Raise brand awareness.</li>
                <li>Display your company logo and message in a strategically prominent location.</li>
                <li>Gain exclusive presence on Dorset’s highways, free from other advertisers.</li>
                <li>Enhance your reputation with socially responsible advertising.</li>
            </ul>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionTwo" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">Which roundabouts can be sponsored and where are they located?</a>
        <div class="answer" aria-labelledby="questionTwo"><p>Dorset Council manages the sponsorship on 70 roundabouts across the area, the locations and availability can be viewed online a map or as a list.</p> 
            <p>The scheme only covers the roads the county council is responsible for, and does not include any of the roundabouts on the trunk roads running through the county (the A31 and the A35 from Bere Regis to the Devon border), which are the responsibility of the Highways Agency, who do not promote advertising on their network.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionThree" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer" >How long does the sponsorship run for?</a>
        <div class="answer" aria-labelledby="questionThree"><p>Roundabout sponsorship in Dorset is for a minimum duration of 12 months, and after that time, you will have first refusal to renew your agreement.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionFour" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">Is roundabout sponsorship effective?</a>
        <div class="answer" aria-labelledby="questionFour"><p>Out of Home (OOH) advertising is an important part of a local advertising plan. Sponsorship and advertising in locations that will reach your customers and communities can raise brand awareness, convey your message about new products and services, and help grow your business.</p>
            <p>Roundabout sponsorship is visible all year round, giving your message the chance to be seen multiple times by a large audience, with opportunities to see your advert in some locations exceeding 30,000 vehicles per 12 hour period. Approximately 87% of adults in the UK see outdoor advertising each week.</p>
            <p>Many of Dorset’s roundabout sponsors have increased the number of roundabouts they sponsor each year, proving that outdoor advertising on roundabouts works well for their businesses.  We’ve many positive testimonials from customers, citing growth in their businesses from this form of advertising, and over two-thirds of sponsors renew their roundabouts every year – providing us with the feedback that they are getting a good return on their sponsorship and advertising spend.</p>
        </div>
    </div>

</section>

<section class="questions-category-section">
    <h3 class="section-heading">Costs and payment</h3>
    <div class="question-block hide">
        <a id="questionFive" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">How much does roundabout advertising cost in Dorset?</a>
        <div class="answer" aria-labelledby="questionFive"><p>Roundabout sponsorship fees vary between £1800 per annum for our smallest roundabout to £4750 per annum (excluding VAT) for our largest and busiest location. Each roundabout is valued based upon its size, location, number of signs positions, size of signs, and traffic data where this is available. Sponsorship rates are subject to an annual review.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionSix" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">What does the sponsorship fee include?</a>
        <div class="answer" aria-labelledby="questionSix"><p>The cost of sponsorship includes the design, manufacture and installation of sponsored signage panels. It also covers the remaking and installation of damaged signage.</p>  
        <p>Money raised is used to fund the maintenance of the roundabouts and verges across the county, and funds support the continuation of highway services. By sponsoring a busy roundabout in Dorset you will have a unique opportunity to engage with people whilst they are on the move.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionSeven" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">If we sponsor more than one roundabout or book for a longer period of time can this reduce the fee?</a>
        <div class="answer" aria-labelledby="questionSeven"><p>The sponsorship fees can be affected by the quantity of locations sponsored and the duration of the agreement, however, it depends on the exact location of each roundabout and the number of roundabouts that you would like to sponsor. Contact us with your requirements for advice.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionEight" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">Apart from the annual sponsorship fee, are there any other costs involved in sponsorship of roundabouts?</a>
        <div class="answer" aria-labelledby="questionEight"><p>No, there are no additional costs for the sponsor, and the fee includes for the cost of the design (subject to suitable logo/images provided), manufacture and installation of the signage. The fee also covers the replacement of signage if they are damaged during the year.</p> 
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionNine" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">How do we pay the sponsorship fee? </a>
        <div class="answer" aria-labelledby="questionNine"><p>Sponsors can either pay the full amount up front by BACS payment or by monthly direct debit. There is no additional charge to pay by monthly instalments.</p>
        </div>
    </div>

</section>


<section class="questions-category-section">
    <h3 class="section-heading">Signage and design</h3>

    <div class="question-block hide">
        <a id="questionTen" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">What size are the advertising signs?</a>
        <div class="answer" aria-labelledby="questionTen"><p>We have two standard sponsorship signs on the roundabouts Sign size is determined by the planning consent granted for each location. The majority of the signs are 1016mm x 610mm, whilst some are 1219mm x 610mm (including the space for the roundabout name and council logo).</p> 
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionEleven" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">Who will design the artwork for our sign?</a>
        <div class="answer" aria-labelledby="questionEleven"><p>You can either supply your own creative design which we will add to our standard template, or provide us with a current logo (in a high resolution JPEG at 300dpi or EPS file) and our in-house designer will prepare the artwork for you. Should you wish to prepare your own artwork please let us know, and we can provide you with the specification for your chosen location.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionTwelve" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">What can I have on my sign?</a>
        <div class="answer" aria-labelledby="questionTwelve"><p>You can display your logo or image along with a short message/strapline, plus a web address or business location. We are not able to include directional arrows or reflective materials.</p> 
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionThirteen" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">Can we have a different design on each sign?</a>
        <div class="answer" aria-labelledby="questionThirteen"><p>Yes, each sponsorship sign can have a unique design and you can specify the order that they are installed. We recommend that you keep the design simple and clear, with a limited amount of text, in order that you make be best impact.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionFourteen" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">Do you have examples of roundabout sign designs?</a>
        <div class="answer" aria-labelledby="questionFourteen"><p>Yes, if you’d like to see examples of existing sponsored signs,  let us know, and we can send you a selection for some design inspiration. The standard signage design can be viewed in this <a  id="exampleLink" @click="openExamplesPDF">examples pdf</a></p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionFiftheen" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">Can we change our sign design during the sponsorship?</a>
        <div class="answer" aria-labelledby="questionFithteen"><p>Yes, changes can be made at any time during the sponsorship, and a lead in time of 2 - 3 weeks is normally required. If a sponsor wants to change the design there is a separate fee charged which is quoted per roundabout depending on the number of signs that need to be changed, all costs incurred are passed onto the sponsoring company.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionSixteen" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">What happens if our roundabout signage is damaged?</a>
        <div class="answer" aria-labelledby="questionSixteen"><p>If your sponsorship sign is damaged or knocked over but remains intact, the sign will be reinstated at no extra cost to the sponsor. Should the signage get completely destroyed or is not able to be repaired then the council will replace the signage. Please be aware that damage to roundabout signage does not occur on a regular basis, however, when it does happen we endeavour to replace or repair signage within 5 – 10 working days following the reported damage.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionSeventeen"  class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">Can we make or install my own signs or banners?</a>
        <div class="answer" aria-labelledby="questionSeventeen"><p>The council will arrange for the signs to be made and installed by our in-house sign shop, who ensure that signage it meets the Highway Authority’s criteria.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionEighteen" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">How many advertising signs can we have on the roundabout?</a>
        <div class="answer" aria-labelledby="questionEighteen"><p>The number of signs available on each roundabout is determined by the number of approaches to the junction and the overall size of the roundabout, and numbers vary from 2 to 5 signs. Each organisation has exclusivity at the roundabout they sponsor, so it will only be one advertiser displayed at each location.</p>
        </div>
    </div>

</section>

<section class="questions-category-section">
    <h3 class="section-heading">How to apply</h3>

    <div class="question-block hide">
        <a id="questionnineteen" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">How do we apply for sponsorship?</a>
        <div class="answer" aria-labelledby="questionNineteen"><p>Please contact us stating your preferred location. We will let you know the availability of the roundabout and the fee, and if you wish to proceed with your selected roundabout we’ll send you an agreement to read and sign.</p>
            <p>Should you have any queries relating to the roundabout sponsorship process please contact us.</p>
        </div>
    </div>

    <div class="question-block hide">
        <a id="questionTwenty" class="question" tabindex="0" title="Toggle answer" @click="toggleViewAnswer">The roundabout we’d like to sponsor is already taken, do you have a waiting list?</a>
        <div class="answer" aria-labelledby="questionTwenty"><p>Although there are 70 roundabouts in the sponsorship scheme across the Dorset Council area, over 80% have a current sponsor. We operate a waiting list for each location and notify potential sponsors when there is availability. Should you like to join the waiting list for a particular town or specific roundabout please get in touch.</p>
        </div>
    </div>
</section>

</div>
</template>

<script>


    export default {
        data() {
            return {
            
            }
        },
        methods:{
            toggleViewAnswer: function(event){
                var block = event.target.parentElement;
       
                if(block.classList.contains("hide"))
                    block.classList.remove("hide");
                else
                    block.classList.add("hide");
            },
            toggleAll: function(event){

                var questions =  document.getElementsByClassName("question-block");

                console.log("num of qs: " + questions.length)
                
                if(event.target.classList.contains("all")){
                    for(var i=0; i<questions.length; i++){
                        questions[i].classList.add("hide");
                    }
                    event.target.classList.remove("all");
                     event.target.innerHTML = "Open all answers";
                }
                else{
                      for(var i=0; i<questions.length; i++){
                        questions[i].classList.remove("hide");
                    }
                    event.target.classList.add("all");
                     event.target.innerHTML = "Close all answers";
                }

         
            },
            openExamplesPDF: function(){
                     window.open("https://web.dorsetcc.gov.uk/advertise/static/pdf/examples.pdf", '_blank');
                // window.open(url, '_blank');
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
    font-size:32px;
    margin-top:30px;
}
#faqSubHeading{
    font-size:32px;
    font-weight:400;
    margin-bottom:15px;
}
.questions-category-section{
    margin-bottom:30px;
    border-left: solid 5px hsl(177,100%,21%);
    padding-left:30px;
    margin-top:60px;
    .section-heading{
        color:hsl(177,100%,21%);
        font-size:28px;
    }
}

.question-block{
      border-bottom: solid 1px  hsl(177,100%,21%);
      position:relative;
      

    .question{
        font-weight:500;
        color:#151515;
        padding:5px;
        padding-left:30px;
        display:block;
        margin-top:5px;
        margin-bottom:5px;
        transition:color .6s;

     
        &:focus{
            outline:1px solid orange;
        }

        &:before{
            content:url(../../../assets/images/baseline-remove-24px.svg);
            margin-top:10px;position:absolute;
            left:0px;
            top:-2px;
       
            
        }
        &:hover{
            cursor:pointer;
          
      
        }
    }
    .answer{

        padding: 15px 30px;
        background:#f5f5f5;
        height:auto;
        overflow:visible;    
        transition: opacity .5s;
        opacity:1;
        margin-bottom:15px;
    }

    &.hide{
        .question{
            &:before{
                 content:url(../../../assets/images/baseline-add-24px.svg);
            }
        }
        .answer{
            height:0;
            overflow:hidden;    
            margin-top:0;
            padding:0;
            opacity:0;
            margin-bottom:0;
        }
    }
 }
.btn-turq{
    background-color: hsl(177,100%,21%);
    color:white;
}
          
</style>
