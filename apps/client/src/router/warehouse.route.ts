import { RouteRecordRaw } from 'vue-router';

export const warehouseRoutes: RouteRecordRaw[] = [
  {
    path: '/warehouse',
    name: 'Warehouses',
    component: () => import('../views/WarehousesView.vue'),
    meta: { requiresAuth: true },
  },
];
