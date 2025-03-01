import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/pl/sejm/2023',
  },
  {
    path: '/pl/sejm/:year',
    component: () => import('./pages/pl/SejmPage.vue'),
    props: true,
  },
  {
    path: '/:notFoundMatch(.*)',
    redirect: '/',
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
