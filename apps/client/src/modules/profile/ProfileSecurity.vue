<template>
  <div>
    <h2
      class="text-lg font-heading font-semibold text-offWhiteBerry/90 mb-2 flex items-center"
    >
      <LockClosedIcon class="w-5 h-5 text-offWhiteBerry/80 mr-2" />
      Security
    </h2>
    <div
      class="flex flex-wrap items-center space-x-4 border-b border-neutralGrayBerry/50 pb-4 mb-4"
    >
      <button
        @click="enable2FA"
        class="px-4 py-2 bg-accentOrangeBerry/90 text-white font-semibold rounded-lg shadow-md hover:bg-accentOrangeBerry hover:cursor-pointer transition-all"
      >
        Enable 2FA
      </button>
      <button
        @click="logoutAllDevices"
        class="px-4 py-2 bg-neutralGrayBerry/60 text-white font-semibold rounded-lg shadow-md hover:bg-neutralGrayBerry/80 hover:cursor-pointer transition-all"
      >
        Logout from All Devices
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/24/outline';

const enable2FA = () => console.log('2FA Enabled');
const logoutAllDevices = () => console.log('Logged out from all devices');
</script>
