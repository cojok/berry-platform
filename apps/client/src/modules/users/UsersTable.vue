<template>
  <div class="overflow-x-auto">
    <table
      class="w-full border-collapse border border-neutralGrayBerry/50 mt-4 rounded-lg overflow-hidden"
    >
      <thead>
        <tr class="bg-neutralGrayBerry/40 text-offWhiteBerry/90 text-left">
          <th class="p-3 font-heading">Name</th>
          <th class="p-3 font-heading">Email</th>
          <th class="p-3 font-heading">Role</th>
          <th class="p-3 font-heading">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="border-t border-neutralGrayBerry/50 even:bg-blackBerry/50"
        >
          <td class="p-3 text-offWhiteBerry/90">{{ user.name }}</td>
          <td class="p-3 text-neutralGrayBerry/80">{{ user.email }}</td>
          <td class="p-3">
            <span
              class="px-2 py-1 text-sm font-semibold rounded-md"
              :class="{
                'bg-red-500 text-white': user.role === 'Admin',
                'bg-orange-500 text-white': user.role === 'Editor',
                'bg-gray-700 text-neutralGrayBerry/90':
                  user.role !== 'Admin' && user.role !== 'Editor',
              }"
            >
              {{ user.role }}
            </span>
          </td>
          <td class="p-3 flex space-x-2">
            <button
              @click="$emit('edit', user)"
              class="px-3 py-1 bg-neutralGrayBerry/70 text-white rounded-md hover:bg-neutralGrayBerry/50 transition"
            >
              Edit
            </button>
            <button
              @click="confirmDelete(user.id)"
              class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Confirmation Popup -->
    <ConfirmDialog
      :isOpen="showConfirm"
      title="Confirm Deletion"
      message="Are you sure you want to delete this user? This action cannot be undone."
      @confirm="deleteUser"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue';

defineProps<{ users: any[] }>();
const emit = defineEmits(['edit', 'delete']);

const showConfirm = ref(false);
const selectedUserId = ref(null);

const confirmDelete = (userId) => {
  selectedUserId.value = userId;
  showConfirm.value = true;
};

const deleteUser = () => {
  if (selectedUserId.value) {
    // Emit delete event with the confirmed user ID
    showConfirm.value = false;
    emit('delete', selectedUserId.value);
  }
};
</script>
