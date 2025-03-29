<template>
  <div class="mt-6 border-t border-neutralGrayBerry/50 pt-4">
    <h2 class="text-lg font-heading font-semibold text-red-500 mb-2">
      ⚠ Danger Zone
    </h2>
    <p class="text-sm text-neutralGrayBerry/80 mb-4">
      Deleting your account is permanent and cannot be undone.
    </p>
    <button
      @click="deleteAccount"
      class="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 hover:scale-105 hover:cursor-pointer transition-all"
    >
      Delete Account
    </button>
  </div>
</template>

<script setup lang="ts">
const deleteAccount = () => console.log('Account deletion requested');
</script>
