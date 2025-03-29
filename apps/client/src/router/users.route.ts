import { RouteRecordRaw } from 'vue-router';

export const UsersRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
