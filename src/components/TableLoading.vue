<template>
  <div class="table-loading">
    <!-- Table Header Skeleton -->
    <div class="table-header">
      <div 
        v-for="col in columns" 
        :key="`header-${col}`" 
        class="header-cell skeleton"
      ></div>
    </div>
    
    <!-- Table Body Skeleton -->
    <div class="table-body">
      <div 
        v-for="row in rows" 
        :key="`row-${row}`" 
        class="table-row"
      >
        <div 
          v-for="col in columns" 
          :key="`cell-${row}-${col}`" 
          class="body-cell skeleton"
          :style="{ 
            width: getRandomWidth(),
            animationDelay: `${(row + col) * 0.1}s` 
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableLoading',
  props: {
    rows: {
      type: Number,
      default: 5
    },
    columns: {
      type: Number,
      default: 4
    },
    height: {
      type: String,
      default: '20px'
    }
  },
  methods: {
    getRandomWidth() {
      const widths = ['60%', '80%', '70%', '90%', '65%', '85%'];
      return widths[Math.floor(Math.random() * widths.length)];
    }
  }
}
</script>

<style scoped>
.table-loading {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.table-header {
  display: flex;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.header-cell {
  flex: 1;
  height: 40px;
  margin: 8px 12px;
  border-radius: 4px;
}

.table-body {
  background: white;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f3f4f6;
  padding: 8px 0;
}

.table-row:last-child {
  border-bottom: none;
}

.body-cell {
  flex: 1;
  height: 16px;
  margin: 8px 12px;
  border-radius: 4px;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .table-loading {
    background: #1f2937;
    border-color: #374151;
  }
  
  .table-header {
    background-color: #111827;
    border-color: #374151;
  }
  
  .table-body {
    background: #1f2937;
  }
  
  .table-row {
    border-color: #374151;
  }
  
  .skeleton {
    background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
    background-size: 200% 100%;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .header-cell,
  .body-cell {
    margin: 6px 8px;
  }
  
  .header-cell {
    height: 32px;
  }
  
  .body-cell {
    height: 14px;
  }
}
</style>