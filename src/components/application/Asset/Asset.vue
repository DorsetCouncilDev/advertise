<template>
   <div id="content">
<SiteTopNav currentPage="assetPage" :assetRef="documentRef"></SiteTopNav>

 <div v-show="loadingDocument">
    <h1>Loading asset</h1>
</div>

     <div>
        <div class="document-header">
            <div class="icon-holder">
                <img  :src="getIcon(document.documentType.reference)" alt="">
            </div>   
            <div class="document-headings">
                <h1 id="assetTitleText">{{document.name}}</h1>
                <h2 id="assetLongText">{{document.documentType.name}} - {{document.longText}}</h2>
            </div>
        </div>
        <h3 id="assetPrice">&pound; {{assetPrice}}</h3>
       
       <hr>
   <router-link class="btn btn-primary"  v-if="!documentAvailable" :to="{ path: '/advertise/contact?documentRef=' + documentRef + '&action=waiting' }">Add to waiting list</router-link>
   <router-link class="btn btn-success"  v-if="documentAvailable" :to="{ path: '/advertise/contact?documentRef=' + documentRef + '&action=book' }">Check availablity &amp; book</router-link>

        <section id="propertiesSection" v-for="p in  propertyKeys()" v-bind:key="p">
                <div class="property-section" v-if="p != 'Description' && p != 'Available'">
                    <span class="generalPropertyName">{{p}}</span>
                    <span class="generalPropertyValue">{{getPropertyValue(p)}}</span>
                </div>
        </section>
 
        <hr>
        <div v-if="document.locations != null && document.locations.length > 0">
            <h3>Location</h3>
            <AssetMaps :locations="document.locations" :streetView="streetViewRequired" :name="document.name"></AssetMaps>
        </div>
        <div class="description-text" v-if="description != ''"><hr><p>{{description}}</p><hr></div>
       
        <p class="assetParagraph">Contact our marketing team</p>
        <p class="assetParagraph"><a href="mailto:marketing@dorsetcouncil.gov.uk">marketing@dorsetcouncil.gov.uk</a> </p>
        <p class="assetParagraph"><a href="tel:+441305224125">01305 224125</a></p>
        <p class="assetParagraph">quoting reference <strong>{{documentRef}}</strong></p> 
    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import AssetMaps from './AssetMaps/AssetMaps';
    import DocumentService from '../../../services/DocumentService';
    export default {
        name: 'AssetView',
        props: [ 'documentRef'],
        data() {
            return {
                document: {documentType:{reference:""}},
                indexRef: "advertise",
                waiting:"waiting",
                book:"book",
                loadingDocument: true,
                pageMetaTitle: "",
                pageMetaDescription: ""
            }
        },
        metaInfo () {
        return {
        title: this.document.metadataTitle,
        meta: [ {
            name:"description", content:this.document.metadataDescription
        } ]

      }
        },
        components: {
            AssetMaps
        },
        methods: {
          
          getDocument:    async function() {
                await DocumentService.getDocument(this.indexRef, this.documentRef).then(response => {
                    this.document = response.data;
                    this.pageMetaDescription = this.metaDescription; 
                    this.pageMetaTitle =  this.metaTitle; 
                    this.loadingDocument = false;
                })
            },
            getPropertyValue(key){

                if( this.document.properties){
                    var propertyObject =  this.document.properties[key]
                
                if (propertyObject.value !== "undefined")
                    return propertyObject.value;
                else if (propertyObject.values !== "undefined") 
                    return propertyObject.values;
                 }
                return null;
            },
            propertyKeys(){ 
                if( this.document.properties)
                    return Object.keys(this.document.properties);
                return [];

            },

        
            getIcon(documentType){
                if(documentType == "")
                    return null;
                 return require("../../../assets/images/icons/" + documentType + ".svg");
            }
        },
        computed: {

             isDocumentLoaded: function() {
                if(document != null)
                    return true;
                return false;
             },
       documentAvailable(){
            if(this.isDocumentLoaded && this.document.properties && this.document.properties.Available)
                return this.document.properties.Available.value;
            return false;
       },
        
        description: function(){
            if(this.isDocumentLoaded && this.document.properties && this.document.properties.Description)
                return this.document.properties.Description.value;
            return "";
        },
        streetViewRequired() {
            var primaryLocation;
            this.document.locations.forEach((location)=>{
                if(location.primaryLocation)
                    primaryLocation = location;
            })
            if(primaryLocation.streetviewLatitude != null)
                return true;
            return false;
        },
        assetPrice() {
            if(this.isDocumentLoaded){
            var price = "POA";
            var priceAsNumber;
            if(this.document.properties && this.document.properties.Price){
                priceAsNumber = Number(this.document.properties.Price.value);
                if(isNaN(priceAsNumber))
                    return price;
                price = priceAsNumber;
            }
            return price;
        }
        return "";
        }
       
           
            
        },
        async beforeMount() {
           await this.getDocument();
       
        },
        filters: {
            round: function(value) {
                if (typeof Number(value) === 'number') {
                    if (!value) {
                        value = 0;
                    }
                    var decimals = 0;
                    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
                }
                return 'P.O.'

            },
            readBoolean: function(value) {
                if (value == 'true')
                    return 'Yes'
                else if (value == 'false')
                    return 'No'
                else
                    return value
            },
            removeHyphens: function(value) {
                return value.replace(new RegExp('-', 'g'), " ");

            }
        }
    }

</script>

<style scoped lang="scss">
#propertiesSection{
    display: flex;

}

#docRefBreadCrumb{
      text-overflow: ellipsis;
}
#assetLongText {
    font-weight:400;
}
    .ad-breadcrumb{
   width:100%;
        white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    }

    
    .description-text{
        margin:15px 0;
    }
    #assetTitleText {
        font-size: 24px;
        margin-bottom: 15px;
         text-align: left;
  
    }

    #assetLongText {
        font-size: 19px;
        text-align: left;
    }

    .assetParagraph {
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
        #assetParagraph {
            margin-bottom: 2px;
        }
       
    }

    @media only screen and (min-width: 700px) {

        .document-header {
            .icon-holder {
                width: 100px;
                height: 100px;
            }
        }
        #assetTitleText {
            font-size: 1.8rem;
            margin-bottom: 5px;
             text-align: left;
        }
        #assetLongText {
            font-size: 1.4rem;
            text-align:left;
        }
        .assetParagraph {
            font-size: 19px;
            margin-bottom: 2px;
            margin-top: 2px;
        }
        .breadcrumb {
            font-size: 19px;
        }

        .contact {
            float: right;
        }
      
    }
  @media only screen and (min-width: 805px) {
             #assetTitleText {
                font-size: 32px;
            }
        }
    
     @media only screen and (min-width: 420px) {
      .ad-breadcrumb{
        width:auto;
        white-space: nowrap;
  overflow: hidden;
 
    }
    }
.generalPropertyName{
    display:block;
    font-weight:500;
}
#generalPropertyName{
    display:block;
    color: #3f3f3f;
}

.property-section{
    margin-top:30px;
    padding-left:15px;
    border-left:5px solid darkgrey;
    padding:5px 15px;
    background:#f7f7f7;
}

#assetPrice{
    font-size:22px;
}
</style>
