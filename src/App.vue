<template>
   <div>
      <div class="container">
        <AdHeader></AdHeader>

        <router-view></router-view>
      </div>
      <AdFooter></AdFooter>
  </div>
</template>

<script>
    import Vue from 'vue';
    import router from './router';
    import { sync } from 'vuex-router-sync';
    import store from './store';
    import SearchService from './services/SearchService';
    import AdHeader from './components/AdHeader';
    import AdFooter from './components/AdFooter';
    import SiteTopNav from './components/SiteTopNav';


    Vue.component('SiteTopNav',SiteTopNav);

    sync(store, router)
    setIndex();

    async function setIndex(){
      await store.dispatch("setIndex");
    }

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
