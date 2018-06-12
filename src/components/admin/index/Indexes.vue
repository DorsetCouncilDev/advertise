<template>
   <div>
       <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              
                <li class="breadcrumb-item active" aria-current="page">Indexes</li>
            </ol>
        </nav>
       <h1 class="mt-2 mb-4">Indexes</h1>
       
       <div class="row">
            <ul class="list-group col-sm-5">
                <li class="list-group-item" v-for="index in indexes">
                    <router-link :to="{ path: '/admin/indexes/' + index.reference }">{{index.reference}}</router-link>
                    <a class="text-danger float-sm-right" @click="deleteIndex(index.reference)">Delete</a>
                </li>
            </ul>
        </div>
       <a @click="openNewIndexModal">Create new index</a>
       <NewIndexModal :show="showNewIndexModal" v-on:close="onCloseNewIndexModal" @created="onCreated"></NewIndexModal>
    </div>
</template>

<script>
    import NewIndexModal from './NewIndexModal'
    import IndexService from '../../../services/IndexService'
    export default {
        
        name: 'Indexes',
        components:{ NewIndexModal},
        data() {
          return {
              indexes: [],
              showNewIndexModal:false
          }  
        }, 
  
        methods:
        {
            async getIndexes() {
                const result = await IndexService.getIndexes()
                this.indexes = result.data;
            },
            deleteIndex: async function(indexReference) {
        
                   var securityToken = this.$store.state.securityToken;
              await IndexService.deleteIndex(indexReference,securityToken).then((response)=>{
                  this.getIndexes();
              },(error)=>{ console.log(error)})
            },
            openNewIndexModal: function(){
                this.showNewIndexModal = true;
            },
            onCloseNewIndexModal: function(){
                this.showNewIndexModal = false;
            },
            onCreated: function(){
                 this.showNewIndexModal = false;
                this.getIndexes();
            }
        },
        mounted(){
            const result = this.getIndexes();
        }
    }
</script>

<style scoped lang="scss">
  

</style>
