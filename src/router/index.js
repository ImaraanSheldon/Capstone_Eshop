import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import RecentProducts from '@/views/recentProducts.vue'
import featuredProducts from '@/views/featuredProducts.vue'
import GameDeals from '@/views/gameDeals.vue'
import ComingSoon from '@/views/comingSoon.vue'
import SearchFunc from '@/views/searchFunc.vue'
import DiscoverNew from '@/views/discoverNew.vue'
import bestSellers from '@/views/bestSellers.vue'
import cartPage from '@/views/cartPage.vue'
import SingleProduct from '@/views/singleProduct.vue'
import LoginPage from '@/views/loginPage.vue'
import AdminView from '@/views/adminView.vue'
import { useCookies } from 'vue3-cookies'
import PfpPage from '@/views/pfpPage.vue'
import ContactUs from '@/views/contactUs.vue'
const {cookies} = useCookies()

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
    component: bestSellers
  },
  {
    path: '/coming',
    name: 'comingSoon',
    component: ComingSoon
  },
  {
    path: '/cart',
    name: 'cartPage',
    component: cartPage
  },
  {
    path: '/single/:id',
    name: 'ProductDetail',
    component: SingleProduct
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/logout',
    name: 'Logout',
    component: ()=>import('@/views/loginPage.vue'),
    beforeEnter(){
      cookies.remove('legitUser')
      router.push({name:'login'})
    }
  },
  {
    path: '/admin',
    name: 'adminView',
    component: AdminView
  },
  {
    path: '/pfp',
    name: 'pfp',
    component: PfpPage
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactUs
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
