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
    // Fetch all warehouses
    async fetchAll(): Promise<void> {
      this.loading = true;
      try {
        const response = await instance.get<IWarehouse[]>('v1/warehouses');
        this.warehouses = response.data;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          if (error.response?.data.statusCode === 401) {
            console.log(error.response?.data);
            localStorage.removeItem('accessToken');
            await router.push('/login');
          }
        }
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Create a new warehouse
    async create(payload: IWarehouseCreatePayload): Promise<void> {
      try {
        // Validate the payload using Zod
        const validatedPayload = createWarehouseSchema.parse(payload);

        const response = await instance.post<IWarehouse>(
          'v1/warehouses',
          validatedPayload
        );
        this.warehouses.push(response.data);
      } catch (error) {
        console.error('Error creating warehouse:', error);
      }
    },

    // Update an existing warehouse
    async update(id: string, payload: IWarehouseUpdatePayload): Promise<void> {
      try {
        // Validate the payload using Zod
        const validatedPayload = updateWarehouseSchema.parse(payload);

        const response = await instance.patch<IWarehouse>(
          `v1/warehouses/${id}`,
          validatedPayload
        );
        const index = this.warehouses.findIndex((w) => w.id === id);
        if (index !== -1) this.warehouses[index] = response.data;
      } catch (error) {
        console.error('Error updating warehouse:', error);
      }
    },

    // Delete a warehouse
    async delete(id: string): Promise<void> {
      await instance.delete<void>(`v1/warehouses/${id}`);
      this.warehouses = this.warehouses.filter((w) => w.id !== id);
    },
  },
  persist: true,
});
