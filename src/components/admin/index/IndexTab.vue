<template>
   <div>
        <h2>{{index.name}}</h2>
        <button type="button" class="btn btn-primary" @click="openViewIndexModal">Edit index</button>
        <ViewIndexModal :show="showViewIndexModal" :index="index" @close="closeViewIndexModal" @updated="onUpdated" ></ViewIndexModal>
       
       
    </div>
</template>


<script>
    import IndexService from '../../../services/IndexService'
    import ViewIndexModal from './ViewIndexModal'
    import NewIndexModal from './NewIndexModal'
    
    export default {

        name: 'IndexTab',
        components: {ViewIndexModal,NewIndexModal},
        props: {
            index: {
                type:Object,
                required:true
            } 
        },
        data() {
            return{
                showViewIndexModal: false,
                showNewIndexModal: false
            }
        },
        methods: {
            openViewIndexModal: function(){
                this.showViewIndexModal = true;
            },
            openNewIndexModal: function(){
                this.showNewIndexModal = true;
            },
            closeViewIndexModal: function(){
                this.showViewIndexModal = false;
            },
            onUpdated: function(ref){
                this.showViewIndexModal = false;
                this.$emit("updated",ref)
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4{
        font-size:32px;
    }

</style>
