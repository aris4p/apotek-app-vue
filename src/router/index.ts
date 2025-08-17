import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProdukView from '../views/ProdukView.vue'
import TransaksiView from '../views/TransaksiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/produk',
      name: 'produk',
      component: ProdukView,
    },
    {
      path: '/transaksi',
      name: 'transaksi',
      component: TransaksiView,
    },
  ],
})

export default router
