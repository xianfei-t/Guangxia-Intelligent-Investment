<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="brand-info">
        <div class="avatar">
          <img src="@/assets/icons/logo-growth.svg" alt="无知智投" class="logo-image" style="width: 40px; height: 40px; border-radius: 8px;" />
        </div>
        <div class="sidebar-company-info">
          <h2 class="company-name">无知智投</h2>
        </div>
      </div>
      <router-link to="/profile" class="header-user-avatar" :title="userName">
        <span>{{ userAvatarText }}</span>
      </router-link>
    </div>
    
    <!-- 首页 -->
    <div class="nav-group">
      <h3 class="nav-group-title">主导航</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/home">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile">个人中心</router-link>
        </li>
      </ul>
    </div>
    
    <!-- 项目库 -->
    <div class="nav-group">
      <h3 class="nav-group-title">项目库</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/all-projects">全部项目</router-link>
        </li>
      </ul>
    </div>
    
    <!-- 企业信息 -->
    <div class="nav-group">
      <h3 class="nav-group-title">企业信息</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/company-management">公司管理</router-link>
        </li>
      </ul>
    </div>
    
    <!-- 其他功能 -->
    <div class="nav-group">
      <h3 class="nav-group-title">其他功能</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/documents-and-favorites">文件与收藏</router-link>
        </li>
      </ul>
    </div>
    
    <!-- 行业看板 -->
    <div class="nav-group">
      <h3 class="nav-group-title">行业看板</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/industry-overview">行业概览</router-link>
        </li>
      </ul>
    </div>
    
    <!-- 侧边栏底部用户信息 (已移除) -->
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

// 确保在组件挂载时恢复登录状态
onMounted(() => {
  authStore.restoreLoginStatus()
})

const userName = computed(() => {
  if (authStore.currentUser && authStore.currentUser.name) {
    return authStore.currentUser.name
  }
  return '个人中心'
})

const userAvatarText = computed(() => {
  if (authStore.currentUser && authStore.currentUser.name) {
    return authStore.currentUser.name.charAt(0)
  }
  return '用'
})
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #1e293b; /* 深蓝灰色背景 */
  border-right: 1px solid #334155;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  color: #e2e8f0;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
  font-family: 'Titillium Web', 'Rajdhani', sans-serif;
}

.sidebar-header {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  margin-bottom: 0;
}

.header-user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #60a5fa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.header-user-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.6);
}

.company-name {
  font-family: 'Rajdhani', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.nav-group {
  margin-bottom: 25px;
}

.nav-group-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #94a3b8; /* 柔和的灰色 */
  margin-bottom: 10px;
  letter-spacing: 1.5px;
  padding-left: 12px;
}

.nav-list {
  list-style: none;
}

.nav-item {
  margin-bottom: 5px;
}

.nav-item a {
  display: block;
  padding: 10px 12px;
  color: #cbd5e1; /* 浅灰文字 */
  text-decoration: none;
  border-radius: 0 var(--border-radius) var(--border-radius) 0; /* 左侧直角适应边框 */
  border-left: 3px solid transparent; /* 预留边框位置 */
  transition: all 0.3s ease;
  font-weight: 500;
  font-family: 'Rajdhani', 'Noto Sans SC', sans-serif;
  letter-spacing: 1px; /* 增加字间距以增强科技感 */
  font-style: italic; /* 增加斜体风格 */
  position: relative;
  overflow: hidden;
}

.nav-item a:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  transform: translateX(4px);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.nav-item a.router-link-active {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.25), transparent);
  border-left-color: #3b82f6;
  color: #60a5fa;
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
  box-shadow: inset 10px 0 20px -10px rgba(59, 130, 246, 0.5);
  animation: nav-pulse 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性脉冲 */
}

/* 持续的光效扫描 */
.nav-item a.router-link-active::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: skewX(-20deg);
  animation: sheen 3s infinite;
}

@keyframes nav-pulse {
  0% {
    transform: scale(1);
    background-color: rgba(59, 130, 246, 0.4);
  }
  50% {
    transform: scale(1.05) translateX(5px);
    background-color: rgba(59, 130, 246, 0.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes sheen {
  0% { left: -100%; opacity: 0; }
  20% { left: 200%; opacity: 1; }
  100% { left: 200%; opacity: 0; }
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #334155;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
}

.user-info:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #60a5fa);
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  margin-right: auto;
  color: #f1f5f9;
  text-decoration: none;
  transition: var(--transition);
}

.user-name:hover {
  color: white;
}

.user-menu-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #94a3b8;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  transition: var(--transition);
}

.user-menu-btn:hover {
  color: white;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.active {
    transform: translateX(0);
  }
}
</style>


