<script setup lang="ts">
import { ref } from 'vue';
import ProjetComponents from '../components/projetComponents.vue';
import Logo from '../components/Logo.vue';
import type { Projet } from '../models/Projet';
import  type { Notebook } from '../models/Notebook';

const activeTab = ref<'app' | 'datascience'>('app');

// Données exemple pour les projets web/app/mobile
const projetsApp: Projet[] = [
  {
    id: 1,
    titre: 'Portfolio Web',
    description: 'Site portfolio personnel développé avec Vue 3 et TypeScript',
    mediaUrl: 'https://via.placeholder.com/400x250?text=Portfolio',
    typeMedia: 'image',
    lienProjet: 'https://github.com',
    technos: ['Vue 3', 'TypeScript', 'Vite']
  },
  {
    id: 2,
    titre: 'Application Mobile',
    description: 'Application mobile React Native avec API REST',
    mediaUrl: 'https://via.placeholder.com/400x250?text=Mobile+App',
    typeMedia: 'image',
    lienProjet: 'https://github.com',
    technos: ['React Native', 'Node.js', 'Firebase']
  },
  {
    id: 3,
    titre: 'Dashboard Analytics',
    description: 'Tableau de bord avec visualisations de données en temps réel',
    mediaUrl: 'https://via.placeholder.com/400x250?text=Dashboard',
    typeMedia: 'image',
    lienProjet: 'https://github.com',
    technos: ['React', 'Chart.js', 'Python']
  }
];

// Données exemple pour les notebooks Data Science
const notebooksDataScience: Notebook[] = [
  {
    id: 1,
    titre: 'Analyse Exploratoire de Données',
    description: 'EDA complète sur dataset e-commerce avec visualisations',
    urlNotebook: '#',
    imagePreview: 'https://via.placeholder.com/400x250?text=EDA',
    technos: ['Python', 'Pandas', 'Matplotlib'],
    dateCreation: '2024-01-15'
  },
  {
    id: 2,
    titre: 'Prédiction avec Machine Learning',
    description: 'Modèle de régression pour prédire les prix immobiliers',
    urlNotebook: '#',
    imagePreview: 'https://via.placeholder.com/400x250?text=ML+Model',
    technos: ['Scikit-learn', 'XGBoost', 'Numpy'],
    dateCreation: '2024-02-20'
  },
  {
    id: 3,
    titre: 'Deep Learning - Classification',
    description: 'CNN pour la classification d\'images avec TensorFlow',
    urlNotebook: '#',
    imagePreview: 'https://via.placeholder.com/400x250?text=Deep+Learning',
    technos: ['TensorFlow', 'Keras', 'OpenCV'],
    dateCreation: '2024-03-10'
  }
];
</script>

<template>
  <div class="projets-container">
    <h1>Mes Projets</h1>
    
    <div class="tabs-container">
      <button 
        @click="activeTab = 'app'"
        :class="['tab-button', { active: activeTab === 'app' }]"
      >
        <Logo type="appdev" size="18" />
        <span>App Development</span>
      </button>
      <button 
        @click="activeTab = 'datascience'"
        :class="['tab-button', { active: activeTab === 'datascience' }]"
      >
        <Logo type="datascience" size="18" />
        <span>Data Science</span>
      </button>
    </div>

    <!-- Onglet App Development -->
    <div v-show="activeTab === 'app'" class="tab-content">
      <div class="projets-grid">
        <ProjetComponents 
          v-for="projet in projetsApp"
          :key="projet.id"
          :projet="projet"
        />
      </div>
    </div>

    <!-- Onglet Data Science -->
    <div v-show="activeTab === 'datascience'" class="tab-content">
      <div class="notebooksGrid">
        <a 
          v-for="notebook in notebooksDataScience"
          :key="notebook.id"
          :href="notebook.urlNotebook"
          class="notebook-card"
          target="_blank"
        >
          <div class="notebook-image">
            <img :src="notebook.imagePreview" :alt="notebook.titre" />
          </div>
          <div class="notebook-content">
            <h3>{{ notebook.titre }}</h3>
            <p>{{ notebook.description }}</p>
            <div class="notebook-technos">
              <span 
                v-for="techno in notebook.technos"
                :key="techno"
                class="techno-badge"
              >
                {{ techno }}
              </span>
            </div>
            <div class="notebook-footer">
              <span class="notebook-date">{{ notebook.dateCreation }}</span>
              <span class="notebook-link">Voir le notebook →</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projets-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #222222;
  margin-bottom: 30px;
  font-size: 2rem;
}

.tabs-container {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.tab-button {
  padding: 12px 24px;
  border: 2px solid #7B7B7B;
  background-color: #FFFFFF;
  color: #7B7B7B;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-button:hover {
  border-color: #222222;
  color: #222222;
  background-color: #F8F8F8;
}

.tab-button.active {
  background-color: #222222;
  border-color: #222222;
  color: #FFFFFF;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.projets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.notebooksGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.notebook-card {
  background: #FFFFFF;
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(34, 34, 34, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  border: 1px solid #F8F8F8;
}

.notebook-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(34, 34, 34, 0.15);
}

.notebook-image {
  width: 100%;
  height: 200px;
  background-color: #F8F8F8;
  overflow: hidden;
}

.notebook-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notebook-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.notebook-content h3 {
  margin: 0 0 10px 0;
  color: #222222;
  font-size: 1.2rem;
}

.notebook-content p {
  margin: 0 0 15px 0;
  color: #7B7B7B;
  font-size: 0.95rem;
  line-height: 1.5;
  flex-grow: 1;
}

.notebook-technos {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
}

.techno-badge {
  display: inline-block;
  background-color: #F8F8F8;
  color: #222222;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #7B7B7B;
}

.notebook-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #F8F8F8;
  padding-top: 12px;
}

.notebook-date {
  font-size: 0.85rem;
  color: #7B7B7B;
}

.notebook-link {
  color: #222222;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Dark Mode Styles */
:global([data-theme='dark']) h1 {
  color: #F8F8F8;
}

:global([data-theme='dark']) .tab-button {
  border-color: #7B7B7B;
  background-color: #2a2a2a;
  color: #B8C5D6;
}

:global([data-theme='dark']) .tab-button:hover {
  border-color: #F8F8F8;
  color: #F8F8F8;
  background-color: #222222;
}

:global([data-theme='dark']) .tab-button.active {
  background-color: #F8F8F8;
  border-color: #F8F8F8;
  color: #222222;
}

:global([data-theme='dark']) .notebook-card {
  background-color: #2a2a2a;
  border-color: #7B7B7B;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

:global([data-theme='dark']) .notebook-card:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
}

:global([data-theme='dark']) .notebook-content h3 {
  color: #F8F8F8;
}

:global([data-theme='dark']) .notebook-content p {
  color: #B8C5D6;
}

:global([data-theme='dark']) .notebook-date {
  color: #7B7B7B;
}

:global([data-theme='dark']) .notebook-footer {
  border-top-color: #7B7B7B;
}

:global([data-theme='dark']) .techno-badge {
  background-color: #222222;
  color: #F8F8F8;
  border-color: #7B7B7B;
}

:global([data-theme='dark']) .notebook-link {
  color: #F8F8F8;
}

@media (max-width: 768px) {
  .projets-grid,
  .notebooksGrid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 1.5rem;
  }

  .tabs-container {
    gap: 5px;
  }

  .tab-button {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}
</style>
