<template>
<div id="searchResultsContainer" >

    <Toolbar :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm"></Toolbar>
    <SearchCriteria v-show="false"></SearchCriteria>
       
    <transition name="component-fade" mode="out-in">
       <Map v-show="view == 'mapView'" :documents="documents"></Map>  
    </transition>
    <div class="result-cards"  id="noResultsMessage" v-show="searchMessage == 'Searching opportunities'">
          {{searchMessage}}
      
        <div class="result-card mock"  v-for="index in 10" :key="index"></div>
    </div>

    <div class="result-cards" v-bind:class="{'grid-view':view == 'gridView'}" v-show="(view == 'listView' || view == 'gridView') && searchMessage == 'Finished searching'"> 
        <div class="result-card" v-for="document in documents" v-bind:title="document.name" v-bind:key="document.reference" >
            <router-link :to="{ path: '/advertise/' + document.reference}" class="card-link">
                <div class="card-heading">
                    <div class="icon" v-if="document.documentType.reference"><img :alt="document.documentType.name"  :src="getIcon(document.documentType.reference)" ></div>
                    <div class="heading"><div class="docTypeLabel" v-if="document.documentType.reference">{{document.documentType.name}}</div><div class="heading-text">{{document.name}}</div></div>
                </div>

                <div class="card-main"><div>{{document.longText}}</div>
                    <div class="info-row mt-2 mb-2">
                         <div  >
                    <div class="distance-tag"  v-if="document.distanceFromCoordinate && postcode != ''">{{document.distanceFromCoordinate | roundMilesFromCoordinate()}} miles from {{postcode}}</div>
                          
                   </div>
                        <div>
                    <div><span class="price-tag" v-if="document.properties && document.properties.Price">&pound;  {{getPrice(document.properties.Price.value)}}</span></div>
                  </div>
                       
                </div>
                 <span class="view-asset-link">view this opportunity</span>
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
            },
            searchMessage:{
                type:String,
                required: true
    
            }
        },
        data() {
            return {
                initialDocuments: [],
                started: false,
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
                    if(type != null){
                    if (type.reference == ref)
                        colour = type.colour
                    }
                })
                return colour;
            },
            getPrice(value){
                if(value != null && value != ""){
                    var price = Number(value);
                    if(isNaN(price))
                        return "POA";
                    return price;
                }
                return "POA"
            }
        },
        computed: {
            view() {
                return this.$store.state.view
            },
            documents() {
                var results = this.$store.state.searchResults;
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
                    return results;  
            },
            postcode(){
                return this.$store.state.searchPostcode;
            }
        },
        created() {
    
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
            roundMilesFromCoordinate: function(value) {
                var property = Number(value);
                var decimals = 1;   
                return  Math.round(property * Math.pow(10, decimals)) / Math.pow(10, decimals);
            },
   
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
            transition: all 1s;
            .result-card {
                border: solid 1px darkgrey;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                padding: 5px;
                margin-bottom: 15px;
                width: 100%;
                position: relative;
                overflow: hidden;

                &.mock{
                    background-color:#f5f5f5;
                    height:100px;
                    border:none;
                    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    opacity:.6;
                }
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
                a{
                    display: flex;
                    flex-direction: column;
                }
                a:focus {
                    outline: orange solid 3px;
                }
                &:hover{
                    border:black solid 1px;
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
                        .heading-text{
 font-weight:600;
                        }
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
        color: #2A2A2A;
        font-weight:400;
    }
.view-asset-link{
    text-decoration: underline;

}
</style>
