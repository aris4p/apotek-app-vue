<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();




</script>

<template>
  <main>
    <section>
    <div class="hero bg-base-200  w-full">
      <div class="hero-content w-full flex flex-col items-center justify-center">
        <div>
          <h1 class="text-5xl font-bold">Selamat datang kembali, {{authStore.user?.name}}</h1>
  
        </div>
      </div>
    </div>
    </section>
  </main>
</template>
