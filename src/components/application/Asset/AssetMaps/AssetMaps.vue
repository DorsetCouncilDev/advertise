<template>
    <div id="mapHolder">
 <AssetMap :wide="wideMap" :locations="locations" :name="name"></AssetMap>
        <AssetStreetView v-if="streetView" :location="streetViewLocation"></AssetStreetView>


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
            },
            wideMap(){
              if(this.streetView)
              return false;
              return true;
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
        margin-bottom:60px;
        margin-top:30px;
    }

    @media only screen and (min-width: 700px) {
        #mapHolder{
            flex-direction: row;
            justify-content: start;
        }
    }



</style>
