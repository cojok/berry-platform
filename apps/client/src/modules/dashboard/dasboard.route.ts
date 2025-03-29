import { RouteRecordRaw } from 'vue-router';

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./DashboardView.vue'),
    meta: { requiresAuth: true },
  },
];
