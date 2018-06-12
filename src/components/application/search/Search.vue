<template>
<div>
    <div class="info">
        <div class="contact"> email <a href="mailto:marketing@dorsetcc.gov.uk">
          marketing@dorsetcc.gov.uk</a> - tel.
          <a href="tel:+18506484200">01305224125</a></div>
    <ol class="ad-breadcrumb">
        <li aria-current="page"><router-link to="/advertise">Home</router-link></li>
        <li aria-current="page">Search</li>   
    </ol>
       
        </div>
    <h1>Discover opportunities</h1>
    <div id="searchContainer">
        <SearchOptions :docTypes="documentTypes" :showSearchForm="showSearchForm" @onChangeShowSearchForm="changeShowSearchForm" @onSearch="search"></SearchOptions>
        <Assets :showSearchForm="showSearchForm" :docs="documents" @onChangeShowSearchForm="changeShowSearchForm" ></Assets>
    </div>
</div>
</template>



<script>
    import Toolbar from './Toolbar';
    import Assets from './Assets';
    import SearchOptions from './SearchOptions';

    import DocumentTypeService from '../../../services/DocumentTypeService';
    import DocumentService from '../../../services/DocumentService';
    import SecurityService from '../../../services/SecurityService'

    export default {
        name: 'Search',
        props: ['indexRef'],
        data() {
            return {
                map: null,
                documentTypes: [],
                searchResults: {
                    results: [],
                    numberOfResults: 0
                },
                documents: [],
                showSearchForm: false
            }
        },
        components: {
            Toolbar,
            Assets,
            SearchOptions
        },
        computed: {
            view() {
                return this.$store.state.view
            }
        },
        methods: {
            getDocumentTypes: async function() {
                await DocumentTypeService.getTypes(this.indexRef).then((response) => {
                    this.documentTypes = response.data;
                    this.getDocuments();
                }, (error) => {
                    console.log("Error getting document types")
                })
            },

            getDocuments: function() {
                this.documentTypes.forEach(async(type) => {
                   await DocumentService.getDocuments(this.indexRef, type.reference).then((response) => {
                        var currentDocuments = response.data;
                        currentDocuments.forEach((doc) => {
                            this.documents.push(doc);
                        })
                    },(error)=>{
                        console.log("Error getting initial documents")
                    })
                })
            },
            search: function(){
                
            },
            changeShowSearchForm: function() {
                this.showSearchForm = !this.showSearchForm
            }

    },
         created(){
            this.$store.dispatch("setDocumentTypesSearchOptions",this.indexRef); 
            this.$store.commit("setIndexReference",this.indexRef);
        },
    mounted: function() {
            /*  const bounds = new google.maps.LatLngBounds();
            const element = document.getElementById('mapView');
            const options = {
                zoom: 10,
                center: new google.maps.LatLng(50.563110932545825, -2.4489365380248693),
                gestureHandling: 'greedy'
            };
            this.map = new google.maps.Map(element, options);

          
                

                
                var contentString = '<h1 id="content"><p>Roundabout</p><p></p><a href="asset.html">View details</a><buttonv-on:click="addToFavourites()"> Add to favourites <img src="images/star.svg" id="favLink"></button>';
                
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                const position = new google.maps.LatLng(50.563110932545825, -2.4489365380248693
);


                //this.map.fitBounds(bounds.extend(position));
              const marker = new google.maps.Marker({
                position: position,
                map: this.map
       
            });
          
                  marker.addListener('click', function () {
                    infowindow.open(this.map, marker);
                });
                  //this.map.fitBounds(bounds.extend(position))
                
         /*
                var allowedBounds = new google.maps.LatLngBounds(new google.maps.LatLng(50.512762, -2.949247), new google.maps.LatLng(51.142515, -1.770963));
                var lastValidCenter = this.map.getCenter();
                var mymap = this.map;
               
          
             google.maps.event.addListener(this.map, 'center_changed', function () {
                    if (allowedBounds.contains(mymap.getCenter())) {
                        // still within valid bounds, so save the last valid position
                        lastValidCenter = mymap.getCenter();
                        return;
                    }

                    // not valid anymore => return to last valid position
                    mymap.panTo(lastValidCenter);
                });
        
      */

        }
    }

</script>


<style scoped lang="scss">
    #searchContainer {
        display: flex;
    }

    h1 {
        font-size: 26px;
        margin-bottom: 20px;
    }

    #mapView {
        width: 700px;
        height: 700px;
    }
    .contact{float:right;}
    @media only screen and (min-width: 805px) {
        h1{font-size:32px;}
    }

</style>
