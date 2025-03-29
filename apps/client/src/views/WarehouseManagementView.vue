<template>
  <div>
    <h1 class="text-3xl font-heading text-offWhiteBerry mb-6">Warehouses</h1>
    <WarehouseList
      :warehouses="warehouses"
      @view="viewWarehouse"
      @edit="editWarehouse"
      @delete="deleteWarehouse"
    />
    <WarehouseForm
      v-if="showForm"
      :mode="formMode"
      :warehouse="selectedWarehouse"
      @submitted="handleFormSubmit"
      @close="showForm = false"
    />
    <WarehouseDetail
      v-if="showDetail"
      :warehouse="selectedWarehouse"
      @close="showDetail = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWarehouseStore } from '@/stores/warehouse.store';

import WarehouseList from '@/modules/warehouses/WarehouseList.vue';
import WarehouseForm from '@/modules/warehouses/WarehouseForm.vue';
import WarehouseDetail from '@/modules/warehouses/WarehouseDetail.vue';

const store = useWarehouseStore();
const warehouses = ref([]);
const showForm = ref(false);
const showDetail = ref(false);
const selectedWarehouse = ref(null);
const formMode = ref<'create' | 'edit'>('create');

onMounted(() => {
  store.fetchAll().then(() => {
    warehouses.value = store.warehouses;
  });
});

const viewWarehouse = (warehouse) => {
  selectedWarehouse.value = warehouse;
  showDetail.value = true;
};
const editWarehouse = (warehouse) => {
  selectedWarehouse.value = warehouse;
  formMode.value = 'edit';
  showForm.value = true;
};
const deleteWarehouse = (id) => {
  store.delete(id);
};
const handleFormSubmit = (warehouse) => {
  if (formMode.value === 'create') {
    store.create(warehouse);
  } else {
    store.update(warehouse.id, warehouse);
  }
  showForm.value = false;
};
</script>