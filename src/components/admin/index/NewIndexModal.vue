

<template>
  <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Create index"> 
            <div class="form-group">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="index.name" >
            </div>        
            <div class="form-group">    
                <label for="longText">Long text</label>
                <input class="form-control" type="text" id="longText"  v-model="index.longText">
            </div>     
        
       
        <div id="mfooter">
            <button type="button" class="btn btn-outline-secondary" @click="close"> Close </button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="createIndex">Create Index</button>
          
        </div>
    </b-modal>
</template>

<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import IndexService from '../../../services/IndexService'
  
    export default {

        name: 'NewIndexModal',
        props: { 
            show: {
                type:Boolean,
                required:true
            }
        },
        data() {
          return {
              index: {
                name: null,
                longText: null
              },
               showModal: false
             
          }  
        },
        watch: {
            show: function() {
                this.showModal = this.show

            }
        },
  
        methods:
        {
             createIndex: async function() {
                 var obj = {
                     name: this.index.name,
                     longText: this.index.longText
                 }
                  var securityToken = this.$store.state.securityToken;
                await IndexService.createIndex(obj,securityToken).then((response)=>{
                    this.$emit('created');
                },(error)=>{
                    console.log("error creating index")
                    console.log("E: " + error)
                })
            },
            close: function(){
                this.index.name = "";
                this.index.longText = "";
                this.$emit("close");
            },
                onShow(evt) {
      
            },
            onHidden(evt) {
                this.index.name = "";
                this.index.longText = "";
                this.$emit('close')
            }
        }
    

   
    }
</script>

<style scoped lang="scss">
  

</style>
