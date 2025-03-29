<template>
  <div class="w-full max-w-lg">
    <form class="space-y-6" @submit.prevent="handleLogin">
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-offWhiteBerry"
          >Email</label
        >
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 border border-neutralGrayBerry/30 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry focus:outline-none transition"
          placeholder="Enter your email"
        />
      </div>

      <!-- Password Field -->
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-offWhiteBerry"
          >Password</label
        >
        <input
          id="password"
          v-model="form.password"
          type="password"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 border border-neutralGrayBerry/30 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry focus:outline-none transition"
          placeholder="Enter your password"
        />
      </div>

      <!-- Forgot Password -->
      <div class="flex justify-between items-center">
        <a
          href="#"
          class="text-sm text-neutralGrayBerry hover:text-offWhiteBerry transition"
          >Forgot password?</a
        >
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        :disabled="!isFormValid"
        class="w-full py-2 bg-accentOrangeBerry text-offWhiteBerry font-semibold rounded-lg cursor-pointer hover:bg-orange-500 focus:ring-2 focus:ring-accentOrangeBerry focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sign in
      </button>

      <!-- Register Link -->
      <p class="text-sm text-neutralGrayBerry">
        New here?
        <a
          href="/register"
          class="text-accentOrangeBerry font-semibold hover:underline"
          >Create an account</a
        >
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth.store';
import { computed, ref } from 'vue';

const authStore = useAuthStore();

const form = ref({
  email: '',
  password: '',
});

const isFormValid = computed(() => {
  return (
    form.value.email.includes('@') && form.value.password.trim().length >= 6
  );
});

const handleLogin = async () => {
  console.info('[LoginForm] Attempting login...');

  if (!form.value.email || !form.value.password) {
    console.warn('[LoginForm] Cannot proceed - Missing email or password.');
    return;
  }

  try {
    await authStore.login(form.value.email, form.value.password);
    console.info('[LoginForm] Login successful.');
  } catch (error) {
    console.error('[LoginForm] Login failed:', error);
  }
};
</script>

<style scoped></style>
