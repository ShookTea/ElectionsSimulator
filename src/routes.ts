import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/pl/sejm/:year',
    component: () => import('./components/pl/Sejm.vue'),
    props: true,
  },
  // {
    // path: '/:notFoundMatch(.*)',
    // redirect: '/',
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
