<template>
<div id="searchResultsContainer" >
    <Toolbar :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm"></Toolbar>
    <SearchCriteria></SearchCriteria>
       
    <transition name="component-fade" mode="out-in">
        <Map v-show="view == 'mapView'" :assets="documents"></Map>
    </transition>
    <div class="result-cards" v-show="noResultsFound" id="noResultsMessage">
        {{searchingMessage}}
    </div>
    <div class="result-cards" v-bind:class="{'grid-view':view == 'gridView'}" v-show="(view == 'listView' || view == 'gridView') && !noResultsFound"> 
        <div class="result-card" v-for="d in documents" v-bind:title="d.document.name" >
            <router-link :to="{ path: '/advertise/' + d.document.reference}" class="card-link">
                <div class="card-heading">
                    <div class="icon"><img :alt="d.document.documentTypeName"  :src="getIcon(d.document.documentTypeReference)"></div>
                    <div class="heading"><div class="docTypeLabel" v-bind:style="{color: getTypeColor(d.document.documentTypeReference)}">{{d.document.documentTypeName}}</div><div class="heading-text">{{d.document.name}}</div></div>
                </div>

                <div class="card-main"><div>{{d.document.longText}}</div>
                    <div class="info-row">
                         <div  >
                    <div class="distance-tag"  v-if="d.distanceFromCoordinate && postcode != ''">{{d.distanceFromCoordinate | round()}} miles from {{postcode}}</div>
                          
                   </div>
                        <div >
                    <div class="price-tag" v-for="property in d.document.properties" v-if="property.propertyReference == 'price'">&pound;  {{property.publishedValue | round()}}</div>
                  </div>
                       
                </div>
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
                var results = this.$store.state.searchResults;
     
                if (results != null && results.length > 0){
                     this.searchingMessage = "Sorry, no results found for that search";
                    return results
                }
                else{
                    
                    return this.initialDocuments
                }
            },
            postcode() {
                return this.$store.state.searchForm.postcode.toUpperCase()
            },
            documentTypes: {
                get: function() {
                    return this.$store.state.searchForm.documentTypes;
                }
            },
            noResultsFound(){
               if(this.documents.length == 0){
                   
                   return true;
               }
                
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
         /*   AOS.init({
                once: true,
                offset: 50,
                duration: 400,
                easing: 'ease-in-sine',
                delay: 50
            });  */
        },
        filters: {
            round: function(value) {
                // || value.trim() == "" || value == "0" || value == 0 || isNaN(value))
               
              if (value == null) {
                    return 'P.O.A'
                }

                if (isNaN(value))
                    return 'P.O.A'
                else 
                    var decimals = 1;
                    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
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
                padding: 10px;
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
                    outline: orange solid 1px;
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
                        font-size: 24px;
                        line-height: 1.2;
                    }

                    .icon {

                        width: 50px;
                        height: 50px;
                        margin-right: 10px;

                        display: block;
                        width: 50px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
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

</style>
