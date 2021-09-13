// 配置路由
// 1 加载包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 2 注册插件
Vue.use(VueRouter)
// 3 配置路由
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login.vue')
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/register.vue')
    },
    {
      name: 'personal',
      path: '/personal',
      component: () => import('@/views/personal.vue')
    },
    {
      path: '/edit_profile',
      component: () => import('@/views/edit_profile.vue')
    },
    {
      path: '/home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/articalDetail',
      component: () => import('@/views/articalDetail.vue')
    },
    {
      path: '/myFollow',
      component: () => import('@/views/myFollow.vue')
    },
    {
      path: '/myStar',
      component: () => import('@/views/myStar.vue')
    },
    {
      path: '/comment',
      component: () => import('@/views/comment.vue')
    },
    {
      path: '/category',
      component: () => import('@/views/category.vue')
    },
    {
      path: '/search',
      component: () => import('@/views/search.vue')
    },
    {
      path: '/notFound',
      component: () => import('@/views/notFound.vue')
    },
    {
      path: '/myComment',
      component: () => import('@/views/myComment.vue')
    }
  ]
})
// 4 导出是实例
export default router
