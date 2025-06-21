import { createRouter, createWebHistory } from 'vue-router';

import AppLayout from '../components/layouts/AppLayout.vue';
import { dashboardRoutes } from '../modules/dashboard/dasboard.route';
import {
  AuthRoutes,
  ProfileRoutes,
  StockItemsRoutes,
  UsersRoutes,
  WarehouseRoutes,
} from '../router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      redirect: '/profile',
      children: [
        ...AuthRoutes,
        ...dashboardRoutes,
        ...ProfileRoutes,
        ...UsersRoutes,
        ...WarehouseRoutes,
        ...StockItemsRoutes,
        {
          path: '/:catchAll(.*)',
          component: () => import('../views/NotFoundView.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken');

  if (
    to.meta.requiresAuth === true &&
    (token === null || token === undefined || token.trim() === '')
  ) {
    // Redirect unauthenticated users to login
    next('/login');
  }
  next();
});

export default router;
