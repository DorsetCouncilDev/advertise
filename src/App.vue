<template>
   <div>


        <div class="container">
        <AdHeader></AdHeader>

             <router-view></router-view>

        </div>
       <AdFooter>
    </AdFooter>
    </div>
</template>

<script>
    import AdHeader from './components/AdHeader';
    import AdFooter from './components/AdFooter';
     import SiteTopNav from './components/SiteTopNav';
    import store from './store'
    import router from './router'

    import Vue from 'vue';
    import { sync } from 'vuex-router-sync'
    Vue.component('SiteTopNav',SiteTopNav);
    sync(store, router)


setIndex();

async function setIndex(){
await store.dispatch("setIndex");
}




    import SearchService from './services/SearchService'

    export default {
        name: 'App',
        store,
        router,
        components: {
            AdHeader,AdFooter
        }
    }



</script>

<style>


</style>
