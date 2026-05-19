import { ref, watch, onMounted } from 'vue';

// État partagé (Singleton)
const isDarkMode = ref(false);
let isInitialized = false;

export function useTheme() {
  
  function applyTheme() {
    const html = document.documentElement;
    if (isDarkMode.value) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme-mode', 'light');
    }
  }

  // Initialiser une seule fois au montage du premier composant
  onMounted(() => {
    if (!isInitialized) {
      const saved = localStorage.getItem('theme-mode');
      if (saved) {
        isDarkMode.value = saved === 'dark';
      } else {
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      applyTheme();
      isInitialized = true;
    }
  });

  // Appliquer le thème au changement
  watch(isDarkMode, () => {
    applyTheme();
  });

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
  }

  return {
    isDarkMode,
    toggleTheme
  };
}
