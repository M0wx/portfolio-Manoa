<script setup lang="ts">
export interface LogoProps {
  type: 'appdev' | 'datascience' | 'moon' | 'sun';
  size?: number | string;
}

defineProps<LogoProps>();
</script>

<template>
  <!-- App Development Logo -->
  <svg v-if="type === 'appdev'" :width="size || 24" :height="size || 24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7 9L10 12L7 15M17 9L14 12L17 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <!-- Data Science Logo -->
  <svg v-else-if="type === 'datascience'" :width="size || 24" :height="size || 24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
    <rect x="2" y="8" width="20" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="5" cy="13.5" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="13.5" r="1.5" fill="currentColor"/>
    <circle cx="19" cy="13.5" r="1.5" fill="currentColor"/>
    <path d="M6 4L12 2L18 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <!-- Moon (Dark Mode) -->
  <svg v-else-if="type === 'moon'" :width="size || 24" :height="size || 24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="logo">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>

  <!-- Sun (Light Mode) -->
  <svg v-else-if="type === 'sun'" :width="size || 24" :height="size || 24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
</template>

<style scoped>
.logo {
  display: inline-block;
}
</style>
