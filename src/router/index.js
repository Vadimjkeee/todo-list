import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TaskList from '../views/TaskList.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
