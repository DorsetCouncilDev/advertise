<template>
   <div id="content">
<SiteTopNav currentPage="assetPage" :assetRef="documentRef"></SiteTopNav>

 <div v-show="loadingDocument">
    <h1>Loading asset</h1>
</div>
        <div class="document-header">
          <div class="d-flex flex-column justify-content-center">
                <h1 id="assetTitleText">{{document.name}}</h1>
</div>
                <img :src="getIcon(document.documentType.reference)" alt="">

              </div>
             <h2 id="assetLongText">{{document.documentType.name}} - {{document.longText}}</h2>

        <h3 id="assetPrice">{{assetPrice}}</h3>
        <p>{{assetPriceHelpText}}</p>

       <hr>
   <router-link class="btn btn-primary"  v-if="!assetAvailable" :to="{ path: '/advertise/contact?documentRef=' + documentRef + '&action=waiting' }">Join waiting list</router-link>
   <router-link class="btn btn-success"  v-if="assetAvailable" :to="{ path: '/advertise/contact?documentRef=' + documentRef + '&action=book' }">Check availablity &amp; book</router-link>

        <section id="propertiesSection" v-for="p in  propertyKeys()" v-bind:key="p">
                <div class="property-section" v-if="p != 'Description' && p != 'Available' && p!= 'Price'">
                    <span class="generalPropertyName">{{p}}</span>
                    <span class="generalPropertyValue">{{getPropertyValue(p)}}</span>
                </div>
        </section>


        <section id="locationSection" v-if="document.locations != null && document.locations.length > 0">
            <h3>Location</h3>
            <AssetMaps :locations="document.locations" :streetView="streetViewRequired" :name="document.name"></AssetMaps>
        </section>
        <div class="description-text" v-if="description != ''"><p>{{description}}</p></div>
<section id="contactSection">
        <p class="assetParagraph">Contact our marketing team</p>
        <p class="assetParagraph"><a href="mailto:marketing@dorsetcouncil.gov.uk">marketing@dorsetcouncil.gov.uk</a> </p>
        <p class="assetParagraph"><a href="tel:+441305224125">01305 224125</a></p>
        <p class="assetParagraph">quoting reference <strong>{{documentRef}}</strong></p>
</section>
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
          getDocument: async function() {
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
          assetPriceHelpText: function(){
            if(this.document.properties && this.document.properties.Price && this.document.properties.Price.helpText)
              return this.document.properties.Price.helpText;
          },
          isDocumentLoaded: function() {
            if(document != null)
              return true;
            return false;
          },
          assetAvailable(){
            var available = false
            if( this.isDocumentLoaded && this.document.properties && this.document.properties.Available && this.document.properties.Available.value == "true")
                available = true;
            return available;
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
            if(this.document.properties && this.document.properties.Price){
              var priceProperty = this.document.properties.Price;
              var price = Number(priceProperty.value);

              if(isNaN(price))
                return "Price on application";
              price = Number(parseFloat(price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 0 });
              price = "£ " + price;

              if(priceProperty.label)
                price = priceProperty.label + " " + price;

              return price;
            }
            return "Price on application";
          }



        },
        async beforeMount() {
           await this.getDocument();

        },
        filters: {
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
#locationSection{
  margin-bottom:60px;
  margin-top:60px;
}
#propertiesSection{
    display: flex;

 .property-section{
    margin-top:30px;
    background: #f7f7f7;
    padding:5px 15px;
    border-left:grey 5px solid;
}
}

#docRefBreadCrumb{
      text-overflow: ellipsis;
}

.ad-breadcrumb{
  width:100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
 .description-text{
    margin:60px 0;
}
#assetLongText {
        font-size: 19px;
        text-align: left;
         font-weight:400;
         margin-bottom:20px;
    }

    .assetParagraph {
        font-size: 1rem;
        margin-bottom: 2px;
        margin-top: 2px;
    }

    .document-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom:5px;

        #assetTitleText {
          font-size: 19px;
          margin-bottom: 15px;
          text-align: left;
          margin-bottom:0;
        }
            img {
              display:inline-block;
         vertical-align:top;
         width:50px;
            }

    }

    .available-tag {
        font-size: 14px;
        #assetParagraph {
            margin-bottom: 2px;
        }

    }

     @media only screen and (min-width: 400px) {

        .document-header {
            #assetTitleText {
              font-size: 24px;
            }
            img {
              width:75px;
            }
          }
        }

  @media only screen and (min-width: 500px) {

        .document-header {
            #assetTitleText {
              font-size: 28px;
            }
            img {
              width:100px;
            }
          }
        }
    @media only screen and (min-width: 700px) {

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
    .generalPropertyName{
    display:block;
    font-weight:500;
}
#generalPropertyName{
    display:block;
    color: #3f3f3f;
}
#assetPrice{
    font-size:22px;
}
     @media only screen and (min-width: 420px) {
      .ad-breadcrumb{
        width:auto;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    @media only screen and (min-width: 805px) {
      #assetTitleText {
        font-size: 32px;
      }
    }



</style>
