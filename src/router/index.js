import Vue from 'vue'
import routes from './routes';
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Meta from 'vue-meta'
 

Vue.use(Meta)
  const router = new VueRouter({
        mode: 'history',
        routes,
        scrollBehavior (to, from, savedPosition) {
          return { x: 0, y: 0 }
        }
    });



export default router;