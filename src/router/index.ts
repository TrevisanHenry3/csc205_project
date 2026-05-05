import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores/login';
import HomeView from '../views/HomeView.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import StudentList from '@/views/StudentListView.vue'
import MainView from '@/views/MainView.vue'
import ScheduleMetric from '@/views/ScheduleMetric.vue'

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
      meta: { requiresLogin: true }
    },
    {
      path: '/change',
      name: 'change',
      component: ChangePassword,
      meta: { requiresLogin: true }
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: { requiresLogin: true }
    },
    {
      path: '/metrics',
      name: 'metrics',
      component: ScheduleMetric,
      meta: { requiresLogin: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = useLoginStore();
  const isLogin = !!token.userToken;

  if (to.meta.requiresLogin && !isLogin) {
    next({ name: 'list' });
  } else {
    next();
  }
})

export default router
