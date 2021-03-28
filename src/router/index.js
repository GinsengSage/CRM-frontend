import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../layout/Layout.vue'),
    children: [
      {
        path: 'user-home',
        name: 'UserHome',
        component: () => import('../views/UserHome'),
      },
      {
        path: 'disciplines',
        name: 'Disciplines',
        component: () => import('../views/Disciplines'),
      },
      {
        path: 'lectures',
        name: 'Lectures',
        component: () => import('../views/Lectures'),
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () => import('../views/Tasks'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
