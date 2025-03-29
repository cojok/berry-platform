<template>
  <div
    class="max-w-4xl mx-auto p-6 bg-blackBerry/60 border border-neutralGrayBerry/40 backdrop-blur-md rounded-xl shadow-xl shadow-blackBerry/40"
  >
    <h1 class="text-2xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
      Profile
    </h1>

    <ProfileDetails />
    <ProfileSecurity />
    <ProfileSettings />
    <ProfileDangerZone />
  </div>
</template>

<script setup lang="ts">
import ProfileDetails from '../modules/profile/ProfileDetails.vue';
import ProfileSecurity from '../modules/profile/ProfileSecurity.vue';
import ProfileSettings from '../modules/profile/ProfileSettings.vue';
import ProfileDangerZone from '../modules/profile/ProfileDangerZone.vue';
</script>
<style>
.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  transition: 0.2s;
}

.btn-primary:hover {
  background-color: #4338ca;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-switch {
  cursor: pointer;
}
</style>
