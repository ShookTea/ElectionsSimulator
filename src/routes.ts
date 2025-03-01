import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const redirects: Record<string, string> = {
  // Redirects to a country, in case no country was passed
  '/': '/pl',
  // Redirects to a main page for a country, in case no page was passed
  '/pl': '/pl/sejm',
  // Redirects to a most recent year, in case no year was passed
  '/pl/sejm': '/pl/sejm/2023',
};

const routes: RouteRecordRaw[] = [];

// Load redirects
for (const [path, redirect] of Object.entries(redirects)) {
  routes.push({ path, redirect });
}

// Load components specific for the elections
routes.push({
  path: '/pl/sejm/:year',
  component: () => import('./pages/pl/SejmPage.vue'),
  props: true,
});

// Redirect to a main page in case of a not found page
routes.push({
  path: '/:notFoundMatch(.*)',
  redirect: '/',
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
