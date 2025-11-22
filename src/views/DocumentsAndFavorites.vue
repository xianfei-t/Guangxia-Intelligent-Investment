<template>
  <main class="main-content">
    <div class="documents-container">
      <!-- 页面头部 -->
      <div class="main-header">
        <h1 class="page-title fade-in-up">文件与收藏</h1>
      </div>

      <!-- 标签页导航 -->
      <div class="tabs">
        <button 
          class="tab" 
          :class="{ active: activeTab === 'documents' }"
          @click="activeTab = 'documents'"
        >
          文件审查
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'favorites' }"
          @click="activeTab = 'favorites'"
        >
          我的收藏
        </button>
      </div>
        
      <div class="tab-content">
        <!-- 文件审查标签页内容 -->
        <div v-if="activeTab === 'documents'" class="tab-pane active fade-in-up">
          <!-- 顶部操作栏 -->
          <div class="toolbar-container">
            <div class="search-container">
              <input 
                v-model="documentSearch" 
                type="text" 
                class="search-input" 
                placeholder="搜索文件名称或所属公司..." 
              />
              <button class="search-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.5 13.5C10.5376 13.5 13 11.0376 13 8C13 4.96243 10.5376 2.5 7.5 2.5C4.46243 2.5 2 4.96243 2 8C2 11.0376 4.46243 13.5 7.5 13.5Z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M14 14L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <div class="toolbar-actions">
              <button class="btn btn-primary" @click="triggerFileDialog">
                <span class="btn-icon">+</span> 上传文件
              </button>
              <input
                ref="fileInput"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                class="hidden-input"
                @change="handleFileSelect"
              />
            </div>
          </div>

          <!-- 拖拽上传区域 -->
          <div
            class="drop-area"
            :class="{ 'drag-over': dragActive }"
            @dragover.prevent="dragActive = true"
            @dragleave.prevent="dragActive = false"
            @drop.prevent="handleDrop"
            v-if="!documentList.length"
          >
            <div class="drop-area-content">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" style="margin-bottom: 15px;">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              <p class="drop-title">将文件拖放到此处或点击上传</p>
              <p class="drop-desc">支持 PDF, DOC, DOCX, XLS, XLSX 格式</p>
            </div>
          </div>

          <!-- 文件列表过滤器 -->
          <div class="filter-bar" v-if="documentList.length">
            <div class="filter-left">
              <TechSelect 
                v-model="documentFilters.status" 
                :options="documentStatusOptions" 
                placeholder="状态筛选"
                class="filter-select"
              />
            </div>
            <div class="filter-right">
              <button class="btn btn-secondary" @click="importHistory">导入历史</button>
              <button class="btn btn-primary" @click="batchReview">批量审核</button>
            </div>
          </div>

          <!-- 文件列表 (卡片式) -->
          <div class="document-grid" v-if="filteredDocuments.length">
            <div v-for="doc in filteredDocuments" :key="doc.id" class="tech-card document-card">
              <div class="card-header">
                <div class="file-icon-wrapper">
                  <svg class="document-icon" viewBox="0 0 24 24" fill="none" :stroke="getDocumentIconColor(doc.status)" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </div>
                <div class="card-title-group">
                  <h3 class="card-title" :title="doc.name">{{ doc.name }}</h3>
                  <span class="card-subtitle">{{ doc.company }}</span>
                </div>
                <div class="card-status">
                  <span class="status-badge" :class="statusClass(doc.status)">
                    {{ statusLabel(doc.status) }}
                  </span>
                </div>
              </div>
              
              <div class="card-content">
                <div class="info-row">
                  <span class="label">类型:</span>
                  <span class="value">{{ doc.type }}</span>
                </div>
                <div class="info-row">
                  <span class="label">大小:</span>
                  <span class="value">{{ doc.size }}</span>
                </div>
                <div class="info-row">
                  <span class="label">日期:</span>
                  <span class="value">{{ formatDate(doc.uploadedAt) }}</span>
                </div>
              </div>

              <div class="card-footer">
                <button class="btn-link" @click="viewDocument(doc)">查看</button>
                <button v-if="doc.status === 'pending'" class="btn-link primary" @click="reviewDocument(doc)">审核</button>
                <button v-else-if="doc.status === 'rejected'" class="btn-link warning" @click="resubmitDocument(doc)">重提</button>
              </div>
            </div>
          </div>
          
          <div v-else-if="documentList.length" class="empty-state">
            <div class="empty-icon">🔍</div>
            <p>没有找到匹配的文件</p>
          </div>
        </div>

        <!-- 我的收藏标签页内容 -->
        <div v-if="activeTab === 'favorites'" class="tab-pane active fade-in-up">
          <!-- 顶部操作栏 -->
          <div class="toolbar-container">
            <div class="search-container">
              <input
                v-model="favoriteSearch"
                type="text"
                class="search-input"
                placeholder="搜索收藏内容..."
              />
              <button class="search-btn" @click="searchFavorites">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.5 13.5C10.5376 13.5 13 11.0376 13 8C13 4.96243 10.5376 2.5 7.5 2.5C4.46243 2.5 2 4.96243 2 8C2 11.0376 4.46243 13.5 7.5 13.5Z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M14 14L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <div class="view-toggle">
              <button class="view-btn" :class="{ active: favoritesView === 'grid' }" @click="favoritesView = 'grid'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button class="view-btn" :class="{ active: favoritesView === 'table' }" @click="favoritesView = 'table'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div class="filter-bar">
            <div class="filter-left">
              <TechSelect v-model="favoriteFilters.category" :options="favoriteCategoryOptions" placeholder="全部分类" class="filter-select"/>
              <TechSelect v-model="favoriteFilters.industry" :options="favoriteIndustryOptions" placeholder="全部行业" class="filter-select"/>
              <TechSelect v-model="favoriteFilters.sort" :options="favoriteSortOptions" placeholder="排序方式" class="filter-select"/>
            </div>
            <div class="filter-right">
               <div class="select-all-container">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
                  <span style="margin-left: 6px; font-size: 14px; color: #64748b;">全选</span>
                </label>
              </div>
              <button class="btn btn-secondary" @click="exportFavorites">导出</button>
              <button class="btn btn-danger" :disabled="selectedFavorites.length === 0" @click="batchRemoveFavorites">
                批量删除 ({{ selectedFavorites.length }})
              </button>
            </div>
          </div>

          <!-- 网格视图 -->
          <div v-if="favoritesView === 'grid'" id="favorites-grid" class="favorites-grid">
            <div v-if="filteredFavorites.length" class="grid-content">
              <div v-for="item in filteredFavorites" :key="item.id" class="tech-card favorite-card">
                <div class="card-checkbox">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      :checked="selectedFavorites.includes(item.id)"
                      @change="toggleFavoriteSelection(item.id, $event.target.checked)"
                    />
                  </label>
                </div>
                <div class="favorite-icon-btn" @click="removeFavorite(item)">❤</div>
                
                <div class="card-header">
                   <div class="company-icon">{{ (item.company || '未')[0] }}</div>
                   <div class="card-title-group">
                     <h3 class="card-title">{{ item.title || item.name }}</h3>
                     <span class="card-subtitle">{{ item.company || '未指定单位' }}</span>
                   </div>
                </div>
                
                <div class="card-content">
                  <div class="meta-tags">
                    <span class="tech-tag">{{ getFavoriteTypeLabel(item.type || 'document') }}</span>
                    <span class="tech-tag">{{ item.industry || '通用' }}</span>
                  </div>
                  <p class="card-desc">{{ item.description || '暂无描述' }}</p>
                  <div class="date-info">
                    <span>📅 {{ formatDate(item.addedAt || item.updatedAt) }}</span>
                  </div>
                </div>

                <div class="card-footer">
                  <button class="btn-link" @click="goToDetail(item)">查看详情</button>
                  <button class="btn-link" @click="shareFavorite(item)">分享</button>
                </div>
                
                <div class="growth-badge" v-if="item.growth">
                  <span>+{{ item.growth }}%</span>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <div class="empty-icon">⭐</div>
              <p>你还没有收藏任何内容</p>
              <div class="empty-actions">
                <router-link class="btn btn-primary" to="/all-projects">去浏览项目</router-link>
              </div>
            </div>
          </div>

          <!-- 表格视图 -->
          <div v-else class="tech-table-container">
            <table id="favorites-table" class="tech-table">
              <thead>
                <tr>
                  <th style="width: 50px;">
                    <label class="checkbox-label">
                      <input 
                        type="checkbox" 
                        :checked="selectAll"
                        :indeterminate="isIndeterminate"
                        @change="toggleSelectAll"
                      />
                    </label>
                  </th>
                  <th>标题</th>
                  <th>所属公司</th>
                  <th>类型</th>
                  <th>收藏日期</th>
                  <th>行业</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredFavorites" :key="item.id">
                  <td>
                    <label class="checkbox-label">
                      <input 
                        type="checkbox" 
                        :checked="selectedFavorites.includes(item.id)"
                        @change="toggleFavoriteSelection(item.id, $event.target.checked)"
                      />
                    </label>
                  </td>
                  <td class="fw-bold">{{ item.title || item.name }}</td>
                  <td>{{ item.company || '未指定单位' }}</td>
                  <td><span class="tech-tag mini">{{ getFavoriteTypeLabel(item.type || 'document') }}</span></td>
                  <td>{{ formatDate(item.addedAt || item.updatedAt) }}</td>
                  <td>{{ item.industry || '通用领域' }}</td>
                  <td>
                    <div class="table-actions">
                      <button class="btn-icon-sm" @click="goToDetail(item)" title="查看">👁</button>
                      <button class="btn-icon-sm" @click="shareFavorite(item)" title="分享">🔗</button>
                      <button class="btn-icon-sm danger" @click="removeFavorite(item)" title="取消收藏">✕</button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!filteredFavorites.length">
                  <td colspan="7">
                    <div class="empty-state-small">暂无数据</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'
import TechSelect from '../components/TechSelect.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const router = useRouter()
const favoritesStore = useFavoritesStore()

const activeTab = ref('documents')
const documentSearch = ref('')
const documentFilters = reactive({
  status: '',
  type: ''
})

const documentStatusOptions = [
  { value: '', label: '全部文件' },
  { value: 'pending', label: '待审查' },
  { value: 'approved', label: '已通过' },
  { value: 'rejected', label: '已拒绝' }
]

const documentStatuses = documentStatusOptions.filter(opt => opt.value !== '')

const defaultDocuments = [
  {
    id: 'doc-1',
    name: '字节跳动企业数字化转型战略规划.pdf',
    type: '商业计划书',
    size: '12.4 MB',
    company: '字节跳动',
    status: 'pending',
    uploadedAt: '2023-10-15T00:00:00Z'
  },
  {
    id: 'doc-2',
    name: '阿里巴巴云计算平台项目方案.docx',
    type: '商业计划书',
    size: '4.6 MB',
    company: '阿里巴巴',
    status: 'approved',
    uploadedAt: '2023-10-14T00:00:00Z'
  },
  {
    id: 'doc-3',
    name: '腾讯云服务产品定价表.xlsx',
    type: '财务报表',
    size: '2.3 MB',
    company: '腾讯',
    status: 'rejected',
    uploadedAt: '2023-10-13T00:00:00Z'
  }
]

const uploadedDocuments = ref([])
const dragActive = ref(false)

const favoriteSearch = ref('')
const favoritesView = ref('grid')
const favoriteFilters = reactive({
  category: 'all',
  industry: 'all',
  sort: 'recent'
})

const favoriteCategoryOptions = [
  { value: 'all', label: '全部分类' },
  { value: 'project', label: '项目' },
  { value: 'company', label: '公司' },
  { value: 'document', label: '文档' }
]

const favoriteIndustryOptions = [
  { value: 'all', label: '全部行业' },
  { value: 'tech', label: '互联网/科技' },
  { value: 'finance', label: '金融' },
  { value: 'manufacturing', label: '制造业' },
  { value: 'retail', label: '零售' },
  { value: 'education', label: '教育' }
]

const favoriteSortOptions = [
  { value: 'recent', label: '最近收藏' },
  { value: 'name-asc', label: '名称 A-Z' },
  { value: 'name-desc', label: '名称 Z-A' }
]

const selectAll = ref(false)
const selectedFavorites = ref([])

const documentList = computed(() => {
  return [...uploadedDocuments.value, ...defaultDocuments]
})

const filteredDocuments = computed(() => {
  return documentList.value.filter((doc) => {
    const matchesSearch =
      !documentSearch.value ||
      doc.name.toLowerCase().includes(documentSearch.value.toLowerCase()) ||
      doc.company.toLowerCase().includes(documentSearch.value.toLowerCase())

    const matchesStatus = !documentFilters.status || doc.status === documentFilters.status
    const matchesType = !documentFilters.type || doc.type === documentFilters.type

    return matchesSearch && matchesStatus && matchesType
  })
})

const filteredFavorites = computed(() => {
  const favorites = favoritesStore.favorites || []
  let result = favorites.filter((item) => {
    // 搜索过滤
    if (favoriteSearch.value) {
      const target = `${item.title || item.name} ${item.company || ''} ${item.industry || ''} ${(item.tags || []).join(' ')}`.toLowerCase()
      if (!target.includes(favoriteSearch.value.toLowerCase())) return false
    }
    
    // 分类过滤
    if (favoriteFilters.category !== 'all') {
      const itemType = item.type || 'document'
      if (favoriteFilters.category === 'project' && itemType !== 'project') return false
      if (favoriteFilters.category === 'company' && itemType !== 'company') return false
      if (favoriteFilters.category === 'document' && itemType !== 'document') return false
    }
    
    // 行业过滤
    if (favoriteFilters.industry !== 'all') {
      const itemIndustry = (item.industry || '').toLowerCase()
      const filterMap = {
        tech: ['互联网', '科技', 'tech'],
        finance: ['金融', 'finance'],
        manufacturing: ['制造', 'manufacturing'],
        retail: ['零售', 'retail'],
        education: ['教育', 'education']
      }
      const keywords = filterMap[favoriteFilters.industry] || []
      if (!keywords.some(k => itemIndustry.includes(k))) return false
    }
    
    return true
  })
  
  // 排序
  if (favoriteFilters.sort === 'name-asc') {
    result = [...result].sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''))
  } else if (favoriteFilters.sort === 'name-desc') {
    result = [...result].sort((a, b) => (b.title || b.name || '').localeCompare(a.title || a.name || ''))
  } else {
    // recent - 按时间倒序
    result = [...result].sort((a, b) => {
      const timeA = new Date(a.addedAt || a.updatedAt || 0).getTime()
      const timeB = new Date(b.addedAt || b.updatedAt || 0).getTime()
      return timeB - timeA
    })
  }
  
  return result
})

const fileInput = ref(null)

function triggerFileDialog() {
  fileInput.value?.click()
}

function handleFileSelect(event) {
  const files = event.target.files
  if (files?.length) {
    addDocuments(files)
    event.target.value = ''
  }
}

function handleDrop(event) {
  dragActive.value = false
  const files = event.dataTransfer?.files
  if (files?.length) {
    addDocuments(files)
  }
}

function addDocuments(fileList) {
  const now = Date.now()
  const newDocs = Array.from(fileList).map((file, index) => ({
    id: `${now}-${index}-${file.name}`,
    name: file.name,
    type: detectType(file.name),
    size: formatSize(file.size),
    company: '未指定企业',
    status: 'pending',
    uploadedAt: new Date().toISOString()
  }))

  uploadedDocuments.value = [...newDocs, ...uploadedDocuments.value]
  saveDocuments(uploadedDocuments.value)
}

function updateDocumentStatus(doc, status) {
  const uploadedIndex = uploadedDocuments.value.findIndex((item) => item.id === doc.id)
  if (uploadedIndex > -1) {
    uploadedDocuments.value.splice(uploadedIndex, 1, {
      ...uploadedDocuments.value[uploadedIndex],
      status
    })
    saveDocuments(uploadedDocuments.value)
    return
  }
}

function getDocumentIconColor(status) {
  if (status === 'pending') return '#f59e0b'
  if (status === 'approved') return '#10b981'
  return '#94a3b8'
}

function viewDocument(doc) {
  console.log('查看文档:', doc)
}

function reviewDocument(doc) {
  if (confirm('确定要通过此文件吗？')) {
    updateDocumentStatus(doc, 'approved')
  }
}

function resubmitDocument(doc) {
  if (confirm('确定要重新提交此文件吗？')) {
    updateDocumentStatus(doc, 'pending')
  }
}

function batchReview() {
  const pendingFiles = filteredDocuments.value.filter(doc => doc.status === 'pending')
  if (pendingFiles.length === 0) {
    alert('没有需要审核的文件')
    return
  }
  
  if (confirm(`确定要批量审核 ${pendingFiles.length} 个文件吗？`)) {
    pendingFiles.forEach(doc => {
      updateDocumentStatus(doc, 'approved')
    })
    alert('批量审核完成')
  }
}

function importHistory() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.csv,.json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result)
          console.log('导入的历史数据:', data)
          alert('历史数据导入成功')
        } catch (error) {
          alert('导入失败: 请确保文件是有效的JSON格式')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

function searchFavorites() {
  console.log('搜索收藏:', favoriteSearch.value)
}

function statusLabel(status) {
  return documentStatusOptions.find((item) => item.value === status)?.label || status
}

function statusClass(status) {
  return {
    pending: 'status-pending',
    approved: 'status-approved',
    rejected: 'status-rejected'
  }[status]
}

function detectType(name) {
  if (name.includes('计划')) return '商业计划书'
  if (name.includes('财务')) return '财务报表'
  if (name.includes('合同')) return '投资合同'
  return '其他'
}

function formatSize(bytes = 0) {
  if (!bytes) return '0 MB'
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function removeFavorite(item) {
  favoritesStore.removeFromFavorites(item.id, item.type)
}

function shareFavorite(item) {
  alert(`已复制 ${item.title || item.name} 的分享链接`)
}

function goToDetail(item) {
  router.push({ name: 'CompanyDetail', params: { id: item.id }, query: { from: 'favorites' } })
}

function getFavoriteTypeLabel(type) {
  const typeMap = {
    project: '项目',
    company: '公司',
    document: '文档',
    table: '表格'
  }
  return typeMap[type] || '文档'
}

const isIndeterminate = computed(() => {
  const checkedCount = selectedFavorites.value.length
  const totalCount = filteredFavorites.value.length
  return checkedCount > 0 && checkedCount < totalCount
})

function toggleSelectAll() {
  if (selectAll.value) {
    selectedFavorites.value = filteredFavorites.value.map(item => item.id)
  } else {
    selectedFavorites.value = []
  }
}

function toggleFavoriteSelection(id, checked) {
  if (checked) {
    if (!selectedFavorites.value.includes(id)) {
      selectedFavorites.value.push(id)
    }
  } else {
    selectedFavorites.value = selectedFavorites.value.filter(fid => fid !== id)
  }
  // 更新全选状态
  const checkedCount = selectedFavorites.value.length
  const totalCount = filteredFavorites.value.length
  selectAll.value = checkedCount === totalCount && totalCount > 0
}

function batchRemoveFavorites() {
  if (selectedFavorites.value.length === 0) {
    alert('请先选择要取消收藏的项目')
    return
  }
  
  if (confirm(`确定要取消收藏 ${selectedFavorites.value.length} 个项目吗？`)) {
    const favorites = favoritesStore.favorites || []
    selectedFavorites.value.forEach(id => {
      const item = favorites.find(f => f.id === id)
      if (item) {
        favoritesStore.removeFromFavorites(id, item.type)
      }
    })
    selectedFavorites.value = []
    selectAll.value = false
    alert('批量取消收藏完成')
  }
}

function exportFavorites() {
  if (filteredFavorites.value.length === 0) {
    alert('没有可导出的数据')
    return
  }
  
  const exportData = filteredFavorites.value.map(item => ({
    title: item.title || item.name,
    company: item.company,
    industry: item.industry,
    type: getFavoriteTypeLabel(item.type),
    date: formatDate(item.addedAt || item.updatedAt)
  }))
  
  const jsonContent = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `favorites-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  alert('数据导出成功')
}

function loadDocuments() {
  try {
    const stored = localStorage.getItem('uploadedDocuments')
    uploadedDocuments.value = stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('加载文件失败', error)
    uploadedDocuments.value = []
  }
}

function saveDocuments(list) {
  localStorage.setItem('uploadedDocuments', JSON.stringify(list))
}

// 监听全选状态变化
watch(selectAll, (newVal) => {
  if (newVal) {
    selectedFavorites.value = filteredFavorites.value.map(item => item.id)
  } else {
    selectedFavorites.value = []
  }
})

// 监听筛选结果变化，更新全选状态
watch(filteredFavorites, () => {
  const checkedCount = selectedFavorites.value.length
  const totalCount = filteredFavorites.value.length
  selectAll.value = checkedCount === totalCount && totalCount > 0
}, { deep: true })

// 初始化
loadDocuments()
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 24px;
  background: linear-gradient(-45deg, #ffffff, #e3f2fd, #f0f7ff, #ffffff);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  overflow-y: auto;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.documents-container {
  max-width: 1200px;
  margin: 0 auto;
}

.main-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  position: relative;
}

/* Toolbar and Search */
.toolbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  flex: 1;
  max-width: 400px;
}

.search-input {
  padding: 10px 40px 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
  width: 100%;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background: white;
}

.search-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 5px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

/* Tabs */
.tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 24px;
  gap: 24px;
}

.tab {
  padding: 12px 4px;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 15px;
  font-weight: 600;
  color: #64748b;
  position: relative;
  transition: all 0.3s ease;
}

.tab:hover {
  color: #334155;
}

.tab.active {
  color: var(--primary-color);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 3px 3px 0 0;
}

.tab-content {
  min-height: 400px;
}

/* Buttons */
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
  color: #334155;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background-color: #f8fafc;
  border-color: #94a3b8;
}

.btn-danger {
  background-color: #fff1f2;
  color: #e11d48;
  border: 1px solid #ffe4e6;
}

.btn-danger:hover {
  background-color: #fee2e2;
  border-color: #fecaca;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-left, .filter-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-select {
  width: 160px;
}

/* Tech Cards */
.document-grid, .favorites-grid .grid-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.tech-card {
  background: linear-gradient(165deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 0;
  border: none;
  clip-path: polygon(
    0 0, 
    calc(100% - 30px) 0, 
    100% 30px, 
    100% 100%, 
    0 100%
  );
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(148, 163, 184, 0.1);
  filter: drop-shadow(0 5px 15px rgba(15, 23, 42, 0.08));
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  border-left: 4px solid #3b82f6;
  display: flex;
  flex-direction: column;
}

.tech-card:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0 15px 30px rgba(6, 182, 212, 0.15));
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(6, 182, 212, 0.3);
}

.tech-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L100 40' stroke='%233b82f6' stroke-width='1.5' stroke-dasharray='4 4' opacity='0.6'/%3E%3Cpath d='M55 0 L55 10 L85 40 L100 40' fill='none' stroke='%233b82f6' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: top right;
  pointer-events: none;
  opacity: 0.6;
}

.card-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
}

.file-icon-wrapper, .company-icon {
  width: 40px;
  height: 40px;
  background: #eff6ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--primary-color);
  font-weight: 700;
}

.document-icon {
  width: 24px;
  height: 24px;
}

.card-title-group {
  flex: 1;
  overflow: hidden;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-subtitle {
  font-size: 12px;
  color: #64748b;
}

.card-content {
  flex: 1;
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
}

.info-row .label {
  color: #94a3b8;
}

.info-row .value {
  color: #334155;
  font-weight: 500;
}

.card-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-link {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: color 0.2s;
}

.btn-link:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.btn-link.primary { color: var(--primary-color); }
.btn-link.warning { color: #f59e0b; }

/* Drop Area */
.drop-area {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 30px;
  cursor: pointer;
}

.drop-area:hover, .drop-area.drag-over {
  border-color: var(--primary-color);
  background-color: rgba(59, 130, 246, 0.05);
}

.drop-title {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin: 8px 0;
}

.drop-desc {
  color: #94a3b8;
  font-size: 13px;
}

/* Status Badges */
.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.status-pending { background: #fffbeb; color: #b45309; border: 1px solid #fcd34d; }
.status-approved { background: #ecfdf5; color: #047857; border: 1px solid #6ee7b7; }
.status-rejected { background: #fef2f2; color: #b91c1c; border: 1px solid #fca5a5; }

/* View Toggle */
.view-toggle {
  display: flex;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2px;
}

.view-btn {
  padding: 6px 10px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  color: #94a3b8;
}

.view-btn.active {
  background: #f1f5f9;
  color: var(--primary-color);
}

/* Table Style */
.tech-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tech-table {
  width: 100%;
  border-collapse: collapse;
}

.tech-table th {
  background: #f8fafc;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 13px;
  border-bottom: 1px solid #e2e8f0;
}

.tech-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #334155;
}

.tech-table tr:hover td {
  background: #f8fafc;
}

.fw-bold { font-weight: 600; }

.tech-tag {
  display: inline-block;
  padding: 2px 8px;
  background: #f1f5f9;
  color: #475569;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 6px;
}

.btn-icon-sm {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  transition: all 0.2s;
}

.btn-icon-sm:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-icon-sm.danger:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #94a3b8;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* Checkbox */
.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  cursor: pointer;
}

.hidden-input { display: none; }

.favorite-card .card-checkbox {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
}

.favorite-icon-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #ef4444;
  cursor: pointer;
  z-index: 2;
  font-size: 18px;
  transition: transform 0.2s;
}

.favorite-icon-btn:hover { transform: scale(1.2); }

.meta-tags { margin-bottom: 12px; }
.card-desc { 
  font-size: 13px; 
  color: #64748b; 
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.date-info {
  font-size: 12px;
  color: #94a3b8;
}

.growth-badge {
  position: absolute;
  bottom: 60px;
  right: 20px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
</style>