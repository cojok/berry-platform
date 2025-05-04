import { RouteRecordRaw } from 'vue-router';

export const StockItemsRoutes: RouteRecordRaw[] = [
  {
    path: '/stock-items',
    name: 'StockItems',
    component: () => import('../views/StockItemsView.vue'),
    meta: { requiresAuth: true },
  },
];
