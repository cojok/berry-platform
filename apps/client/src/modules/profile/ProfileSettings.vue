<template>
  <div>
    <h2 class="text-lg font-heading font-semibold text-offWhiteBerry/90 mb-2">
      ⚙ Account Settings
    </h2>
    <div class="flex items-center justify-between">
      <span class="text-neutralGrayBerry/80">Dark Mode</span>
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="darkMode" class="sr-only peer" />
        <span
          class="w-11 h-6 bg-neutralGrayBerry rounded-full peer-checked:bg-accentOrangeBerry transition-all after:absolute after:top-1 after:left-1 after:bg-white after:w-4 after:h-4 after:rounded-full after:shadow-md after:transition-all peer-checked:after:translate-x-5"
        ></span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const darkMode = ref(false);
</script>
