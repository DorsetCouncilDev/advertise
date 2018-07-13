<template>

  <b-modal v-model="showModal" @hidden="onHidden" hide-footer title="Delete Location">
     <div class="ad-modal-body"> 
         <p>{{location.name}}</p>
    <p>Are you sure you want to delete this location?</p>
    </div>
       <div id="mfooter">
            <button  class="btn btn-outline-secondary">No, Cancel &amp; close</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteLocation" >Yes, Delete this location</button>
    </div>
    </b-modal>
</template>
<script>
    import _ from 'lodash'
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    
    export default {

        name: 'ViewDocumentModal',
        props: {
            show: {
                type: Boolean,
                required: true
            },
            location: {
                type:Object,
                required: true
            }
        },
        data(){
            return {
                showModal: false
            }
        },
        watch: {
            show: function() {
                this.showModal = this.show
            }
        },
        methods:{
            onHidden(){
                this.$emit("close")
            },
            deleteLocation(){
                this.$emit("deleteLocation",this.location.reference)
            }
        }
    }

</script>