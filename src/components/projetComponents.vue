<script setup lang="ts">
import type { Projet } from '../models/Projet';

interface Props {
  projet?: Projet;
}

withDefaults(defineProps<Props>(), {
  projet: () => ({
    id: 0,
    titre: 'Titre du Projet',
    description: 'Description du projet',
    mediaUrl: '',
    typeMedia: 'image',
    lienProjet: '#',
    technos: []
  })
});
</script>

<template>
  <div class="projet-card">
    <div class="projet-header">
      <h2>{{ projet.titre }}</h2>
    </div>

    <div class="projet-media">
      <img 
        v-if="projet.typeMedia === 'image'" 
        :src="projet.mediaUrl" 
        :alt="projet.titre"
        class="projet-image"
      />
      <video 
        v-else 
        controls 
        class="projet-video"
      >
        <source :src="projet.mediaUrl" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="projet-content">
      <p class="projet-description">{{ projet.description }}</p>

      <div class="projet-technos">
        <span 
          v-for="techno in projet.technos" 
          :key="techno"
          class="techno-badge"
        >
          {{ techno }}
        </span>
      </div>

      <a :href="projet.lienProjet" target="_blank" class="projet-link">
        View Project →
      </a>
    </div>
  </div>
</template>

<style scoped>
.projet-card {
  background: var(--bg-primary);
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 400px;
  margin: 20px auto;
  border: 1px solid var(--border-light);
}

.projet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px var(--shadow-hover);
}

.projet-header {
  padding: 20px;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.projet-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.projet-media {
  width: 100%;
  height: 250px;
  background-color: var(--bg-secondary);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.projet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projet-video {
  width: 100%;
  height: 100%;
}

.projet-content {
  padding: 20px;
}

.projet-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-size: 0.95rem;
}

.projet-technos {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.techno-badge {
  display: inline-block;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--border-light);
}

.projet-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.projet-link:hover {
  opacity: 0.7;
}
</style>
