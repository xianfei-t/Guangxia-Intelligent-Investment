<template>
  <div class="dashboard-fullscreen">
    <!-- 背景层 -->
    <div class="dashboard-bg"></div>
    <div class="bg-grid-animation"></div>
    
    <!-- 顶部标题栏 -->
    <div class="dashboard-header">
      <div class="header-left-decoration">
        <svg width="100%" height="100%" viewBox="0 0 300 30">
           <polyline points="0,15 20,15 30,5 270,5 280,15 300,15" fill="none" stroke="#d4b170" stroke-width="1" opacity="0.5"/>
           <rect x="30" y="10" width="10" height="4" fill="#d4b170" opacity="0.8"/>
           <rect x="50" y="10" width="10" height="4" fill="#d4b170" opacity="0.6"/>
           <rect x="70" y="10" width="10" height="4" fill="#d4b170" opacity="0.4"/>
        </svg>
      </div>
      
      <div class="title-container">
        <h1 class="dashboard-title">行业数据资产概览</h1>
        <div class="title-en">INDUSTRY DATA ASSET OVERVIEW</div>
      </div>
      
      <div class="header-right-decoration">
        <div class="header-time">
          <span class="time-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="9" stroke-opacity="0.5"/>
              <path d="M12 6V12L16 14" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 2V4M12 20V22M2 12H4M20 12H22" stroke-opacity="0.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="time-text">{{ currentTime }}</span>
        </div>
        <button class="close-btn" @click="goBack">
          <div class="close-icon-bg"></div>
          <span>EXIT</span>
        </button>
      </div>
    </div>

    <div class="dashboard-content">
      <!-- 左侧面板 -->
      <div class="dashboard-column left-column">
        <!-- 行业分布 -->
        <div class="dashboard-panel" style="flex: 1;">
          <div class="panel-corner corner-tl"></div>
          <div class="panel-corner corner-tr"></div>
          <div class="panel-corner corner-bl"></div>
          <div class="panel-corner corner-br"></div>
          
          <div class="panel-header">
            <span class="panel-title-icon">◆</span>
            <span class="panel-title">行业分布占比</span>
            <span class="panel-title-en">DISTRIBUTION</span>
          </div>
          <div class="panel-body">
            <div ref="distributionChartRef" class="chart-container"></div>
          </div>
        </div>

        <!-- 融资趋势 -->
        <div class="dashboard-panel" style="flex: 1;">
          <div class="panel-corner corner-tl"></div>
          <div class="panel-corner corner-tr"></div>
          <div class="panel-corner corner-bl"></div>
          <div class="panel-corner corner-br"></div>

          <div class="panel-header">
            <span class="panel-title-icon">◆</span>
            <span class="panel-title">资金流动趋势</span>
            <span class="panel-title-en">CAPITAL FLOW</span>
          </div>
          <div class="panel-body">
             <div ref="trendChartRef" class="chart-container"></div>
          </div>
        </div>
      </div>

      <!-- 中间面板 -->
      <div class="dashboard-column center-column">
        <!-- 核心可视化区域 -->
        <div class="center-main-visual">
          <!-- 顶部总量数据 -->
          <div class="center-total-stats">
             <div class="total-stat-item">
               <div class="stat-label">资产总估值 (CNY)</div>
               <div class="stat-number-wrapper">
                 <span class="currency">¥</span>
                 <span class="stat-number">4,829</span>
                 <span class="unit">亿</span>
               </div>
             </div>
          </div>

          <!-- 中央 ECharts 地球/网络 -->
          <div class="globe-wrapper">
            <div class="globe-bg-ring"></div>
            <div ref="mapChartRef" class="center-chart-container"></div>
          </div>

          <!-- 悬浮指标卡片 (左侧) -->
          <div class="floating-metrics left">
            <div class="metric-box animate-slide-right" style="animation-delay: 0.2s">
              <div class="metric-icon">
                <!-- Hot/Star Icon -->
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#d4b170" stroke-width="1.5">
                   <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(212, 177, 112, 0.2)"/>
                   <path d="M12 12L12 2M12 12L20.66 17M12 12L3.34 17" stroke-opacity="0.5"/>
                </svg>
              </div>
              <div class="metric-info">
                <div class="m-val">52<span class="m-unit">TOP</span></div>
                <div class="m-label">热门行业</div>
              </div>
            </div>
            <div class="metric-box animate-slide-right" style="animation-delay: 0.4s">
               <div class="metric-icon">
                <!-- Building/Company Icon -->
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#d4b170" stroke-width="1.5">
                  <path d="M3 21H21" stroke-linecap="round"/>
                  <path d="M5 21V7L13 3V21" fill="rgba(212, 177, 112, 0.1)"/>
                  <path d="M19 21V11L13 7" />
                  <rect x="7" y="9" width="2" height="2" fill="#d4b170" fill-opacity="0.5"/>
                  <rect x="7" y="13" width="2" height="2" fill="#d4b170" fill-opacity="0.5"/>
                  <rect x="7" y="17" width="2" height="2" fill="#d4b170" fill-opacity="0.5"/>
                  <rect x="15" y="13" width="2" height="2" fill="#d4b170" fill-opacity="0.5"/>
                </svg>
               </div>
               <div class="metric-info">
                <div class="m-val">2,586</div>
                <div class="m-label">入驻企业</div>
              </div>
            </div>
          </div>

          <!-- 悬浮指标卡片 (右侧) -->
          <div class="floating-metrics right">
            <div class="metric-box animate-slide-left" style="animation-delay: 0.3s">
              <div class="metric-icon">
                <!-- Deal/Network Icon -->
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#d4b170" stroke-width="1.5">
                   <circle cx="18" cy="6" r="3" fill="rgba(212, 177, 112, 0.1)"/>
                   <circle cx="6" cy="18" r="3" fill="rgba(212, 177, 112, 0.1)"/>
                   <path d="M8.5 16.5L15.5 7.5" stroke-dasharray="2 2"/>
                   <circle cx="12" cy="12" r="1" fill="#d4b170"/>
                   <path d="M18 9V12M6 15V12" stroke-opacity="0.5"/>
                </svg>
              </div>
              <div class="metric-info">
                <div class="m-val">864</div>
                <div class="m-label">融资事件</div>
              </div>
            </div>
            <div class="metric-box animate-slide-left" style="animation-delay: 0.5s">
               <div class="metric-icon">
                 <!-- Money/Funding Icon -->
                 <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#d4b170" stroke-width="1.5">
                    <ellipse cx="12" cy="5" rx="9" ry="3" fill="rgba(212, 177, 112, 0.1)"/>
                    <path d="M21 12C21 13.66 16.97 15 12 15C7.03 15 3 13.66 3 12"/>
                    <path d="M3 5V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V5"/>
                    <path d="M21 12V5M3 12V5" stroke-opacity="0"/> 
                    <!-- Add coin stack effect -->
                    <path d="M21 8.5C21 10.16 16.97 11.5 12 11.5C7.03 11.5 3 10.16 3 8.5" stroke-opacity="0.5"/>
                 </svg>
               </div>
               <div class="metric-info">
                <div class="m-val">320<span class="m-unit">亿</span></div>
                <div class="m-label">融资总额</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 底部概览 -->
        <div class="center-bottom-panel dashboard-panel">
          <div class="panel-corner corner-bl"></div>
          <div class="panel-corner corner-br"></div>
          <div class="bottom-panel-content">
             <div class="bottom-title">数据应用指数 TOP 4</div>
             <div class="bottom-charts">
                <div v-for="(item, i) in appIndexData" :key="i" class="bottom-chart-item">
                  <div class="b-label">{{ item.name }}</div>
                  <div class="b-bar-bg">
                    <div class="b-bar-fill" :style="{width: item.value + '%', opacity: 1 - i * 0.15}"></div>
                  </div>
                  <div class="b-value">{{ item.value * 10 }}</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="dashboard-column right-column">
        <!-- 行业排行 -->
        <div class="dashboard-panel" style="height: 100%;">
          <div class="panel-corner corner-tl"></div>
          <div class="panel-corner corner-tr"></div>
          <div class="panel-corner corner-bl"></div>
          <div class="panel-corner corner-br"></div>
          
          <div class="panel-header">
            <span class="panel-title-icon">◆</span>
            <span class="panel-title">行业价值排行榜</span>
            <span class="panel-title-en">RANKING</span>
          </div>
          <div class="panel-body table-panel-body">
            <div class="custom-table-header">
              <div class="th col-rank">NO.</div>
              <div class="th col-name">行业名称</div>
              <div class="th col-val">估值(亿)</div>
              <div class="th col-trend">趋势</div>
            </div>
            <div class="custom-table-body">
              <div 
                v-for="(industry, index) in filteredIndustries" 
                :key="industry.name"
                class="custom-table-row"
                :class="{ 'top-row': index < 3 }"
              >
                <div class="td col-rank">
                  <div class="rank-badge" :class="'rank-' + (index + 1)">{{ index + 1 }}</div>
                </div>
                <div class="td col-name">{{ industry.name }}</div>
                <div class="td col-val">{{ industry.avgValuation.replace('亿', '') }}</div>
                <div class="td col-trend">
                   <span class="trend-arrow" :class="getTrendClass(industry.trend)">
                     {{ industry.trend.includes('+') ? '↑' : '↓' }} {{ industry.trend.replace(/[+-]/, '') }}
                   </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'

const router = useRouter()
const currentTime = ref('')
let timeInterval = null

// Refs for chart DOM elements
const distributionChartRef = ref(null)
const trendChartRef = ref(null)
const mapChartRef = ref(null)

let distChart = null
let trendChart = null
let mapChart = null

// Mock Data
const appIndexData = [
  { name: '经济分析', value: 92 },
  { name: '对公基本', value: 85 },
  { name: '个人资本', value: 78 },
  { name: '电子银行', value: 65 }
]

const industryData = [
  { name: '人工智能', companies: 1245, deals: 320, avgValuation: '8.5亿', trend: '+24.3%', category: 'technology' },
  { name: '新能源', companies: 986, deals: 275, avgValuation: '7.2亿', trend: '+18.7%', category: 'technology' },
  { name: '金融科技', companies: 1120, deals: 263, avgValuation: '9.1亿', trend: '+15.2%', category: 'finance' },
  { name: '医疗健康', companies: 875, deals: 198, avgValuation: '6.8亿', trend: '+12.8%', category: 'healthcare' },
  { name: '企业服务', companies: 1345, deals: 289, avgValuation: '5.3亿', trend: '+9.6%', category: 'technology' },
  { name: '消费零售', companies: 2156, deals: 432, avgValuation: '3.5亿', trend: '+14.5%', category: 'consumer' },
  { name: '教育培训', companies: 768, deals: 145, avgValuation: '4.7亿', trend: '+7.3%', category: 'education' },
  { name: '物联网', companies: 654, deals: 178, avgValuation: '6.2亿', trend: '+11.4%', category: 'technology' },
  { name: '生物医药', companies: 489, deals: 124, avgValuation: '12.3亿', trend: '+18.5%', category: 'healthcare' },
  { name: '文化娱乐', companies: 987, deals: 234, avgValuation: '4.9亿', trend: '+6.8%', category: 'consumer' },
  { name: '智能制造', companies: 882, deals: 156, avgValuation: '6.5亿', trend: '+13.2%', category: 'technology' },
  { name: '区块链', companies: 342, deals: 89, avgValuation: '4.2亿', trend: '+5.4%', category: 'finance' }
]

const filteredIndustries = computed(() => {
  return [...industryData].sort((a, b) => parseFloat(b.avgValuation) - parseFloat(a.avgValuation))
})

// Time Update
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(/\//g, '-')
}

// Chart Initialization
const initCharts = () => {
  // 1. Industry Distribution (Rose Chart)
  if (distributionChartRef.value) {
    distChart = echarts.init(distributionChartRef.value)
    distChart.setOption({
      tooltip: { trigger: 'item' },
      legend: {
        bottom: '0%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: '#8a90a0', fontSize: 10 }
      },
      series: [
        {
          name: '行业分布',
          type: 'pie',
          radius: [20, 80],
          center: ['50%', '45%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5,
            borderColor: '#1a2030',
            borderWidth: 2
          },
          data: [
            { value: 40, name: '人工智能', itemStyle: { color: '#d4b170' } },
            { value: 32, name: '新能源', itemStyle: { color: '#b8860b' } },
            { value: 28, name: '金融科技', itemStyle: { color: '#8b4513' } },
            { value: 24, name: '医疗健康', itemStyle: { color: '#cd853f' } },
            { value: 20, name: '其他', itemStyle: { color: '#555' } }
          ],
          label: {
            color: '#fff',
            formatter: '{b}\n{d}%'
          },
          labelLine: {
            lineStyle: { color: '#d4b170' },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        }
      ]
    })
  }

  // 2. Funding Trend (Bar + Line)
  if (trendChartRef.value) {
    trendChart = echarts.init(trendChartRef.value)
    trendChart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: { lineStyle: { color: '#3a4050' } },
        axisLabel: { color: '#8a90a0' }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
        axisLabel: { color: '#8a90a0' }
      },
      series: [
        {
          name: '融资额',
          type: 'bar',
          barWidth: '30%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#d4b170' },
              { offset: 1, color: 'rgba(212, 177, 112, 0.1)' }
            ])
          },
          data: [22, 25, 30, 28, 35, 40]
        },
        {
          name: '增长率',
          type: 'line',
          smooth: true,
          lineStyle: { color: '#fff', width: 2 },
          itemStyle: { color: '#fff', borderWidth: 2 },
          symbol: 'circle',
          symbolSize: 6,
          data: [22, 25, 30, 28, 35, 40]
        }
      ]
    })
  }

  // 3. Industry Knowledge Graph (Replaced Random Globe)
  if (mapChartRef.value) {
    mapChart = echarts.init(mapChartRef.value)
    
    // Define Category Mappings
    const categories = {
      'technology': '前沿科技',
      'finance': '现代金融',
      'healthcare': '生命健康',
      'consumer': '消费文娱',
      'education': '教育培训'
    }

    // Root Node
    const rootNode = {
      id: 'root',
      name: '产业全景',
      symbolSize: 90,
      category: 'root',
      fixed: true,
      x: mapChartRef.value.clientWidth / 2,
      y: mapChartRef.value.clientHeight / 2,
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5, y: 0.5, r: 0.5,
          colorStops: [{ offset: 0, color: '#fff' }, { offset: 1, color: '#d4b170' }]
        },
        shadowBlur: 30,
        shadowColor: '#d4b170'
      },
      label: { show: true, fontSize: 18, fontWeight: 'bold', color: '#000' },
      z: 10
    }
    
    const nodes = [rootNode]
    const links = []
    const categoryNodes = {}
    
    // Generate Graph Data from industryData
    industryData.forEach(item => {
      const catKey = item.category
      // Create Category Node if not exists
      if (!categoryNodes[catKey]) {
        const catName = categories[catKey] || catKey.toUpperCase()
        categoryNodes[catKey] = {
          id: catKey,
          name: catName,
          symbolSize: 60,
          category: 'category',
          itemStyle: {
            color: '#1a2235',
            borderColor: '#d4b170',
            borderWidth: 2,
            shadowBlur: 15,
            shadowColor: 'rgba(212, 177, 112, 0.5)'
          },
          label: { show: true, color: '#d4b170', position: 'bottom', fontSize: 14, fontWeight: 'bold' }
        }
        nodes.push(categoryNodes[catKey])
        links.push({ source: 'root', target: catKey })
      }
      
      // Create Industry Node
      const val = parseFloat(item.avgValuation.replace('亿', ''))
      nodes.push({
        id: item.name,
        name: item.name,
        symbolSize: Math.max(30, Math.min(70, val * 4)),
        value: val,
        category: 'industry',
        itemStyle: {
          color: 'rgba(212, 177, 112, 0.15)',
          borderColor: '#d4b170',
          borderWidth: 1
        },
        label: { show: true, color: '#e0e0e0', fontSize: 11 }
      })
      links.push({ source: catKey, target: item.name })
    })

    mapChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.dataType === 'node' && params.data.category === 'industry') {
            const item = industryData.find(i => i.name === params.name)
            return `
              <div style="font-family: 'Rajdhani'; padding: 5px;">
                <div style="font-weight:bold;color:#d4b170;font-size:16px;margin-bottom:5px;">${params.name}</div>
                <div style="color:#fff">总估值: <span style="color:#d4b170">${item.avgValuation}</span></div>
                <div style="color:#fff">入驻企业: <span style="color:#d4b170">${item.companies}</span></div>
                <div style="color:#fff">增长趋势: <span style="color:${item.trend.includes('+') ? '#ff4d4f' : '#00cc88'}">${item.trend}</span></div>
              </div>
            `
          }
          return params.name
        },
        backgroundColor: 'rgba(11, 15, 25, 0.9)',
        borderColor: '#d4b170',
        borderWidth: 1,
        padding: 10,
        textStyle: { color: '#fff' }
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 400,
            edgeLength: [80, 160],
            gravity: 0.08,
            friction: 0.6
          },
          data: nodes,
          links: links,
          roam: true,
          scaleLimit: { min: 0.5, max: 2 },
          label: { show: true },
          lineStyle: {
            color: 'rgba(212, 177, 112, 0.4)',
            curveness: 0.1,
            width: 1.5
          },
          emphasis: {
            focus: 'adjacency',
            scale: 1.1,
            lineStyle: { width: 3, color: '#d4b170', opacity: 1 }
          }
        }
      ]
    })
  }
}

// Lifecycle
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  document.body.style.overflow = 'hidden'
  
  nextTick(() => {
    initCharts()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  document.body.style.overflow = ''
  window.removeEventListener('resize', handleResize)
  if (distChart) distChart.dispose()
  if (trendChart) trendChart.dispose()
  if (mapChart) mapChart.dispose()
})

const handleResize = () => {
  distChart?.resize()
  trendChart?.resize()
  mapChart?.resize()
}

const goBack = () => {
  router.back()
}

function getTrendClass(trend) {
  return parseFloat(trend) > 10 ? 'trend-high' : 'trend-normal'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@400;600&display=swap');

:root {
  --gold: #d4b170;
  --gold-dim: rgba(212, 177, 112, 0.3);
  --dark-bg: #0b0f19;
  --panel-bg: rgba(15, 20, 30, 0.75);
  --text-main: #e0e0e0;
  --text-dim: #8a90a0;
}

.dashboard-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--dark-bg);
  z-index: 9999;
  color: var(--text-main);
  font-family: 'Rajdhani', sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Backgrounds */
.dashboard-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 30%, #1a2235 0%, #0b0f19 70%);
  z-index: -2;
}

.bg-grid-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(212, 177, 112, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212, 177, 112, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: -1;
  perspective: 1000px;
  transform-style: preserve-3d;
  animation: gridMove 60s linear infinite;
}

@keyframes gridMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(40px); }
}

/* Header */
.dashboard-header {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: linear-gradient(to bottom, rgba(11, 15, 25, 0.95), rgba(11, 15, 25, 0.5));
  border-bottom: 1px solid var(--gold-dim);
  position: relative;
}

.title-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
}

.dashboard-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: 4px;
  text-shadow: 0 0 15px rgba(212, 177, 112, 0.8), 0 0 25px rgba(212, 177, 112, 0.4);
  background: linear-gradient(180deg, #ffffff 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.title-en {
  font-size: 12px;
  color: #ffe4b5;
  letter-spacing: 6px;
  opacity: 0.9;
  margin-top: 2px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  font-weight: 600;
}

.header-left-decoration {
  width: 300px;
  height: 30px;
}

.header-right-decoration {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 100%;
}

.header-time {
  font-family: 'Orbitron', monospace;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.close-btn {
  position: relative;
  background: rgba(212, 177, 112, 0.1);
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 5px 15px;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
}

.close-btn:hover {
  background: var(--gold);
  color: #000;
}

/* Layout */
.dashboard-content {
  flex: 1;
  display: grid;
  grid-template-columns: 28% 44% 28%;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
}

.dashboard-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Panel Styling */
.dashboard-panel {
  background: var(--panel-bg);
  border: 1px solid rgba(58, 64, 80, 0.5);
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.panel-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid var(--gold);
  transition: all 0.3s;
}

.corner-tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
.corner-tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
.corner-bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
.corner-br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

.dashboard-panel:hover .panel-corner {
  width: 15px;
  height: 15px;
  box-shadow: 0 0 5px var(--gold);
}

.panel-header {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background: linear-gradient(90deg, rgba(212, 177, 112, 0.1) 0%, transparent 100%);
  border-bottom: 1px solid rgba(212, 177, 112, 0.1);
  gap: 8px;
}

.panel-title-icon { color: var(--gold); font-size: 12px; }
.panel-title { font-weight: bold; font-size: 16px; color: #fff; }
.panel-title-en { font-size: 10px; color: var(--gold); opacity: 0.5; margin-left: auto; font-family: 'Orbitron'; }

.panel-body {
  flex: 1;
  padding: 10px;
  position: relative;
  overflow: hidden;
}

.chart-container {
  width: 100%;
  height: 100%;
}

/* Center Visuals */
.center-main-visual {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.center-total-stats {
  position: absolute;
  top: 0;
  z-index: 10;
  text-align: center;
}

.stat-label { font-size: 14px; color: var(--gold); letter-spacing: 2px; margin-bottom: 5px; }
.stat-number-wrapper { display: flex; align-items: baseline; justify-content: center; text-shadow: 0 0 20px rgba(212, 177, 112, 0.6); }
.currency { font-size: 24px; color: var(--gold); margin-right: 5px; }
.stat-number { font-size: 60px; font-family: 'Orbitron'; font-weight: bold; color: #fff; }
.unit { font-size: 20px; color: #fff; margin-left: 5px; }

.globe-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.center-chart-container {
  width: 100%;
  height: 100%;
}

.floating-metrics {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.floating-metrics.left { left: 0; }
.floating-metrics.right { right: 0; }

.metric-box {
  background: rgba(11, 15, 25, 0.8);
  border: 1px solid var(--gold-dim);
  padding: 10px 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 160px;
  backdrop-filter: blur(4px);
  border-left: 3px solid var(--gold);
}

.metric-icon {
  width: 40px;
  height: 40px;
  background: var(--gold-dim);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(212, 177, 112, 0.2);
  box-shadow: 0 0 10px rgba(212, 177, 112, 0.1);
}

.time-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  filter: drop-shadow(0 0 2px var(--gold));
}

.m-val { font-size: 24px; font-weight: bold; color: #fff; font-family: 'Orbitron'; }
.m-unit { font-size: 12px; color: var(--gold); margin-left: 2px; }
.m-label { font-size: 12px; color: var(--text-dim); }

.center-bottom-panel {
  height: 140px;
}
.bottom-panel-content {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bottom-title { font-size: 14px; color: var(--gold); margin-bottom: 10px; border-left: 3px solid var(--gold); padding-left: 10px; }
.bottom-charts { display: flex; gap: 20px; flex: 1; align-items: center; }
.bottom-chart-item { flex: 1; }
.b-label { font-size: 12px; color: #ccc; margin-bottom: 5px; }
.b-bar-bg { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
.b-bar-fill { height: 100%; background: var(--gold); box-shadow: 0 0 10px var(--gold); border-radius: 3px; }
.b-value { text-align: right; font-size: 12px; color: #fff; margin-top: 2px; font-family: 'Orbitron'; }

/* Table Styling */
.custom-table-header {
  display: flex;
  background: rgba(212, 177, 112, 0.05);
  padding: 12px 10px;
  font-size: 12px;
  color: var(--gold);
  font-weight: bold;
}
.custom-table-body {
  overflow-y: auto;
  padding: 0 10px;
}
.custom-table-row {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: background 0.2s;
}
.custom-table-row:hover { background: rgba(212, 177, 112, 0.05); }

.col-rank { width: 40px; text-align: center; }
.col-name { flex: 1; padding-left: 10px; font-size: 14px; color: #fff; }
.col-val { width: 80px; text-align: right; font-family: 'Orbitron'; color: #fff; }
.col-trend { width: 70px; text-align: right; }

.rank-badge {
  width: 24px; height: 24px;
  background: rgba(255,255,255,0.1);
  color: #8a90a0;
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Orbitron'; font-size: 12px; margin: 0 auto;
}
.rank-1 { background: linear-gradient(135deg, #ffd700, #b8860b); color: #000; text-shadow: 0 1px 0 rgba(255,255,255,0.5); box-shadow: 0 0 10px #ffd700; }
.rank-2 { background: linear-gradient(135deg, #c0c0c0, #808080); color: #000; }
.rank-3 { background: linear-gradient(135deg, #cd7f32, #8b4513); color: #000; }

.trend-arrow { font-size: 12px; font-family: 'Orbitron'; }
.trend-high { color: #ff4d4f; }
.trend-normal { color: var(--gold); }

/* Animation Classes */
@keyframes slideRight { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideLeft { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.animate-slide-right { animation: slideRight 0.5s ease-out forwards; opacity: 0; }
.animate-slide-left { animation: slideLeft 0.5s ease-out forwards; opacity: 0; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0b0f19; }
::-webkit-scrollbar-thumb { background: #3a4050; border-radius: 2px; }

/* Media Queries */
@media (max-width: 1200px) {
  .dashboard-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    overflow-y: auto;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
  }
  
  .dashboard-column {
    height: auto;
    min-height: 400px;
  }

  .left-column, .right-column {
    height: auto;
  }

  .dashboard-panel {
    height: 400px;
    margin-bottom: 20px;
  }

  .floating-metrics { 
    display: none; 
  }
  
  .dashboard-fullscreen {
    overflow-y: auto;
  }
}
</style>


