<template>
  <div
    class="flex flex-col items-center justify-center min-h-[85vh] max-h[85vh]"
  >
    <div
      class="bg-blackBerry/60 border border-neutralGrayBerry/40 backdrop-blur-md rounded-xl shadow-xl shadow-blackBerry/40 max-w-lg w-full py-6"
    >
      <h2
        class="text-3xl text-center font-heading font-extrabold text-offWhiteBerry text-cent"
      >
        Oh hey, you’re back!
      </h2>
      <div class="max-w-lg w-full p-8">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
<script setup>
import LoginForm from '../modules/auth/LoginForm.vue';
</script>
