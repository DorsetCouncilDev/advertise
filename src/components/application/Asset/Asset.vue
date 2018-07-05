<template>
   <div>
       <div class="info">
            <div class="contact"> email <a href="mailto:marketing@dorsetcc.gov.uk">
            marketing@dorsetcc.gov.uk</a> - tel. <a href="tel:+18506484200">01305224125</a></div>
           
            <ol class="ad-breadcrumb">
                <li><router-link :to="{path: '/advertise'}">home</router-link></li>
                <li><router-link :to="{ path: '/advertise/search'}">search results</router-link></li>
                <li aria-current="page">{{document.reference}}</li>
            </ol>
        </div>
        <div class="document-header">
            <div class="icon-holder">
                <img id="brandImage" :src="getIcon(document.documentTypeReference)" alt="document.documentTypeReference">
            </div>   
            <div class="document-headings">
                <h1 id="assetTitleText">{{document.name}}</h1>
                <h2 id="assetLongText">{{document.documentTypeName}} {{document.longText}}</h2>
            </div>
        </div>
        <h3>{{assetPrice}}</h3>
        <p id="assetParagraph" v-if="afterPriceText">{{afterPriceText}} </p>
       <hr>
        <p id="assetParagraph" v-for="p in document.properties">
            <span v-if="p.display && p.propertyReference != 'price' && p.propertyReference != 'before-price' && p.publishedValue != null && p.publishedValue != '' && p.propertyReference != 'description'">{{p.propertyName}}: {{p.publishedValue | readBoolean}}</span>
        </p>
        <hr>
        <div v-if="document.locations.length > 0">
            <h3>Location</h3>
            <AssetMaps :locations="document.locations" :streetView="false" :name="document.name"></AssetMaps>
        </div>
        <div class="description-text" v-if="description != ''"><hr><p>{{description}}</p><hr></div>
       
        <p class="assetParagraph">Contact our marketing team</p>
        <p class="assetParagraph"><a href="#">marketing@dorsetcc.gov.uk</a> </p>
        <p class="assetParagraph"><a href="#" rel="tel">01305 224125</a></p>
        <p class="assetParagraph">quoting reference <strong>{{document.reference}}</strong></p> 
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
                indexRef: "advertise"
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
                DocumentService.getDocument(this.indexRef, this.documentRef).then(response => {
                    this.document = response.data;
                })
            }
        },
        computed: {
            description: function(){
                var desc = "";
                   this.document.properties.forEach((p) => {
                    if (p.propertyReference == 'description')
                        desc =  p.publishedValue
                   })
                return desc;
            },
            streetViewRequired() {
                return !(this.document.locations[0].streetviewLatitude == null);
            },
            assetPrice() {
                var price = null
                var before = null
                var after = null

                this.document.properties.forEach((p) => {
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
                this.document.properties.forEach((p) => {
                    if (p.propertyReference == 'available' && p.value == 'true')
                        available = true;
                })
                return available
            },
            beforePriceText() {
                var beforePrice = null
                this.document.properties.forEach((p) => {
                    if (p.propertyReference == 'before-price')
                        beforePrice = p.publishedValue
                })
                return beforePrice
            },
            afterPriceText() {
                var afterPrice = null
                this.document.properties.forEach((p) => {
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
        }
    }

</script>

<style scoped lang="scss">
    .description-text{
        margin:15px 0;
    }
    #assetTitleText {
        font-size: 1.8rem;
        margin-bottom: 2px;
    }

    #assetLongText {
        font-size: 1.2rem;
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
        }
        #assetLongText {
            font-size: 1.4rem;
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
        @media only screen and (min-width: 805px) {
             #assetTitleText {
                font-size: 32px;
            }
        }
    }

</style>
