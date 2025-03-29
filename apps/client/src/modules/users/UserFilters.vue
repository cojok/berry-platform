<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"
  >
    <input
      type="text"
      placeholder="Search by name..."
      v-model="searchQuery"
      class="w-full sm:w-auto border border-neutralGrayBerry/40 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accentOrangeBerry transition"
      @input="$emit('search', searchQuery)"
    />

    <select
      v-model="selectedRole"
      class="border border-neutralGrayBerry/40 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accentOrangeBerry transition cursor-pointer"
      @change="$emit('filter', selectedRole)"
    >
      <option value="">All Roles</option>
      <option value="Admin">Admin</option>
      <option value="User">User</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const selectedRole = ref('');
defineEmits(['search', 'filter']);
</script>
