import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import RecentProducts from '@/views/recentProducts.vue'
import featuredProducts from '@/views/featuredProducts.vue'
import GameDeals from '@/views/gameDeals.vue'

const routes = [
  {
    path: '/',
    name: 'recentProducts',
    component: RecentProducts
  },
  {
    path: '/featured',
    name: 'featuredProducts',
    component: featuredProducts
  },
  {
    path: '/deals',
    name: 'gameDeals',
    component: GameDeals
  },
  {
    path: '/sellers',
    name: 'bestSellers',
    component: GameDeals
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
