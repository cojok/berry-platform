<template>
  <div
    class="flex flex-col items-center justify-center min-h-[85vh] max-h[85vh]"
  >
    <div
      class="bg-blackBerry/60 border border-neutralGrayBerry/40 backdrop-blur-md rounded-xl shadow-xl shadow-blackBerry/40 max-w-lg w-full py-6"
    >
      <div class="flex justify-center items-center gap-2">
        <h2
          class="text-2xl text-center font-heading font-extrabold text-offWhiteBerry"
        >
          Let’s Get You Set Up for Success
        </h2>
        <RocketLaunchIcon class="w-6 h-6 text-accentOrangeBerry" />
      </div>
      <div class="max-w-lg w-full p-8">
        <RegistrationForm />
      </div>
    </div>
  </div>
</template>
<script setup>
import RegistrationForm from '../modules/auth/RegisterForm.vue';
import { RocketLaunchIcon } from '@heroicons/vue/24/outline';
</script>
