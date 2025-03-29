<template>
  <div
    class="flex flex-col items-center justify-center min-h-[80vh] text-center"
  >
    <h1 class="text-6xl font-bold text-neutralGrayBerry">404</h1>
    <p class="text-lg text-neutralGrayBerry mt-2">
      Oops! The page you're looking for doesn't exist.
    </p>
    <router-link
      to="/"
      class="mt-6 px-6 py-3 bg-accentOrangeBerry text-offWhiteBerry rounded-lg hover:bg-orange-500 transition"
    >
      Go Home
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>
