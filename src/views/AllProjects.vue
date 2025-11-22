<template>
  <main class="main-content">
    <!-- 页面头部 -->
    <div class="main-header">
      <h1 class="page-title fade-in-up">所有项目</h1>
      <div class="header-actions">
        <button class="btn btn-secondary" @click="toggleView">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect v-if="isGridView" x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
            <line v-if="isGridView" x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2"/>
            <line v-if="isGridView" x1="9" y1="21" x2="9" y2="9" stroke="currentColor" stroke-width="2"/>
            <template v-else>
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </template>
          </svg>
          {{ isGridView ? '表格视图' : '网格视图' }}
        </button>
        <router-link to="/profile" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          个人中心
        </router-link>
        <button class="btn btn-primary" @click="showNewProjectModal = true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          新建项目
        </button>
      </div>
    </div>
    
    <!-- 筛选栏 -->
    <div class="filter-bar">
      <input 
        v-model="searchTerm" 
        type="text" 
        class="search-input" 
        placeholder="搜索项目名称、标签或描述..." 
        @input="filterProjects"
      />
      <div class="filter-group">
        <TechSelect 
          v-model="filters.industry" 
          :options="industryOptions" 
          placeholder="所有行业"
          @change="filterProjects"
        />
        <TechSelect 
          v-model="filters.stage" 
          :options="stageOptions" 
          placeholder="所有阶段"
          @change="filterProjects"
        />
        <TechSelect 
          v-model="filters.status" 
          :options="statusOptions" 
          placeholder="所有状态"
          @change="filterProjects"
        />
      </div>
    </div>
    
    <!-- 项目标签页 -->
    <div class="project-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.value"
        class="tab-item" 
        :class="{ active: activeTab === tab.value }"
        @click="switchTab(tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>
    
    <!-- 项目列表内容 -->
    <div class="project-content">
      <!-- 表格视图 -->
      <div v-if="!isGridView" class="project-table-wrapper">
        <table class="project-table">
          <thead>
            <tr>
              <th class="table-header">项目名称</th>
              <th class="table-header">行业</th>
              <th class="table-header">融资金额</th>
              <th class="table-header">融资阶段</th>
              <th class="table-header">成立时间</th>
              <th class="table-header">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(project, index) in paginatedProjects" 
              :key="project.id"
              class="table-row fade-in hover-shadow"
              :class="{ selected: selectedProjectId === project.id }"
              :style="{ animationDelay: `${index * 0.05}s` }"
              @click="selectProject(project)"
            >
              <td class="table-cell">{{ project.name }}</td>
              <td class="table-cell">{{ project.industry }}</td>
              <td class="table-cell">{{ project.amount }}</td>
              <td class="table-cell">{{ project.stage }}</td>
              <td class="table-cell">{{ project.founded }}</td>
              <td class="table-cell">
                <span class="project-status" :class="getStatusClass(project.status)">
                  {{ getStatusText(project.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 网格视图 -->
      <div v-else class="project-grid-view">
        <div 
          v-for="(project, index) in paginatedProjects" 
          :key="project.id"
          class="project-card card-hover-lift fade-in"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="selectProject(project)"
        >
          <div class="project-card-header">
            <h3 class="project-card-title">{{ project.name }}</h3>
            <span class="project-status" :class="getStatusClass(project.status)">
              {{ getStatusText(project.status) }}
            </span>
          </div>
          <div class="project-card-meta">
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 17L12 14L15 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 11V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.founded }}
            </div>
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.stage }}
            </div>
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.amount }}
            </div>
          </div>
          <p class="project-card-description">{{ project.description }}</p>
          <div class="project-card-footer">
            <div class="project-card-tags">
              <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分页 -->
      <div class="pagination">
        <div class="pagination-info">
          显示 {{ startIndex + 1 }}-{{ endIndex }} 条，共 {{ filteredProjects.length }} 条
        </div>
        <div class="pagination-controls">
          <button 
            class="pagination-btn" 
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button 
            v-for="page in visiblePages" 
            :key="page"
            class="pagination-btn" 
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button 
            class="pagination-btn" 
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 新建项目模态框 -->
    <div v-if="showNewProjectModal" class="modal" @click.self="showNewProjectModal = false">
      <div class="modal-content">
        <span class="close" @click="showNewProjectModal = false">&times;</span>
        <h2>新建项目</h2>
        <form @submit.prevent="createProject">
          <div class="form-group">
            <label for="project-name">项目名称</label>
            <input type="text" id="project-name" v-model="newProject.name" required>
          </div>
          <div class="form-group">
            <label for="project-description">项目描述</label>
            <textarea id="project-description" v-model="newProject.description" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <label for="project-industry">行业</label>
            <select id="project-industry" v-model="newProject.industry" required>
              <option value="">请选择</option>
              <option value="医疗健康">医疗健康</option>
              <option value="新能源">新能源</option>
              <option value="金融科技">金融科技</option>
              <option value="人工智能">人工智能</option>
            </select>
          </div>
          <div class="form-group">
            <label for="project-amount">融资金额</label>
            <input type="text" id="project-amount" v-model="newProject.amount" placeholder="例如：5000万" required>
          </div>
          <div class="form-group">
            <label for="project-stage">融资阶段</label>
            <select id="project-stage" v-model="newProject.stage" required>
              <option value="">请选择</option>
              <option value="种子轮">种子轮</option>
              <option value="A轮">A轮</option>
              <option value="B轮">B轮</option>
              <option value="C轮">C轮</option>
            </select>
          </div>
          <div class="form-group">
            <label for="project-status">项目状态</label>
            <select id="project-status" v-model="newProject.status" required>
              <option value="">请选择</option>
              <option value="funding">融资中</option>
              <option value="ongoing">进行中</option>
              <option value="completed">已完成</option>
              <option value="paused">已暂停</option>
            </select>
          </div>
          <div class="form-group">
            <label for="project-tags">标签 (用逗号分隔)</label>
            <input type="text" id="project-tags" v-model="newProject.tags" placeholder="例如：AI,医疗,SaaS" required>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="showNewProjectModal = false">取消</button>
            <button type="submit" class="btn btn-primary">创建项目</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollReveal } from '../composables/useScrollReveal'
import TechSelect from '../components/TechSelect.vue'

// 初始化滚动显示动画
const { initScrollReveal } = useScrollReveal()

const router = useRouter()

// 筛选选项定义
const industryOptions = [
  { label: '所有行业', value: '' },
  { label: '人工智能', value: '人工智能' },
  { label: '医疗健康', value: '医疗健康' },
  { label: '新能源', value: '新能源' },
  { label: '金融科技', value: '金融科技' }
]

const stageOptions = [
  { label: '所有阶段', value: '' },
  { label: '种子轮', value: 'seed' },
  { label: 'A轮', value: 'a' },
  { label: 'B轮', value: 'b' },
  { label: 'C轮及以后', value: 'c' }
]

const statusOptions = [
  { label: '所有状态', value: '' },
  { label: '融资中', value: 'funding' },
  { label: '进行中', value: 'ongoing' },
  { label: '已完成', value: 'completed' },
  { label: '已暂停', value: 'paused' }
]

// 视图状态
const isGridView = ref(false)
const activeTab = ref('all')
const searchTerm = ref('')
const filters = ref({
  industry: '',
  stage: '',
  status: ''
})
const selectedProjectId = ref(null)
const showNewProjectModal = ref(false)
const currentPage = ref(1)
const pageSize = 10

// 标签页
const tabs = [
  { label: '全部', value: 'all' },
  { label: '热门项目', value: 'hot' },
  { label: '推荐项目', value: 'recommend' },
  { label: '最新上线', value: 'new' }
]

// 默认项目数据
const defaultProjects = [
  {
    id: 1,
    name: "智能医疗诊断平台",
    industry: "医疗健康",
    amount: "5000万",
    stage: "B轮",
    founded: "2019-03",
    status: "funding",
    description: "基于人工智能技术的医疗诊断辅助平台，通过深度学习算法分析医学影像，辅助医生进行疾病诊断。",
    tags: ["AI", "医疗", "SaaS"]
  },
  {
    id: 2,
    name: "新能源汽车电池管理系统",
    industry: "新能源",
    amount: "1.2亿",
    stage: "C轮",
    founded: "2018-07",
    status: "ongoing",
    description: "高性能电池管理系统，提升新能源汽车电池寿命和安全性，降低能耗。",
    tags: ["新能源", "汽车", "电池技术"]
  },
  {
    id: 3,
    name: "企业级数据分析平台",
    industry: "金融科技",
    amount: "3000万",
    stage: "A轮",
    founded: "2020-01",
    status: "completed",
    description: "为金融机构提供实时数据分析和风险评估的SaaS平台，帮助企业做出数据驱动的决策。",
    tags: ["数据分析", "金融", "SaaS"]
  },
  {
    id: 4,
    name: "AI智能推荐引擎",
    industry: "人工智能",
    amount: "8000万",
    stage: "B轮",
    founded: "2017-12",
    status: "ongoing",
    description: "基于深度学习的个性化推荐系统，广泛应用于电商、内容平台和广告投放领域。",
    tags: ["AI", "推荐系统", "电商"]
  },
  {
    id: 5,
    name: "区块链供应链管理平台",
    industry: "金融科技",
    amount: "2000万",
    stage: "A轮",
    founded: "2021-05",
    status: "funding",
    description: "利用区块链技术实现供应链全流程透明化管理，提升物流效率和信任度。",
    tags: ["区块链", "供应链", "物流"]
  },
  {
    id: 6,
    name: "工业机器人智能控制系统",
    industry: "智能制造",
    amount: "1.5亿",
    stage: "C轮",
    founded: "2016-09",
    status: "completed",
    description: "高性能工业机器人控制系统，提升生产线自动化水平和生产效率。",
    tags: ["机器人", "工业自动化", "智能制造"]
  },
  {
    id: 7,
    name: "智能农业监测系统",
    industry: "人工智能",
    amount: "1500万",
    stage: "A轮",
    founded: "2019-11",
    status: "ongoing",
    description: "通过物联网和AI技术实时监测农田环境参数，提供精准种植建议。",
    tags: ["AI", "物联网", "农业科技"]
  },
  {
    id: 8,
    name: "云原生安全防护平台",
    industry: "网络安全",
    amount: "6000万",
    stage: "B轮",
    founded: "2018-03",
    status: "funding",
    description: "专为云原生应用设计的安全防护解决方案，提供实时威胁检测和响应能力。",
    tags: ["网络安全", "云原生", "DevSecOps"]
  },
  {
    id: 9,
    name: "数字孪生城市平台",
    industry: "智慧城市",
    amount: "2亿",
    stage: "C轮",
    founded: "2017-05",
    status: "ongoing",
    description: "构建城市级数字孪生系统，实现城市管理智能化和精细化。",
    tags: ["数字孪生", "智慧城市", "大数据"]
  },
  {
    id: 10,
    name: "元宇宙社交平台",
    industry: "元宇宙",
    amount: "1亿",
    stage: "B轮",
    founded: "2022-01",
    status: "paused",
    description: "基于区块链技术的去中心化社交平台，用户可创建数字身份和虚拟资产。",
    tags: ["元宇宙", "区块链", "社交"]
  }
]

// 项目数据
const projects = ref([])

// 新建项目表单
const newProject = ref({
  name: '',
  description: '',
  industry: '',
  amount: '',
  stage: '',
  status: '',
  tags: '',
  founded: new Date().toISOString().slice(0, 7)
})

// 加载项目数据
function loadProjects() {
  try {
    const stored = localStorage.getItem('projects')
    projects.value = stored ? JSON.parse(stored) : defaultProjects
  } catch (error) {
    console.error('加载项目失败:', error)
    projects.value = defaultProjects
  }
}

// 保存项目数据
function saveProjects() {
  try {
    localStorage.setItem('projects', JSON.stringify(projects.value))
  } catch (error) {
    console.error('保存项目失败:', error)
  }
}

// 筛选后的项目
const filteredProjects = computed(() => {
  let result = [...projects.value]

  // 搜索过滤
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(project => {
      return (
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.industry.toLowerCase().includes(term) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
      )
    })
  }

  // 筛选条件
  if (filters.value.industry) {
    result = result.filter(p => p.industry === filters.value.industry)
  }
  if (filters.value.stage) {
    result = result.filter(p => p.stage.toLowerCase().includes(filters.value.stage))
  }
  if (filters.value.status) {
    result = result.filter(p => p.status === filters.value.status)
  }

  // 标签页过滤
  if (activeTab.value === 'hot') {
    result = result.filter(p => p.hot)
  } else if (activeTab.value === 'recommend') {
    result = result.filter(p => p.recommend)
  } else if (activeTab.value === 'new') {
    result = result.sort((a, b) => new Date(b.founded) - new Date(a.founded)).slice(0, 20)
  }

  return result
})

// 分页计算
const totalPages = computed(() => Math.ceil(filteredProjects.value.length / pageSize))
const startIndex = computed(() => (currentPage.value - 1) * pageSize)
const endIndex = computed(() => Math.min(startIndex.value + pageSize, filteredProjects.value.length))
const paginatedProjects = computed(() => {
  return filteredProjects.value.slice(startIndex.value, endIndex.value)
})
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// 方法
function toggleView() {
  isGridView.value = !isGridView.value
}

function switchTab(tab) {
  activeTab.value = tab
  currentPage.value = 1
}

function filterProjects() {
  currentPage.value = 1
}

function selectProject(project) {
  selectedProjectId.value = project.id
  router.push({ name: 'CompanyDetail', params: { id: project.id } })
}

function getStatusClass(status) {
  const classes = {
    funding: 'funding',
    ongoing: 'ongoing',
    completed: 'completed',
    paused: 'paused'
  }
  return classes[status] || ''
}

function getStatusText(status) {
  const texts = {
    funding: '融资中',
    ongoing: '进行中',
    completed: '已完成',
    paused: '已暂停'
  }
  return texts[status] || status
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function createProject() {
  const project = {
    id: Date.now(),
    name: newProject.value.name,
    description: newProject.value.description,
    industry: newProject.value.industry,
    amount: newProject.value.amount,
    stage: newProject.value.stage,
    status: newProject.value.status,
    founded: newProject.value.founded,
    tags: newProject.value.tags.split(',').map(t => t.trim()),
    createdAt: new Date().toISOString()
  }

  projects.value.unshift(project)
  saveProjects()
  showNewProjectModal.value = false
  
  // 重置表单
  newProject.value = {
    name: '',
    description: '',
    industry: '',
    amount: '',
    stage: '',
    status: '',
    tags: '',
    founded: new Date().toISOString().slice(0, 7)
  }

  alert('项目创建成功！')
}

// 初始化
onMounted(() => {
  loadProjects()
  // 数据加载后，重新初始化 scroll reveal
  nextTick(() => {
    setTimeout(() => {
      initScrollReveal()
    }, 100)
  })
})
</script>


<style scoped>
.main-content {
  flex: 1;
  padding: 24px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  position: relative;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Filter Bar Styles */
.filter-bar {
  background: linear-gradient(135deg, #ffffff 0%, #eef2ff 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1);
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 30;
}

.search-input {
  flex: 1;
  min-width: 250px;
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background: white;
}

.filter-group {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Tabs Styles */
.project-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px 12px 0 0;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 20px;
  margin-bottom: 0;
}

.tab-item {
  padding: 16px 24px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  font-size: 15px;
  font-weight: 600;
  color: #64748b;
  transition: all 0.3s ease;
  position: relative;
}

.tab-item.active {
  border-bottom-color: var(--primary-color);
  color: var(--primary-color);
  background: linear-gradient(to top, rgba(59, 130, 246, 0.05), transparent);
}

.tab-item:hover:not(.active) {
  color: #334155;
}

/* Content Area */
.project-content {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 0 0 12px 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  min-height: 500px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-top: none;
  position: relative;
}

.project-table-wrapper {
  overflow-x: auto;
  padding: 10px;
}

.project-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: -8px;
}

.table-header {
  background: linear-gradient(90deg, rgba(248, 250, 252, 0.5) 0%, rgba(241, 245, 249, 0.5) 100%);
  padding: 12px 24px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  border: none;
}

.table-row {
  transition: all 0.3s ease;
  cursor: pointer;
  background: linear-gradient(90deg, #ffffff 0%, #fbfcfe 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  position: relative;
}

/* Rounded corners for rows */
.table-row td:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-left: 3px solid transparent;
}

.table-row td:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-right: 1px solid transparent;
}

.table-row td {
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.table-row:hover {
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.1);
  z-index: 1;
  background: linear-gradient(90deg, #ffffff 0%, #f0f9ff 100%);
}

.table-row:hover td {
  border-color: rgba(59, 130, 246, 0.1);
}

.table-row:hover td:first-child {
  border-left: 3px solid #3b82f6;
}

.table-row.selected {
  background: linear-gradient(90deg, #eff6ff 0%, #e0f2fe 100%);
  border-color: #bfdbfe;
}

.table-cell {
  padding: 16px 24px;
  font-size: 14px;
  color: #334155;
  font-weight: 500;
}

/* Status Badges */
.project-status {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.project-status.funding {
  background-color: #eff6ff;
  color: #3b82f6;
  border: 1px solid #dbeafe;
}

.project-status.ongoing {
  background-color: #ecfeff;
  color: #06b6d4;
  border: 1px solid #cffafe;
}

.project-status.completed {
  background-color: #f0fdf4;
  color: #22c55e;
  border: 1px solid #dcfce7;
}

.project-status.paused {
  background-color: #fffbeb;
  color: #f59e0b;
  border: 1px solid #fef3c7;
}

/* Grid View - Tech Card Style */
.project-grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 30px;
}

.project-card {
  background: linear-gradient(165deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 0;
  border: none;
  clip-path: polygon(
    0 0, 
    calc(100% - 40px) 0, 
    100% 40px, 
    100% 100%, 
    0 100%
  );
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(148, 163, 184, 0.1);
  filter: drop-shadow(0 5px 15px rgba(15, 23, 42, 0.08));
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  position: relative;
  border-left: 4px solid #3b82f6;
  background-image: linear-gradient(to right, #3b82f6 0%, #60a5fa 100%);
  background-size: 100% 4px;
  background-repeat: no-repeat;
  background-position: top left;
}

.project-card:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0 15px 30px rgba(6, 182, 212, 0.15));
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(6, 182, 212, 0.3);
}

.project-card:hover::before {
  opacity: 0.25;
  filter: drop-shadow(0 0 2px #06b6d4);
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L30 10 L30 30' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%2306b6d4'/%3E%3Cpath d='M70 90 L70 70 L90 70' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3Ccircle cx='70' cy='70' r='3' fill='%2306b6d4'/%3E%3Cpath d='M10 90 L30 90 L30 70' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3Cpath d='M90 10 L70 10 L70 30' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3Cpath d='M40 50 L60 50' fill='none' stroke='%2306b6d4' stroke-width='2' stroke-dasharray='4 4'/%3E%3C/svg%3E");
}

.project-card > *:not(::before):not(::after) {
  position: relative;
  z-index: 2;
}

.project-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L100 40' stroke='%233b82f6' stroke-width='1.5' stroke-dasharray='4 4' opacity='0.6'/%3E%3Cpath d='M55 0 L55 10 L85 40 L100 40' fill='none' stroke='%233b82f6' stroke-width='1' opacity='0.3'/%3E%3Crect x='53' y='-2' width='4' height='4' fill='%233b82f6' opacity='0.8'/%3E%3Crect x='98' y='38' width='4' height='4' fill='%233b82f6' opacity='0.8'/%3E%3Cpath d='M40 0 L100 60' stroke='%2394a3b8' stroke-width='0.5' opacity='0.2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: top right;
  pointer-events: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.project-card:hover::after {
  opacity: 1;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 4px;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L30 10 L30 30' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10'/%3E%3Ccircle cx='30' cy='30' r='2.5' fill='%233b82f6' opacity='0.10'/%3E%3Cpath d='M70 90 L70 70 L90 70' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10'/%3E%3Ccircle cx='70' cy='70' r='2.5' fill='%233b82f6' opacity='0.10'/%3E%3Cpath d='M10 90 L30 90 L30 70' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10'/%3E%3Cpath d='M90 10 L70 10 L70 30' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10'/%3E%3Cpath d='M40 50 L60 50' fill='none' stroke='%233b82f6' stroke-width='1.5' opacity='0.10' stroke-dasharray='4 4'/%3E%3C/svg%3E");
  background-size: 100px 100px;
  z-index: 1;
  pointer-events: none;
  transition: all 0.3s ease;
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.project-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
  line-height: 1.4;
}

.project-card-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.meta-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #64748b;
  gap: 6px;
  font-weight: 500;
}

.project-card-description {
  font-size: 14px;
  color: #475569;
  margin-bottom: 20px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.project-tag {
  padding: 4px 10px;
  background-color: #f1f5f9;
  border-radius: 6px;
  font-size: 12px;
  color: #475569;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
}

.pagination-info {
  font-size: 14px;
  color: #64748b;
}

.pagination-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #eff6ff;
  color: #3b82f6;
  border-color: #bfdbfe;
}

.pagination-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.25);
}

/* Button Styles - Matching Profile/Home */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
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
  background-color: white;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background-color: #f8fafc;
  color: #1e293b;
  border-color: #cbd5e1;
}

/* Modal Styles */
.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border: none;
  width: 90%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalPop {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 24px;
  color: #1e293b;
  font-size: 20px;
  font-weight: 700;
}

.close {
  color: #94a3b8;
  float: right;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  transition: color 0.2s;
}

.close:hover {
  color: #475569;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #475569;
  font-size: 14px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    flex-wrap: wrap;
  }

  .project-grid-view {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-direction: column;
    gap: 16px;
  }
}
</style>


