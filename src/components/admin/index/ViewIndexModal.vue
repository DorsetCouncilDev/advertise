<template>      
    <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer :title="index.name" >
        <h3 slot="header" class="modal-title">Edit index</h3>
        <div class="ad-modal-body"> 
            <div class="form-group">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="viewIndex.name" >
            </div>        
            <div class="form-group">    
                <label for="longText">Long text</label>
                <input class="form-control" type="text" id="longText"  v-model="viewIndex.longText">
            </div>     
        
        </div>         
        <div id="mfooter">
            <button type="button" class="btn btn-outline-secondary" @click="closeView"> Close </button>
            <button type="button" class="btn btn-success pull-right" data-dismiss="modal" @click="updateIndex">Save</button>
            <button type="button" class="btn btn-danger pull-right" data-dismiss="modal" @click="deleteIndex">Delete</button>
        </div>
    </b-modal>
</template>


<script>
    import IndexService from '../../../services/IndexService'
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    export default {

        name: 'ViewIndexModal',
    
        props: {
            index: {
                type: Object,
                required: true
            },
            show: {
                type: Boolean,
                requried: true
            }
        },
        data() {
            return {
                viewIndex: {
                    name: "",
                    longText: ""
                },
                showModal: false
   
            }
        },
        watch:{
          show(){
              this.showModal = this.show;
          }  
        },
        methods: {
            closeView: function(){
              this.$emit('close')  
            },
            deleteIndex: async function() {
                  var securityToken = this.$store.state.securityToken;
                await IndexService.deleteIndex(this.index.reference,securityToken).then((response) => {
                 
                    this.$router.push("/admin/indexes/");
                }, (error) => {
                    console.log("error deleting index");
                    console.log("E: " + error);
                })
            },
            getIndex: async function(){
                await IndexService.getIndex(this.index.reference).then((response)=>{
                    this.viewIndex.name = response.data.name;
                    this.viewIndex.longText = response.data.longText;
                },(error)=>{
                    console.log(error)
                })
            },
            updateIndex: async function() {
                  var securityToken = this.$store.state.securityToken;
                var updateProperties = {
                    "name": this.viewIndex.name,
                    "longText": this.viewIndex.longText
                }
                await IndexService.updateIndex(this.index.reference, updateProperties,securityToken)
                    .then((response) => {
                        this.$emit('updated', response.data.reference)
                    }, (error)=>{
                        console.log('error updating index');
                        console.log('E' + error);
                    })
            },
            onHidden(evt) {
                this.$emit('close')
            },
            onShow(evt){
                this.getIndex();
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }

</style>
