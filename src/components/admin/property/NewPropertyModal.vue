<template>
 <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Creat a new asset property">
     <div class="ad-modal-body">         
     <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" v-model="property.name" id="name"> 
            </div>
             <div class="form-group">
                <label for="longText">Long text</label>
                <input class="form-control" v-model="property.longText"> 
            </div>

            <div class="form-group">
                <legend>type</legend>
                <div class="multiple-choice">
                    <input type="radio" class="form-control" name="type" id="text" value="Text" v-model="property.type">
                    <label for="text">Text (<span class="text-muted">example. abc123</span>)</label>
                </div>
                <div class="multiple-choice">
                    <input type="radio" class="form-control" name="type" id="number" value="Number" v-model="property.type">
                    <label for="number">Number (<span class="text-muted">example: 22.56</span>)</label>
                </div>
                <div class="multiple-choice">
                    <input type="radio" class="form-control" name="type" id="int" value="Integer" v-model="property.type">
                    <label for="int">Integer (<span class="text-muted">example: -1,0,1,2...</span>)</label>
                </div>
                 <div class="multiple-choice">
                    <input type="radio" class="form-control" name="type" id="bool" value="Boolean" v-model="property.type">
                    <label for="bool">Boolean (<span class="text-muted">example: true,false</span>)</label>
                </div>
            </div>
    
      
            <legend ><a  v-b-toggle="'collapseRelation'" role="button" aria-expanded="false" aria-controls="collapseRelation" id="relationButton" class="collapsed">Relation <small><span class="text-muted">default set</span></small></a></legend>  
            <b-collapse class="form-group col- collapse" id="collapseRelation">
                <div class="multiple-choice">
                    <input type="radio" class="form-control" name="relation" id="lthan" value="LessThan" v-model="property.relation" selected>
                    <label for="lthan">Less than</label>
                </div>
                <div class="multiple-choice">
                    <input type="radio" class="form-control" name="relation" id="gthan" value="GreaterThan" v-model="property.relation">
                    <label for="gthan">Greater than</label>
                </div>
    </b-collapse>
           <legend><a  v-b-toggle="'collapseOrder'" role="button" aria-expanded="false" aria-controls="collapseOrder" id="orderButton" class="collapsed">Order <small><span class="text-muted">default set</span></small></a></legend> 
                    <b-collapse class="form-group  collapse" id="collapseOrder">
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="order" id="asc" value="Ascending" v-model="property.sortOrder" >
                            <label for="asc">Ascending</label>
                        </div>
                        <div class="multiple-choice">
                            <input type="radio" class="form-control" name="order" id="desc" value="Descending"  v-model="property.sortOrder">
                            <label for="desc">Descending</label>
                        </div>
    </b-collapse>
        
   
    </div>  
    <div id="mfooter">
        <button type="button" class="btn btn-outline-secondary" @click="close"> Close </button>
        <button type="button" class="btn btn-success pull-right" data-dismiss="modal" @click="createProperty">Create</button>
    </div>
  
    </b-modal>

</template>


<script>
    import PropertyService from '../../../services/PropertyService'
    import ModalTemplate from '../ModalTemplate'
    
    export default {
        name: 'NewPropertyModal',
        components: {ModalTemplate},
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
        data() {
            return { 
                property: {
                    name: "",
                    longText: "",
                    type: "",
                    relation: "LessThan",
                    sortOrder: "Ascending"
                },
                showModal: false
            }
        },
        watch:{
           show(){
               this.showModal = this.show
           }  
        },
        methods: {
            close: function(){
                  this.property.name = "";
                        this.property.longText = "";
                        this.property.type = "";
                        this.property.relation = "";
                this.$emit('close');
            },

            createProperty: async function(){
               
                var newPropertyData = {
                    "name": this.property.name,
                    "longText": this.property.longText,
                    "type":this.property.type,
                    "relation":this.property.relation
                }
                var securityToken = this.$store.state.securityToken;
                await PropertyService.createProperty(this.indexRef,newPropertyData,securityToken)
                    .then((response) => {
                    this.property.name = "";
                        this.property.longText = "";
                        this.property.type = "";
                        this.property.relation = "";
                        this.$emit('created',response.data)
                    })
            },
            onShow(evt) {
                this.property.relation = "LessThan";
            },
            onHidden(evt) {
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
