import {
  HTTP_STATUS_CODES,
  IStockItem,
  stockItemAPIEndpointsV1,
  StockItemCreatePayload,
  StockItemUpdatePayload,
} from '@berry/shared';
import { isAxiosError } from 'axios';
import { defineStore } from 'pinia';

import router from '../app/index.route';
import { instance } from '../services/axios.service';

export const useStockItemStore = defineStore('stock-item', {
  state: (): { stockItems: IStockItem[]; loading: boolean } => ({
    stockItems: [] as IStockItem[],
    loading: false,
  }),
  actions: {
    async fetchAll(): Promise<void> {
      this.loading = true;
      try {
        const response = await instance.get<IStockItem[]>(
          stockItemAPIEndpointsV1
        );
        this.stockItems = response.data;
      } catch (error: unknown) {
        if (
          isAxiosError(error) &&
          error.response?.data.statusCode === HTTP_STATUS_CODES.UNAUTHORIZED
        ) {
          localStorage.removeItem('accessToken');
          await router.push('/login?redirectTo=stock-items');
        }
      } finally {
        this.loading = false;
      }
    },
    async create(data: StockItemCreatePayload): Promise<void> {
      this.loading = true;
      try {
        const response = await instance.post<IStockItem>(
          stockItemAPIEndpointsV1,
          data
        );
        this.stockItems.push(response.data);
      } catch (error: unknown) {
        if (
          isAxiosError(error) &&
          error.response?.data.statusCode === HTTP_STATUS_CODES.UNAUTHORIZED
        ) {
          localStorage.removeItem('accessToken');
          await router.push('/login?redirectTo=stock-items');
        }
      } finally {
        this.loading = false;
      }
    },
    async update(data: StockItemUpdatePayload & { id: string }): Promise<void> {
      this.loading = true;
      try {
        const response = await instance.patch<IStockItem>(
          `${stockItemAPIEndpointsV1}/${data.id}`,
          data
        );
        const index = this.stockItems.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          this.stockItems[index] = response.data;
        }
      } catch (error: unknown) {
        console.error('Update error:', error); // Add logging
        if (
          isAxiosError(error) &&
          error.response?.data.statusCode === HTTP_STATUS_CODES.UNAUTHORIZED
        ) {
          localStorage.removeItem('accessToken');
          await router.push('/login?redirectTo=stock-items');
        }
        // Re-throw error so form can handle it
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getStockItems(): IStockItem[] {
      return this.stockItems;
    },
  },
  persist: true,
});
