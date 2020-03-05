// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import './assets/scss/_colours.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'aos/dist/aos.css'
import './assets/fonts/dorsetforyou-eot.eot'
import './assets/fonts/dorsetforyou-ttf.ttf'
import './assets/fonts/dorsetforyou-woff.woff'
import Meta from 'vue-meta';
import { VueReCaptcha } from 'vue-recaptcha-v3';
Vue.use(VueReCaptcha, { siteKey: '6LfEWXgUAAAAAIbGKOj88SgEapHW3BmmcDk2EB8P',
                            loaderOptions: { autoHideBadge: true }
                          })
Vue.config.productionTip = false;

import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.use(Meta)
var app = new Vue({
  el: '#app',
    components: { App  },
   template : '<App/>',
   methods: {
     async recaptcha(){
      await this.$recaptchaLoaded();
      var recaptchaTextarea = document.getElementById("g-recaptcha-response-100000");
      recaptchaTextarea.setAttribute("aria-label","do not use");

     }
   },
   mounted(){
     this.recaptcha();
   }
})
const meta = app.$meta()
