<template>
   <div>
       
         <ol class="breadcrumb">
   
        <li class="breadcrumb-item" aria-current="page"><router-link to="/admin/indexes">Indexes</router-link></li>
             <li class="breadcrumb-item active" aria-current="page"><router-link :to="{path: '/admin/indexes/' + indexRef}">{{indexRef}}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page"><router-link :to="{path: '/admin/indexes/' + indexRef + '/assets'}">assets</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{documentRef}}</li>
    </ol>
      <h1>Assets</h1>
       
     <h2>{{document.name}}</h2>
     <p>{{document.longText}}</p>
       
       
       
       <div v-for="property in propertyForm">
     
         <div class="form-group">
                <div class="form-group">
                     <label :for="property.propertyReference" >{{property.propertyName}}</label>
                    <input class="form-control" :type="property.type" :id="property.propertyReference" :name="property.propertyReference"  v-model="property.publishedValue">
                   
                </div>
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
                 required: true,
                 propertyForm: []
             }
         },
        data() {
          return {

             document: {},
              propertyForm: []
          }  
        }, 
  
        methods:
        {
     
        },
       created: function(){
            DocumentService.getDocument(this.indexRef, this.documentRef).then((response)=>{
                this.document = response.data; 
                this.document.version.properties.forEach((property)=>{
                  
                    this.propertyForm.push(property);
                })

            })
       }
    }
</script>

<style scoped lang="scss">
  

</style>
