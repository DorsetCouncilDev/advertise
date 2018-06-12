<template>
  <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Property">    
       <div class="ad-modal-body">        
      <p v-if="isError" class="text-danger">{{errorMessage}}</p>
      
      
                <div class="row">      
                    <div class="form-group col-sm-5">
                        <label for="name">Name</label>
                        <input class="form-control" v-model="currentProperty.name"> 
                    </div>
                    <div class="form-group col-sm-12">
                        <label for="longText">Long text</label>
                        <input class="form-control" v-model="currentProperty.longText"> 
                    </div>       
                </div>
               
                
                    <div class="form-group">
                        <legend>type</legend>
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="type" id="text" value="Text" v-model="currentProperty.type">
                            <label class="small" for="text">Text (<span class="text-muted">example. abc123</span>)</label>
                        </div>
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="type" id="number" value="Number" v-model="currentProperty.type">
                            <label class="small" for="number">Number (<span class="text-muted">example: 22.56</span>)</label>
                        </div>
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="type" id="int" value="Integer" v-model="currentProperty.type">
                            <label class="small" for="int">Integer (<span class="text-muted">example: -1,0,1,2...</span>)</label>
                        </div>
                          <div class="multiple-choice">
                            <input type="radio" class="form-control" name="type" id="bool" value="Boolean" v-model="currentProperty.type">
                            <label class="small" for="bool">Boolean (<span class="text-muted">example: true,false</span>)</label>
                        </div>
                    </div>
               
               
                    <legend>Relation</legend>  
                    <div class="form-group">
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="relation" id="lthan" value="LessThan" v-model="currentProperty.relation">
                            <label class="small" for="lthan">Less than</label>
                        </div>
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="relation" id="gthan" value="GreaterThan" v-model="currentProperty.relation">
                            <label class="small" for="gthan">Greater than</label>
                        </div>
                    </div>
         
            
                    <legend>Order</legend> 
                    <div class="form-group">
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="order" id="asc" value="Ascending" v-model="currentProperty.sortOrder">
                            <label for="asc" class="small">Ascending</label>
                        </div>
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="order" id="desc" value="Descending"  v-model="currentProperty.sortOrder">
                            <label for="desc" class="small">Descending</label>
                        </div>
                    </div>

 </div>
            <div id="mfooter">
                <button type="button" class="btn btn-outline-secondary" @click="close()"> Close </button>
                <button type="button" class="btn btn-success" data-dismiss="modal" @click="updateProperty">Save</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteProperty">Delete</button>
            </div>

    </b-modal>
</template>


<script>
    import _ from 'lodash'
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import PropertyService from '../../../services/PropertyService'
    export default {

        name: 'ViewPropertyModal',
        props: {
            property: {
                type: Object,
                required: true
            },
            show: {
                type: Boolean,
                required: true
            },
            indexRef: {
                type: String,
                required: true
            }
        },
        watch:{
            show: function(){
                this.showModal = this.show
            }  
        },
        data() {
            return {
                currentProperty: {},
                showModal: false,
                showDeleteModal: false,
                errorMessage: ""
            }
        },
        computed: {
            isError(){
                return this.errorMessage != ""
            }
        },

        methods: {
        
            close: function() {
                this.$emit('close');
            },
            updateProperty: async function() {
                var updateData = {
                    "name": this.currentProperty.name,
                    "longText": this.currentProperty.longText,
                    "relation": this.currentProperty.relation,
                    "type": this.currentProperty.type
                }
                var securityToken = this.$store.state.securityToken;
                await PropertyService.editProperty(this.indexRef, this.property.reference, updateData,securityToken).then((response) => {
                    this.$emit('updated', response.data)
                })
            },
            deleteProperty: async function(){
                var securityToken = this.$store.state.securityToken;
                await PropertyService.deleteProperty(this.indexRef,this.property.reference,securityToken).then((response)=>{
                   this.$emit('updated') 
                },(error)=>{
                    if(error.response.status === 409)
                        this.errorMessage = "This property is already used"
                    else if(error.response.status === 401)
                        this.$router.push('/admin/')
                })
            },
               onShow(evt) {
            this.currentProperty = _.cloneDeep(this.property)
                   this.errorMessage = ""
            },
            onHidden(evt) {
                this.$emit('close')
            },
        },
        beforeMount(){
            this.currentProperty = this.property
        }
    }
</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }

</style>
