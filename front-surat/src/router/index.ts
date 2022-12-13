import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store';

import userLogin from '../views/regist/userLogin.vue'
import homePage from '../views/homePage.vue'
import daftarUser from '../views/superAdmin/daftarUser.vue'
import suratMasuk from '../views/suratMasuk.vue'
import suratKeluar from '../views/suratKeluar.vue'
// import Home from '../views/Home.vue'
// import tambahSurat from '../views/tambahSurat.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: userLogin
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: homePage,
    beforeEnter: (to, from, next) => {
      if (store.state.role === null) {
        alert('Need login firstly!')
        router.go(-1)
      } else {
        next()
      }
    },
  },
  {
    path: '/daftarUser',
    name: 'daftarUser',
    component: daftarUser,
    beforeEnter: (to, from, next) => {
      if (store.state.role === null || store.state.role !== 'super_admin') {
        alert('Contact Super Admin to use this feature!')
        router.push('/homePage')
      } else {
        next()
      }
    },
  },
  {
    path: '/suratMasuk',
    name: 'suratMasuk',
    component: suratMasuk
  },
  {
    path: '/suratKeluar',
    name: 'suratKeluar',
    component: suratKeluar
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && store.state.id === null) {
    alert('Need to login first!')
    next({ name: 'login' })
  }
  else next()
})

export default router
