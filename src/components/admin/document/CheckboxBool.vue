<template>
          <div class="form-group">
               {{property.publishedValue}}
                <div class="multiple-choice">
                 
                    <input type="checkbox" class="form-control" :id="property.propertyReference"  :value="property.publishedValue | convertBoolean" @input="property.publishedValue = !property.publishedValue">
                    <label  :for="property.propertyReference" :title="property.longText">{{property.propertyName}}</label>
                </div>
        
    </div>

</template>


<script>
    import _ from 'lodash'
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import DocumentTypeService from '../../../services/DocumentTypeService'
    import DocumentService from '../../../services/DocumentService'
    import Location from './Location'

    export default {

        name: 'ViewDocumentModal',
        props: {
            val: {
                type: String,
                required: true
            },
            ref: {
                type:String,
                required:true
            },
            labelName: {
                type:String,
                required:true
            }
        }
    }
     

</script>

<style scoped lang="scss">
 

</style>
