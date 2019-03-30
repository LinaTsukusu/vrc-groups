import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },

    {
      path: '/search',
      name: 'search',
      alias: '/',
      component: () => import('@/views/SearchView.vue'),
    },

    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/DetailView.vue'),
    },

    {
      path: '/setting/:id',
      name: 'setting',
      component: () => import('@/views/SettingView.vue'),
    },
  ],
})
