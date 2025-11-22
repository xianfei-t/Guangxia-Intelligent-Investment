import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

  // 从 localStorage 加载收藏
  function loadFavorites() {
    try {
      const stored = localStorage.getItem('userFavorites')
      if (stored) {
        favorites.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('加载收藏失败:', error)
      favorites.value = []
    }
  }

  // 保存收藏到 localStorage
  function saveFavorites() {
    try {
      localStorage.setItem('userFavorites', JSON.stringify(favorites.value))
    } catch (error) {
      console.error('保存收藏失败:', error)
    }
  }

  // 添加收藏
  function addToFavorites(item) {
    if (!item || !item.id) {
      console.error('无效的收藏项:', item)
      return false
    }

    // 检查是否已收藏
    const exists = favorites.value.some(
      fav => fav.id === item.id && fav.type === item.type
    )

    if (exists) {
      return false
    }

    const favoriteItem = {
      ...item,
      addedAt: new Date().toISOString()
    }

    favorites.value.push(favoriteItem)
    saveFavorites()
    return true
  }

  // 移除收藏
  function removeFromFavorites(id, type) {
    const index = favorites.value.findIndex(
      fav => fav.id === id && fav.type === type
    )

    if (index > -1) {
      favorites.value.splice(index, 1)
      saveFavorites()
      return true
    }
    return false
  }

  // 检查是否已收藏
  function isFavorite(id, type) {
    return favorites.value.some(
      fav => fav.id === id && fav.type === type
    )
  }

  // 初始化时加载收藏
  loadFavorites()

  return {
    favorites: computed(() => favorites.value),
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    loadFavorites
  }
})


