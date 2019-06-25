<template>
<div class="mb-3" id="content">
 <SiteTopNav currentPage="homePage"></SiteTopNav>

      
<h1 class="home-header">Local advertising solutions in Dorset</h1>     
<HomeSearch :indexRef="indexRef"></HomeSearch>
<section>
    <h1 class="home-second-header">Advertise in Dorset to reach:</h1>
     <div class="ad-data-collection  mb-5">
        <div class="ad-data">18 <span class="ad-data-label">Million yearly visitors</span></div>
        <div class="ad-data">375,050 <span class="ad-data-label">residents</span></div>
        <div class="ad-data">158,738 <span class="ad-data-label">households</span></div>
        <div class="ad-data">19,995 <span class="ad-data-label">businesses</span></div>
    </div>
</section>
  <section>
   <h1 class="home-second-header">Advertise your business here</h1>
    
    
    <DocumentTypeSection>
    </DocumentTypeSection>
    
    </section>
<section>
<h1 class="home-second-header" id="testimonialsHeader">What others say</h1>

<div class="quote-container">
<blockquote class="customer-quote">"We'd recommend roundabout sponsorship in Dorset as a great way of raising brand awareness, and at Dorset Windows we find it provides good value for money. With the right roundabout, we're able to promote our brand as people travel around and be in the forefront of people's minds"</blockquote>

<p class="quote-source">Kath Pumfrey, of Dorset Windows</p>
</div>
<div class="quote-container">
<blockquote class="customer-quote">"At Blue Pool, we’ve had a very positive experience of roundabout sponsorship; the attraction has benefited from an increase in visitor numbers and word-of-mouth, and we’ve had growing in interest in Wareham Bears. We’re also happy that, through our sponsorship, the community benefits from well-maintained and tidy roundabouts. 
We’d recommend roundabout sponsorship in Dorset to other businesses and attractions due to the increased number of customers and the greater local awareness that it provides"</blockquote>

<p class="quote-source">Carolyn Snook, of Blue Pool</p>
</div>
</section>
    <section id="contact-container">
<h1 class="third-header">Contact us</h1>

 <span class="contact-link-name">email</span>
 <span class="contact-link-value"><a href="mailto:marketing@dorsetcouncil.gov.uk">marketing@dorsetcouncil.gov.uk</a></span> 
            
<span class="contact-link-name">telephone</span>
<span class="contact-link-value"><a href="tel:+441305224125">01305 224125</a></span>
        
<p>Send your message or questions via our <router-link class="contact-bold-link" to="/advertise/contact">Contact us</router-link> page</p>
<p>Download and view our <router-link class="contact-bold-link" to="/advertise/mediapack">Media pack</router-link> </p>

        </section>
  
</div>
</template>

<script>
    import HomeSearch from './HomeSearch';
    import DocumentTypeSection from './DocumentTypesSection';  

    export default {
        name: 'Home',
        data() {
            return {
                indexRef: "advertise",
                test: "test"
            }
        },
        metaInfo () {
            return {
                title: "Roundabout sponsorship & advertising | Dorset Council",
                meta: [ {
                    name:"description", content:"Promote your business through roundabout sponsorship & local advertising in Dorset. Advertising opportunities benefiting both your local services & brand."
                } ]
            }
        },
        components: {
            HomeSearch, DocumentTypeSection
        }
    }

</script>


<style scoped lang="scss">

    .quote-container{
        padding:10px;
        background: hsl(203, 85%, 23%);
        color: hsl(203, 80%, 85%);
        margin-bottom:25px;
        margin-top:25px;
         // box-shadow: 10px 10px black;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    }
    .customer-quote{
        font-style:italic;
        font-size:16px;
    }

    .quote-source{
        font-size:19px;
        color:white;
    }
    .home-second-header{
        font-size: 24px;
        margin-top:30px;
        margin-bottom:15px;
        text-align:left;
        font-weight:500;
    }
    
    .home-header {
        font-size: 24px;
        margin-top: 10px;
    }
 
    .third-header {
        font-size: 26px;
    }

    .ad-data-collection {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        .ad-data {
            line-height: 1;
            position: relative;
            margin-bottom: 15px;
            font-weight: 700;
            font-size: 26px;
            margin-right: 0;
            padding-bottom:10px; 
            padding-top: 10px;
            color: black;
           
            .ad-data-label {
                font-size: 19px;
                font-weight:400;
            }
        }
    }
 @media only screen and (min-width: 360px) {
     .quote-container{
         padding:20px;
     }
 .customer-quote{
     font-size:19px;
 }
  .quote-source{
      font-size:22px;
  }
 }
    @media only screen and (min-width: 540px) {

             .quote-container{
         padding:30px;
     }
 .customer-quote{
     font-size:22px;
 }
  .quote-source{
      font-size:26px;
  }
        .home-header {
            font-size: 32px;
            margin-top: 10px;
        }
        .ad-data-collection {
   

            .ad-data {


                font-size: 32px;

                .ad-data-label {
                    font-size: 22px;
                }
            }
        }
    }
#contact-container{
    margin-top:50px;
    font-size:16px;
    .contact-link-name{
        font-weight:500;
        display: block;
    }
    .contact-link-value{
        display: block;
           margin-bottom:20px;
}
}

.contact-bold-link{
    text-decoration: underline;
    font-weight: 500;
}

@media only screen and (min-width: 700px) {
    .ad-data-collection {
        flex-direction: row;
        .ad-data {
     
            width:48%;
            font-size: 32px;
            &:nth-child(odd){
                margin-right:20px;
            }
                .ad-data-label {
                    font-size: 22px;
                }
            }
        }
    .home-second-header{
        font-size:32px;
    }
    #contact-container{
    margin-top:50px;
    font-size:19px;
    }
}

@media only screen and (min-width: 990px) {
          .ad-data-collection {


            .ad-data {
max-width:550px;
                font-size: 48px;

                .ad-data-label {
                    font-size: 28px;
                }
            }
        }

}
</style>
