<template>
  <div class="fixed bottom-6 right-6 space-y-2 z-50">
    <transition-group
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-5 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-5 opacity-0"
    >
      <div
        v-for="(toast, index) in toasts"
        :key="index"
        class="flex items-center p-4 rounded-lg shadow-lg w-80"
        :class="toastClasses(toast.type)"
      >
        <component :is="getIcon(toast.type)" class="w-6 h-6 flex-shrink-0" />
        <span class="ml-3 text-sm font-medium">{{ toast.message }}</span>
        <button
          @click="removeToast(index)"
          class="ml-auto text-neutralGrayBerry hover:text-offWhiteBerry"
        >
          ✕
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline';

const toasts = ref<
  { message: string; type: 'success' | 'error' | 'info' | 'warning' }[]
>([]);

// Map toast type to styles
const toastClasses = (type: string) => {
  return {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
  }[type];
};

// Map toast type to icon
const getIcon = (type: string) => {
  return {
    success: CheckCircleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon,
    warning: ExclamationTriangleIcon,
  }[type];
};

// Show toast
const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning'
) => {
  toasts.value.push({ message, type });
  setTimeout(() => removeToast(0), 3000); // Auto-dismiss after 3s
};

// Remove toast manually
const removeToast = (index: number) => {
  toasts.value.splice(index, 1);
};

// Expose `showToast` globally
defineExpose({ showToast });
</script>
