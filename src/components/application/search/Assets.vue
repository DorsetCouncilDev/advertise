<template>
    <div id="searchResultsContainer">
       <Toolbar :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm"></Toolbar>
        <SearchCriteria></SearchCriteria>
       
      <transition name="component-fade" mode="out-in">
        <Map v-show="view == 'mapView'" :assets="documents"></Map>
    </transition>

        <div class="result-cards" v-bind:class="{'grid-view': view == 'gridView'}" v-show="view == 'listView' || view == 'gridView'"> 
            
   
            <div class="result-card" v-for="d in documents" v-bind:title="d.document.name" data-aos="fade">
                <router-link :to="{ path: '/' + d.document.index + '/' + d.document.reference}" class="card-link">
                    <div class="card-heading">
                        <div class="icon"><img :alt="d.document.documentType"  :src="getIcon(d.document.documentType)">
                        </div>
                        <div class="heading"><div class="docTypeLabel" :class="d.document.documentType">{{d.document.documentType | removeHyphens}}</div><div class="heading-text">{{d.document.name}}</div></div>
                    </div>
                  
                    
                    <div class="card-main">
                          
                        {{d.document.longText}}
                        
                        <p class="price" v-for="property in d.document.properties" v-if="property.propertyReference == 'price' && property.publishedValue != null">&pound;{{property.publishedValue | round()}}</p>
                        <p v-if="d.distanceFromCoordinate && postcode != ''">{{d.distanceFromCoordinate | round()}} miles from {{postcode}}</p>
                        <span class="parameter" v-for="matchingParam in d.matchingParameters">{{matchingParam.name}}</span>
                        <span class="parameter unmatched" v-for="param in d.nonMatchingParameters">{{param.name}}</span>
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
        props:{
           docs:{
            type: Array,
            required: true
          },
            showSearchForm: {
                type:Boolean,
                required:true
            }
        },
        data(){
            return {
                initialDocuments: [],
                started: false
            }
        },
        methods:{
          getIcon(documentType){
              return require("../../../assets/images/icons/" + documentType + ".svg");
          },
        changeShowSearchForm(){
                this.$emit("onChangeShowSearchForm")
            }
        },
        computed: {
            view() {
                return this.$store.state.view
            },
            documents(){
                var results = this.$store.state.searchResults;
                if(results != null && results.length > 0)
                    return results
                else
                    return this.initialDocuments
            },
            postcode(){               
                return this.$store.state.searchForm.postcode.toUpperCase()
            }

        },
        created(){
           if(this.$store.state.postcodeSearch == "")
               this.initialDocuments = this.docs
            this.started = true;
        },
        mounted(){
            AOS.init({once:true,
                      offset: 50,
                      duration: 400,
                      easing: 'ease-in-sine',
                      delay: 50});  
        },
        filters: {
            round:  function(value) {
                    if (!value) {
                        value = 0;
                    }

                    
                      var  decimals = 1;
                  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return value;
                
                },
            uppercase: function(value){
                return value.toUpperCase()
            },
            removeHyphens: function(value){
                return value.replace(new RegExp('-', 'g')," ");
                
            }
            }
    }
</script>

<style scoped lang="scss">
    $roundabouts: darkgreen;
    $parking-tickets: purple;
    
    
    
    
    #searchResultsContainer {
        width: 100%;
        .result-cards {

            width: 100%;
            .result-card {
                border: solid 1px darkgrey;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                padding: 10px;
                margin-bottom: 15px;
                width: 100%;

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

    @media only screen and (min-width: 800px) {
        #searchResultsContainer {
            margin-left: 20px;

            .result-cards {

                display: flex;
                flex-wrap: wrap;
                justify-content: flex-end;
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
    .docTypeLabel{
        font-size:18px;
        color:grey;
        &.car-parking-ticket-advertising{
            color: $parking-tickets;
        }
        &.roundabout-sponsorship{
            color: $roundabouts;
        }
    }
  

</style>
