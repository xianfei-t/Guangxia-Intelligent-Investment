<template>
  <main class="main-content">
    <div class="main-header">
      <h1 class="page-title fade-in-up">个人中心</h1>
    </div>
    
    <div class="profile-container">
      <!-- 个人信息头部 -->
      <div class="profile-header scroll-reveal">
        <img src="@/assets/decorations/title-neural-bg.svg" class="header-bg-deco" />
        <div class="header-content">
          <div class="profile-avatar scale-in">
            <span>{{ avatarText }}</span>
          </div>
          <h2 class="profile-name fade-in-up delay-200">{{ displayName }}</h2>
          <p class="profile-position fade-in-up delay-300">{{ displayPosition }}</p>
        </div>
      </div>
      
      <!-- 个人信息表单 -->
      <div class="profile-content">
        <div class="profile-section scroll-reveal">
          <h3 class="section-title">基本信息</h3>
          <form @submit.prevent="saveProfile" class="profile-form">
            <div class="form-group">
              <label for="name">
                姓名 <span style="color: #ef4444;">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                v-model="profileData.name" 
                placeholder="请输入姓名" 
                required
                class="tech-input"
              />
            </div>
            
            <div class="form-group">
              <label for="position">职称</label>
              <input 
                type="text" 
                id="position" 
                v-model="profileData.position" 
                placeholder="请输入职称" 
                class="tech-input"
              />
            </div>
            
            <div class="form-group">
              <label for="department">部门</label>
              <input 
                type="text" 
                id="department" 
                v-model="profileData.department" 
                placeholder="请输入部门" 
                class="tech-input"
              />
            </div>
            
            <div class="form-group">
              <label for="phone">手机号码</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="profileData.phone" 
                placeholder="请输入手机号码" 
                class="tech-input"
              />
            </div>
            
            <div class="form-group">
              <label for="email">
                电子邮箱 <span style="color: #ef4444;">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                v-model="profileData.email" 
                placeholder="请输入电子邮箱" 
                readonly
                required
                class="tech-input"
              />
            </div>
            
            <div class="form-group">
              <label>性别</label>
              <div class="gender-selector">
                <div 
                  class="gender-option" 
                  :class="{ active: profileData.gender === 'male' }"
                  @click="profileData.gender = 'male'"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 3h5v5M21 3l-6 6M21 3v5"></path>
                    <circle cx="10" cy="14" r="6"></circle>
                  </svg>
                  <span>男</span>
                </div>
                <div 
                  class="gender-option" 
                  :class="{ active: profileData.gender === 'female' }"
                  @click="profileData.gender = 'female'"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="10" r="6"></circle>
                    <path d="M12 16v6M9 19h6"></path>
                  </svg>
                  <span>女</span>
                </div>
                <div 
                  class="gender-option" 
                  :class="{ active: profileData.gender === 'other' }"
                  @click="profileData.gender = 'other'"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v.01M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  </svg>
                  <span>其他</span>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="birthday">出生日期</label>
              <input 
                type="date" 
                id="birthday" 
                v-model="profileData.birthday" 
                class="tech-input"
              />
            </div>
            
            <div class="form-group">
              <label for="address">联系地址</label>
              <textarea 
                id="address" 
                v-model="profileData.address" 
                placeholder="请输入联系地址"
                class="tech-input"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="bio">个人简介</label>
              <textarea 
                id="bio" 
                v-model="profileData.bio" 
                placeholder="请输入个人简介"
                class="tech-input"
              ></textarea>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="resetForm">重置</button>
              <button type="submit" class="btn btn-primary">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useScrollReveal } from '../composables/useScrollReveal'

// 初始化滚动显示动画
useScrollReveal()

const authStore = useAuthStore()

const profileData = ref({
  name: '',
  position: '',
  department: '',
  phone: '',
  email: '',
  gender: '',
  birthday: '',
  address: '',
  bio: ''
})

// 保存原始数据用于重置
const originalData = ref({})

const avatarText = computed(() => {
  if (profileData.value.name) {
    return profileData.value.name.charAt(0)
  }
  return '用'
})

const displayName = computed(() => {
  return profileData.value.name || '个人中心'
})

const displayPosition = computed(() => {
  if (profileData.value.position) {
    return `· ${profileData.value.position}`
  }
  return '请完善个人信息'
})

// 加载用户资料
function loadProfile() {
  try {
    // 先尝试从 authStore 恢复登录状态
    authStore.restoreLoginStatus()
    
    // 从 localStorage 的 currentUser 读取数据（与原始 HTML 保持一致）
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      profileData.value = {
        name: userData.name || '',
        position: userData.position || '',
        department: userData.department || '',
        phone: userData.phone || '',
        email: userData.email || '',
        gender: userData.gender || '',
        birthday: userData.birthday || '',
        address: userData.address || '',
        bio: userData.bio || ''
      }
      // 保存原始数据
      originalData.value = { ...profileData.value }
    } else if (authStore.currentUser) {
      // 从认证信息加载
      const user = authStore.currentUser
      profileData.value = {
        name: user.name || '',
        position: user.position || '',
        department: user.department || '',
        phone: user.phone || '',
        email: user.email || '',
        gender: user.gender || '',
        birthday: user.birthday || '',
        address: user.address || '',
        bio: user.bio || ''
      }
      originalData.value = { ...profileData.value }
    }
  } catch (error) {
    console.error('加载用户资料失败:', error)
  }
}

// 保存用户资料
function saveProfile() {
  // 检查是否登录
  if (!authStore.isLoggedIn || !authStore.currentUser) {
    alert('请先登录')
    return
  }

  // 验证必填字段
  if (!profileData.value.name || !profileData.value.name.trim()) {
    alert('姓名不能为空')
    return
  }

  try {
    // 更新 currentUser（与原始 HTML 保持一致）
    const updatedUser = {
      ...authStore.currentUser,
      ...profileData.value
    }
    
    // 保存到 localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    // 更新 authStore
    authStore.login(updatedUser)
    
    // 更新原始数据
    originalData.value = { ...profileData.value }
    
    alert('保存成功！')
  } catch (error) {
    console.error('保存用户资料失败:', error)
    alert('保存失败，请重试')
  }
}

// 重置表单
function resetForm() {
  if (confirm('确定要重置所有修改吗？')) {
    profileData.value = { ...originalData.value }
  }
}

// 初始化
onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: linear-gradient(-45deg, #ffffff, #e3f2fd, #f0f7ff, #ffffff);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.main-header {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  position: relative;
}

.profile-container {
  max-width: 900px;
  margin: 0 auto;
  background: linear-gradient(165deg, #ffffff 0%, #f8fafc 100%);
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.profile-header {
  background: #0f172a;
  color: white;
  padding: 40px 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header-bg-deco {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 200%;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
  object-fit: cover;
}

.header-content {
  position: relative;
  z-index: 1;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #60a5fa);
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.1);
}

.profile-name {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.profile-position {
  font-size: 16px;
  opacity: 0.8;
  font-weight: 500;
}

.profile-content {
  padding: 40px;
}

.profile-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #334155;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
}

.section-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 18px;
  background: var(--primary-color);
  margin-right: 10px;
  border-radius: 2px;
}

.profile-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #475569;
  font-size: 14px;
}

.tech-input {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #334155;
}

.tech-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background: white;
}

.form-group textarea.tech-input {
  resize: vertical;
  min-height: 100px;
}

.gender-selector {
  display: flex;
  gap: 15px;
}

.gender-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #64748b;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.gender-option:hover {
  background: white;
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.gender-option.active {
  background: rgba(59, 130, 246, 0.08);
  border-color: var(--primary-color);
  color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.form-actions {
  grid-column: 1 / -1;
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 6px 10px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #475569;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
  color: #1e293b;
}

@media (max-width: 768px) {
  .main-content {
    padding: 15px;
  }

  .profile-container {
    margin: 0;
    border-radius: 0;
  }

  .profile-header,
  .profile-content {
    padding: 25px;
  }

  .profile-form {
    grid-template-columns: 1fr;
  }
}
</style>
