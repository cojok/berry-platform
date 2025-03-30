<template>
  <div class="p-6">
    <table
      class="min-w-full table-auto bg-neutralGrayBerry/20 rounded-lg overflow-hidden text-offWhiteBerry text-sm font-body"
    >
      <thead
        class="bg-neutralGrayBerry/30 text-left uppercase tracking-wider text-xs font-semibold"
      >
        <tr>
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Description</th>
          <th class="px-4 py-3">Address</th>
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

          <!-- Description -->
          <td class="px-4 py-3">{{ warehouse.description || 'N/A' }}</td>

          <!-- Address -->
          <td class="px-4 py-3">
            {{ warehouse.address || 'N/A' }}, {{ warehouse.city || 'N/A' }},
            {{ warehouse.state || 'N/A' }}, {{ warehouse.zipCode || 'N/A' }},
            {{ warehouse.country || 'N/A' }}
          </td>

          <!-- Capacity -->
          <td class="px-4 py-3">{{ warehouse.capacity || 'N/A' }}</td>

          <!-- Status -->
          <td class="px-4 py-3">
            <span
              :class="{
                'text-successBerry font-medium': warehouse.status === 'active',
                'text-dangerBerry font-medium': warehouse.status === 'inactive',
              }"
            >
              {{ warehouse.status }}
            </span>
          </td>

          <!-- Actions -->
          <td class="px-4 py-3 flex space-x-2">
            <button
              @click="$emit('edit', warehouse)"
              class="px-3 py-1.5 bg-accentOrangeBerry text-offWhiteBerry text-xs font-medium rounded-md hover:bg-orange-500 transition focus:outline-none focus:ring-2 focus:ring-accentOrangeBerry"
            >
              Edit
            </button>
            <button
              @click="$emit('delete', warehouse.id)"
              class="px-3 py-1.5 bg-dangerBerry text-offWhiteBerry text-xs font-medium rounded-md hover:bg-red-400 transition focus:outline-none focus:ring-2 focus:ring-dangerBerry"
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
import { defineProps } from 'vue';
import { IWarehouse } from '@berry/shared';

// Props for the warehouse list
const props = defineProps<{
  warehouses: IWarehouse[];
}>();
</script>
