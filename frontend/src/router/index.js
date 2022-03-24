import { createRouter, createWebHistory } from 'vue-router'

import MenuView from '@/views/MenuView'
import ProductView from '@/views/ProductView'
import BasketView from '@/views/BasketView'

const routes = [
  {
    path: '/',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/products/:id',
    name: 'product',
    component: ProductView
  },
  {
    path: '/basket',
    name: 'basket',
    component: BasketView
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
