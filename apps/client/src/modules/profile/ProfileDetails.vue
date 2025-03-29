<template>
  <div
    class="flex items-center space-x-4 border-b border-neutralGrayBerry/50 pb-4 mb-4"
  >
    <!-- User Avatar -->
    <UserCircleIcon class="w-16 h-16 text-offWhiteBerry/80" />

    <!-- User Info -->
    <div>
      <p class="text-lg font-heading font-semibold text-offWhiteBerry">
        {{ user?.name }}
      </p>
      <p class="text-sm text-neutralGrayBerry/90">
        {{ user?.email }}
      </p>
      <p class="text-sm text-neutralGrayBerry/80">
        Role:
        <span
          class="px-2 py-1 rounded-md font-semibold"
          :class="{
            'bg-red-500 text-offWhiteBerry': user?.role === 'Admin',
            'bg-accentOrangeBerry text-offWhiteBerry': user?.role === 'Editor',
            'bg-gray-700 text-neutralGrayBerry/90':
              user?.role !== 'Admin' && user?.role !== 'Editor',
          }"
        >
          {{ user?.role || 'Viewer' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth.store';
import { UserCircleIcon } from '@heroicons/vue/24/solid';

const authStore = useAuthStore();
const user = authStore.user || {
  name: 'John Smith',
  email: 'john@smith.com',
  role: 'Admin',
};
</script>
