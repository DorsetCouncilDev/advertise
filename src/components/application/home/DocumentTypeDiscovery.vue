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
                console.log(this.documentTypeRef);
                return require("../../../assets/images/icons/" + this.documentTypeRef + ".svg");
            }
        }
 }


</script>



<style scoped lang="scss">
    
    .document-type-square{
        width:400px;
        background: #f7f7f7;
        padding:10px;
        margin-right:25px;
        margin-bottom:25px;
    }
    .type-icon{
        width:125px;
    }
    .type-name{
        font-size: 19px;
        text-align: center;
        font-weight:500;
    }
    .document-type-icon{
        display: flex;
        justify-content: center;
    }
    .type-text{
        font-style: italic; 
        text-align:center;
    }

</style>