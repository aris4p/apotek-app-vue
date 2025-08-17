<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1 mx-auto max-w-7xl px-8 py-20">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
