<template>
  <div class="video-container">
    <button class="back-button" @click="goToCompanyDetail">←</button>
    
    <video 
      ref="videoElement"
      id="companyVideo" 
      autoplay 
      @ended="goToCompanyDetail"
      controls
    >
      <source :src="videoPath" type="video/mp4">
      您的浏览器不支持视频播放
    </video>
    
    <div class="progress-container" @click="handleProgressClick" ref="progressContainer">
      <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
    </div>
    <div class="time-display">{{ formattedCurrentTime }} / {{ formattedDuration }}</div>
    
    <div class="company-info-overlay">
      <div class="company-name">{{ companyName }}</div>
      <div class="company-meta">{{ companyMeta }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const videoElement = ref(null)
const progressContainer = ref(null)

const companyName = ref('未知企业')
const industry = ref('未知行业')
const foundedYear = ref('未知成立时间')
const location = ref('未知地点')
const videoPath = ref('')
const currentTime = ref(0)
const duration = ref(0)

const companyMeta = computed(() => {
  return `${industry.value} | ${foundedYear.value} | ${location.value}`
})

const progressPercentage = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

const formattedCurrentTime = computed(() => {
  return formatTime(currentTime.value)
})

const formattedDuration = computed(() => {
  return formatTime(duration.value)
})

// 从 sessionStorage 获取企业信息
function loadCompanyInfo() {
  companyName.value = sessionStorage.getItem('companyName') || '未知企业'
  industry.value = sessionStorage.getItem('industry') || '未知行业'
  foundedYear.value = sessionStorage.getItem('foundedYear') || '未知成立时间'
  location.value = sessionStorage.getItem('location') || '未知地点'
}

// 获取视频路径
function loadVideoPath() {
  // 从 URL 参数获取视频路径
  const videoParam = route.query.video
  if (videoParam) {
    videoPath.value = decodeURIComponent(videoParam)
  } else {
    // 默认视频路径
    videoPath.value = 'http://localhost:8082/uploads/test.mp4'
  }
  console.log('视频路径:', videoPath.value)
}

// 初始化视频
function initVideo() {
  const video = videoElement.value
  if (!video) return
  
  // 添加错误监听
  video.addEventListener('error', function(e) {
    console.log('视频加载错误:', e)
    console.log('错误代码:', e.target.error?.code)
  })
  
  // 加载视频
  video.load()
  
  // 尝试自动播放
  video.play().catch(error => {
    console.log('自动播放失败，需要用户交互:', error)
    // 添加点击播放的提示
    video.addEventListener('click', function() {
      video.play()
    }, { once: true })
  })
  
  // 初始化进度条功能
  initProgressBar()
}

// 初始化视频进度条功能
function initProgressBar() {
  const video = videoElement.value
  if (!video) return
  
  // 更新进度条
  video.addEventListener('timeupdate', function() {
    currentTime.value = video.currentTime
  })
  
  // 视频元数据加载完成后更新时长
  video.addEventListener('loadedmetadata', function() {
    duration.value = video.duration
  })
  
  // 视频时长变化时更新
  video.addEventListener('durationchange', function() {
    duration.value = video.duration
  })
}

// 点击进度条跳转
function handleProgressClick(event) {
  const video = videoElement.value
  const container = progressContainer.value
  if (!video || !container) return
  
  const rect = container.getBoundingClientRect()
  const pos = (event.clientX - rect.left) / rect.width
  video.currentTime = pos * video.duration
}

// 格式化时间为 MM:SS 格式
function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return '00:00'
  
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  
  return (
    minutes.toString().padStart(2, '0') + ':' + 
    remainingSeconds.toString().padStart(2, '0')
  )
}

// 跳转到企业详情页面
function goToCompanyDetail() {
  // 从 sessionStorage 获取企业名称，用于跳转到详情页
  const companyName = sessionStorage.getItem('companyName')
  if (companyName) {
    // 假设企业详情页使用企业名称作为 ID
    // 这里需要根据实际路由配置调整
    router.push({ 
      name: 'CompanyDetail', 
      params: { id: companyName } 
    })
  } else {
    // 如果没有企业信息，返回首页
    router.push({ name: 'Home' })
  }
}

// 组件挂载时初始化
onMounted(() => {
  loadCompanyInfo()
  loadVideoPath()
  initVideo()
})

// 组件卸载时清理
onUnmounted(() => {
  const video = videoElement.value
  if (video) {
    video.pause()
    video.src = ''
  }
})
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
  overflow: hidden;
}

video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.progress-container {
  position: absolute;
  bottom: 80px;
  left: 20px;
  right: 20px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  z-index: 6;
}

.progress-bar {
  height: 100%;
  width: 0%;
  background: #00bfff;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.time-display {
  position: absolute;
  bottom: 60px;
  right: 20px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 6;
}

.company-info-overlay {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px;
  text-align: center;
  z-index: 5;
}

.company-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.company-meta {
  font-size: 14px;
  opacity: 0.9;
}
</style>
