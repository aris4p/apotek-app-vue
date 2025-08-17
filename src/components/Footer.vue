<template>
  <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
    <aside>
      <p>Copyright © {{ currentYear }} - All rights reserved by ACME Industries Ltd</p>
    </aside>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
