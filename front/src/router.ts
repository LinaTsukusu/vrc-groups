import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      beforeEnter(to, from, next) {
        if (!store.state.user) {
          next({path: '/login', params: {to: to.path}})
        } else {
          next()
        }
      },
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
      beforeEnter(to, from, next) {
        const user = store.state.user
        const userData = store.state.userData
        if (!user) {
          next({path: '/login', params: {to: to.path || '/'}})
        } else if (userData!.ownerGroups.includes(to.params.id)) {
          next({path: '/'})
        } else {
          next()
        }
      },
    },
  ],
})
