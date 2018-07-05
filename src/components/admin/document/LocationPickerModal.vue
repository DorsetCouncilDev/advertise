<template>
  <b-modal v-model="showModal" @hidden="onHidden" @show="onShow" hide-footer title="Pick location">
      
      
  </b-modal>
</template>


<script>

    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import DocumentService from '../../../services/DocumentService'
    import ModalErrorMessage from '../../modal-error-message'
    import ModalInfoMessage from '../../modal-info-message'

    export default {

        name: 'LocationPickerModal',
        props: {
            show: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                showModal: false
            }
        },
         watch: {
            show: function() {
                this.showModal = this.show
            }
        },
        methods: {
            onShow(){
                    
            },
            onHidden(){
                
            }  
        } 
    }
    
</script>
    

<style scoped lang="scss">
   

    
</style>