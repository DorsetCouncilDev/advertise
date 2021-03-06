<template>
<div id="searchResultsContainer" >
    <Toolbar :showSearchForm="showSearchForm" @onChangeShowSearchForm="$emit('onChangeShowSearchForm')"></Toolbar>
    <SearchCriteria :isSearching="isSearching" @search="$emit('search')"></SearchCriteria>

    <div v-show="isSearching">
        <h2 id="searchingMessage">{{searchMessage}}</h2>
        <div class="result-cards"  id="noResultsMessage">
            <div class="result-card mock"  v-for="index in 10" :key="index"></div>
        </div>
    </div>

    <div v-show="showResults" id="results" aria-live="polite" role="region">
        <Map v-show="view == 'map'" :documents="documents" :class="{'loading-map-assets' : isSearching}"></Map>
        <div class="result-cards" v-bind:class="{'grid-view':showGridView}" v-show="showListOrGridView">


            <div class="result-card" v-for="document in documents" v-bind:key="document.reference">
                <router-link :to="{ path: '/advertise/' + document.reference + '?fromsearch=true'}" class="card-link">
                    <div class="card-heading">
                        <div class="icon" v-if="document.documentType.reference"><img alt="" :src="getIcon(document.documentType.reference)" ></div>
                        <div class="heading"><div class="docTypeLabel" v-if="document.documentType.reference">{{document.documentType.name}}</div><div class="heading-text">{{document.name}}</div></div>
                    </div>

                    <div class="card-main">
                        <div class="asset-detail">
                            <div class="top-row">
                                <div class="asset-text">
                                    <p class="asset-long-text mb-1">{{document.longText}}</p>
                                    <p class="availability-text mb-1" v-if="getAvailability(document.properties) != null">{{getAvailability(document.properties)}}</p>
                                </div>
                                <div class="price-tag" v-if="document.properties">{{ getPrice(document.properties.Price) }}</div>
                            </div>
                            <div class="info-row mt-2 mb-2">

                                    <div class="distance-tag"  v-if="document.distanceFromCoordinate">{{document.distanceFromCoordinate | roundMilesFromCoordinate()}} miles from {{postcode}}</div>
                            </div>
                        </div>
                        <div class="view-button-holder">
                            <span class="btn btn-sm btn-outline-primary">view this opportunity</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Map from './Map.vue'
    import Toolbar from './Toolbar'
    import SearchCriteria from './SearchCriteria'

    export default {
        name: 'Assets',
        data(){
            return {
              searchMessage: "Searching opportunities"
            }
        },
        components: {
            Map,
            Toolbar,
            SearchCriteria
        },
        props: {
            showSearchForm: {
                type: Boolean,
                required: true
            },
            isSearching:{
              type:Boolean,
              required:true
            }
        },
        methods: {

            getIcon(documentType) {
                return require("../../../assets/images/icons/" + documentType + ".svg");
            },
            getPrice(priceProperty){
                if(priceProperty && priceProperty.value){

                var price = Number(priceProperty.value);

                if(isNaN(price))
                  return "POA";
                price = Number(parseFloat(price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 0 });
                price = "£ " + price;
                if(priceProperty.label)
                  price = priceProperty.label + " " + price;

                return price;
            }
            return "POA";
            },
            search(){
              //  this.$emit('onSearch')
            },
            getAvailability(properties){
                if(properties.Availability != null)
                    return properties.Availability.value
                return null;
            },

        },
        computed: {

            documents(){
                return this.$store.state.searchResults;
            },
            view() {
                return this.$store.state.view
            },
            postcode(){
              if(this.$store.state.searchParams && this.$store.state.searchParams.location && this.$store.state.searchParams.location.postcode)
                return this.$store.state.searchParams.location.postcode;
            },
            numberOfResults(){
                   return this.documents.length
            },
            showResults(){
                return this.numberOfResults > 0 && !this.isSearching;
            },
            showListOrGridView(){
                return this.view == 'list' || this.view == 'grid';
            },
            showGridView(){
                return this.view == 'grid';
            },
            noResultsFound(){
              if(!this.isSearching && this.numberOfResults == 0)
                return true;
              return false;
            }

        },
        filters: {
            roundMilesFromCoordinate: function(value) {
                var property = Number(value);
                var decimals = 1;
                return  Math.round(property * Math.pow(10, decimals)) / Math.pow(10, decimals);
            }



        }
    }

</script>

<style scoped lang="scss">
$mobile-font-size: 16px;
$desktop-font-size:19px;
@keyframes dots {
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: #545454;
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 #545454,
      .5em 0 0 rgba(0,0,0,0);
   }
  80%, 100% {
    text-shadow:
      .25em 0 0 #545454,
      .5em 0 0 #545454;
    }
}

#searchingMessage{
    color:#545454;
    text-align:center;
    font-size: 22px;
    &:after {
        content: ' .';
        animation: dots 1s steps(5, end) infinite;
    }
}

.asset-long-text::first-letter, .availability-text::first-letter{
text-transform: uppercase;
}
.asset-long-text, .availability-text{
  font-size:16px;
}

.top-row{
  display:-webkit-flexbox;
  display: -webkit-box;
display: -moz-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;
    justify-content: space-between;
    align-items:flex-start;
    .price-tag{
        min-width:90px;
        margin-top:15px;
        background:#f1f1f1;
        font-weight:500;
        padding:5px;
        margin-left:20px;
        font-size:$mobile-font-size;
    }
}

.asset-detail{
   display:-webkit-flexbox;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    font-size:$mobile-font-size;
    flex-shrink: 0;
}

.card-link{
    height: 100%;
}

            .view-button-holder{
                margin-top: 10px;
                display: flex;
                justify-content: center;
                margin-bottom:5px;

            }
    #noResultsMessage{
        padding:30px;
        font-size:24px;
        text-align: center;
    }
    .greyed-search-area {
        background: grey;
        //opacity: .5;
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
                   display:-webkit-flexbox;
                    position: relative;
                    display: flex;
                    flex-shrink: 0;
                    justify-content: space-between;

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
                        display: -webkit-box;
display: -moz-box;
display: -ms-flexbox;
display: -webkit-flex;
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
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
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
                    display: -webkit-box;
display: -moz-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;
                    flex-direction: column;
                    justify-content: space-between;

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



    .docTypeLabel {
        font-size: $mobile-font-size;
        color: #2A2A2A;
        font-weight:400;
    }
.view-asset-link{
    text-decoration: underline;

}





@media only screen and (min-width: 767px) {
    .docTypeLabel {
        font-size: 16px;
        color: #2A2A2A;
        font-weight:400;
    }
    .view-button-holder{
        justify-content: flex-end;
    }
    .asset-detail{
        display: -webkit-box;
display: -moz-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;
        justify-content: flex-start;
        flex-direction: column;
        font-size:$desktop-font-size;
        flex-shrink: 0;
    }
    #searchResultsContainer {
        .result-cards {
            margin-top: 10px;
            display: -webkit-box;
display: -moz-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .result-card {
                width: 90%;
            }
        }
        .grid-view {
            display: -webkit-box;
display: -moz-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .result-card {
                width: 48%;
            }
        }
    }
    .top-row{
        .price-tag{
            font-size:$desktop-font-size;
        }
    }
}

@media only screen and (min-width: 900px) {
        #searchResultsContainer {
            margin-left: 20px;
        }
    }
</style>
