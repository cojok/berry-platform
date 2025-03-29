<template>
  <div
    class="max-w-6xl mx-auto p-6 bg-blackBerry/60 border border-neutralGrayBerry/40 backdrop-blur-md rounded-xl shadow-xl shadow-blackBerry/40 min-h-[70vh]"
  >
    <h1 class="text-2xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
      Warehouses
    </h1>

    <!-- Search & Filters (can be implemented later) -->
    <!-- <WarehouseFilters @search="handleSearch" @filter="handleFilter" /> -->

    <!-- Warehouse List -->
    <WarehouseList
      :warehouses="warehouses"
      @view="viewWarehouse"
      @edit="editWarehouse"
      @delete="deleteWarehouse"
    />

    <!-- Add Warehouse Button -->
    <div class="mt-4">
      <button
        @click="showAddWarehouseModal"
        class="flex justify-around gap-2 px-4 py-2 bg-accentOrangeBerry text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition-all cursor-pointer"
      >
        <PlusIcon class="w-6 h-6 text-offWhiteBerry/80 inline" />
        Add Warehouse
      </button>
    </div>

    <!-- Warehouse Form Modal -->
    <WarehouseForm
      v-if="showForm"
      :mode="formMode"
      :warehouse="selectedWarehouse"
      @submitted="handleFormSubmit"
      @close="showForm = false"
    />

    <!-- Warehouse Detail Modal -->
    <WarehouseDetail
      v-if="showDetail"
      :warehouse="selectedWarehouse"
      @close="showDetail = false"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useWarehouseStore } from '../stores/warehouse.store';

import WarehouseList from '../modules/warehouses/WarehouseList.vue';
import WarehouseForm from '../modules/warehouses/WarehouseForm.vue';
import WarehouseDetail from '../modules/warehouses/WarehouseDetail.vue';
import { IWarehouse } from '@berry/shared';

const store = useWarehouseStore();
const warehouses = ref<IWarehouse[]>([]);
const showForm = ref<boolean>(false);
const showDetail = ref<boolean>(false);
const selectedWarehouse = ref<IWarehouse | undefined>();
const formMode = ref<'create' | 'edit'>('create');

onMounted(() => {
  fetchWarehouses();
});

const fetchWarehouses = async () => {
  await store.fetchAll();
  warehouses.value = store.warehouses;
};

const showAddWarehouseModal = () => {
  selectedWarehouse.value = undefined;
  formMode.value = 'create';
  showForm.value = true;
};

const viewWarehouse = (warehouse: IWarehouse) => {
  selectedWarehouse.value = warehouse;
  showDetail.value = true;
};

const editWarehouse = (warehouse: IWarehouse) => {
  selectedWarehouse.value = warehouse;
  formMode.value = 'edit';
  showForm.value = true;
};

const deleteWarehouse = async (id: string) => {
  await store.delete(id);
  fetchWarehouses(); // Refresh the list after deletion
};

const handleFormSubmit = async (warehouse: IWarehouse) => {
  if (formMode.value === 'create') {
    await store.create(warehouse);
  } else if (selectedWarehouse.value) {
    await store.update(selectedWarehouse.value.id, warehouse);
  }
  showForm.value = false;
  fetchWarehouses(); // Refresh the list after update
};
</script>
