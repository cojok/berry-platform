<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-blackBerry/80 backdrop-blur-md z-50"
  >
    <div
      class="bg-blackBerry/60 border border-neutralGrayBerry/40 p-6 rounded-xl shadow-lg w-96"
    >
      <h2 class="text-xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
        {{ title || 'Are you sure?' }}
      </h2>
      <p class="text-neutralGrayBerry/80 text-sm mb-6">
        {{ message || 'This action cannot be undone.' }}
      </p>

      <div class="flex justify-between">
        <button
          @click="cancel"
          class="px-4 py-2 bg-neutralGrayBerry/60 text-white rounded-lg hover:bg-neutralGrayBerry/50 transition"
        >
          Cancel
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

defineProps({
  isOpen: Boolean, // Controls whether the popup is visible
  title: String, // Custom title
  message: String, // Custom message
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => emit('confirm');
const cancel = () => emit('cancel');

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    emit('cancel');
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
});
</script>
