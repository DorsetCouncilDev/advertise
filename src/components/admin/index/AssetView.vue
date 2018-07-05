<template>
<div>      
    <ol class="breadcrumb">  
        <li class="breadcrumb-item" aria-current="page"><router-link to="/advertise/admin/indexes">Indexes</router-link></li>
        <li class="breadcrumb-item active" aria-current="page"><router-link :to="{path: '/advertise/admin/indexes/' + indexRef}">{{indexRef}}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page"><router-link :to="{path: '/advertise/admin/indexes/' + indexRef + '/assets'}">assets</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{documentRef}}</li>
    </ol>
    <h1>Assets</h1>
    <div class="card mb-4">
        <div class="card-header">Asset</div>
        <div class="card-body">
            <div class="form-group">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="document.name" >
            </div>
            <div class="form-group">    
                <label for="longText">Long text</label>
                <b-form-textarea id="longText"
                        v-model="document.longText"
                        placeholder=""
                        :rows="3"
                        :max-rows="6">
                </b-form-textarea>
            </div> 
            <button type="button" class="btn btn-success"  @click="saveDocument">Save</button>
        </div>
    </div>
        
    <div class="card mb-4">
        <div class="card-header">Properties</div>
        <div class="card-body">
            <div v-for="property in propertyForm">
                <div class="form-group mb-4" v-if="property.propertyType == 'Boolean'">
                    <div class="multiple-choice"> 
                        <input type="checkbox" class="form-control" :id="property.propertyReference"  v-model="property.publishedValue"  v-bind:true-value="'true'"
  v-bind:false-value="'false'">
                        <label  :for="property.propertyReference" :title="property.longText">{{property.propertyName}}</label>
                    </div>     
                </div>
                <div class="form-group mb-4" v-else>
                    <label :for="property.propertyReference" >{{property.propertyName}}</label>
                    <input class="form-control" :type="property.type" :id="property.propertyReference" :name="property.propertyReference"  v-model="property.publishedValue">  
                </div>
            </div>
            <button type="button" class="btn btn-success"  @click="saveDocument">Save properties</button>
        </div>
    </div>
       
    <div class="card mb-3">
        <div class="card-header">Locations</div>
        <div class="card-body">
            <div v-for="location in locations">
                {{location.latitude}} , {{location.longitude}} <span v-if="location.primaryLocation" class="text-">Primary</span>
            </div>  
            <hr>
            <router-link :to="{path: '/advertise/admin/indexes/' + indexRef + '/assets/' + documentRef + '/locations'}">Manage locations</router-link>
        </div>
    </div>
</div>   
</template>

<script>
    import IndexService from '../../../services/IndexService'
    import DocumentService from '../../../services/DocumentService'
    export default {
        
        name: 'AssetsView',
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
              propertyForm: [],
              locations: []
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
                this.document.properties.forEach((property)=>{
                    this.propertyForm.push(property);
                })
                this.document.locations.forEach((location)=>{   
                    this.locations.push(location);
                })

            })
       }
    }
</script>

<style scoped lang="scss">
  

</style>
