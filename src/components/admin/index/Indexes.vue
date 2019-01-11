<template>
   <div>
       <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              
                <li class="breadcrumb-item active" aria-current="page">Indexes</li>
            </ol>
        </nav>
       <h1 class="mt-2 mb-4">Indexes</h1>
       
       
           <div class="loading-message" v-show="loadingIndexes">Loading indexes</div>
       <div class="timeout-message" v-show="showTimeoutMessage"><p>We're having trouble retrieving the indexes.</p><p>Please referesh the page or try again later.</p></div>
            <ul class="list-group col-sm-5">
                <li class="list-group-item" v-for="index in indexes">
                    <router-link :to="{ path: '/advertise/admin/indexes/' + index.reference }">{{index.reference}}</router-link>
                  <!--  <a class="text-danger float-sm-right" @click="deleteIndex(index.reference)">Delete</a> -->
                </li>
            </ul>
 <hr>
       <button class="btn btn-success" @click="openNewIndexModal">Create new index</button>
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
              showNewIndexModal:false,
              loadingIndexes:true,
              showTimeoutMessage:false
          }  
        }, 
        methods:
        {
            async getIndexes() {
                IndexService.getIndexes().then((response)=>{
                    this.indexes = response.data;
                    this.loadingIndexes = false;
                }).catch((error)=>{
                    this.loadingIndexes = false;
                    this.showTimeoutMessage = true;
                })  
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
    .timeout-message{
        max-width:100%;
        width:800px;
        padding:15px;
        font-size:24px;
        color:#2A2A2A;
    }
    .loading-message{
        max-width:100%;
        width:800px;
        padding:15px;
        font-size:32px;
        color:#2A2A2A;
        &:after{
            content: ' ';
            animation: waiting 2s forwards;
            animation-iteration-count: infinite;
        }
    }
    @keyframes waiting {
        
      0% {
      content: ' .'
  }   
  33% {
    content: ' ..'
  }
        66%{
            content: ' ...'
        }
}

</style>
