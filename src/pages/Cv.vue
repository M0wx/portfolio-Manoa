<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import profileImage from '../assets/sunny-removebg-preview.png';

const lang = ref<'fr' | 'en'>('fr');
let observerInstance: IntersectionObserver | null = null;

const initObserver = () => {
  // Déconnecter l'ancien observateur s'il existe
  if (observerInstance) {
    observerInstance.disconnect();
  }

  observerInstance = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerInstance?.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach((el) => {
    // Si l'élément n'a pas encore la classe visible, on l'observe
    if (!el.classList.contains('visible')) {
      observerInstance?.observe(el);
    }
  });
};

const toggleLang = async (targetLang: 'fr' | 'en') => {
  lang.value = targetLang;
  // Attendre la mise à jour du DOM pour réinitialiser les observations
  await nextTick();
  initObserver();
};

onMounted(() => {
  initObserver();
});

const printCV = () => {
  window.print();
};
</script>

<template>
  <div class="cv-page">
    <!-- Fond décoratif (Blobs subtils similaires à la Home page) -->
    <div class="cv-background-blobs">
      <div class="blob blob-orange"></div>
      <div class="blob blob-blue"></div>
    </div>

    <!-- En-tête / Actions de contrôle -->
    <div class="cv-actions animate-on-scroll">
      <!-- Sélecteur de langue -->
      <div class="lang-selector">
        <button @click="toggleLang('fr')" :class="{ active: lang === 'fr' }">FR</button>
        <button @click="toggleLang('en')" :class="{ active: lang === 'en' }">EN</button>
      </div>

      <!-- Lien vers les Projets -->
      <router-link to="/projets" class="btn-projects">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>{{ lang === 'fr' ? 'Voir mes projets' : 'View my projects' }}</span>
      </router-link>

      <!-- Bouton d'impression -->
      <button @click="printCV" class="btn-print">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        <span>{{ lang === 'fr' ? 'Imprimer / Exporter en PDF' : 'Print / Export as PDF' }}</span>
      </button>
    </div>

    <div class="cv-container animate-on-scroll">
      <!-- Section En-tête Profil -->
      <header class="cv-header">
        <div class="profile-photo-container">
          <img :src="profileImage" alt="Manoasoa" class="cv-profile-photo" />
        </div>
        
        <div class="profile-info">
          <h1>Manoasoa <span class="name-highlight">Andrianaliarimanana</span></h1>
          <h2>{{ lang === 'fr' ? 'Développeur Logiciel & Data / IA' : 'Software Developer & Data / AI' }}</h2>
          <p class="profile-tagline">
            <template v-if="lang === 'fr'">
              Étudiant en ingénierie informatique passionné par le développement d'applications performantes, l'analyse de données et l'intelligence artificielle. Fort d'une expérience pratique en développement full-stack.
            </template>
            <template v-else>
              Computer engineering student passionate about building high-performance applications, data analysis, and artificial intelligence. Backed by practical experience in full-stack development.
            </template>
          </p>
        </div>

        <div class="profile-meta">
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="meta-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>{{ lang === 'fr' ? 'Né le 30 novembre 2003 (22 ans)' : 'Born November 30, 2003 (22 yo)' }}</span>
          </div>
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="meta-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>{{ lang === 'fr' ? 'Homme' : 'Male' }}</span>
          </div>
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="meta-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Antananarivo, Madagascar</span>
          </div>
        </div>
      </header>

      <!-- Corps du CV en 2 colonnes -->
      <div class="cv-grid">
        <!-- Colonne Gauche : Formations puis Expériences -->
        <main class="cv-main-col">
          <!-- Section Formations (Maintenant en premier) -->
          <section class="cv-section timeline-section animate-on-scroll">
            <div class="section-title">
              <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
              <h3>{{ lang === 'fr' ? 'Formations & Diplômes' : 'Education & Degrees' }}</h3>
            </div>

            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-date">{{ lang === 'fr' ? 'Actuel (4e Année)' : 'Current (4th Year)' }}</span>
                  <h4>{{ lang === 'fr' ? 'Ingénierie en Informatique & Télécommunication' : 'Computer Science & Telecommunications Engineering' }}</h4>
                  <h5>{{ lang === 'fr' ? 'Option : Informatique Statistique Appliquée & Intelligence Artificielle' : 'Specialization: Applied Statistical Computer Science & Artificial Intelligence' }}</h5>
                  <p class="timeline-institution">Institut Supérieur Polytechnique de Madagascar (ISPM)</p>
                  <p class="timeline-desc">
                    <span v-if="lang === 'fr'">Spécialisation dans le traitement de données volumineuses, la modélisation statistique et les algorithmes d'apprentissage automatique (Machine Learning/Deep Learning).</span>
                    <span v-else>Specializing in big data processing, statistical modeling, and machine learning/deep learning algorithms.</span>
                  </p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-date">{{ lang === 'fr' ? 'Diplômé' : 'Graduated' }}</span>
                  <h4>{{ lang === 'fr' ? 'Licence en Informatique & Télécommunication' : "Bachelor's Degree in Computer Science & Telecommunications" }}</h4>
                  <p class="timeline-institution">Institut Supérieur Polytechnique de Madagascar (ISPM)</p>
                  <p class="timeline-desc">
                    <span v-if="lang === 'fr'">Acquisition de bases solides en programmation orientée objet, architecture des réseaux, bases de données relationnelles et génie logiciel.</span>
                    <span v-else>Acquired solid foundations in object-oriented programming, network architecture, relational databases, and software engineering.</span>
                  </p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-date">{{ lang === 'fr' ? 'Diplômé' : 'Graduated' }}</span>
                  <h4>{{ lang === 'fr' ? 'Baccalauréat Scientifique (Série C)' : 'Scientific Baccalaureate (Series C)' }}</h4>
                  <p class="timeline-institution">{{ lang === 'fr' ? 'Enseignement Secondaire' : 'Secondary Education' }}</p>
                  <p class="timeline-desc">
                    <span v-if="lang === 'fr'">Spécialité Mathématiques et Sciences Physiques.</span>
                    <span v-else>Specialize in Mathematics and Physics.</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Section Expérience (Maintenant après formations) -->
          <section class="cv-section animate-on-scroll">
            <div class="section-title">
              <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              <h3>{{ lang === 'fr' ? 'Expérience Professionnelle' : 'Work Experience' }}</h3>
            </div>

            <div class="experience-list">
              <div class="experience-item">
                <div class="experience-header">
                  <div class="job-info">
                    <h4>{{ lang === 'fr' ? 'Développeur Full Stack (Stagiaire)' : 'Full Stack Developer Intern' }}</h4>
                    <span class="company-name">OBS-OI</span>
                  </div>
                  <span class="duration">{{ lang === 'fr' ? 'Nov. 2024 - Mai 2025 (6 mois)' : 'Nov. 2024 - May 2025 (6 months)' }}</span>
                </div>
                <div class="experience-body">
                  <p>{{ lang === 'fr' ? "Intégration d'une équipe de développement dynamique sur des solutions d'entreprise." : "Integrated a dynamic development team working on enterprise solutions." }}</p>
                  <ul v-if="lang === 'fr'">
                    <li>Conception et développement de fonctionnalités full-stack pour les applications internes et clients.</li>
                    <li>Utilisation de technologies spécialisées et de frameworks modernes tels que <strong>Omnis</strong> et <strong>JavaScript</strong>.</li>
                    <li>Gestion, modélisation et optimisation des bases de données relationnelles avec <strong>PostgreSQL</strong>.</li>
                    <li>Résolution de bugs, tests et amélioration des performances générales des applications.</li>
                  </ul>
                  <ul v-else>
                    <li>Design and development of full-stack features for internal and client applications.</li>
                    <li>Use of specialized technologies and modern frameworks such as <strong>Omnis</strong> and <strong>JavaScript</strong>.</li>
                    <li>Management, modeling, and optimization of relational databases using <strong>PostgreSQL</strong>.</li>
                    <li>Bug fixing, testing, and improving general application performance.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- Appel à l'action vers les Projets -->
          <div class="projects-cta animate-on-scroll">
            <p>{{ lang === 'fr' ? 'Intéressé par mes réalisations ?' : 'Interested in my work?' }}</p>
            <router-link to="/projets" class="cta-link">
              <span>{{ lang === 'fr' ? 'Découvrez mes projets' : 'Check out my projects' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>
        </main>

        <!-- Colonne Droite : Compétences & Technologies -->
        <aside class="cv-sidebar-col">
          <section class="cv-section animate-on-scroll">
            <div class="section-title">
              <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              <h3>{{ lang === 'fr' ? 'Compétences Techniques' : 'Technical Skills' }}</h3>
            </div>

            <div class="skills-grid">
              <!-- JS/TS -->
              <div class="skill-card">
                <div class="skill-icon-wrap js-ts">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div class="skill-info">
                  <h4>JS / TypeScript</h4>
                  <span class="skill-level">{{ lang === 'fr' ? 'Avancé' : 'Advanced' }}</span>
                </div>
              </div>

              <!-- React -->
              <div class="skill-card">
                <div class="skill-icon-wrap react">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(30 12 12)"/>
                    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(90 12 12)"/>
                    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(150 12 12)"/>
                  </svg>
                </div>
                <div class="skill-info">
                  <h4>React TS</h4>
                  <span class="skill-level">{{ lang === 'fr' ? 'Intermédiaire' : 'Intermediate' }}</span>
                </div>
              </div>

              <!-- Vue -->
              <div class="skill-card">
                <div class="skill-icon-wrap vue">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 18L4 4h4.5l3.5 6 3.5-6H20L12 18z"/>
                  </svg>
                </div>
                <div class="skill-info">
                  <h4>Vue.js</h4>
                  <span class="skill-level">{{ lang === 'fr' ? 'Intermédiaire' : 'Intermediate' }}</span>
                </div>
              </div>

              <!-- Node js -->
              <div class="skill-card">
                <div class="skill-icon-wrap node">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L4 7v10l8 5 8-5V7L12 2z"/>
                    <polyline points="12 2 12 22"/>
                    <polyline points="12 12 20 7"/>
                    <polyline points="12 12 4 7"/>
                  </svg>
                </div>
                <div class="skill-info">
                  <h4>Node.js</h4>
                  <span class="skill-level">{{ lang === 'fr' ? 'Intermédiaire' : 'Intermediate' }}</span>
                </div>
              </div>

              <!-- Python -->
              <div class="skill-card">
                <div class="skill-icon-wrap python">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v20M5 12h14M12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5M12 22a5 5 0 0 1-5-5v-5a5 5 0 0 1 5-5"/>
                  </svg>
                </div>
                <div class="skill-info">
                  <h4>Python</h4>
                  <span class="skill-level">{{ lang === 'fr' ? 'Intermédiaire' : 'Intermediate' }}</span>
                </div>
              </div>

              <!-- PostgreSQL -->
              <div class="skill-card">
                <div class="skill-icon-wrap database">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
                  </svg>
                </div>
                <div class="skill-info">
                  <h4>PostgreSQL</h4>
                  <span class="skill-level">{{ lang === 'fr' ? 'Avancé' : 'Advanced' }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Section Langues & Info complémentaire -->
          <section class="cv-section animate-on-scroll">
            <div class="section-title">
              <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <h3>{{ lang === 'fr' ? 'Langues' : 'Languages' }}</h3>
            </div>
            <ul class="languages-list">
              <li>
                <strong>{{ lang === 'fr' ? 'Français' : 'French' }} :</strong>
                <span>{{ lang === 'fr' ? 'Courant' : 'Fluent' }}</span>
              </li>
              <li>
                <strong>{{ lang === 'fr' ? 'Malagasy' : 'Malagasy' }} :</strong>
                <span>{{ lang === 'fr' ? 'Langue maternelle' : 'Native speaker' }}</span>
              </li>
              <li>
                <strong>{{ lang === 'fr' ? 'Anglais' : 'English' }} :</strong>
                <span>{{ lang === 'fr' ? 'Technique / Intermédiaire' : 'Technical / Intermediate' }}</span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Conteneur principal */
.cv-page {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 10px 60px 10px;
  z-index: 2;
}

/* Blobs Décoratifs de Fond */
.cv-background-blobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.blob {
  position: absolute;
  filter: blur(80px) opacity(0.12);
  border-radius: 50%;
}

.blob-orange {
  width: 400px;
  height: 400px;
  background-color: var(--color-secondary);
  top: -100px;
  right: -100px;
}

.blob-blue {
  width: 500px;
  height: 500px;
  background-color: var(--color-primary);
  bottom: -150px;
  left: -200px;
}

/* Boutons et actions */
.cv-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  position: relative;
  z-index: 10;
  flex-wrap: wrap;
}

/* Sélecteur de langue */
.lang-selector {
  display: flex;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 8px;
  padding: 3px;
  gap: 4px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.lang-selector button {
  background: transparent;
  border: none;
  padding: 7px 14px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-selector button:hover {
  color: var(--color-primary);
}

.lang-selector button.active {
  background-color: var(--color-primary);
  color: white;
}

.btn-projects {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 2px solid var(--border-light);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-projects:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px var(--shadow-hover);
}

.btn-projects svg {
  transition: transform 0.3s ease;
}

.btn-projects:hover svg {
  transform: scale(1.1);
}

.btn-print {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 2px solid var(--border-light);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease;
}

.btn-print:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px var(--shadow-hover);
}

.btn-print svg {
  transition: transform 0.3s ease;
}

.btn-print:hover svg {
  transform: scale(1.1);
}

/* Structure du document CV */
.cv-container {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  box-shadow: 0 10px 30px var(--shadow-color);
  padding: 50px;
  position: relative;
  z-index: 3;
}

/* En-tête */
.cv-header {
  border-bottom: 2px solid var(--border-light);
  padding-bottom: 35px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.profile-photo-container {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(255, 174, 0, 0.1));
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-shadow: 0 6px 15px var(--shadow-color);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.profile-photo-container:hover {
  transform: scale(1.05);
  border-color: var(--color-secondary);
}

.cv-profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: 10px;
}

.name-highlight {
  color: var(--color-primary);
}

.profile-info h2 {
  font-size: 1.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin-bottom: 20px;
}

.profile-tagline {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1.05rem;
  max-width: 700px;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--bg-secondary);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border-light);
  min-width: 280px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.meta-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Grille du CV */
.cv-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 50px;
}

.cv-section {
  margin-bottom: 40px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 10px;
  margin-bottom: 25px;
}

.section-icon {
  width: 22px;
  height: 22px;
  color: var(--color-primary);
}

.section-title h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Expériences */
.experience-item {
  padding: 20px;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.experience-item:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.job-info h4 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
}

.company-name {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.95rem;
}

.duration {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  background-color: var(--bg-tertiary);
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}

.experience-body p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 12px;
}

.experience-body ul {
  padding-left: 20px;
  color: var(--text-secondary);
  font-size: 0.92rem;
}

.experience-body li {
  margin-bottom: 6px;
  line-height: 1.5;
}

/* Timeline Formations */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 2px;
  height: calc(100% - 10px);
  background-color: var(--border-light);
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  top: 5px;
  left: -30px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--bg-primary);
  border: 3px solid var(--color-primary);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-marker {
  background-color: var(--color-primary);
  transform: scale(1.2);
}

.timeline-date {
  display: inline-block;
  font-size: 0.8rem;
  color: white;
  background-color: var(--color-primary);
  padding: 2px 10px;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.timeline-content h5 {
  font-size: 0.95rem;
  color: var(--color-primary);
  font-weight: 600;
  margin: 4px 0;
}

.timeline-institution {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.timeline-desc {
  font-size: 0.9rem;
  color: var(--text-tertiary);
  margin-top: 8px;
  line-height: 1.5;
}

/* Appel à l'action Projets */
.projects-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  margin-top: 40px;
  background-color: var(--bg-secondary);
  border: 2px dashed var(--border-light);
  border-radius: 12px;
  text-align: center;
}

.projects-cta p {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-primary);
  color: white;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-link:hover {
  background-color: var(--color-secondary);
  color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-hover);
}

.cta-link svg {
  transition: transform 0.3s ease;
}

.cta-link:hover svg {
  transform: translateX(4px);
}

/* Compétences */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.skill-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateX(5px);
  border-color: var(--color-primary);
  box-shadow: 0 4px 10px var(--shadow-color);
}

.skill-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

/* Couleurs spécifiques des logos */
.js-ts { background-color: rgba(247, 223, 30, 0.15); color: #f7df1e; }
.react { background-color: rgba(97, 218, 251, 0.15); color: #61dafb; }
.vue { background-color: rgba(65, 184, 131, 0.15); color: #41b883; }
.node { background-color: rgba(63, 191, 63, 0.15); color: #3fbf3f; }
.python { background-color: rgba(55, 115, 166, 0.15); color: #3773a6; }
.database { background-color: rgba(51, 103, 145, 0.15); color: #336791; }

.skill-card:hover .skill-icon-wrap {
  transform: scale(1.1);
}

.skill-info h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.skill-level {
  font-size: 0.78rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

/* Langues */
.languages-list {
  list-style: none;
  padding: 0;
}

.languages-list li {
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: var(--text-secondary);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed var(--border-light);
  padding-bottom: 6px;
}

.languages-list li:last-child {
  border-bottom: none;
}

/* Animations au Scroll */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Style Responsive */
@media (max-width: 900px) {
  .cv-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-photo-container {
    margin-bottom: 20px;
  }

  .profile-meta {
    width: 100%;
    min-width: 0;
  }

  .cv-actions {
    justify-content: center;
  }

  .cv-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .cv-container {
    padding: 30px 20px;
  }
}

/* ============================================
   STYLE D'IMPRESSION (PRINT)
   ============================================ */
@media print {
  /* Cacher les éléments superflus du site */
  header, nav, footer, .cv-actions, .cv-background-blobs, .projects-cta {
    display: none !important;
  }

  body, html {
    background-color: white !important;
    color: black !important;
  }

  main {
    padding: 0 !important;
    background-color: white !important;
  }

  .cv-page {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .cv-container {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    background: transparent !important;
  }

  .profile-meta {
    background-color: #f8f9fa !important;
    border: 1px solid #e9ecef !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .experience-item, .skill-card {
    background-color: #f8f9fa !important;
    border: 1px solid #e9ecef !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Forcer l'opacité et les transformations à l'état visible pour l'impression */
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }

  /* Gestion des sauts de page */
  .cv-section {
    page-break-inside: avoid;
  }
}
</style>


