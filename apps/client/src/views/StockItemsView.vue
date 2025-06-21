<template>
  <div
    class="max-w-6xl mx-auto p-6 bg-blackBerry/60 border border-neutralGrayBerry/40 backdrop-blur-md rounded-xl shadow-xl shadow-blackBerry/40 min-h-[70vh]"
  >
    <h1 class="text-2xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
      Stock Items
    </h1>

    <!-- Search & Filters -->
    <StockItemFilters @search="handleSearch" @filter="handleFilter" />

    <!-- Warehouse List -->
    <StockItemList
      :stockItems="stockItems"
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
        Add Stock Item
      </button>
    </div>

    <!-- Warehouse Form Modal -->
    <StockItemForm
      v-if="showForm"
      :mode="formMode"
      :stockItem="selectedStockItem"
      @submitted="handleFormSubmit"
      @close="showForm = false"
    />

    <!-- Warehouse Detail Modal -->
    <!--    <StockItemDetail-->
    <!--      v-if="showDetail && selectedStockItem"-->
    <!--      :stockItem="selectedStockItem"-->
    <!--      @close="showDetail = false"-->
    <!--    />-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/solid';

import StockItemList from '../modules/stock-items/StockItemList.vue';
import StockItemForm from '../modules/stock-items/StockItemForm.vue';
// import StockItemDetail from '../modules/stock-items/StockItemDetail.vue';
import { IStockItem } from '@berry/shared';
import StockItemFilters from '../modules/stock-items/StockItemFilters.vue';
import { useStockItemStore } from '../stores/stock-item.store';

const store = useStockItemStore();
const stockItems = ref<IStockItem[]>([]);
const showForm = ref<boolean>(false);
const showDetail = ref<boolean>(false);
const selectedStockItem = ref<IStockItem | undefined>();
const formMode = ref<'create' | 'edit'>('create');
const mockStockItems = [
  {
    id: '4836a375-f438-450e-8c04-f4b282d34af6',
    tenantId: '7b639e1c-dad4-4ff9-99d5-257ddef84fb3',
    companyId: 'ef77638c-f01f-496a-bbe9-aef9115c76de',
    name: 'ahaha',
    description: 'this is the description',
    sku: '1743852763',
    quantity: 123,
    minimumQuantity: 1234567,
    isDeleted: false,
    createdAt: '2025-04-05T11:32:43.214Z',
    updatedAt: '2025-04-05T11:32:43.214Z',
  },
  {
    id: '5736b375-a438-450e-8c04-f4b282d35bc7',
    tenantId: '7b639e1c-dad4-4ff9-99d5-257ddef84fb3',
    companyId: 'ef77638c-f01f-496a-bbe9-aef9115c76de',
    name: 'item1',
    description: 'first additional item',
    sku: '1743852764',
    quantity: 50,
    minimumQuantity: 500,
    isDeleted: false,
    createdAt: '2025-05-10T11:32:43.214Z',
    updatedAt: '2025-05-10T11:32:43.214Z',
  },
  {
    id: '6736c375-b539-460e-8d04-f5b382d46cd8',
    tenantId: '7b639e1c-dad4-4ff9-99d5-257ddef84fb3',
    companyId: 'ef77638c-f01f-496a-bbe9-aef9115c76de',
    name: 'item2',
    description: 'second additional item',
    sku: '1743852765',
    quantity: 75,
    minimumQuantity: 800,
    isDeleted: false,
    createdAt: '2025-05-15T11:32:43.214Z',
    updatedAt: '2025-05-15T11:32:43.214Z',
  },
  {
    id: '7736d375-c640-470e-9e05-f6b482d57de9',
    tenantId: '7b639e1c-dad4-4ff9-99d5-257ddef84fb3',
    companyId: 'ef77638c-f01f-496a-bbe9-aef9115c76de',
    name: 'item3',
    description: 'third additional item',
    sku: '1743852766',
    quantity: 100,
    minimumQuantity: 1000,
    isDeleted: false,
    createdAt: '2025-05-20T11:32:43.214Z',
    updatedAt: '2025-05-20T11:32:43.214Z',
  },
  {
    id: '8736e375-d741-480e-af06-f7b582d68efa',
    tenantId: '7b639e1c-dad4-4ff9-99d5-257ddef84fb3',
    companyId: 'ef77638c-f01f-496a-bbe9-aef9115c76de',
    name: 'item4',
    description: 'fourth additional item',
    sku: '1743852767',
    quantity: 200,
    minimumQuantity: 2000,
    isDeleted: false,
    createdAt: '2025-05-25T11:32:43.214Z',
    updatedAt: '2025-05-25T11:32:43.214Z',
  },
  {
    id: '9736f375-e842-490e-bf07-f8b682d79fgb',
    tenantId: '7b639e1c-dad4-4ff9-99d5-257ddef84fb3',
    companyId: 'ef77638c-f01f-496a-bbe9-aef9115c76de',
    name: 'item5',
    description: 'fifth additional item',
    sku: '1743852768',
    quantity: 300,
    minimumQuantity: 3000,
    isDeleted: false,
    createdAt: '2025-05-30T11:32:43.214Z',
    updatedAt: '2025-05-30T11:32:43.214Z',
  },
];

const searchQuery = ref('');
const selectedStatus = ref<boolean | undefined>(undefined);

onMounted(() => {
  fetchStockItems();
});

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handleFilter = (status: boolean | undefined) => {
  selectedStatus.value = status;
};

const fetchStockItems = async () => {
  await store.fetchAll();
  stockItems.value = store.getStockItems;
};

const showAddWarehouseModal = () => {
  selectedStockItem.value = undefined;
  formMode.value = 'create';
  showForm.value = true;
};

const viewWarehouse = (stockItem: IStockItem) => {
  selectedStockItem.value = stockItem;
  showDetail.value = true;
};

const editWarehouse = (stockItem: IStockItem) => {
  selectedStockItem.value = stockItem;
  formMode.value = 'edit';
  showForm.value = true;
};

const deleteWarehouse = async (id: string) => {
  // await store.delete(id);
  alert('delete');
  await fetchStockItems(); // Refresh the list after deletion
};

const handleFormSubmit = async (stockItem: IStockItem) => {
  if (formMode.value === 'create') {
    alert('create');
    // await store.create(stockItem);
  } else if (selectedStockItem.value) {
    alert('edit');
    // await store.update(selectedWarehouse.value.id, stockItem);
  }
  showForm.value = false;
  await fetchStockItems(); // Refresh the list after update
};
</script>
