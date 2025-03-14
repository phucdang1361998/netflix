import { createRouter, createWebHistory } from 'vue-router';
import indexVue from '@/pages/index.vue';

const routes = [
  { path: '/', redirect: '/list' },
  { path: '/list', component: indexVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
