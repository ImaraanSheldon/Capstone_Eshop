import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import RecentProducts from '@/views/recentProducts.vue'
import featuredProducts from '@/views/featuredProducts.vue'
import GameDeals from '@/views/gameDeals.vue'
import ComingSoon from '@/views/comingSoon.vue'
import SearchFunc from '@/views/searchFunc.vue'
import DiscoverNew from '@/views/discoverNew.vue'

const routes = [
  {
    path: '/search',
    name: 'search',
    component: SearchFunc
    },
  {
    path: '/',
    name: 'discover',
    component: DiscoverNew
    },
  {
    path: '/recent',
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
  {
    path: '/coming',
    name: 'comingSoon',
    component: ComingSoon
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
