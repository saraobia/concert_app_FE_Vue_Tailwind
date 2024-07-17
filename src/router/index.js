import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Concert from '../views/Concert.vue';
import Prenotations from '../views/Prenotations.vue';
import Page404 from '../views/Page404.vue';

import { useAuth } from '@/composable/useAuth';

const { isAuthenticated } = useAuth();

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
    path: '/concert/:id',
    name: 'Concert',
    component: Concert,
    meta: { requiresAuth: true, layout: 'DefaultLayout' },
  },
  {
    path: '/prenotations',
    name: 'prenotations',
    component: Prenotations,
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

router.beforeEach((to, from, next) => {
  // Verifica se la route richiede autenticazione e se l'utente non è autenticato
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Reindirizza all pagina di login
    next('/login');
  } else {
    // Altrimenti procedi normalmente
    next();
  }
});

export default router;
