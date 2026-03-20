import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import StudentList from '@/views/StudentListView.vue'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/list',
      name: 'list',
      component: StudentList,
    },
    {
      path: '/change',
      name: 'change',
      component: ChangePassword,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
    }
  ],
})

export default router
