import { createRouter, createWebHistory } from 'vue-router'

import MenuView from '@/views/MenuView'
import ProductView from '@/views/ProductView'
import BasketView from '@/views/BasketView'
import LoginView from '@/views/LoginView'
import SupplierView from '@/views/SupplierView'
import CompletedBasketsView from '@/views/CompletedBasketsView'

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
    path: '/suppliers/:id',
    name: 'supplier',
    component: SupplierView
  },
  {
    path: '/basket',
    name: 'basket',
    component: BasketView
  },
  {
    path: '/basket/all',
    name: 'all_basket',
    component: CompletedBasketsView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
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
