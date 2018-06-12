

<template>
   <div class="mt-3 mb-5">
       <nav>
       <ul class="nav nav-pills">
            <li class="nav-item">
                <router-link class="nav-link active" to="/">Home
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/indexes/create">Create index</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/indexes">Index list</router-link>
            </li>
            
        </ul>
           </nav>
    </div>
</template>


<script>
    import Vue from 'vue';
  
    export default {
        name: 'AdminNav'
    }
</script>



<style scoped lang="scss">
</style>
