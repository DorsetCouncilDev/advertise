import Vue from 'vue'
import routes from './routes';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

  const router = new VueRouter({
        mode: 'history',
        routes
    });

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;