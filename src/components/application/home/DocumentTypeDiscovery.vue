<template>
<div class="document-type-square">
    <div class="document-type-icon">
  <img class="type-icon"  :src="getIcon()">
    </div>
    <div class="document-type-name">
        <div class="type-name">{{documentTypeName}}</div>
    </div>
    <div class="type-text">
{{text}}
        </div>
</div>
</template>


<script>
 export default {
        name: 'DocumentTypeDiscovery',
        props: [ 'documentTypeName','documentTypeRef','text'],
        data() {
            return {
                document: {},
                indexRef: "advertise"
            }
        },
      methods:{
            getIcon() {
                return require("../../../assets/images/icons/" + this.documentTypeRef + ".svg");
            }
        }
 }


</script>



<style scoped lang="scss">
    
    .document-type-square{
        width:45%;
        background: #f7f7f7;
        padding:10px;
        margin-right:10px;
        margin-bottom:25px;
    }
    .type-icon{
        width:75px;
        height: 100px;
    }
    .type-name{
        font-size: 16px;
        text-align: center;
        font-weight:500;
    }
    .document-type-icon{
        display: flex;
        justify-content: center;
    }
    .type-text{
        font-size:14px;
        font-style: italic; 
        text-align:center;
    }

    @media only screen and (min-width: 365px) {

    }
@media only screen and (min-width: 676px) {
.document-type-square{
        width:30%;
        background: #f7f7f7;

    }
    .type-icon{
        width:125px;
        height:auto;
    }
    .type-name{
        font-size: 19px;

    }
    .document-type-icon{
        display: flex;
        justify-content: center;
    }
    .type-text{
        font-size:19px;
        font-style: italic; 
        text-align:center;
    }
}
</style>