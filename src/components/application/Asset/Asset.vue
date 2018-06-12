<template>
   <div>
       <div class="info">
        <div class="contact"> email <a href="mailto:marketing@dorsetcc.gov.uk">
          marketing@dorsetcc.gov.uk</a> - tel.
          <a href="tel:+18506484200">01305224125</a></div>
           
             <ol class="ad-breadcrumb">
    <li aria-current="page"><router-link :to="{path: '/' + indexRef}">home</router-link></li>
     <li aria-current="page"><router-link :to="{ path: '/' + indexRef + '/search'}">search results</router-link></li>
    <li aria-current="page">{{document.reference}}</li>
  </ol>
    </div>
       <div class="document-header">
           <div class="icon-holder">
                <img id="brandImage" :src="getIcon(document.documentType)">
           </div>
      <div class="document-headings">
       <h1>{{document.name}}</h1>
       <h2>{{document.longText}}</h2>
         
         
          </div>
           </div>
       <h3>&pound;{{assetPrice | round()}}</h3>
     

       <hr>

       <p v-for="p in document.properties">
           <span v-if="p.display && p.propertyReference != 'price' && p.publishedValue != null && p.publishedValue != ''">{{p.propertyName}} :  
{{p.publishedValue | readBoolean}}</span>
          

    </p>
     
     
       <hr>
       <div  v-if="document.locations.length > 0">
       <h3>Location</h3>
       
       
            <AssetMaps :locations="document.locations" :streetView="true"></AssetMaps>
           </div>
  
       
            <p>Contact our marketing team</p>
            <p> <a href="#">marketing@dorsetcc.gov.uk</a> </p>
            <p> <a href="#" rel="tel">01305 224125</a>
    </p>
            <p>quoting reference <strong>{{document.reference}}</strong></p>
    </div>
    
   
</template>

<script>
    import AssetMaps from './AssetMaps/AssetMaps'
    import DocumentService from '../../../services/DocumentService'
    export default {
        name: 'AssetView',
        props: ['indexRef', 'documentRef'],
        data() {
            return {
                document: {}
            }
        },
        components: {
            AssetMaps
        },
        methods: {
            getIcon(documentType) {
                return require("../../../assets/images/icons/" + documentType + ".svg");
            },
            getDocument: function() {
                DocumentService.getDocument(this.indexRef,this.documentRef).then(response => {
                    this.document = response.data;
                })
            }
        },
        computed: {
              streetViewRequired(){
                  return !(this.document.locations[0].streetviewLatitude == null);
              },
            assetPrice(){
                var price = null
                this.document.properties.forEach((p)=>{
                    if(p.propertyReference == 'price')
                       price = p.publishedValue
                })
                return price
            },
            assetAvailable(){
                 var available = false
                this.document.properties.forEach((p)=>{
                    if(p.propertyReference == 'available' && p.value == 'true')
                        available = true;
                })
                return available
            }
        },
        beforeMount() {
            this.getDocument();
        },        
        filters: {
            round:  function(value) {
                if(typeof Number(value) === 'number' ){
                    if (!value) {
                        value = 0;
                    }

                    
                      var  decimals = 0;
                  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
            }
  return value;
                
                },
            readBoolean: function(value){
                if(value == 'true')
                    return 'Yes'
                else if (value == 'false')
                    return 'No'
                else 
                    return value
            }
         

    }
    }
</script>

<style scoped lang="scss">
    h1 {
        font-size: 1.8rem;
        margin-bottom: 2px;
    }

    h2 {
        font-size: 1.2rem;
    }

    p {
        font-size: 1rem;
        margin-bottom: 2px;
        margin-top: 2px;
    }

    .document-header {
        display: flex;
        width: 100%;
        flex-direction: row-reverse;
        justify-content: space-between;
        .icon-holder {
            height: 100px;
            margin-right: 20px;
            width: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            img {
                width: 75px;
            }
        }
    }

    .available-tag {
        font-size: 14px;
        p {
            margin-bottom: 2px;
        }
        button {
            font-size: 14px;
        }
    }

    @media only screen and (min-width: 700px) {

        .document-header {
            .icon-holder {
                width: 100px;
                height: 100px;
            }
        }
        h1 {
            font-size: 1.8rem;
            margin-bottom: 5px;
        }
        h2 {
            font-size: 1.4rem;
        }
        p {
            font-size: 19px;
            margin-bottom: 2px;
            margin-top: 2px;
        }
        .breadcrumb {
            font-size: 19px;

        }
        
         .contact{float:right;}
    @media only screen and (min-width: 805px) {
        h1{font-size:32px;}
    }
    }

</style>
