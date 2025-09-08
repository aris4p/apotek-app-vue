<template>
  <div class="page-header">
    <h3 class="fw-bold mb-3">{{ title }}</h3>
    <ul class="breadcrumbs mb-3">
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <li :class="crumb.class">
          <a v-if="crumb.link" :href="crumb.link">
            <i v-if="crumb.icon" :class="crumb.icon"></i>
            <span v-if="!crumb.icon">{{ crumb.text }}</span>
          </a>
          <span v-else>{{ crumb.text }}</span>
        </li>
        <li v-if="index < breadcrumbs.length - 1" class="separator">
          <i class="icon-arrow-right"></i>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Breadcrumb {
  text: string
  link?: string
  icon?: string
  class?: string
}

export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    breadcrumbs: {
      type: Array as () => Breadcrumb[],
      default: () => []
    }
  }
})
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>