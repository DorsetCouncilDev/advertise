<template>
<section class="document-types-section">
    <p id="documentTypesParagraph">Dorset Council offers a broad portfolio of sponsorship, advertising sites and promotional opportunities that can help your message gain wide coverage, whether you’re looking to promote a product, service or event. With our local knowledge and options for all sized budgets, we work with organisations across the county to provide unique local advertising solutions in Dorset. Sponsorship and advertising fees are used to support council services which benefit the residents and businesses of Dorset.</p>
  
    <div class="document-types-list">
      <DocumentTypeDiscovery v-for="type in types" :documentTypeName="type.name" :documentTypeRef="type.ref" :text="type.text" v-bind:key="type.ref">
    </DocumentTypeDiscovery>
    </div>
   
    </section>
</template>

<script>
 import DocumentTypeDiscovery from './DocumentTypeDiscovery';
export default {
        name: 'DocumentTypeSection',  
        components: {
             DocumentTypeDiscovery
        },
    data(){
        return {
        types:[
            {name:"Roundabout Sponsorship", ref:"roundabout-sponsorship",text:'Over 80 roundabouts in high traffic areas'},
            {name:"Bin Lid Advertising", ref:"bin-lid-advertising", text:'Unique and highly targeted'},
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

.document-types-section{
    margin-top:15px;
    margin-bottom:50px;
}
#documentTypesParagraph{
    font-size: 16px;
}


 @media only screen and (min-width: 540px) {
 .document-types-list{

        justify-content: space-between;

    }
    #documentTypesParagraph{
    font-size: 19px;
}
 }
</style>