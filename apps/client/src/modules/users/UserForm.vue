<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-blackBerry/80 backdrop-blur-md"
  >
    <div
      class="bg-blackBerry/60 border border-neutralGrayBerry/40 p-6 rounded-xl shadow-lg w-96"
    >
      <h2 class="text-xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
        {{ user ? 'Edit User' : 'Add User' }}
      </h2>

      <!-- Name Input -->
      <input
        v-model="formData.name"
        type="text"
        placeholder="Name"
        class="w-full bg-neutralGrayBerry/50 text-offWhiteBerry px-4 py-2 rounded-lg focus:ring-2 focus:ring-accentOrangeBerry transition mb-3"
      />

      <!-- Email Input -->
      <input
        v-model="formData.email"
        type="email"
        placeholder="Email"
        class="w-full bg-neutralGrayBerry/50 text-offWhiteBerry px-4 py-2 rounded-lg focus:ring-2 focus:ring-accentOrangeBerry transition mb-3"
      />

      <!-- Role Selection -->
      <select
        v-model="formData.role"
        class="w-full bg-neutralGrayBerry/50 text-offWhiteBerry px-4 py-2 rounded-lg focus:ring-2 focus:ring-accentOrangeBerry transition"
      >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>

      <!-- Action Buttons -->
      <div class="mt-4 flex justify-between">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-neutralGrayBerry/60 text-offWhiteBerry rounded-lg hover:bg-neutralGrayBerry/50 transition"
        >
          Cancel
        </button>
        <button
          @click="saveUser"
          class="px-4 py-2 bg-accentOrangeBerry text-offWhiteBerry font-semibold rounded-lg shadow-md hover:bg-orange-500 transition"
        >
          {{ user ? 'Update' : 'Create' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps<{ user?: any }>();
const emit = defineEmits(['close']);

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    emit('close');
  }
};
const formData = ref({
  name: '',
  email: '',
  role: 'User',
});

// Prefill form if editing
watch(
  () => props.user,
  (newUser) => {
    if (newUser) formData.value = { ...newUser };
  },
  { immediate: true }
);

const saveUser = () => {
  console.log('Saving user:', formData.value);
  emit('close');
};

// Attach event listener when component mounts
onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

// Cleanup event listener when component unmounts
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
});
</script>
