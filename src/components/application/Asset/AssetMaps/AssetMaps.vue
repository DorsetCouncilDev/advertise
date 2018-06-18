<template>
    <div id="mapHolder">
       
        <AssetStreetView v-if="streetView" :location="streetViewLocation"></AssetStreetView>

        <AssetMap :locations="locations" :name="name"></AssetMap>
    </div>
</template>

<script>
    import AssetMap from './AssetMap'
    import AssetStreetView from './AssetStreetView'
    
    export default {
        name: 'AssetMaps',
        props:{ locations: {
                    type: Array
                },
               streetView: {
                   type: Boolean
               },
               name: {
                   type: String
               }
              },
        components: {
            AssetStreetView,AssetMap
        },
        computed: {
            streetViewLocation(){
                return this.locations[0];
            }
        }
     
    }

</script>


<style scoped lang="scss">
    #mapHolder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;  
        width: 100%;
    }
    
    @media only screen and (min-width: 700px) {
        #mapHolder{
            flex-direction: row;
            justify-content: space-between;
        }
    }

    

</style>
