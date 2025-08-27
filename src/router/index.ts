import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProdukView from '../views/ProdukView.vue'
import TransaksiView from '../views/TransaksiView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/produk',
      name: 'produk',
      component: ProdukView,
      meta: { requiresAuth: true }
    },
    {
      path: '/transaksi',
      name: 'transaksi',
      component: TransaksiView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
  ],
})

// Fungsi untuk mengecek status authentication
function isAuthenticated() {
  // Ganti dengan logic authentication Anda
  const token = localStorage.getItem('auth_token')
  // Atau bisa cek dari sessionStorage
  // const token = sessionStorage.getItem('auth_token')
  
  // Anda juga bisa menambahkan validasi token di sini
  // Misalnya cek expiry date, format token, dll
  
  return !!token // return true jika token ada dan valid
}

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const userIsAuthenticated = isAuthenticated()
  
  // Jika halaman membutuhkan auth tapi user belum login
  if (to.meta.requiresAuth && !userIsAuthenticated) {
    // Redirect ke login
    next({ name: 'login' })
  }
  // Jika user sudah login tapi mau ke halaman login
  else if (to.name === 'login' && userIsAuthenticated) {
    // Redirect ke home/dashboard
    next({ name: 'home' })
  }
  // Lanjutkan navigasi normal
  else {
    next()
  }
})

export default router