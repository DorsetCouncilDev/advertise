<template>
<div class="result-card">
   <router-link :to="{ path: '/advertise/' + document.reference}" class="card-link">
                <div class="card-heading">
                    <div class="icon"><img :alt="document.documentTypeName"  :src="getIcon(document.documentTypeReference)"></div>
                    <div class="heading">
                        <div class="docTypeLabel">{{document.documentTypeName}}</div>
                        <div class="heading-text">{{d.documentName}}</div>
                    </div>
                </div>

                <div class="card-main">
                    <div class="long-text">{{longText}}</div>
                    <div class="info-row">
                        <div class="price-tag">&pound; {{assetPrice}}</div>
                  
                        <div class="distance-tag" v-show="distanceRequired">{{distance}} miles from {{postcode}}</div>
                   </div>
                </div>
            </router-link>
</div>
</template>

<script>
 

    export default {
         props: {
            document: {
                type: Object,
                required: true
            },
            distanceRequired: {
                type: Boolean,
                required: true
            },
            postcode:{
                type:Boolean,
                required:false
            },
             distance:{
                 type:Number,
                 required:false
             }
        },
        method:{
           roundToTwoDecimals(value){
               return Math.round(property.propertyValue * Math.pow(10, 1)) / Math.pow(10, 1);
           },
            getIcon(documentType) {
                return require("../../../assets/images/icons/" + documentType + ".svg");
            }
        },
        computed:{
            assetPrice(){
                this.document.properties.forEach((property)=>{
                    if(property.propertyReference == 'price'){
                         if (property.propertyValue == null || isNaN(property.propertyValue)) 
                            return 'P.O.A'
                    }
                    return roundToTwoDecimals(property.propertyValue)
                })
            },
            distanceText(){
                let roundedDistance = roundToTwoDecimals(this.distance);
                return  `{{roundedDistance}} miles from {{this.postcode}}`;
            }
          
        }
    }

</script>

<style scoped lang="scss">
   
</style>
