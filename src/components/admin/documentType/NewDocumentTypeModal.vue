<template>
 <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Create a new asset type">
<div class="ad-modal-body"> 
            <div class="form-group">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="newDocumentType.name">
            </div>
           
            <div class="form-group">    
                <label for="longText">Long text</label>
                <input class="form-control" type="text" id="longText" v-model="newDocumentType.longText">
            </div>
    </div>
        <div id="mfooter">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="close"> Close </button>
            <button type="button" class="btn btn-success pull-right" data-dismiss="modal" @click="createDocumentType">Create</button>
  </div>

    </b-modal>
</template>


<script>
    import DocumentTypeService from '../../../services/DocumentTypeService'
    import ModalTemplate from '../ModalTemplate'
    
    export default {
        name: 'NewDocumentTypeModal',
        props: {   
            show:{
                type:Boolean,
                required: true
            },
            indexRef:{
                type:String,
                required:true
            }
        },
        watch:{
          show(){
              this.showModal = this.show;
          }  
        },
        data() {
            return {
                newDocumentType: {
                    name: "",
                    longText: ""
                },
                showModal: false
            }
        },

        methods: { 
            close: function(){
                this.$emit('close');
            },
            createDocumentType: async function(){
                var newTypeProperties = {
                    "name": this.newDocumentType.name,
                    "longText": this.newDocumentType.longText
                }
                var securityToken = this.$store.state.securityToken;
                await DocumentTypeService.create(this.indexRef,securityToken,newTypeProperties)
                    .then((response) => {
                     this.newDocumentType.name = "";
                this.newDocumentType.longText = "";
                        this.$emit('created',response.data)
                    })
            },
                onShow(evt) {
      
            },
            onHidden(evt) {
                this.newDocumentType.name = "";
                this.newDocumentType.longText = "";
                this.$emit('close')
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4{
        font-size:32px;
    }

</style>
