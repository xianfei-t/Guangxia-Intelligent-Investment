<template>
  <main class="main-content">
    <!-- 居中搜索区域 -->
    <div class="center-search-container">
      <!-- 背景 SVG 装饰 -->
      <svg class="bg-decoration" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path fill="rgba(66, 133, 244, 0.1)" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        <path fill="rgba(66, 133, 244, 0.15)" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <div class="floating-circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
      
      <h1 class="page-title fade-in-up">无知智投</h1>
      <div class="search-container center fade-in-up delay-200">
        <div class="search-wrapper">
          <div class="search-icon-container">
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M21 21L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            class="search-input" 
            placeholder="请输入您想了解的企业或行业信息..."
            @keypress.enter="handleSearch"
          />
          <button class="search-btn glow-effect" @click="handleSearch">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 19C14.5228 19 19 14.5228 19 9C19 3.47715 14.5228 0 9 0C3.47715 0 0 3.47715 0 9C0 14.5228 3.47715 19 9 19Z" stroke="white" stroke-width="1.5"/>
              <path d="M19 19L14 14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <!-- 热门搜索标签 -->
        <div class="search-tips fade-in-up delay-300">
          <span class="tip-label">热门搜索：</span>
          <a 
            v-for="tag in hotSearchTags" 
            :key="tag"
            href="#" 
            class="tip-tag hover-scale"
            @click.prevent="searchByTag(tag)"
          >
            {{ tag }}
          </a>
        </div>
      </div>
    </div>
    
    <!-- 内容布局容器 -->
    <div class="content-layout">
      <!-- 左侧数据区域 -->
      <div class="data-section">
        <!-- 欢迎区域 -->
        <div class="welcome-section">
          <div class="welcome-card scroll-reveal">
            <img src="@/assets/decorations/title-neural-bg.svg" class="welcome-bg-deco" />
            <div class="welcome-content">
              <h2 class="welcome-title">欢迎使用无知智投</h2>
              <p class="welcome-description">发现优质企业，把握投资机会</p>
              <div class="welcome-stats">
              <div class="stat-item fade-in-up delay-100">
                <div class="stat-number">2,500+</div>
                <div class="stat-label">优质项目</div>
              </div>
              <div class="stat-item fade-in-up delay-200">
                <div class="stat-number">50+</div>
                <div class="stat-label">热门行业</div>
              </div>
              <div class="stat-item fade-in-up delay-300">
                <div class="stat-number">120+</div>
                <div class="stat-label">投资人数量</div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        <!-- 企业网格区域 -->
        <div class="enterprise-section">
          <div class="section-header">
            <h2 class="section-title scroll-reveal">推荐企业</h2>
          </div>
          <div class="enterprise-grid">
            <div 
              v-for="(company, index) in filteredCompanies" 
              :key="company.id"
              class="company-card card-hover-lift scroll-reveal"
              :style="{ transitionDelay: `${index * 0.1}s` }"
              @click="openVideoPage(company)"
            >
              <h3>{{ company.name }}</h3>
              <div class="company-tags-row">
                <span class="company-tag">{{ company.industry }}</span>
              </div>
              <div class="company-info-grid">
                <div class="info-item">
                  <span class="info-label">融资需求</span>
                  <span class="info-value text-gradient">{{ company.fundingNeed }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">融资轮次</span>
                  <span class="info-value">{{ company.round }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">成立时间</span>
                  <span class="info-value">{{ company.founded }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">地点</span>
                  <span class="info-value">{{ company.location }}</span>
                </div>
              </div>
              <div class="company-description-box">
                <p>{{ company.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollReveal } from '../composables/useScrollReveal'

const router = useRouter()
const searchQuery = ref('')

// 初始化滚动显示动画
useScrollReveal()

const hotSearchTags = ['AI行业', '新能源汽车', '医疗科技', '人工智能', '半导体', '金融科技']

// 企业数据
const companies = [
  {
    id: 1,
    name: '国家电网有限公司',
    industry: '电力、能源',
    founded: '2002年',
    location: '北京市西城区',
    fundingNeed: '稳定发展',
    round: '已上市',
    description: '电力供应与电网运营商'
  },
  {
    id: 2,
    name: '中国石油化工集团有限公司',
    industry: '石油化工、能源',
    founded: '1998年',
    location: '北京市朝阳区',
    fundingNeed: '产业升级',
    round: '已上市',
    description: '石油天然气勘探开发与炼化企业'
  },
  {
    id: 3,
    name: '中国船舶集团有限公司',
    industry: '船舶制造、海洋工程',
    founded: '2019年',
    location: '上海市浦东新区',
    fundingNeed: '技术创新',
    round: '已上市',
    description: '船舶与海洋工程装备制造商'
  },
  {
    id: 4,
    name: '中国移动通信集团有限公司',
    industry: '通信、数字服务',
    founded: '1999年',
    location: '北京市西城区',
    fundingNeed: '数字转型',
    round: '已上市',
    description: '移动通信运营商'
  },
  {
    id: 5,
    name: '中国电子科技集团有限公司',
    industry: '电子信息、科技创新',
    founded: '2002年',
    location: '北京市海淀区',
    fundingNeed: '研发投入',
    round: '已上市',
    description: '电子信息与军工电子企业'
  },
  {
    id: 6,
    name: '字节跳动科技有限公司',
    industry: '互联网、文化娱乐',
    founded: '2012年',
    location: '北京市海淀区',
    fundingNeed: '全球化扩张',
    round: 'Pre-IPO',
    description: '短视频与信息流平台开发商'
  },
  {
    id: 7,
    name: '阿里巴巴集团控股有限公司',
    industry: '电子商务、云计算',
    founded: '1999年',
    location: '浙江省杭州市',
    fundingNeed: '生态建设',
    round: '已上市',
    description: '电子商务与数字支付服务商'
  },
  {
    id: 8,
    name: '腾讯控股有限公司',
    industry: '互联网、游戏、金融科技',
    founded: '1998年',
    location: '广东省深圳市',
    fundingNeed: '产业投资',
    round: '已上市',
    description: '互联网综合服务提供商'
  },
  {
    id: 9,
    name: '华为海思半导体有限公司',
    industry: '半导体、集成电路',
    founded: '2004年',
    location: '广东省深圳市',
    fundingNeed: '技术突破',
    round: '未上市',
    description: '芯片设计与研发企业'
  },
  {
    id: 10,
    name: '小米汽车有限公司',
    industry: '新能源汽车、智能出行',
    founded: '2021年',
    location: '北京市海淀区',
    fundingNeed: '产能扩张',
    round: 'Pre-IPO',
    description: '新能源汽车制造商'
  },
  {
    id: 11,
    name: '拼多多',
    industry: '电子商务、社交电商',
    founded: '2015年',
    location: '上海市长宁区',
    fundingNeed: '农村市场拓展',
    round: '已上市',
    description: '社交电商平台运营商'
  },
  {
    id: 12,
    name: '大疆创新科技有限公司',
    industry: '智能硬件、机器人',
    founded: '2006年',
    location: '广东省深圳市',
    fundingNeed: '技术研发',
    round: '未上市',
    description: '无人机研发制造商'
  }
]

// 筛选后的企业列表
const filteredCompanies = computed(() => {
  if (!searchQuery.value.trim()) {
    return companies
  }
  
  const query = searchQuery.value.toLowerCase()
  return companies.filter(company => 
    company.name.toLowerCase().includes(query) ||
    company.industry.toLowerCase().includes(query) ||
    company.description.toLowerCase().includes(query) ||
    company.location.toLowerCase().includes(query)
  )
})

// 搜索功能
function handleSearch() {
  // 搜索逻辑已在 computed 中实现
  console.log('搜索:', searchQuery.value)
}

// 通过标签搜索
function searchByTag(tag) {
  searchQuery.value = tag
}

// 打开视频页面
function openVideoPage(company) {
  // 存储企业信息到 sessionStorage
  sessionStorage.setItem('companyName', company.name)
  sessionStorage.setItem('industry', company.industry)
  sessionStorage.setItem('foundedYear', company.founded)
  sessionStorage.setItem('location', company.location)
  
  // 跳转到视频播放页面
  router.push({ name: 'VideoPlayer' })
}
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: var(--app-bg);
}

/* 居中搜索容器 */
.center-search-container {
  text-align: center;
  margin-bottom: 30px;
  padding: 60px 20px;
  background: linear-gradient(-45deg, #ffffff, #e3f2fd, #f0f7ff, #ffffff);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  color: #1a1a1a;
  border-radius: var(--border-radius);
  margin: 0 auto 30px;
  max-width: 1800px;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
}

.floating-circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
  opacity: 0.8;
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -50px;
  left: -50px;
  background: radial-gradient(circle, rgba(66, 165, 245, 0.4) 0%, rgba(255,255,255,0) 70%);
  animation-duration: 12s;
}

.circle-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  right: -50px;
  background: radial-gradient(circle, rgba(33, 150, 243, 0.3) 0%, rgba(255,255,255,0) 70%);
  animation-duration: 15s;
  animation-delay: -5s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  top: 40%;
  left: 60%;
  background: radial-gradient(circle, rgba(100, 181, 246, 0.5) 0%, rgba(255,255,255,0) 70%);
  animation-duration: 10s;
  animation-delay: -2s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 删除旧的伪元素，避免冲突 */
/* .center-search-container::before { ... } */

.center-search-container .page-title {
  color: #1a1a1a;
  margin-bottom: 40px;
  font-size: 48px;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.search-container.center {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-wrapper {
  position: relative;
  width: 100%;
}

.search-icon-container {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  z-index: 1;
}

.search-input {
  width: 100%;
  height: 60px;
  font-size: 18px;
  padding: 0 80px 0 60px;
  border-radius: 30px;
  border: 1px solid #e1e5e9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  outline: none;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px rgba(0, 102, 255, 0.15);
}

.search-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 25px;
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #0052cc;
}

.search-tips {
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.tip-label {
  color: #666;
  font-size: 14px;
}

.tip-tag {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: #f0f7ff;
  transition: all 0.2s ease;
  display: inline-block;
}

.tip-tag:hover {
  background-color: #e6f0ff;
  color: #0052cc;
}

/* 内容布局 */
.content-layout {
  display: flex;
  gap: 20px;
}

.data-section {
  flex: 1;
}

/* 欢迎卡片样式 */
.welcome-section {
  margin-bottom: 20px;
}

.welcome-card {
  background: #0f172a; /* 深蓝黑色背景，适合科技感/神经网络 */
  border-radius: var(--border-radius);
  padding: 30px;
  color: white;
  box-shadow: var(--shadow-md);
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.welcome-bg-deco {
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

.welcome-content {
  position: relative;
  z-index: 1;
}

.welcome-title {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 600;
}

.welcome-description {
  font-size: 16px;
  margin-bottom: 25px;
  opacity: 0.9;
}

.welcome-stats {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

/* 企业网格区域 */
.enterprise-section {
  padding: 0 20px;
  margin-bottom: 40px;
}

.section-header {
  padding: 0 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
}

.enterprise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

.company-card {
  background: linear-gradient(165deg, #ffffff 0%, #f8fafc 100%);
  /* 移除原有边框和圆角 */
  border-radius: 0;
  border: none;
  
  /* 科技感切角造型：切掉右上角 */
  clip-path: polygon(
    0 0, 
    calc(100% - 40px) 0, 
    100% 40px, 
    100% 100%, 
    0 100%
  );
  
  /* 3D立体感：内阴影模拟厚度和高光 */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(148, 163, 184, 0.1); /* 仅保留微边框 */
  
  /* 清除虚影，保留清爽的异形投影 */
  filter: drop-shadow(0 5px 15px rgba(15, 23, 42, 0.08));
  
  padding: 24px;
  padding-bottom: 24px; /* 恢复正常内边距 */
  
  /* 左侧强指示条 */
  border-left: 4px solid #3b82f6;
  
  /* 顶部装饰线条 */
  background-image: linear-gradient(to right, #3b82f6 0%, #60a5fa 100%);
  background-size: 100% 4px;
  background-repeat: no-repeat;
  background-position: top left;
  
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性过渡 */
  margin-bottom: 0;
}

.company-card:hover {
  transform: translateY(-4px);
  /* 悬停时投影加深，无虚影 */
  filter: drop-shadow(0 15px 30px rgba(6, 182, 212, 0.15));
  
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(6, 182, 212, 0.3); /* 边框变亮 */
}

.company-card:hover::before {
  opacity: 0.25; /* 降低亮度，避免影响文字 */
  filter: drop-shadow(0 0 2px #06b6d4); /* 减弱发光 */
  /* 悬浮时切换为加粗的电路纹理 SVG */
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L30 10 L30 30' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%2306b6d4'/%3E%3Cpath d='M70 90 L70 70 L90 70' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3Ccircle cx='70' cy='70' r='3' fill='%2306b6d4'/%3E%3Cpath d='M10 90 L30 90 L30 70' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3Cpath d='M90 10 L70 10 L70 30' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3Cpath d='M40 50 L60 50' fill='none' stroke='%2306b6d4' stroke-width='2' stroke-dasharray='4 4'/%3E%3C/svg%3E");
}

/* 确保内容在电路纹理之上 */
.company-card > *:not(::before):not(::after) {
  position: relative;
  z-index: 2;
}

/* 右上角 SVG 科技装饰 */
.company-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  /* SVG: 科技电路纹理，贴合切角边缘 */
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L100 40' stroke='%233b82f6' stroke-width='1.5' stroke-dasharray='4 4' opacity='0.6'/%3E%3Cpath d='M55 0 L55 10 L85 40 L100 40' fill='none' stroke='%233b82f6' stroke-width='1' opacity='0.3'/%3E%3Crect x='53' y='-2' width='4' height='4' fill='%233b82f6' opacity='0.8'/%3E%3Crect x='98' y='38' width='4' height='4' fill='%233b82f6' opacity='0.8'/%3E%3Cpath d='M40 0 L100 60' stroke='%2394a3b8' stroke-width='0.5' opacity='0.2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: top right;
  pointer-events: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.company-card:hover::after {
  opacity: 1;
}

/* 内部装饰：电路板纹理 */
.company-card::before {
  content: '';
  position: absolute;
  top: 4px;
  right: 0;
  bottom: 0;
  left: 0;
  /* SVG: 电路板纹理 - 透明度调整为 0.10 */
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L30 10 L30 30' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10'/%3E%3Ccircle cx='30' cy='30' r='2.5' fill='%233b82f6' opacity='0.10'/%3E%3Cpath d='M70 90 L70 70 L90 70' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10'/%3E%3Ccircle cx='70' cy='70' r='2.5' fill='%233b82f6' opacity='0.10'/%3E%3Cpath d='M10 90 L30 90 L30 70' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10'/%3E%3Cpath d='M90 10 L70 10 L70 30' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10'/%3E%3Cpath d='M40 50 L60 50' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10' stroke-dasharray='4 4'/%3E%3C/svg%3E");
  background-size: 100px 100px;
  z-index: 0;
  pointer-events: none;
  z-index: 1; /* 确保内容在光晕之上 */
}

.company-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.company-card h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #333;
}

.company-tags-row {
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.company-tag {
  background: #E8F0FE;
  color: #4A90E2;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
}

.company-info-row {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
}

.company-meta {
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
}

.company-description-box {
  background: #F8F9FA;
  padding: 12px;
  border-radius: 6px;
  border-left: 3px solid #FF6B6B;
}

.company-description-box p {
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .content-layout {
    flex-direction: column;
  }
  
  .enterprise-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 15px;
  }
  
  .enterprise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .center-search-container {
    padding: 40px 15px;
  }
  
  .center-search-container .page-title {
    font-size: 36px;
  }
}

@media (max-width: 576px) {
  .enterprise-grid {
    grid-template-columns: 1fr;
  }
  
  .center-search-container .page-title {
    font-size: 28px;
  }
}
</style>
