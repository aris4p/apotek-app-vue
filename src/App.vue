<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

const route = useRoute()

// Daftar route yang tidak menggunakan layout utama
const routesWithoutLayout = ['login']

// Computed untuk mengecek apakah route saat ini perlu layout
const showMainLayout = computed(() => {
  return !routesWithoutLayout.includes(route.name as string)
})
</script>

<template>
  <!-- Layout untuk halaman yang membutuhkan sidebar, header, footer -->
  <div v-if="showMainLayout" class="main-panel">
    <Sidebar />
    <Header />
    <main class="container">
      <RouterView />
    </main>
    <Footer />
  </div>
  
  <!-- Layout untuk halaman login (tanpa sidebar, header, footer) -->
  <div v-else>
    <RouterView />
  </div>
</template>