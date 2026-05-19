<script setup lang="ts">
import { ref } from 'vue';
import ProjetComponents from '../components/projetComponents.vue';
import Logo from '../components/Logo.vue';
import type { Projet } from '../models/Projet';
import type { Notebook } from '../models/Notebook';

const activeTab = ref<'app' | 'datascience'>('app');

// Example data for web/app/mobile projects
const projetsApp: Projet[] = [
  {
    id: 1,
    titre: 'Web Portfolio',
    description: 'Personal portfolio website developed with Vue 3 and TypeScript',
    mediaUrl: 'https://via.placeholder.com/400x250?text=Portfolio',
    typeMedia: 'image',
    lienProjet: 'https://github.com',
    technos: ['Vue 3', 'TypeScript', 'Vite']
  },
  {
    id: 2,
    titre: 'Mobile Application',
    description: 'React Native mobile app with REST API integration',
    mediaUrl: 'https://via.placeholder.com/400x250?text=Mobile+App',
    typeMedia: 'image',
    lienProjet: 'https://github.com',
    technos: ['React Native', 'Node.js', 'Firebase']
  },
  {
    id: 3,
    titre: 'Analytics Dashboard',
    description: 'Dashboard featuring real-time data visualizations',
    mediaUrl: 'https://via.placeholder.com/400x250?text=Dashboard',
    typeMedia: 'image',
    lienProjet: 'https://github.com',
    technos: ['React', 'Chart.js', 'Python']
  }
];

// Example data for Data Science notebooks
const notebooksDataScience: Notebook[] = [
  {
    id: 1,
    titre: 'Exploratory Data Analysis',
    description: 'Comprehensive EDA on an e-commerce dataset with visualizations',
    urlNotebook: '#',
    imagePreview: 'https://via.placeholder.com/400x250?text=EDA',
    technos: ['Python', 'Pandas', 'Matplotlib'],
    dateCreation: '2024-01-15'
  },
  {
    id: 2,
    titre: 'Machine Learning Prediction',
    description: 'Regression model to predict real estate prices',
    urlNotebook: '#',
    imagePreview: 'https://via.placeholder.com/400x250?text=ML+Model',
    technos: ['Scikit-learn', 'XGBoost', 'Numpy'],
    dateCreation: '2024-02-20'
  },
  {
    id: 3,
    titre: 'Deep Learning - Classification',
    description: 'CNN for image classification using TensorFlow',
    urlNotebook: '#',
    imagePreview: 'https://via.placeholder.com/400x250?text=Deep+Learning',
    technos: ['TensorFlow', 'Keras', 'OpenCV'],
    dateCreation: '2024-03-10'
  }
];
</script>

<template>
  <div class="projets-container">
    <h1>My Projects</h1>
    
    <div class="tabs-container">
      <button 
        @click="activeTab = 'app'"
        :class="['tab-button', { active: activeTab === 'app' }]"
      >
        <Logo type="appdev" :size="18" />
        <span>App Development</span>
      </button>
      <button 
        @click="activeTab = 'datascience'"
        :class="['tab-button', { active: activeTab === 'datascience' }]"
      >
        <Logo type="datascience" :size="18" />
        <span>Data Science</span>
      </button>
    </div>

    <!-- App Development Tab -->
    <div v-show="activeTab === 'app'" class="tab-content">
      <div class="projets-grid">
        <ProjetComponents 
          v-for="projet in projetsApp"
          :key="projet.id"
          :projet="projet"
        />
      </div>
    </div>

    <!-- Data Science Tab -->
    <div v-show="activeTab === 'datascience'" class="tab-content">
      <div class="notebooksGrid">
        <div 
          v-for="notebook in notebooksDataScience"
          :key="notebook.id"
          class="notebook-card"
        >
          <div class="notebook-header">
            <h3>{{ notebook.titre }}</h3>
          </div>
          <div class="notebook-image">
            <img :src="notebook.imagePreview" :alt="notebook.titre" />
          </div>
          <div class="notebook-content">
            <p class="notebook-description">{{ notebook.description }}</p>
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
              <a :href="notebook.urlNotebook" target="_blank" class="notebook-link">
                View notebook →
              </a>
            </div>
          </div>
        </div>
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
  color: var(--text-primary);
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
  border: 2px solid var(--border-light);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
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
  border-color: var(--color-secondary);
  /* color: var(--color-secondary); */
}

.tab-button.active {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
  color: black;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.projets-grid,
.notebooksGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.notebook-card {
  background: var(--bg-primary);
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 20px auto;
  width: 100%;
}

.notebook-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px var(--shadow-hover);
}

.notebook-header {
  padding: 20px;
  background-color: var(--color-primary);
  color: white;
}

.notebook-header h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.notebook-image {
  width: 100%;
  height: 200px;
  background-color: var(--bg-secondary);
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

.notebook-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-size: 0.95rem;
  flex-grow: 1;
}

.notebook-technos {
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

.notebook-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-light);
  padding-top: 15px;
}

.notebook-date {
  font-size: 0.85rem;
  color: var(--text-tertiary);
}

.notebook-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.notebook-link:hover {
  opacity: 0.7;
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
