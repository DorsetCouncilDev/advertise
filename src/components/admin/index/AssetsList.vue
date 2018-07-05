<template>
   <div>
        <ol class="breadcrumb">
   
        <li class="breadcrumb-item" aria-current="page"><router-link to="/advertise/admin/indexes">Indexes</router-link></li>
        <li class="breadcrumb-item active" aria-current="page"><router-link :to="{path: '/advertise/admin/indexes/' + indexRef}">{{indexRef}}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">assets</li>
 
    </ol>
      <h1>Assets</h1>
       <table class="table table-striped">
  <thead>
    <tr>
        <th>Asset</th>
        <th>Type</th>
        <th>Published</th>
    </tr>
    </thead>
    <tbody>
        <tr v-for="document in documents">
            <td><router-link :to="{path:'/advertise/admin/indexes/' + indexRef + '/assets/' + document.reference}">{{document.name}}</router-link></td>
            <td>{{document.documentType}}</td>
            <td><span v-if="document.publishedVersion.published" class="text-success">published</span><span v-else class="text-warning">unpublished</span></td>
        </tr>
    
    </tbody>
    </table>
       
             
          
        </div>

</template>

<script>
    import IndexService from '../../../services/IndexService'
    import DocumentService from '../../../services/DocumentService'
    export default {
        
        name: 'AssetsList',
         props: {
            indexRef: {
                type: String,
                required: true
            }
         },
        data() {
          return {
              index: {},
             documents: []
          }  
        }, 
  
        methods:
        {
     
        },
       created: function(){
           
             IndexService.getIndex(this.indexRef).then((response) => {
               this.index = response.data;
                 
               this.index.documentTypes.forEach(async(type) => {
                   DocumentService.getDocuments(this.indexRef, type.reference).then((response)=>{
                       this.documents = this.documents.concat(response.data)
                   })
               })
             })
       }
    }
</script>

<style scoped lang="scss">
  

</style>
