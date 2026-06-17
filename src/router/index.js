import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin/usuarios',
      name: 'admin-users',
      component: () => import('@/views/AdminUsersView.vue'),
    },
    // ==========================================
    // ¡AÑADE ESTA NUEVA RUTA AQUÍ ABAJO!
    // ==========================================
    {
      path: '/admin/destacados',
      name: 'admin-featured',
      component: () => import('@/views/AdminFeaturedView.vue'),
    }
  ],
})

export default router