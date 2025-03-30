<template>
  <div
    class="p-6 bg-blackBerry/50 rounded-lg shadow-md border border-neutralGrayBerry/40"
  >
    <h2 class="text-2xl font-heading text-offWhiteBerry mb-4">
      Warehouse Details
    </h2>
    <div class="space-y-2">
      <p><strong>Name:</strong> {{ warehouse.name }}</p>
      <p><strong>Location:</strong> {{ warehouse.location }}</p>
      <p><strong>Capacity:</strong> {{ warehouse.capacity }}</p>
    </div>
    <button
      @click="$emit('close')"
      class="mt-4 px-4 py-2 bg-neutralGrayBerry/60 text-white rounded-lg hover:bg-neutralGrayBerry/50 transition"
    >
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
import { Warehouse } from '@berry/shared';

defineProps<{ warehouse: Warehouse }>();
defineEmits(['close']);
</script>
