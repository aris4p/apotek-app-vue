<template>
  <footer class="footer">
          <div class="container-fluid d-flex justify-content-between">
            <nav class="pull-left">
             
            </nav>
            <div class="copyright">
              {{currentYear}}, made with <i class="fa fa-heart heart text-danger"></i> by
              <a href="http://www.themekita.com">ThemeKita</a>
            </div>
            <div>
              
            </div>
          </div>
        </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
