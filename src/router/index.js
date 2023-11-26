// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/auth/register',
    component: () => import('@/views/auth/register')
  },
  {
    path: '/auth/login',
    component: () => import('@/views/auth/login')
  },
  {
    path: '/panel',
    component: () => import('@/views/dashboard/panel')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
