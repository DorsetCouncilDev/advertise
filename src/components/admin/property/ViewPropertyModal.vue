<template>
<b-modal v-model="showModal" @hidden="onHidden"  @show="onShow" hide-footer title="Property">    
    <div class="ad-modal-body"> 
       
        <div class="form-group" :class="{'hasError':nameError}">
            <label for="name">Name</label>
            <input class="form-control" v-model="currentProperty.name"> 
        </div>
        <div class="form-group">
            <label for="longText">Long text</label>
            <textarea class="form-control" type="" v-model="currentProperty.longText"></textarea> 
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
    <div id="mfooter" v-bind:class="{'doingStuff':isDoingStuff}">
        <button type="button" class="btn btn-outline-secondary" @click="close()"> Close </button>
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="updateProperty">Save</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteProperty">Delete</button>
         <ModealErrorMessage :error="error"></ModealErrorMessage>
        <ModealInfoMessage :info="info"></ModealInfoMessage>
    </div>
</b-modal>
</template>


<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import PropertyService from '../../../services/PropertyService'
    import ModealErrorMessage from '../../modal-error-message'
    import ModealInfoMessage from '../../modal-info-message'
    export default {

        name: 'ViewPropertyModal',
        components: {
            ModealErrorMessage, ModealInfoMessage
        },
        props: {
            propertyRef: {
                type: String,
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
        watch: {
            show: function() {
                this.showModal = this.show
            },
            currentProperty: {
                handler: function() {
                    this.canSave = true;
                },
                deep: true
            }
        },
        data() {
            return {
                currentProperty: {},
                canSave: false,
                showModal: false,
                showDeleteModal: false,
                isDoingStuff: false,
                doingStuffMessage: "",
                error: {
                    show: false,
                    message: "",
                    detail: ""
                },
                nameError: false,
                info: {
                    message: "",
                    show:false
                }
            }
        },
        methods: {
            close: function() {
                this.$emit('close');
            },
            updateProperty: async function() {    
                this.clearInfoMessage()
                this.clearErrorMessage()
                
                this.isDoingStuff = true;
                this.doingStuffMessage = "Updating property"

                if (this.currentProperty.name == null || this.currentProperty.name.length == 0) {
                    this.clearActionMessage();
                    this.error.show = true;
                    this.error.message = "Name is required";
                    this.error.detail = "";   
                    this.nameError = true;
                } else {
                    var updateData = {
                        "name": this.currentProperty.name,
                        "longText": this.currentProperty.longText,
                        "relation": this.currentProperty.relation,
                        "type": this.currentProperty.type
                    }
                    var securityToken = this.$store.state.securityToken;
                    await PropertyService.editProperty(this.indexRef, this.currentProperty.reference, updateData, securityToken).then((response) => {
                        this.getProperty(response.data.reference);
                        
                        this.$emit('updated')
                        this.clearActionMessage();           
                        
                        this.info.show = true;
                        this.info.message = "Changes have been saved"
                        
                    }, (error) => {
                        this.clearActionMessage();
                        this.error.show = true;
                        this.error.message = "Sorry, something went wrong";
                        this.error.detail = "error code: " + error.response.status + " " + error.response.message
                    })
                }
            },
            deleteProperty: async function() {
                var securityToken = this.$store.state.securityToken;
                await PropertyService.deleteProperty(this.indexRef, this.property.reference, securityToken).then((response) => {
                    this.$emit('updated')
                }, (error) => {
                    if (error.response.status === 409)
                        this.errorMessage = "This property is already used"
                    else if (error.response.status === 401)
                        this.$router.push('/admin/')
                })
            },
            onShow(evt) {
                this.getProperty(this.propertyRef)
                this.clearAllMessages();
            },
            clearAllMessages(){
                this.clearActionMessage()
                this.clearInfoMessage()
                this.clearErrorMessage()
            },
            clearActionMessage(){
                this.isDoingStuff = false;
            },
            clearInfoMessage(){
                this.info.show = false;
                this.info.message = "";
            },
            clearErrorMessage(){
                this.error.show = false;
                this.error.message = "";
                this.error.detail = ""
                this.nameError = false;
            },
            onHidden(evt) {
                this.clearAllMessages();
                this.$emit('close')
            },
            async getProperty(ref) {
                console.log("ref " + ref)
                await PropertyService.getProperty(this.indexRef, ref).then((response) => {
                    this.currentProperty = response.data;
                })
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }
    .hasError{
        input{
            border:darkred 1px solid;
        }
    }
    .doingStuff {
        opacity: .3;
    }

</style>
