<template>
<div class="document-type-square"  data-aos="fade-up">
    <router-link :to="{ path: '/advertise/search/type/' + documentTypeRef}" class="type-search-link">
    <div class="document-type-icon">
  <img class="type-icon"  :src="getIcon()">
    </div>
    <div class="document-type-name">
        <div class="type-name">{{documentTypeName}}</div>
    </div>
    <div class="type-text">
{{text}}
        </div>
    </router-link>
</div>
</template>


<script>
 import AOS from 'aos';
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
        width:46%;
        margin-right:5px;
        margin-bottom:25px;
        .type-search-link{
        display: block;
        width:100%;
        height:100%;
         background-color:  #f7f7f7;
              padding:5px;
              border:1px solid  grey;
                       box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0  hsl(203, 90%, 92%);
                       transition: background-color 1s;
        &:hover{
            background-color: hsl(203, 97%, 97%);
            outline:orange 1px solid;
        }
}
        
    }
    .type-icon{
        width:75px;
        height: 100px;
        margin-top:-10px;
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

    @media only screen and (min-width: 555px) {
 .type-name{
        font-size: 19px;

    }

    .type-text{
        font-size:19px;
        font-style: italic; 
        text-align:center;
    }
    }
@media only screen and (min-width: 676px) {


.document-type-square{

        background: #f7f7f7;
         .type-search-link{

             padding:15px;
         }

    }
    .type-icon{
        width:125px;
        height:auto;
        margin-top:0;
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
@media only screen and (min-width: 800px) {
 .document-type-square{
        width:30%;
}
}

</style>