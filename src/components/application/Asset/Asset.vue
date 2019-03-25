<template>
   <div>
       <div class="info">
        <div class="contact"> 
            <span id="emailContact">email <a href="mailto:marketing@dorsetcc.gov.uk">marketing@dorsetcc.gov.uk</a></span> 
            <span id="telContact">tel. <a href="tel:+441305224125">01305 224125</a></span>
            <div id="menuLinksTwo">
                <router-link to="/advertise/info/contact">Contact us</router-link> 
                <router-link to="/advertise/info/mediapack">Media pack</router-link> 
                   <router-link to="/advertise/info/faq">FAQs</router-link> 
            </div>
        </div>
        <div id="navRow">
            <div id="navLinks">
                <ol class="ad-breadcrumb">
                    <li><router-link :to="{path: '/advertise'}">home</router-link></li>
                <li><router-link :to="{ path: '/advertise/search'}">search results</router-link></li>
                <li id="docRefBreadCrumb" aria-current="page">{{document.reference}}</li>   
                </ol>
            </div>
            <div id="menuLinksOne">
                <router-link to="/advertise/info/contact">Contact us</router-link> 
                <router-link to="/advertise/info/mediapack">Media pack</router-link> 
                   <router-link to="/advertise/info/faq">FAQs</router-link> 
            </div>
        </div>
    </div>

 <div v-show="loadingDocument">
    <h1>Loading asset</h1>
</div>

     <div v-show="!loadingDocument">
        <div class="document-header">
            <div class="icon-holder">
                <img :src="getIcon(document.documentTypeReference)" :alt="document.documentTypeReference">
            </div>   
            <div class="document-headings">
                <h1 id="assetTitleText">{{document.name}}</h1>
                <h2 id="assetLongText">{{document.documentTypeName}} - {{document.longText}}</h2>
            </div>
        </div>
        <h3 id="assetPrice">{{assetPrice}}</h3>
        <p id="assetParagraph" v-if="afterPriceText">{{afterPriceText}} </p>
       <hr>
   <router-link class="btn btn-primary"  v-if="!assetAvailable" :to="{ path: '/advertise/info/contact/' + documentRef + '/' + waiting }">Add to waiting list</router-link>
   <router-link class="btn btn-success"  v-if="assetAvailable" :to="{ path: '/advertise/info/contact/' + documentRef + '/' + book }">Check availablity &amp; book</router-link>

        <p id="assetParagraph" v-for="p in document.properties"  v-bind:key="p.reference">
            <span v-if="p.display && p.propertyReference != 'price' && p.propertyReference != 'before-price' && p.publishedValue != null && p.publishedValue != '' && p.propertyReference != 'description'">
                <div class="property-section">
                <span class="generalPropertyName">{{p.propertyName}}</span>
                <span class="generalPropertyValue">{{p.publishedValue | readBoolean}}</span>
                </div>
                </span>
        </p>
 
        <hr>
        <div v-if="document.locations != null && document.locations.length > 0">
            <h3>Location</h3>
            <AssetMaps :locations="document.locations" :streetView="streetViewRequired" :name="document.name"></AssetMaps>
        </div>
        <div class="description-text" v-if="description != ''"><hr><p>{{description}}</p><hr></div>
       
        <p class="assetParagraph">Contact our marketing team</p>
        <p class="assetParagraph"><a href="mailto:marketing@dorsetcc.gov.uk">marketing@dorsetcc.gov.uk</a> </p>
        <p class="assetParagraph"><a href="tel:+441305224125">01305 224125</a></p>
        <p class="assetParagraph">quoting reference <strong>{{document.reference}}</strong></p> 
    </div>
    </div>
</template>

<script>
    import AssetMaps from './AssetMaps/AssetMaps'
    import DocumentService from '../../../services/DocumentService'
    export default {
        name: 'AssetView',
        props: [ 'documentRef'],
        data() {
            return {
                document: {},
                indexRef: "advertise",
                waiting:"waiting",
                book:"book",
                loadingDocument: true
            }
        },
        components: {
            AssetMaps
        },
        methods: {
            getIcon(documentType) {
                if (typeof documentType !== "undefined") {
                return require("../../../assets/images/icons/" + documentType + ".svg");
                }
            },
            getDocument: function() {
                DocumentService.getDocument(this.indexRef, this.documentRef).then(response => {
                    this.document = response.data;
                        document.title = this.document.name;
                        this.loadingDocument = false;
                })
            }
        },
        computed: {
        
            properties(){
                if(this.document != null && this.document.properties != null){
                    return this.document.properties;
                }
                return [];
            },
            description: function(){
                var desc = "";
                var assetProperties = this.properties;
                assetProperties.forEach((p) => {
                    if (p.propertyReference == 'description')
                        desc =  p.publishedValue
                   })
                return desc;
            },
            streetViewRequired() {
               if(this.document.locations[0].streetviewLatitude != null)
                   return true;
                else
                    return false;
            },
            assetPrice() {
                var price = null
                var before = null
                var after = null
                var assetProperties = this.properties;
                assetProperties.forEach((p) => {
                    if (p.propertyReference == 'price')
                        price = p.publishedValue
                    if (p.propertyReference == 'before-price')
                        before = p.publishedValue
                    if (p.propertyReference == 'after-price')
                        after = p.publishedValue
                })

                if (price == null) {
                    return '£ P.O.A'
                }

                if (isNaN(price))
                    return '£ P.O.A'
                else {
                    var priceDescription = ""

                    if (before != null)
                        priceDescription += before + " ";

                    var decimals = 1;
                    price = Math.round(price * Math.pow(10, decimals)) / Math.pow(10, decimals);
                    priceDescription += "£" + price
                    return priceDescription
                }
            },
            assetAvailable() {
                var available = false
                 var assetProperties = this.properties;
                assetProperties.forEach((p) => {
                    if (p.propertyReference == 'available' && p.publishedValue == 'true')
                       available = true;
                })    
                return available
            },
            beforePriceText() {
                var beforePrice = null
                var assetProperties = this.properties;
                assetProperties.forEach((p) => {
                    if (p.propertyReference == 'before-price')
                        beforePrice = p.publishedValue
                })
                return beforePrice
            },
            afterPriceText() {
                var afterPrice = null
                 var assetProperties = this.properties;
                assetProperties.forEach((p) => {
                    if (p.propertyReference == 'after-price')
                        afterPrice = p.publishedValue
                })
                return afterPrice
        }
        },
        beforeMount() {
            this.getDocument();
       
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
        },
        created: function(){
              
        }
    }

</script>

<style scoped lang="scss">
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
    margin-top:15px;
}
#assetPrice{
    font-size:22px;
}
</style>
