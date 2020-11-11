import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/Layout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'layout',
    redirect: '/article',
    component: Layout,
    children: [
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article/Article.vue'),
        children: [
          {
            path: '/article-list',
            component: () => import('@/views/article/components/ArticleList.vue'),
            meta: { title: 'vue文章' }
          }
        ],
        meta: { title: '文章列表' }
      }
    ],
    meta: { title: '文章' }
  },
  {
    path: '/article',
    name: 'article',
    component: Layout,
    children: [
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article/Article.vue'),
        children: [
          {
            path: '/article-list',
            component: () => import('@/views/article/components/ArticleList.vue'),
            meta: { title: 'vue文章1' }
          }
        ],
        meta: { title: '文章列表1' }
      }
    ],
    meta: { title: '文章1' }
  }
]

const router = new VueRouter({
  routes
})

export default router
