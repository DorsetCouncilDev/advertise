<template>
    <div>
        <h2 class="display-4">Properties</h2>
        <b-list-group>
            <b-list-group-item :button="true" v-for="p in properties" @click="openPropertyViewModal(p)" :key="p.id">{{p.name}}</b-list-group-item>
        </b-list-group>
        <button class="btn btn-primary mt-5" @click="openNewPropertyModal" >Create new property</button>
       
        <ViewPropertyModal :indexRef="indexRef" :show="showViewPropertyModal" :property="currentProperty" @close="closeViewPropertyModal" @updated="onUpdate" ></ViewPropertyModal>
        <NewPropertyModal :indexRef="indexRef" :show="showNewPropertyModal" v-on:created="onCreated" @close="closeNewPropertyModal"></NewPropertyModal>
    </div>
</template>


<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    import ViewPropertyModal from './ViewPropertyModal'
    import NewPropertyModal from './NewPropertyModal'

    export default {

        name: 'PropertiesTab',
        components: {
            ViewPropertyModal,
            NewPropertyModal
        },
        props: {
            indexRef: {
                type: String,
                required: true
            },
            properties: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                currentProperty: {},
                showViewPropertyModal: false,
                showNewPropertyModal: false
            }
        },

        methods: {
            closeNewPropertyModal: function(){

                this.showNewPropertyModal = false
            },
            closeViewPropertyModal: function(){
                this.showViewPropertyModal = false
            },
            openNewPropertyModal: function(){
                this.showNewPropertyModal = true
            },
            openPropertyViewModal: function(property) {
                this.showViewPropertyModal = true
                this.currentProperty = property
               
            },
            onUpdate: function(property) {
                this.showViewPropertyModal = false
                this.currentProperty = {}      
                this.$emit('updated')
            },
       
            onCreated: function() {
                this.showNewPropertyModal = false
                this.$emit('updated');
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4 {
        font-size: 32px;
    }

</style>
