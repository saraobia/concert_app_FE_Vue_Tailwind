import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Page from '../views/Page.vue';
import Page404 from '../views/Page404.vue';

import NoHeaderFooterLayout from '../layouts/NoHeaderFooterLayout.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { layout: 'NoHeaderFooterLayout' }, // Layout per la rotta principale
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true, layout: 'DefaultLayout' },
  },
  {
    path: '/page',
    name: 'page',
    component: Page,
    meta: { requiresAuth: true, layout: 'DefaultLayout' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: Page404,
    meta: { layout: 'NoHeaderFooterLayout' }, // Layout per questa rotta
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
