<template>
  <div class="p-6">
    <!-- Loading Indicator -->
    <div v-if="!stockItems.length" class="text-center text-neutralGrayBerry">
      Loading...
      <pre>
        {{ stockItems }}
      </pre>
    </div>
    <table
      v-else
      class="min-w-full table-auto bg-neutralGrayBerry/20 rounded-lg overflow-hidden text-offWhiteBerry text-sm font-body"
    >
      <thead
        class="bg-neutralGrayBerry/30 text-left uppercase tracking-wider text-xs font-semibold"
      >
        <tr>
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">SKU</th>
          <th class="px-4 py-3">Description</th>
          <th class="px-4 py-3">Quantity</th>
          <th class="px-4 py-3">Minimum Quantity</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="stockItem in stockItems"
          :key="stockItem.id"
          class="border-t border-neutralGrayBerry/30 even:bg-neutralGrayBerry/10 hover:bg-neutralGrayBerry/40 transition cursor-pointer"
        >
          <!-- Name -->
          <td class="px-4 py-3">{{ stockItem.name }}</td>

          <!-- SKU -->
          <td class="px-4 py-3">
            {{ stockItem.sku || 'N/A' }}
          </td>

          <!-- Description -->
          <td class="px-4 py-3">{{ stockItem.description || 'N/A' }}</td>

          <!-- Quantity -->
          <td class="px-4 py-3">{{ stockItem.quantity || 0 }}</td>

          <!-- Minimum Quantity -->
          <td class="px-4 py-3">
            <span
              :class="{
                'text-successBerry font-medium':
                  stockItem.quantity > (stockItem.minimumQuantity ?? 0),
                'text-dangerBerry font-medium':
                  stockItem.quantity <= (stockItem.minimumQuantity ?? 0),
              }"
            >
              {{ stockItem.minimumQuantity || 0 }}
            </span>
          </td>

          <!-- Actions -->
          <td class="px-4 py-3 flex space-x-2">
            <button
              @click="$emit('edit', stockItem)"
              class="px-3 py-1.5 cursor-pointer text-offWhiteBerry text-xs font-medium rounded-md hover:bg-accentOrangeBerry transition focus:outline-none focus:ring-2 focus:ring-accentOrangeBerry"
            >
              Edit
            </button>
            <button
              @click="$emit('view', stockItem)"
              class="px-3 py-1.5 cursor-pointer text-offWhiteBerry text-xs font-medium rounded-md hover:bg-accentOrangeBerry transition focus:outline-none focus:ring-2 focus:ring-accentOrangeBerry"
            >
              View
            </button>
            <button
              @click="$emit('delete', stockItem.id)"
              class="px-3 py-1.5 cursor-pointer bg-dangerBerry text-offWhiteBerry text-xs font-medium rounded-md hover:bg-red-400 transition focus:outline-none focus:ring-2 focus:ring-dangerBerry"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { IStockItem } from '@berry/shared';

defineProps<{
  stockItems: IStockItem[];
}>();
</script>
