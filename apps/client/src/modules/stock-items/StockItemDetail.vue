<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-blackBerry/80 backdrop-blur-md"
  >
    <div
      class="bg-blackBerry/60 border border-neutralGrayBerry/40 p-6 rounded-xl shadow-lg w-96"
    >
      <h2 class="text-xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
        Stock Item Details
      </h2>
      <div class="space-y-2">
        <div class="space-y-2">
          <p><strong>Name:</strong> {{ stockItem.name }}</p>
          <p><strong>Description:</strong> {{ stockItem.description }}</p>
          <p><strong>SKU:</strong> {{ stockItem.sku }}</p>
          <p><strong>Quantity:</strong> {{ stockItem.quantity }}</p>
          <p>
            <strong>Minimum Quantity:</strong>
            {{ stockItem.minimumQuantity || 'N/A' }}
          </p>
          <p>
            <strong>Created:</strong>
            {{ getFormatedDate(stockItem.createdAt, 'dd.mm.yyyy') }}
          </p>
          <p>
            <strong>Updated:</strong>
            {{ getFormatedDate(stockItem.updatedAt, 'dd.mm.yyyy') }}
          </p>
        </div>
      </div>
      <button
        @click="$emit('close')"
        class="mt-4 px-4 py-2 bg-neutralGrayBerry/60 text-white rounded-lg hover:bg-neutralGrayBerry/50 transition cursor-pointer"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StockItemData } from '@berry/shared';
import { useDateFormat } from '../../composables/useDateFormat';

defineProps<{ stockItem: StockItemData }>();
defineEmits(['close']);

const getFormatedDate = (date: Date, format: string) =>
  useDateFormat(date, format).formattedDate;
</script>
