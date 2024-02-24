import { createRouter, createWebHistory } from 'vue-router'
import ListaAnunturi from '../views/ListaAnunturi.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListaAnunturi
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/Profil.vue')
    },
    {
      path: '/produseUser',
      name: 'produseUser',
      component: () => import('../views/ProduseUser.vue')
    },
  ]
})

export default router
