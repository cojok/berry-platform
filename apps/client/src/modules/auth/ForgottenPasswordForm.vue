<template>
  <div class="max-w-lg w-full p-6">
    <form @submit.prevent="forgottenPassword">
      <!-- Tenant Name -->
      <div class="mb-4">
        <label for="tenant" class="block text-sm font-medium text-offWhiteBerry"
          >Tenant Name</label
        >
        <input
          id="tenant"
          v-model="form.tenant"
          type="text"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 border border-neutralGrayBerry/30 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry focus:outline-none transition"
          placeholder="Enter your tenant name"
          required
        />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-offWhiteBerry"
          >Email</label
        >
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 border border-neutralGrayBerry/30 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry focus:outline-none transition"
          placeholder="Enter your email"
          required
        />
      </div>

      <!-- Password -->
      <div class="mb-4 relative">
        <label
          for="password"
          class="block text-sm font-medium text-offWhiteBerry"
          >Password</label
        >
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            class="w-full px-4 py-2 bg-neutralGrayBerry/50 border border-neutralGrayBerry/30 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry focus:outline-none transition"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            class="absolute right-3 top-2 text-offWhiteBerry"
            @click="togglePassword"
          >
            <EyeIcon v-if="!showPassword" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </div>
        <div class="text-sm text-neutralGrayBerry mt-2">
          <p
            v-for="(rule, key) in passwordRules"
            :key="key"
            class="flex items-center gap-1"
            :class="rule.isValid ? 'text-green-400' : 'text-red-400'"
          >
            <CheckIcon
              :class="
                rule.isValid ? 'w-4 h-4 text-green-400' : 'w-4 h-4 text-red-400'
              "
            />
            {{ rule.text }}
          </p>
        </div>
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-400 text-sm mb-4">
        {{ errorMessage }}
      </p>

      <!-- Register Button -->
      <button
        type="submit"
        :disabled="!isFormValid || loading"
        class="w-full py-2 bg-accentOrangeBerry text-offWhiteBerry font-semibold rounded-lg cursor-pointer hover:bg-orange-500 focus:ring-2 focus:ring-accentOrangeBerry focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Registering...' : 'Register' }}
      </button>

      <!-- Login Link -->
      <p class="text-sm text-neutralGrayBerry mt-4 text-center">
        Already have an account?
        <router-link
          to="/login"
          class="text-accentOrangeBerry font-semibold hover:underline"
          >Sign in
        </router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const showToast = inject('showToast');

const form = ref({
  tenant: '',
  email: '',
  password: '',
});

const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const passwordRules = computed(() => {
  return [
    {
      text: 'At least 1 lowercase & uppercase letter',
      isValid:
        /[a-z]/.test(form.value.password) && /[A-Z]/.test(form.value.password),
    },
    { text: 'At least 1 number', isValid: /\d/.test(form.value.password) },
    {
      text: 'At least 1 special character (!@#$%^&*)',
      isValid: /[!@#$%^&*]/.test(form.value.password),
    },
    {
      text: 'At least 8 characters long',
      isValid: form.value.password.length >= 8,
    },
  ];
});

const isFormValid = computed(() => {
  return (
    form.value.tenant.length > 0 &&
    form.value.email.includes('@') &&
    passwordRules.value.every((rule) => rule.isValid)
  );
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const forgottenPassword = async () => {
  if (!isFormValid.value) return;

  loading.value = true;
  errorMessage.value = '';

  try {
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form.value),
    // });
    //
    // const data = await response.json();
    // if (!response.ok) throw new Error(data.message || 'Registration failed');

    showToast('Registration successful!', 'warning');

    // setTimeout(() => {
    //   window.location.href = '/login';
    // }, 2000);
  } catch (error) {
    errorMessage.value = error.message;
    showToast(errorMessage.value, 'error');
  } finally {
    loading.value = false;
  }
};
</script>
