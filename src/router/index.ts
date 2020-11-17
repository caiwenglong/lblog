import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/Layout.vue'

Vue.use(VueRouter)

export const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    name: 'layout',
    redirect: '/article',
    component: Layout,
    children: [
      {
        path: '/article',
        name: 'article',
        redirect: '/article-list',
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
    path: '/page-article',
    name: 'pageArticle',
    component: Layout,
    children: [
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article/Article.vue'),
        children: [
          {
            path: '/article-list',
            name: 'article-list',
            component: () => import('@/views/article/components/ArticleList.vue'),
            meta: { title: '文章详细页' }
          },
          {
            path: '/article-writing',
            name: 'article-writing',
            component: () => import('@/views/article/components/ArticleWriting.vue'),
            meta: { title: '文章写作页面' }
          }
        ]
      }
    ],
    meta: { title: '文章1' }
  }
]

export const asyncRoutes: RouteConfig[] = []

const createRouter = () => new VueRouter({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
