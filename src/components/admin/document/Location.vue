<template>

   
              
       <div class="input-group location-input" >
          
    <!--      
  <input class="form-control" type="text" id="longitude" name="longitude" v-model="lat">
  <input class="form-control" type="text" id="latitude" name="latitude" v-model="long">
           <div class="input-group-append">
               <button v-if="newLocation" class="btn btn-primary" @click="addLocation">Add</button>
               <button v-if="editing" class="btn btn-primary" @click="addLocation">Save</button>
               <button v-if="d" class="btn btn-primary" @click="addLocation">Delete</button>
               
  </div>
-->
</div>                                                                                   

   
</template>


<script>
   
    export default {
        
        name: 'Location',
        props: {
            Latitude: {
                type: String,
                required: false
            },
            Longitude:{
                type:String,
                required:false
            },
            newLocation:{
                type: Boolean,
                required: true
            }
        },
       
        data() {
            return {
               location: {},
               lat: "",
              long:""
            }
        },

        methods: {
            
         

          
        },
        created(){
            if(!newLocation)
            {
                this.lat = this.latitude;
                this.long = this.longitude;
            }
        }
    }


</script>

<style scoped lang="scss">
    h2.display-4{
        font-size:32px;
    }
    .location-input{
        margin-bottom:1px;
    }

</style>
