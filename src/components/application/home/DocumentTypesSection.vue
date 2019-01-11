<template>
<section class="document-types-section">
    <p>Our broad portfolio of sponsorship, advertising sites and promotional opportunities give the
potential for your message to be widely viewed, whether you’re looking to promote a
product, service or event.</p>
    <div class="sub-heading-types"> Current opportunities include</div>
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
            {name:"Roundabout Sponsorship", ref:"roundabout-sponsorship",text:'Over 80 roundabouts in high traffic areas.'},
            {name:"Bin Lid Advertising", ref:"bin-lid-advertising", text:'Unique and highly targeted.'},
            {name:"Car Parking Ticket Advertising", ref:"car-parking-ticket-advertising",text:'Directly into the hands of your audience.'},
            {name:"Residents' Magazine Advertising", ref:"residents-magazine-advertising",text:''},
             {name:"Timetable Case Posters", ref:"timetable-case-posters",text:'Prime seafront advertising in Weymouth.'},
              {name:"Boundary Signage Sponsorship", ref:"boundary-signage-sponsorship",text:''}
        ]
      }
    }
}
</script>


<style scoped lang="scss">
    .document-types-list{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .sub-heading-types{
        font-size:26px;
        margin-bottom:15px;
    }


</style>