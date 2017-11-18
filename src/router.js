import VueRouter from 'vue-router';

import Home from './pages/Home.vue';
import Elements from './pages/Elements.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/test', component: Elements }
  ]
});

export default router;