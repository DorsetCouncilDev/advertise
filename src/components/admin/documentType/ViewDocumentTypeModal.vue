<template>

   <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Document type">
<div class="ad-modal-body"> 


            <div class="form-group">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="currentDocumentType.name">
            </div>
           
            <div class="form-group">    
                <label for="longText">Long text</label>
                <input class="form-control" type="text" id="longText" v-model="currentDocumentType.longText">
            </div>
 
            <legend>Properties</legend>
 
            <div class="form-group" v-for="property in indexProperties">
                <div class="multiple-choice">
                    <input type="checkbox" class="form-control small" :id="property.reference" value="1" v-model="property.selected">
                    <label class="small pr" :for="property.reference" >{{property.name}} <span class="font-weight-light text-lowercase"> ({{property.type}})</span></label>
                    
                    
                </div>
            </div>

         </div>  
      <div id="mfooter">
            <b-btn type="button" class="btn btn-outline-secondary" @click="closeModal"> Close </b-btn>
            <b-btn type="button" variant="success" @click="updateType">Save changes</b-btn>
            <b-btn class="btn btn-outline-danger" @click="deleteDocumentType">Delete</b-btn>
    </div>

    
    </b-modal>

</template>


<script> 
    import _ from 'lodash'
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import DocumentTypeService from '../../../services/DocumentTypeService'
    
    export default {

        name: 'DocumentTypeViewModal',
 
        props: {
            documentType: {
                type: Object,
                required: true
            },
   
            indexRef: {
                type: String,
                required: true
            },
            show:{
                type:Boolean,
                required:true
            },
            properties: {
                type: Array,
                required:true
            }
        },
        data() {
            return {
                selectedProperties: [],
                updateDocumentType: {},
                currentDocumentType:  _.cloneDeep(this.documentType),
                indexProperties: [],
                showModal : this.show,
                errorMessage: ""
            }
        },
        watch: {
            show: function(){
                this.showModal = this.show
            }
        },

        methods: {

            closeModal: function(){
              this.$emit('close')
 
            },

            updateType: async function() {
                var updateProperties = {
                    "name": this.currentDocumentType.name,
                    "longText": this.currentDocumentType.longText
                }
                var securityToken = this.$store.state.securityToken;
                
                var propertiesSelected = [];
                this.indexProperties.forEach((currentProperty)=>{
                    if(currentProperty.selected)
                        propertiesSelected.push(currentProperty.reference)
                })

                
                await DocumentTypeService.updateType(this.indexRef, this.documentType.reference,securityToken, updateProperties)
                    .then( async(response) => {
                        await DocumentTypeService.addProperties(this.indexRef,response.data.reference,propertiesSelected,securityToken).then((response)=>{

                        }) 
                        this.$emit('updated', response.data)  
                    },(error)=> {
                    console.log("ERROR: " + error)
                })
            },
            deleteDocumentType: async function() {
                 var securityToken = this.$store.state.securityToken;
                await DocumentTypeService.deleteType(this.indexRef, this.documentType.reference, securityToken)
                    .then((response) => {
                
                        this.$emit('updated', response.data)
                    },(error)=>{
                    if(error.response.status === 409)
                        this.errorMessage = "This type is being used"
                })
            },
            onHidden (evt) {
                this.currentDocumentType = {}
                this.$emit('close')
            },
            onShow (evt){
                this.currentDocumentType =  _.cloneDeep(this.documentType)
                this.indexProperties = _.cloneDeep(this.properties)
                this.indexProperties.forEach((indexProperty)=> {
                     this.currentDocumentType.documentTypeProperties.forEach((typeProperty)=>{
                        if(indexProperty.reference == typeProperty.property.reference){
                            indexProperty.selected = true;
             
                        }

                    })
                })
               
                
                
            }
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }

  

    .close {
        position: absolute;
        top: 5px;
        right: 5px;
    }
    #propertiesSelectionLink{
        margin-left:30px;
        &.collapsed:before{
            

            content: '+'         
        }
        &:before{
            position: absolute;
            content:'-';
            left: 15px;
           
        }
    }
    .multiple-choice{
        width:50%;
        &:after{
    
            position:absolute;
            left:200px;
            top:0;
        }
    }

</style>
