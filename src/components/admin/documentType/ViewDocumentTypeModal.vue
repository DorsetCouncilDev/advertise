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
    
        <div class="multiple-choice">
            <input type="checkbox" class="form-control small" :id="currentDocumentType.reference"  :name="currentDocumentType.reference" v-model="currentDocumentType.display" value="1" >
            <label class="small pr" :for="currentDocumentType.reference" >Display</label>
        </div>
 
            <legend class="mt-3">Properties</legend>
 
    <b-tabs>
  <b-tab title="All properties" active>
       <div class="stv-radio-tabs-wrapper">
       <input  type="radio" class="stv-radio-tab" id="one" name="sortProperties"   value="sortAz" v-model="sortPropertiesBy">
        <label for="one">A-z</label>
           
           <input  type="radio" class="stv-radio-tab" id="two" name="sortProperties"    value="sortZa" v-model="sortPropertiesBy">
        <label for="two">Z-a</label>
           
           <input  type="radio" class="stv-radio-tab" id="three" name="sortProperties" value="selectedFirst" v-model="sortPropertiesBy">
        <label for="three">Selected first</label>
    </div>
    <b-list-group>
            <b-list-group-item  v-for="property in indexProperties" :key="property.reference">
                <div class="form-group">
                <div class="multiple-choice">
                    <input type="checkbox" class="form-control small" :id="property.reference" value="1" v-model="property.selected">
                    <label class="small pr" :for="property.reference" >{{property.name}} <span class="font-weight-light text-lowercase"> ({{property.type}})</span></label>
                    
                    
                </div>
                    </div>
          
    </b-list-group-item>
    </b-list-group>
  </b-tab>
  <b-tab title="Selected properties" >
      <b-list-group>
            <b-list-group-item  v-for="property in selectedProperties" :key="property.property.reference">
              {{property.property.name}}
                
                <div class="actions">
                 <div class="multiple-choice">
                    <input type="checkbox" class="form-control small" :id="property.property.reference"  :name="property.property.reference" v-model="property.display" value="1" @click="updatePropertyDisplay(property.property.reference,property.display)" >
                    <label class="small pr" :for="property.property.reference" >Display</label>
                </div>
                
                
                <button title="move up one place" class="btn btn-light" @click="moveUp(property.property.reference)"><img src="../../../assets/images/up-arrow.png"></button>
                    </div>
    </b-list-group-item>
    </b-list-group>
  </b-tab>

</b-tabs>
    

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
            show: {
                type: Boolean,
                required: true
            },
            properties: {
                type: Array,
                required: true
            },
            
        },
        data() {
            return {
                selectedProperties: [],
                updateDocumentType: {},
                currentDocumentType: _.cloneDeep(this.documentType),
                indexProperties: [],
                showModal: this.show,
                errorMessage: "",
                sortPropertiesBy: null
            }
        },
        watch: {
            sortPropertiesBy: function(){
                if(this.sortPropertiesBy == 'selectedFirst')
                    this.sortPropertiesBySelected();
                if(this.sortPropertiesBy == 'sortAz')
                    this.sortPropertiesAZ();
                if(this.sortPropertiesBy == 'sortZa')
                    this.sortPropertiesZA();
            },
            
            show: function() {
                this.showModal = this.show
            },
            documentType: function(){
                this.currentDocumentType = {}
                this.currentDocumentType = _.cloneDeep(this.documentType)
               this.selectedProperties = []
                    this.currentDocumentType.properties.forEach((typeProperty) => {
                        this.selectedProperties.push(typeProperty) 
                    })
              
            }
        },

        methods: {
            updatePropertyDisplay: async function(propertyRef,value){
                var securityToken = this.$store.state.securityToken;
                if(!value == true){
                    DocumentTypeService.showProperty(this.indexRef,this.currentDocumentType.reference,propertyRef,securityToken).then((response)=>{
                        this.$emit('updated')
                        this.initialise();
                    })
                }
                 else {
                     DocumentTypeService.hideProperty(this.indexRef,this.currentDocumentType.reference,propertyRef,securityToken).then((response)=>{
                        this.$emit('updated')   
                         this.initialise();
                    })
                 }  
            },
            moveUp: async function(propertyRef) {
                console.log("move up: " + propertyRef)

                var securityToken = this.$store.state.securityToken;
                await DocumentTypeService.movePropertyUp(this.indexRef, this.documentType.reference, propertyRef, securityToken).then((response)=>{
                    this.$emit('updated')       
                })
            },
            closeModal: function() {
                this.$emit('close')

            },

            updateType: async function() {
                var updateProperties = {
                    "name": this.currentDocumentType.name,
                    "longText": this.currentDocumentType.longText,
                    "display": this.currentDocumentType.display
                }
                var securityToken = this.$store.state.securityToken;

                var propertiesSelected = [];
                this.indexProperties.forEach((currentProperty) => {
                    if (currentProperty.selected)
                        propertiesSelected.push(currentProperty.reference)
                })

                await DocumentTypeService.updateType(this.indexRef, this.documentType.reference, securityToken, updateProperties)
                    .then(async (response) => {
                        await DocumentTypeService.addProperties(this.indexRef, response.data.reference, propertiesSelected, securityToken).then((response) => {

                        })
                        this.$emit('updated', response.data)
                    }, (error) => {
                        console.log("ERROR: " + error)
                    })
            },
            deleteDocumentType: async function() {
                var securityToken = this.$store.state.securityToken;
                await DocumentTypeService.deleteType(this.indexRef, this.documentType.reference, securityToken)
                    .then((response) => {

                        this.$emit('updated', response.data)
                    }, (error) => {
                        if (error.response.status === 409)
                            this.errorMessage = "This type is being used"
                    })
            },
            onHidden(evt) {
                this.currentDocumentType = {}
                this.$emit('close')
            },
            initialise(){
                this.selectedProperties = [];
                this.currentDocumentType = _.cloneDeep(this.documentType)
                this.indexProperties = _.cloneDeep(this.properties)

                this.indexProperties.forEach((indexProperty) => {
                    this.currentDocumentType.properties.forEach((typeProperty) => {

                        console.log("index-p-ref: " + indexProperty.reference)
                        console.log("type-p-ref: " + typeProperty.property.reference)

                        if (indexProperty.reference == typeProperty.property.reference) {
                            indexProperty.selected = true;
                            
                        }

                    })
                })
                
                this.currentDocumentType.properties.forEach((typeProperty) => {
                     this.selectedProperties.push(typeProperty) 
                })
            },
            onShow(evt) {
                this.initialise();
            },
            sortPropertiesBySelected() {
                this.indexProperties.sort(function(x, y) {
                    if (x.selected && y.selected)
                        return 0;
                    if (x.selected)
                        return -1;
                    if (y.selected)
                        return 1;
                    return 0;
                });
            },
            sortPropertiesAZ() {
                this.indexProperties.sort(function(x, y) {
                 
                    if (x.name < y.name)
                        return -1;
                    if (y.name < x.name)
                        return 1;
                    return 0;
                });
            },
            sortPropertiesZA() {
                
                this.indexProperties.sort(function(x, y) {
                 
                    if (x.name > y.name)
                        return -1;
                    if (y.name > x.name)
                        return 1;
                    return 0;
                });
            }
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    
    .multiple-choice{
        margin-right:15px;
        padding: 5px 0 0 25px;
    }
    .multiple-choice label.small {
    padding: 0 5px 1px 2px; 
    margin-bottom: 1px; 
     margin-top: 0; 
     
        
}
    
    .actions{
        display: flex;
    }
    
    .stv-radio-tabs-wrapper {
            clear: both;
            display: flex;
        justify-content: flex-end;
            padding: 0;
            position: relative;
        width: 100%;
        }
        input.stv-radio-tab {
            position: absolute;
            left: -99999em;
            top: -99999em;

            &+label {
                cursor: pointer;
                float: left;
                border: solid 1px #ced4da;
                background-color: #fff;
               padding:3px 5px;
              
              
                position: relative;
             

              
                &:hover {
                    background-color: #eee;
                }
            }

            &:checked+label {
                background-color: #E9E9E9;
                z-index: 1;
            }
        }
    
    h2.display-4 {
        font-size: 32px;
    }



    .close {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    #propertiesSelectionLink {
        margin-left: 30px;
        &.collapsed:before {


            content: '+'
        }
        &:before {
            position: absolute;
            content: '-';
            left: 15px;

        }
    }

    .multiple-choice {

        &:after {

            position: absolute;
            left: 200px;
            top: 0;
        }
    }

    .list-group-item {
        display: flex;
        justify-content: space-between;

        &:hover {
            .btn {
                opacity: 1;

            }
        }
    }

</style>
