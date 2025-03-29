import { defineStore } from 'pinia';
import instance from '../services/axios.service';
import { IWarehouse } from '@berry/shared';

export const useWarehouseStore = defineStore('warehouses', {
  state: (): { warehouses: IWarehouse[]; loading: boolean } => ({
    warehouses: [] as IWarehouse[],
    loading: false,
  }),
  actions: {
    async fetchAll(): Promise<void> {
      this.loading = true;
      try {
        const response = await instance.get<IWarehouse[]>('v1/warehouses');
        this.warehouses = response.data;
      } finally {
        this.loading = false;
      }
    },
    async create(payload: IWarehouse): Promise<void> {
      const response = await instance.post<IWarehouse>(
        'v1/warehouses',
        payload
      );
      this.warehouses.push(response.data);
    },
    async update(id: string, payload: Partial<IWarehouse>): Promise<void> {
      const response = await instance.patch<IWarehouse>(
        `v1/warehouses/${id}`,
        payload
      );
      const index = this.warehouses.findIndex((w) => w.id === id);
      if (index !== -1) this.warehouses[index] = response.data;
    },
    async delete(id: string): Promise<void> {
      await instance.delete<void>(`v1/warehouses/${id}`);
      this.warehouses = this.warehouses.filter((w) => w.id !== id);
    },
  },
  persist: true,
});
