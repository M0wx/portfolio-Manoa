<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import ThemeToggle from './components/ThemeToggle.vue'

  const isMenuOpen = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }
</script>

<template>
<div id="layout">
    <header>
      <nav>
        <div class="nav-brand">
          <RouterLink to="/" class="logo-text" @click="closeMenu">Portfolio</RouterLink>
        </div>

        <button class="burger-menu" @click="toggleMenu" :aria-expanded="isMenuOpen">
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
        </button>

        <div class="nav-content" :class="{ 'is-open': isMenuOpen }">
          <div class="nav-links">
            <RouterLink to="/" @click="closeMenu">Home</RouterLink>
            <RouterLink to="/cv" @click="closeMenu">CV</RouterLink>
            <RouterLink to="/projets" @click="closeMenu">Projects</RouterLink>
            <RouterLink to="/contact" @click="closeMenu">Contact</RouterLink>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 50px;
}

.nav-links {
  display: flex;
  gap: 40px;
}

.router-link-active {
  color: var(--color-primary); 
  font-weight: bold;
}

main {
  padding: 20px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  min-height: calc(100vh - 80px);
}

a {
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.3s ease;
  font-weight: 500;
}

a:hover {
  color: var(--color-primary);
}

/* Burger Menu Button */
.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1100;
}

.burger-menu span {
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  border-radius: 10px;
  transition: all 0.3s ease;
}

/* Burger Animation */
.burger-menu span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.burger-menu span.open:nth-child(2) {
  opacity: 0;
}
.burger-menu span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  nav {
    padding: 15px 20px;
  }

  .burger-menu {
    display: flex;
  }

  .nav-content {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100vh;
    background-color: var(--bg-primary);
    flex-direction: column;
    justify-content: center;
    transition: right 0.4s ease-in-out;
    box-shadow: -5px 0 15px var(--shadow-color);
  }

  .nav-content.is-open {
    right: 0;
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-bottom: 40px;
  }

  .nav-links a {
    font-size: 1.2rem;
  }
}
</style>
