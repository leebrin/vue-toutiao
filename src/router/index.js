import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import { Dialog } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/'),
    meta: {
      requireAuth: false,
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/'),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: '/weather',
        name: 'weather',
        component: () => import('@/views/weather/'),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: {
          requireAuth: false,
        },
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
    meta: {
      requireAuth: true,
    },
  },
]

const router = new VueRouter({
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (store.state.user) {
//       return next()
//     } else {
//       Toast('请登录后访问')
//     }
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需登录才可访问，确认登录吗',
    })
      .then(() => {
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath,
          },
        })
      })
      .catch(() => {
        next(false)
      })
  } else {
    next()
  }
})
export default router
