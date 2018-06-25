// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';

import App from './App';
import jquery from 'jquery';
import BootstrapVue from 'bootstrap-vue'

import './assets/scss/_colours.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'aos/dist/aos.css'
import './assets/fonts/dorsetforyou-eot.eot'
import './assets/fonts/dorsetforyou-ttf.ttf'
import './assets/fonts/dorsetforyou-woff.woff'


Vue.config.productionTip = false

import VueResource from 'vue-resource';
Vue.use(VueResource);



new Vue({

  el: '#app',
    components: { App  },
   template : '<App/>' 
})