import { createRouter, createWebHistory } from 'vue-router';
import { dashboardRoutes } from '../modules/dashboard/dasboard.route';
import AppLayout from '../components/layouts/AppLayout.vue';
import {
  AuthRoutes,
  ProfileRoutes,
  StockItemsRoutes,
  UsersRoutes,
  WarehouseRoutes,
} from '../router';
import { useAuthStore } from '../stores/auth.store';

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
  const authStore = useAuthStore();

  if (to.meta.requiresAuth === true && !authStore.isAuthenticated) {
    // Redirect unauthenticated users to login
    next('/login');
  } else {
    next();
  }
});

export default router;
