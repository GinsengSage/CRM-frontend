import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
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
        path: 'lectures/:disciplineId',
        name: 'Lectures',
        component: () => import('../views/Lectures'),
        props: true
      },
      {
        path: 'tasks/:disciplineId',
        name: 'Tasks',
        component: () => import('../views/Tasks'),
        props: true
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('../views/Notifications'),
      },
      {
        path: 'students',
        name: 'Students',
        component: () => import('../views/Students'),
      },
      {
        path: 'task/:id',
        name: 'Task',
        component: () => import('../views/Task'),
        props: true
      },
      {
        path: 'lecture/:id',
        name: 'Lecture',
        component: () => import('../views/Lecture'),
        props: true
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
