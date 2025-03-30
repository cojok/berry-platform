<template>
  <div
    class="max-w-6xl mx-auto p-6 bg-blackBerry/60 border border-neutralGrayBerry/40 backdrop-blur-md rounded-xl shadow-xl shadow-blackBerry/40 min-h-[70vh]"
  >
    <h1 class="text-2xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
      Profile
    </h1>

    <!-- Search & Filters -->
    <UserFilters @search="handleSearch" @filter="handleFilter" />

    <!-- Users Table -->
    <pre>{{ filteredUsers }}</pre>
    <UsersTable :users="filteredUsers" @edit="editUser" @delete="deleteUser" />

    <!-- Add User Button -->
    <div class="mt-4">
      <button
        @click="showAddUserModal"
        class="flex justify-around gap-2 px-4 py-2 bg-accentOrangeBerry text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition-all cursor-pointer"
      >
        <PlusIcon class="w-6 h-6 text-offWhiteBerry/80 inline" />
        Add User
      </button>
    </div>

    <!-- User Form Modal -->
    <UserForm v-if="showUserForm" :user="selectedUser" @close="closeUserForm" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import UsersTable from '../modules/users/UsersTable.vue';
import UserFilters from '../modules/users/UserFilters.vue';
import UserForm from '../modules/users/UserForm.vue';

// Sample user data (replace with API call)
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]);

const searchQuery = ref('');
const selectedRole = ref('');
const showUserForm = ref(false);
const selectedUser = ref(null);

// Filtered user list (computed)
const filteredUsers = computed(() =>
  users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (selectedRole.value === '' || user.role === selectedRole.value)
  )
);

// Event handlers
const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handleFilter = (role: string) => {
  selectedRole.value = role;
};

const showAddUserModal = () => {
  selectedUser.value = null;
  showUserForm.value = true;
};

const editUser = (user: any) => {
  selectedUser.value = user;
  showUserForm.value = true;
};

const closeUserForm = () => {
  showUserForm.value = false;
};

const deleteUser = (userId: number) => {
  users.value = users.value.filter((user) => user.id !== userId);
};
</script>
