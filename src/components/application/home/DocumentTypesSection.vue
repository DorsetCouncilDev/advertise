<template>
    <section class="document-types-section">
        <h2 class="home-second-header">Advertise your business here</h2>
        <p class="documentTypesParagraph">Dorset Council offers a broad portfolio of sponsorship, advertising sites and promotional opportunities. Whether you’re looking to promote a product, service or event - we can help your message gain wide coverage.</p>
        <p class="documentTypesParagraph">Our local advertising solutions in Dorset offer options for all sizes of budget and offer great value. Sponsorship and advertising fees help to support council services, and benefit Dorset's residents and businesses.</p>
        <ul class="document-types-list list-unstyled" >
            <DocumentTypeDiscovery v-for="type in types" :documentTypeName="type.name" :documentTypeRef="type.ref" :text="type.text" v-bind:key="type.ref"></DocumentTypeDiscovery>
        </ul>

    </section>
</template>

<script>

import DocumentTypeDiscovery from './DocumentTypeDiscovery';
export default {
    name: 'DocumentTypeSection',
    components: { DocumentTypeDiscovery },
    data(){
        return {
        types:[
            {name:"Roundabout Sponsorship", ref:"roundabout-sponsorship",text:'Over 80 roundabouts in high traffic areas'},
            {name:"Digital – eNewsletter Sponsorship", ref:"enewsletter-sponsorship", text:'Reach up to 27,000 subscribers with a banner advert linked directly to your website'},
            {name:"Car Parking Ticket Advertising", ref:"car-parking-ticket-advertising",text:'Directly into the hands of your audience'},
            {name:"Vehicle Advertising", ref:"vehicle-advertising",text:'Create a moving billboard'},
            {name:"Bus Shelter Posters", ref:"bus-shelter-advertising",text:'Prime seafront advertising in Weymouth'},
            {name:"Boundary Signage Sponsorship", ref:"boundary-signage-sponsorship",text:'Welcome to Dorset, home of "your business"'}
        ]
      }
    }
}

</script>


<style scoped lang="scss">
    .document-types-list{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top:30px;
    }
    .sub-heading-types{
        font-size:26px;
        margin-bottom:15px;
    }
  .type-name{
    display: block;
  }

    .document-types-section{
        margin-top:15px;
        margin-bottom:50px;
    }
    .documentTypesParagraph{
        font-size: 16px;
    }

    @media only screen and (min-width: 540px) {
        .document-types-list{
            justify-content: space-between;
        }
        .documentTypesParagraph{
            font-size: 19px;
        }
    }
</style>
