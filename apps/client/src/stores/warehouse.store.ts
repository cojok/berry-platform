import { defineStore } from 'pinia';
import { instance } from '../services/axios.service';
import {
  createWarehouseSchema,
  IWarehouse,
  IWarehouseCreatePayload,
  IWarehouseUpdatePayload,
  updateWarehouseSchema,
} from '@berry/shared';
import { isAxiosError } from 'axios';
import router from '../app/index.route';

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
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          if (error.response?.data.statusCode === 401) {
            localStorage.removeItem('accessToken');
            await router.push('/login?redirectTo=warehouses');
          }
        }
      } finally {
        this.loading = false;
      }
    },
    async create(payload: IWarehouseCreatePayload): Promise<void> {
      try {
        this.loading = true;
        const validatedPayload = createWarehouseSchema.parse(payload);
        const response = await instance.post<IWarehouse>(
          'v1/warehouses',
          validatedPayload
        );
        this.warehouses.push(response.data);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.data.statusCode === 401) {
            localStorage.removeItem('accessToken');
            await router.push('/login?redirectTo=warehouses');
          }
        }
        throw new Error(`Error creating warehouse: ${error}`);
      } finally {
        this.loading = false;
      }
    },
    async update(id: string, payload: IWarehouseUpdatePayload): Promise<void> {
      try {
        this.loading = true;
        const validatedPayload = updateWarehouseSchema.parse(payload);
        const response = await instance.patch<IWarehouse>(
          `v1/warehouses/${id}`,
          validatedPayload
        );
        const index = this.warehouses.findIndex((w) => w.id === id);
        if (index !== -1) this.warehouses[index] = response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.data.statusCode === 401) {
            localStorage.removeItem('accessToken');
            await router.push('/login?redirectTo=warehouses');
          }
        }
        throw new Error(`Error updating warehouse: ${error}`);
      } finally {
        this.loading = false;
      }
    },
    async delete(id: string): Promise<void> {
      try {
        this.loading = true;
        await instance.delete<void>(`v1/warehouses/${id}`);
        this.warehouses = this.warehouses.filter((w) => w.id !== id);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.data.statusCode === 401) {
            localStorage.removeItem('accessToken');
            await router.push('/login?redirectTo=warehouses');
          }
        }
        throw new Error(`Error deleting warehouse: ${error}`);
      } finally {
        this.loading = false;
      }
    },
  },
  persist: true,
});
