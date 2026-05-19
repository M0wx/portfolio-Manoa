<script setup lang="ts">
import profileImage from '../assets/sunny-removebg-preview.png'
</script>

<template>
  <section class="hero">
    <div class="hero-container">
      <div class="photo-section">
        <div class="doodle-blob orange-blob"></div>
        <div class="doodle-blob blue-blob"></div>
        <div class="photo-wrapper">
          <img :src="profileImage" alt="Manoa" class="hero-photo" />
        </div>
      </div>

      <div class="hero-content">
        <p class="greeting">Hi there!</p>
        <h1>
          I'm <span class="name">Manoasoa</span>
        </h1>
        <h2>Software Developer</h2>
        <p class="tagline">I build apps for you.</p>

        <div class="actions">
          <router-link to="/projets" class="btn-primary">View my work</router-link>
          <router-link to="/contact" class="btn-secondary">Connect With Me</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 40px 20px;
}

.hero-container {
  display: flex;
  align-items: center;
  gap: 100px;
  max-width: 1100px;
  width: 100%;
}

/* Photo & Doodle Section */
.photo-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.photo-wrapper {
  position: relative;
  width: 550px;
  height: 550px;
  z-index: 5;
}

.hero-photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 15px 30px var(--shadow-color));
}

/* Doodle Art Blobs (Ink splashes) */
.doodle-blob {
  position: absolute;
  z-index: 1; /* Repassé derrière */
  filter: opacity(0.7); /* Opacité restaurée */
}

.orange-blob {
  width: 300px;
  height: 280px;
  background-color: var(--color-secondary);
  top: 20px;
  right: -20px;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  animation: morph 8s ease-in-out infinite;
}

.blue-blob {
  width: 280px;
  height: 320px;
  background-color: var(--color-primary);
  bottom: 0px;
  left: -30px;
  border-radius: 60% 40% 30% 70% / 50% 30% 70% 50%;
  animation: morph 10s ease-in-out infinite reverse;
}

@keyframes morph {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  50% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; }
  100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
}

/* Hero Text Content */
.greeting {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 4.5rem;
  margin: 0;
  color: var(--text-primary);
  line-height: 1.1;
}

.name {
  color: var(--color-primary);
}

.professional-titles {
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

@media (max-width: 968px) {
  .professional-titles {
    font-size: 1.3rem;
  }
}

.tagline {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  font-style: italic;
  color: var(--text-primary);
}

.actions {
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-secondary {
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: var(--color-secondary);
  color: white;
}

/* Responsive */
@media (max-width: 968px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
    gap: 60px;
  }

  .actions {
    justify-content: center;
  }

  h1 {
    font-size: 3.5rem;
  }

  .photo-wrapper {
    width: 280px;
    height: 280px;
  }
}
</style>