<template>
   <div>
       
         <ol class="breadcrumb">
   
        <li class="breadcrumb-item" aria-current="page"><router-link to="/admin/indexes">Indexes</router-link></li>
             <li class="breadcrumb-item active" aria-current="page"><router-link :to="{path: '/admin/indexes/' + indexRef}">{{indexRef}}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page"><router-link :to="{path: '/admin/indexes/' + indexRef + '/assets'}">assets</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{documentRef}}</li>
    </ol>
      <h1>Asset Locations</h1>
       <h2>{{document.name}}</h2>
      
                <div class="form-group" v-if="locations.length > 1">
                <label>Locations</label>
                    <select class="form-control" v-model="currentLocation">
                   
                    <option v-for="location in locations"  value="location">
                        {{location.latitude}} , {{location.longitude}} <span v-if="location.primaryLocation" class="font-weight-bold">Primary</span>
                    </option>  
                </select>
    </div>
                <div class="form-group" v-else>
                <label>Location</label>
                     {{locations[0].latitude}} , {{locations[0].longitude}}  <span class="font-weight-bold">Primary</span>
    
            </div>
       <button class="btn btn-success">Add new Location</button>
       <p>{{currentLocation.latitude}}</p>
            </div>  
     
</template>

<script>
    import IndexService from '../../../services/IndexService'
    import DocumentService from '../../../services/DocumentService'
    export default {
        
        name: 'AssetLocations',
         props: {
            indexRef: {
                type: String,
                required: true
            },
             documentRef: {
                 type: String,
                 required: true
             }
         },
        data() {
          return {
            document: {},
            locations: [],
              currentLocation: {}
          }  
        }, 
  
        methods:
        {
            saveDocument(){
                
            }
        },
       created: function(){
            DocumentService.getDocument(this.indexRef, this.documentRef).then((response)=>{
                this.document = response.data; 
            
                this.document.locations.forEach((location)=>{   
                    this.locations.push(location);
                })
                if(this.locations.length == 1){
                    this.currentLocation = this.locations[0];
                }

            })
       }
    }
</script>

<style scoped lang="scss">
  

</style>
