<template>
  <div class="overflow-x-auto">
    <table
      class="w-full border-collapse border border-neutralGrayBerry/50 mt-4 rounded-lg overflow-hidden"
    >
      <thead>
        <tr class="bg-neutralGrayBerry/40 text-offWhiteBerry/90 text-left">
          <th class="p-3 font-heading">Name</th>
          <th class="p-3 font-heading">Location</th>
          <th class="p-3 font-heading">Capacity</th>
          <th class="p-3 font-heading">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="warehouse in warehouses"
          :key="warehouse.id"
          class="border-t border-neutralGrayBerry/50 even:bg-blackBerry/50"
        >
          <td class="p-3 text-offWhiteBerry/90">{{ warehouse.name }}</td>
          <td class="p-3 text-neutralGrayBerry/80">{{ warehouse.location }}</td>
          <td class="p-3">{{ warehouse.capacity }}</td>
          <td class="p-3 flex space-x-2">
            <button
              @click="$emit('view', warehouse)"
              class="px-3 py-1 bg-accentOrangeBerry text-offWhiteBerry rounded-md hover:bg-orange-500 transition"
            >
              View
            </button>
            <button
              @click="$emit('edit', warehouse)"
              class="px-3 py-1 bg-neutralGrayBerry/70 text-white rounded-md hover:bg-neutralGrayBerry/50 transition"
            >
              Edit
            </button>
            <button
              @click="$emit('delete', warehouse.id)"
              class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
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
import { Warehouse } from '@/libs/shared/src/interfaces/warehouse.interfaces';

defineProps<{ warehouses: Warehouse[] }>();
defineEmits(['view', 'edit', 'delete']);
</script>
