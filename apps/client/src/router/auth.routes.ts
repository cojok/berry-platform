import { RouteRecordRaw } from 'vue-router';

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/register',
    component: () => import('../views/RegisterView.vue'),
    meta: { title: 'Register' },
  },
  {
    path: '/forgot-password',
    component: () => import('../views/ForgottenPasswordView.vue'),
    meta: { title: 'Forgot Password' },
  },
];
