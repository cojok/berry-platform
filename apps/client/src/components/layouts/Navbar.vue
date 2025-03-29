<template>
  <div
    class="bg-blackBerry/80 backdrop-blur-lg text-offWhiteBerry p-4 border-b border-neutralGrayBerry/30 z-50 flex justify-between items-center"
  >
    <!-- Logo / App Name -->
    <div
      class="font-heading text-xl font-bold hover:text-accentOrangeBerry transition"
    >
      <router-link to="/" class="transition">Berry</router-link>
    </div>

    <!-- Middle Section: Search Bar -->
    <div class="flex items-center gap-4">
      <div class="relative" v-if="isAuthenticated">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accentOrangeBerry transition"
        />
      </div>

      <!-- Right Section: Navigation Links & Icons -->
      <div class="flex items-center space-x-6">
        <span v-if="isAuthenticated">
          <router-link
            to="/dashboard"
            class="hover:text-accentOrangeBerry transition"
            >Dashboard</router-link
          >
        </span>
        <span v-if="isAuthenticated">
          <router-link
            to="/stock"
            class="hover:text-accentOrangeBerry transition"
            >Stock</router-link
          >
        </span>
        <span v-if="isAuthenticated">
          <router-link
            to="/warehouse"
            class="hover:text-accentOrangeBerry transition"
            >Warehouse</router-link
          >
        </span>
        <span v-if="isAuthenticated">
          <router-link
            to="/users"
            class="hover:text-accentOrangeBerry transition"
            >Users</router-link
          >
        </span>

        <!-- Notifications Icon -->
        <div v-if="isAuthenticated" class="relative">
          <button @click="toggleNotifications" class="cursor-pointer relative">
            <BellIcon
              class="w-6 h-6 text-offWhiteBerry hover:text-accentOrangeBerry transition"
            />
            <span
              v-if="unreadNotifications > 0"
              class="absolute top-0 right-0 bg-accentOrangeBerry text-xs rounded-full px-1"
            >
              {{ unreadNotifications }}
            </span>
          </button>

          <!-- Notifications Dropdown -->
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-2 w-64 bg-blackBerry text-offWhiteBerry rounded-lg shadow-lg p-2 z-50"
          >
            <p
              v-if="notifications.length === 0"
              class="text-sm text-accentOrangeBerry"
            >
              No new notifications
            </p>
            <ul>
              <li
                v-for="notification in notifications"
                :key="notification.id"
                class="p-2 border-b border-neutralGrayBerry text-sm hover:bg-accentOrangeBerry cursor-pointer"
              >
                {{ notification.message }}
              </li>
            </ul>
          </div>
        </div>

        <!-- User Profile Dropdown -->
        <div v-if="isAuthenticated" class="relative">
          <button
            @click="toggleProfileMenu"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <UserCircleIcon
              class="w-6 h-6 text-offWhiteBerry hover:text-accentOrangeBerry transition"
            />
          </button>

          <!-- Profile Dropdown Menu -->
          <div
            v-if="showProfileMenu"
            class="absolute right-0 mt-2 w-40 bg-blackBerry text-offWhiteBerry rounded-lg shadow-lg p-2 z-50"
          >
            <router-link
              to="/profile"
              class="block p-2 hover:bg-accentOrangeBerry"
              @click="toggleProfileMenu()"
              >Profile
            </router-link>
            <router-link
              to="/settings"
              class="block p-2 hover:bg-accentOrangeBerry"
              @click="toggleProfileMenu()"
              >Settings
            </router-link>
            <button
              @click="logout"
              class="block w-full text-left p-2 hover:bg-accentOrangeBerry cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth.store';
import { BellIcon, UserCircleIcon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const searchQuery = ref('');
const showNotifications = ref(false);
const showProfileMenu = ref(false);
const unreadNotifications = ref(2); // Example: Replace with real data
const notifications = ref([
  { id: 1, message: 'New stock update available' },
  { id: 2, message: 'System maintenance scheduled' },
]);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  showProfileMenu.value = showProfileMenu.value
    ? !showProfileMenu.value
    : false;
};

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
  showNotifications.value = showNotifications.value
    ? !showNotifications.value
    : false;
};

const logout = () => {
  authStore.logout();
  showProfileMenu.value = !showProfileMenu.value;
};
</script>

<style scoped>
/* Optional: Add styling if needed */
</style>
