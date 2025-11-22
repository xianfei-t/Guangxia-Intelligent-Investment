import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const currentUser = ref(null)

  // 从 localStorage 恢复登录状态
  function restoreLoginStatus() {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        isLoggedIn.value = true
        currentUser.value = user
        return true
      } catch (error) {
        console.error('恢复登录状态失败:', error)
        localStorage.removeItem('currentUser')
        return false
      }
    }
    return false
  }

  // 登录
  function login(userData) {
    try {
      localStorage.setItem('currentUser', JSON.stringify(userData))
      isLoggedIn.value = true
      currentUser.value = userData
      return true
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }

  // 登出
  function logout() {
    localStorage.removeItem('currentUser')
    isLoggedIn.value = false
    currentUser.value = null
  }

  // 检查登录状态
  function checkLoginStatus() {
    return isLoggedIn.value
  }

  // 初始化时恢复登录状态
  restoreLoginStatus()

  return {
    isLoggedIn: computed(() => isLoggedIn.value),
    currentUser: computed(() => currentUser.value),
    login,
    logout,
    checkLoginStatus,
    restoreLoginStatus
  }
})


