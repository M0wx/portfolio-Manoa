import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // On pointe vers le dossier "pages"
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/cv',
    name: 'cv',
    component: () => import('../pages/Cv.vue')
  },
  {
    path: '/projets',
    name: 'projets',
    component: () => import('../pages/Projets.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router