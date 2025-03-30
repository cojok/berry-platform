import { RouteRecordRaw } from 'vue-router';

export const StockItemsRoutes: RouteRecordRaw[] = [
  {
    path: '/stock',
    name: 'StockItems',
    component: () => import('../views/WarehousesView.vue'),
    meta: { requiresAuth: true },
  },
];
