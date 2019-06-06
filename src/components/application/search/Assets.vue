<template>
<div id="searchResultsContainer" >

    <Toolbar :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm"></Toolbar>
    <SearchCriteria></SearchCriteria>
       
    <transition name="component-fade" mode="out-in">
       <Map v-show="view == 'mapView'" :documents="documents"></Map>  
    </transition>
    <div class="result-cards" v-show="showSearchingMessage" id="noResultsMessage">
        {{searchingMessage}}
    </div>
 
    <div class="result-cards" v-bind:class="{'grid-view':view == 'gridView'}" v-show="(view == 'listView' || view == 'gridView')"> 
        <div class="result-card" v-for="document in documents" v-bind:title="document.name" v-bind:key="document.reference" >
            <router-link :to="{ path: '/advertise/' + document.reference}" class="card-link">
                <div class="card-heading">
                    <div class="icon" v-if="document.documentTypeReference"><img :alt="document.documentTypeName"  :src="getIcon(document.documentTypeReference)"></div>
                    <div class="heading"><div class="docTypeLabel" v-if="document.documentTypeReference" v-bind:style="{color: getTypeColor(document.documentTypeReference)}">{{document.documentTypeName}}</div><div class="heading-text">{{document.name}}</div></div>
                </div>

                <div class="card-main"><div>{{document.name}}</div>
                    <div class="info-row mt-2 mb-2">
                         <div  >
                    <div class="distance-tag"  v-if="document.distanceFromCoordinate && postcode != ''">{{document.distanceFromCoordinate | round()}} miles from {{postcode}}</div>
                          
                   </div>
                        <div>
                    <div><span class="price-tag" v-if="document.properties && document.properties.Price">&pound;  {{document.properties.Price | round()}}</span></div>
                  </div>
                       
                </div>
                 <router-link :to="{ path: '/advertise/' + document.reference}" class="view-asset-link">view this opportunity</router-link>
    </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
    import Map from './Map.vue'
    import Toolbar from './Toolbar'
    import SearchCriteria from './SearchCriteria'
    import AOS from 'aos'

    export default {
        name: 'Assets',
        components: {
            Map,
            Toolbar,
            SearchCriteria
        },
        props: {
            docs: {
                type: Array,
                required: true
            },
            showSearchForm: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                initialDocuments: [],
                started: false,
                searchingMessage:"Loading assets..."
            }
        },

        methods: {
            getIcon(documentType) {
                return require("../../../assets/images/icons/" + documentType + ".svg");
            },
            changeShowSearchForm() {
                this.$emit("onChangeShowSearchForm")
            },
            getTypeColor(ref) {
                var colour = "grey";
                this.documentTypes.forEach((type) => {
                    if (type.reference == ref)
                        colour = type.colour
                })
                return colour;
            }
        },
        computed: {
            view() {
                return this.$store.state.view
            },
            documents() {
                var results = this.$store.state.advertiseSearchResults;
                console.log("results: " + results.length);
                    
                    
                    if (results != null)
                    {
                        if (results.length == 0)
                            this.searchingMessage = "Sorry, no results found for that search";
                   
                   }    
                
                    /*  Build sitemap
                    
                    results.forEach((result)=>{
                        console.log("<url><loc>https://web.dorsetcc.gov.uk/advertise/" + result.document.reference + "</loc><lastmod>2019-04-01T16:50:05+00:00</lastmod><changefreq>monthly</changefreq></url>");
                    })
                    */
                   console.log("results: " + results.length);
                    return results;
             
          
           
            },
            postcode() {
                return this.$store.state.searchForm.postcode.toUpperCase()
            },
            currentlySearching(){
                return this.$store.state.currentlySearching;
            },
            documentTypes: {
                get: function() {
                    return this.$store.state.searchForm.documentTypes;
                }
            },
            showSearchingMessage(){
               if(this.$store.state.currentlySearching || this.documents.length == 0)     
                   return true;
                return false;
            }
        },
        created() {
            if (this.$store.state.postcodeSearch == ""){
                this.initialDocuments = this.docs
    
            }
            this.started = true;
        },
        mounted() {
            AOS.init({
                once: true,
                offset: 50,
                duration: 400,
                easing: 'ease-in-sine',
                delay: 50
            });  
        },
        filters: {
            round: function(price) {
                // || value.trim() == "" || value == "0" || value == 0 || isNaN(value))
               
              if (price == null) {
                    return 'P.O.A'
                }

          
                else 
                    var decimals = 1;
                    var value = Math.round(price.value * Math.pow(10, decimals)) / Math.pow(10, decimals);
                    return value;
               // }
            },
            uppercase: function(value) {
                return value.toUpperCase()
            },
            removeHyphens: function(value) {
                if (value != null && value != "")
                    return value.replace(new RegExp('-', 'g'), " ");
                else
                    return null;
            }
        }
    }

</script>

<style scoped lang="scss">
    $noResultsMessageColor: darken(#60d844,40%);
    #noResultsMessage{
        padding:30px;
        font-size:24px;
        color:$noResultsMessageColor;
        text-align: center;
    }
    .greyed-search-area {
        background: grey;
        opacity: .5;
    }

    #searchResultsContainer {
        width: 100%;
        margin-top: 10px;
        .result-cards {
            margin-top: 15px;
            width: 100%;
            transition: background 1s;
            .result-card {
                border: solid 1px darkgrey;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                padding: 5px;
                margin-bottom: 15px;
                width: 100%;
                position: relative;
                overflow: hidden;
                .info-row{
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                .price-tag{
                    
                   
                    background:#f1f1f1;
                    font-weight:500;
                    padding:5px;
                }
                .distance-tag{
                   
                
                    background:#f1f1f1;
                    font-weight:500;
                    padding:5px;
                }
                }
                
                &:hover {
                    outline: orange solid 3px;
                }

                .card-heading {
                    color: black;
                    display: flex;
                    flex-wrap: nowrap;
                    padding-bottom: 5px;
                    border-bottom: 1px #E9E9E9 solid;
                    .heading {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        font-size: 19px;
              
                        overflow:hidden;
                        text-overflow: ellipsis;
                    }

                    .icon {
                        margin-right: 10px;
                        display: block;                   
                        img {
                            display: block;
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
                .card-main {
                    color: black;
                    padding-top: 5px;
                    padding-left: 10px;
                    padding-right: 10px;
                    .price {
                        text-align: right;
                    }
                }
            }
        }
    }


    .icon {
        &.parking-tickets-icon:before {
            content: url(../../../assets/images/icons/car-parking-ticket-advertising.svg);
        }
        &.roundabout-icon:before {
            content: url(../../../assets/images/icons/roundabout-sponsorship.svg);
        }
    }



    @media only screen and (min-width: 900px) {
        #searchResultsContainer {
            margin-left: 20px;
        }
    }

    @media only screen and (min-width: 767px) {
        #searchResultsContainer {
            .result-cards {
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                .result-card {
                    width: 90%;
                }
            }
            .grid-view {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .result-card {
                    width: 48%;
                }
            }
        }
    }

    .docTypeLabel {
        font-size: 18px;
        color: grey;
    }
.view-asset-link{
    text-decoration: underline;

}
</style>
