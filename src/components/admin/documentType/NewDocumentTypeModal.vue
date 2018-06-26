<template>
 <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Create a new asset type">
<div class="ad-modal-body"> 
            <div class="form-group" :class="{'hasError':errorMessages.name}">    
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="newDocumentType.name">
                <div v-if="errorMessages.name" class="text-danger">{{errorMessages.name}}</div>
            </div>
           
            <div class="form-group">    
                <label for="longText">Long text</label>
                <input class="form-control" type="text" id="longText" v-model="newDocumentType.longText">
            </div>
    <div class="form-group">
    <label>Choose type text colour 
    <input type="color" v-model="newDocumentType.colour"></label>
               
    </div>

    </div>
        <div id="mfooter"  v-bind:class="{'doingStuff':isDoingStuff}">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="close"> Close </button>
            <button type="button" class="btn btn-success pull-right" data-dismiss="modal" @click="createDocumentType">Create</button>
             <ModalErrorMessage :error="error"></ModalErrorMessage>
            <ModalInfoMessage :info="info"></ModalInfoMessage>
        </div>
    </b-modal>
</template>


<script>
    import DocumentTypeService from '../../../services/DocumentTypeService'
    import ModalTemplate from '../ModalTemplate'
    import Verte from 'verte/dist/verte.js';
    import ModalErrorMessage from '../../modal-error-message'
    import ModalInfoMessage from '../../modal-info-message'
    export default {
        name: 'NewDocumentTypeModal',
        props: {
            show: {
                type: Boolean,
                required: true
            },
            indexRef: {
                type: String,
                required: true
            }
        },
        components: {
            ModalErrorMessage,
            ModalInfoMessage
        },
        watch: {
            show() {
                this.showModal = this.show;
            }
        },
        data() {
            return {
                newDocumentType: {
                    name: "",
                    longText: "",
                    colour: ""
                },
                showModal: false,
                hex: 'hex',
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
                    show: false
                },
                errorMessages: {
                    name: ""
                }
            }
        },

        methods: {
            colorPicked: function(value) {
                this.newDocumentType.color = value;
            },
            close: function() {
                this.$emit('close');
            },
            createDocumentType: async function() {
                this.clearInfoMessage()
                this.clearErrorMessage()
                this.isDoingStuff = true;

                if (this.newDocumentType.name == null || this.newDocumentType.name == "") {
                    this.clearActionMessage();
                    this.error.show = true;
                    this.error.message = "Name is required. ";
                    this.error.detail = "";
                    this.errorMessages.name = "Name is required"
                } else {
                    var newTypeProperties = {
                        "name": this.newDocumentType.name,
                        "longText": this.newDocumentType.longText,
                        "colour": this.newDocumentType.colour
                    }
                    var securityToken = this.$store.state.securityToken;
                    await DocumentTypeService.create(this.indexRef, securityToken, newTypeProperties).then((response) => {
                            this.newDocumentType.name = "";
                            this.newDocumentType.longText = "";
                            this.$emit('created', response.data)
                        })
                }
            },
            onShow(evt) {

            },
            onHidden(evt) {
                this.newDocumentType.name = "";
                this.newDocumentType.longText = "";
                this.$emit('close')
            },
            clearAllMessages() {
                this.clearActionMessage()
                this.clearInfoMessage()
                this.clearErrorMessage()
            },
            clearActionMessage() {
                this.isDoingStuff = false;
            },
            clearInfoMessage() {
                this.info.show = false;
                this.info.message = "";
            },
            clearErrorMessage() {
                this.error.show = false;
                this.error.message = "";
                this.error.detail = "";
                this.nameError = false;
                this.errorMessages.name = "";
                this.errorMessages.type = "";
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }

</style>
