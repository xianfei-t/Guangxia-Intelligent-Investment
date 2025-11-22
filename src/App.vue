<template>
  <div class="app-container" :class="{ 'no-sidebar': isLandingPage }">
    <Sidebar v-if="!isLandingPage" />
    <div class="main-content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()

const isLandingPage = computed(() => {
  return route.name === 'LandingPage'
})
</script>

<style>
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --text-muted: #6c757d;
  --border-color: #dee2e6;
  --background-color: #ffffff;
  --sidebar-bg: #f8f9fa;
  --hover-color: #e9ecef;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--dark-color);
  background-color: var(--app-bg);
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.app-container.no-sidebar {
  flex-direction: column;
}

.app-container.no-sidebar .main-content-wrapper {
  width: 100%;
}
</style>


