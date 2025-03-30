<template>
  <div class="p-6">
    <!-- Loading Indicator -->
    <div v-if="!warehouses.length" class="text-center text-neutralGrayBerry">
      Loading...
      <pre>
        {{ warehouses }}
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
          <th class="px-4 py-3">Location</th>
          <th class="px-4 py-3">Capacity</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="warehouse in warehouses"
          :key="warehouse.id"
          class="border-t border-neutralGrayBerry/30 even:bg-neutralGrayBerry/10 hover:bg-neutralGrayBerry/40 transition"
        >
          <!-- Name -->
          <td class="px-4 py-3">{{ warehouse.name }}</td>

          <!-- Address -->
          <td class="px-4 py-3">
            {{ warehouse.location || 'N/A' }}
          </td>

          <!-- Capacity -->
          <td class="px-4 py-3">{{ warehouse.capacity || 'N/A' }}</td>

          <!-- Status -->
          <td class="px-4 py-3">
            <span
              :class="{
                'text-successBerry font-medium': warehouse.isActive,
                'text-dangerBerry font-medium': !warehouse.isActive,
              }"
            >
              {{ warehouse.isActive }}
            </span>
          </td>

          <!-- Actions -->
          <td class="px-4 py-3 flex space-x-2">
            <button
              @click="$emit('edit', warehouse)"
              class="px-3 py-1.5 cursor-pointer bg-accentOrangeBerry text-offWhiteBerry text-xs font-medium rounded-md hover:bg-orange-500 transition focus:outline-none focus:ring-2 focus:ring-accentOrangeBerry"
            >
              Edit
            </button>
            <button
              @click="$emit('delete', warehouse.id)"
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
import { IWarehouse } from '@berry/shared';

defineProps<{
  warehouses: IWarehouse[];
}>();
</script>
