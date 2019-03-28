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
      component: () => import('@/views/About.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
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
      component: () => import('@/views/Search.vue'),
    },

    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/Detail.vue'),
    },

    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting.vue'),
      beforeEnter(to, from, next) {
        const user = store.state.user
        const userData = store.state.userData
        if (!user) {
          next({path: '/login', params: {to: to.path}})
        } else if (userData!.ownerGroups.length === 0) {
          next({path: '/'})
        } else {
          next()
        }
      },
    },
  ],
})
