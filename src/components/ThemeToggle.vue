<script setup lang="ts">
import { useTheme } from '../useTheme';
import Logo from './Logo.vue';

const { isDarkMode, toggleTheme } = useTheme();
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme" :title="isDarkMode ? 'Light Mode' : 'Dark Mode'">
    <Logo v-if="isDarkMode" type="sun"  />
    <Logo v-else type="moon"  />
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: 2px solid var(--color-primary);
  border-radius: 0.5rem;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.theme-toggle:hover {
  border-color: var(--color-primary);
  background-color: var(--bg-secondary);
}
</style>
