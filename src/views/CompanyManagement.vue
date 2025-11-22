<template>
  <main class="main-content">
    <!-- 页面头部 -->
    <div class="main-header">
      <h1 class="page-title fade-in-up">公司管理</h1>
      <div class="search-container">
        <input 
          v-model="searchTerm" 
          type="text" 
          class="search-input" 
          placeholder="搜索公司名称..." 
          @input="searchCompanies"
        />
        <button class="search-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.5 13.5C10.5376 13.5 13 11.0376 13 8C13 4.96243 10.5376 2.5 7.5 2.5C4.46243 2.5 2 4.96243 2 8C2 11.0376 4.46243 13.5 7.5 13.5Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M14 14L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="management-container">
      <!-- 标签页导航 -->
      <div class="tabs">
        <button 
          class="tab" 
          :class="{ active: activeTab === 'my-companies' }"
          @click="activeTab = 'my-companies'"
        >
          我的公司
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'register-company' }"
          @click="activeTab = 'register-company'"
        >
          注册公司
        </button>
      </div>
      
      <!-- 我的公司内容 -->
      <div v-if="activeTab === 'my-companies'" class="tab-content active">
        <div class="company-grid">
          <div 
            v-for="company in filteredCompanies" 
            :key="company.id"
            class="company-card"
          >
            <div class="company-card-header">
              <div>
                <h3 class="company-card-title">{{ company.name }}</h3>
                <p class="company-card-subtitle">{{ company.industry }}</p>
                <span class="company-status" :class="company.verified ? 'status-active' : 'status-inactive'">
                  {{ company.verified ? '已认证' : '未认证' }}
                </span>
              </div>
            </div>
            <div class="company-info">
              <div class="info-item">
                <div class="info-label">注册资本:</div>
                <div class="info-value">{{ company.registeredCapital }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">成立时间:</div>
                <div class="info-value">{{ company.establishmentDate }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">法定代表人:</div>
                <div class="info-value">{{ company.legalPerson }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">统一社会信用代码:</div>
                <div class="info-value">{{ company.creditCode }}</div>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn btn-primary" @click="viewCompanyDetail(company)">查看详情</button>
              <button class="btn btn-secondary" @click="editCompany(company)">编辑信息</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 注册公司内容 -->
      <div v-if="activeTab === 'register-company'" class="tab-content active">
        <div class="company-form">
          <h2 style="margin-bottom: 20px; font-size: 20px; font-weight: 600;">公司注册信息</h2>
          
          <form @submit.prevent="submitCompanyRegistration">
            <!-- 基本信息 -->
            <div class="form-section">
              <h3 class="form-section-title">基本信息</h3>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="company-name">
                    公司名称 <span style="color: var(--danger-color);">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="company-name" 
                    class="form-input" 
                    placeholder="请输入公司全称" 
                    v-model="formData.companyName"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="company-type">
                    公司类型 <span style="color: var(--danger-color);">*</span>
                  </label>
                  <TechSelect 
                    v-model="formData.companyType" 
                    :options="companyTypeOptions" 
                    placeholder="请选择公司类型"
                    class="tech-select-full"
                  />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="registered-capital">
                    注册资本 <span style="color: var(--danger-color);">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="registered-capital" 
                    class="form-input" 
                    placeholder="请输入注册资本（万元）" 
                    v-model="formData.registeredCapital"
                    required
                  />
                  <div class="form-help">请输入阿拉伯数字，单位为万元</div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="establishment-date">
                    成立日期 <span style="color: var(--danger-color);">*</span>
                  </label>
                  <input 
                    type="date" 
                    id="establishment-date" 
                    class="form-input" 
                    v-model="formData.establishmentDate"
                    required
                  />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="legal-person">
                    法定代表人 <span style="color: var(--danger-color);">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="legal-person" 
                    class="form-input" 
                    placeholder="请输入法定代表人姓名" 
                    v-model="formData.legalPerson"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="credit-code">
                    统一社会信用代码 <span style="color: var(--danger-color);">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="credit-code" 
                    class="form-input" 
                    placeholder="请输入18位统一社会信用代码" 
                    v-model="formData.creditCode"
                    required
                  />
                </div>
              </div>
            </div>
            
            <!-- 经营信息 -->
            <div class="form-section">
              <h3 class="form-section-title">经营信息</h3>
              <div class="form-group">
                <label class="form-label" for="business-scope">
                  经营范围 <span style="color: var(--danger-color);">*</span>
                </label>
                <textarea 
                  id="business-scope" 
                  class="form-textarea" 
                  placeholder="请输入公司经营范围" 
                  v-model="formData.businessScope"
                  required
                ></textarea>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="industry">
                    所属行业 <span style="color: var(--danger-color);">*</span>
                  </label>
                  <TechSelect 
                    v-model="formData.industry" 
                    :options="industryOptions" 
                    placeholder="请选择所属行业"
                    class="tech-select-full"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="business-status">
                    经营状态 <span style="color: var(--danger-color);">*</span>
                  </label>
                  <TechSelect 
                    v-model="formData.businessStatus" 
                    :options="businessStatusOptions" 
                    placeholder="请选择经营状态"
                    class="tech-select-full"
                  />
                </div>
              </div>
            </div>
            
            <!-- 联系方式 -->
            <div class="form-section">
              <h3 class="form-section-title">联系方式</h3>
              <div class="form-group">
                <label class="form-label" for="company-address">
                  公司地址 <span style="color: var(--danger-color);">*</span>
                </label>
                <input 
                  type="text" 
                  id="company-address" 
                  class="form-input" 
                  placeholder="请输入公司详细地址" 
                  v-model="formData.companyAddress"
                  required
                />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="contact-phone">联系电话</label>
                  <input 
                    type="tel" 
                    id="contact-phone" 
                    class="form-input" 
                    placeholder="请输入联系电话"
                    v-model="formData.contactPhone"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-email">联系邮箱</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    class="form-input" 
                    placeholder="请输入联系邮箱"
                    v-model="formData.contactEmail"
                  />
                </div>
              </div>
            </div>
            
            <!-- 提交按钮 -->
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">提交注册</button>
              <button type="button" class="btn btn-secondary" @click="resetForm">重置</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 编辑公司模态框 -->
    <div v-if="showEditModal" class="modal" @click.self="showEditModal = false">
      <div class="modal-content">
        <span class="close" @click="showEditModal = false">&times;</span>
        <h2 class="modal-title">编辑公司信息</h2>
        
        <form @submit.prevent="submitEditCompany">
          <!-- 基本信息 -->
          <div class="form-section">
            <h3 class="form-section-title">基本信息</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-company-name">公司名称</label>
                <input 
                  type="text" 
                  id="edit-company-name" 
                  class="form-input" 
                  v-model="editFormData.companyName"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="edit-company-type">公司类型</label>
                <TechSelect 
                  v-model="editFormData.companyType" 
                  :options="companyTypeOptions" 
                  placeholder="请选择公司类型"
                  class="tech-select-full"
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-registered-capital">注册资本 (万元)</label>
                <input 
                  type="text" 
                  id="edit-registered-capital" 
                  class="form-input" 
                  v-model="editFormData.registeredCapital"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="edit-establishment-date">成立日期</label>
                <input 
                  type="date" 
                  id="edit-establishment-date" 
                  class="form-input" 
                  v-model="editFormData.establishmentDate"
                  required
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-legal-person">法定代表人</label>
                <input 
                  type="text" 
                  id="edit-legal-person" 
                  class="form-input" 
                  v-model="editFormData.legalPerson"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="edit-credit-code">统一社会信用代码</label>
                <input 
                  type="text" 
                  id="edit-credit-code" 
                  class="form-input" 
                  v-model="editFormData.creditCode"
                  required
                />
              </div>
            </div>
          </div>
          
          <!-- 经营信息 -->
          <div class="form-section">
            <h3 class="form-section-title">经营信息</h3>
            <div class="form-group">
              <label class="form-label" for="edit-business-scope">经营范围</label>
              <textarea 
                id="edit-business-scope" 
                class="form-textarea" 
                v-model="editFormData.businessScope"
                required
              ></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-industry">所属行业</label>
                <TechSelect 
                  v-model="editFormData.industry" 
                  :options="industryOptions" 
                  placeholder="请选择所属行业"
                  class="tech-select-full"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="edit-business-status">经营状态</label>
                <TechSelect 
                  v-model="editFormData.businessStatus" 
                  :options="businessStatusOptions" 
                  placeholder="请选择经营状态"
                  class="tech-select-full"
                />
              </div>
            </div>
          </div>
          
          <!-- 联系方式 -->
          <div class="form-section">
            <h3 class="form-section-title">联系方式</h3>
            <div class="form-group">
              <label class="form-label" for="edit-company-address">公司地址</label>
              <input 
                type="text" 
                id="edit-company-address" 
                class="form-input" 
                v-model="editFormData.companyAddress"
                required
              />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-contact-phone">联系电话</label>
                <input 
                  type="tel" 
                  id="edit-contact-phone" 
                  class="form-input" 
                  v-model="editFormData.contactPhone"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="edit-contact-email">联系邮箱</label>
                <input 
                  type="email" 
                  id="edit-contact-email" 
                  class="form-input" 
                  v-model="editFormData.contactEmail"
                />
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="showEditModal = false">取消</button>
            <button type="submit" class="btn btn-primary">保存修改</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollReveal } from '../composables/useScrollReveal'
import TechSelect from '../components/TechSelect.vue'

// 初始化滚动显示动画
useScrollReveal()

const router = useRouter()

const activeTab = ref('my-companies')
const searchTerm = ref('')
const showEditModal = ref(false)
const currentEditingId = ref(null)

// 选项数据
const companyTypeOptions = [
  { label: '有限责任公司', value: '有限责任公司' },
  { label: '股份有限公司', value: '股份有限公司' },
  { label: '个人独资企业', value: '个人独资企业' },
  { label: '合伙企业', value: '合伙企业' },
  { label: '外商投资企业', value: '外商投资企业' }
]

const industryOptions = [
  { label: '科技', value: '科技' },
  { label: '电商', value: '电商' },
  { label: '金融', value: '金融' },
  { label: '教育', value: '教育' },
  { label: '医疗健康', value: '医疗健康' },
  { label: '房地产', value: '房地产' },
  { label: '制造业', value: '制造业' },
  { label: '其他', value: '其他' }
]

const businessStatusOptions = [
  { label: '存续', value: '存续' },
  { label: '在业', value: '在业' },
  { label: '吊销', value: '吊销' },
  { label: '注销', value: '注销' },
  { label: '迁出', value: '迁出' },
  { label: '迁入', value: '迁入' }
]

// 默认公司数据
const defaultCompanies = [
  {
    id: 1,
    name: '字节跳动科技有限公司',
    industry: '科技行业',
    verified: true,
    registeredCapital: '10000万元',
    establishmentDate: '2012-03-09',
    legalPerson: '张一鸣',
    creditCode: '911101085938250696',
    companyType: '有限责任公司',
    businessScope: '技术开发、技术推广、技术转让、技术咨询、技术服务；计算机系统服务；数据处理（数据处理中的银行卡中心、PUE值在1.5以上的云计算数据中心除外）。',
    businessStatus: '存续',
    companyAddress: '北京市海淀区',
    contactPhone: '010-12345678',
    contactEmail: 'contact@bytedance.com'
  },
  {
    id: 2,
    name: '阿里巴巴集团控股有限公司',
    industry: '电商行业',
    verified: true,
    registeredCapital: '20000万元',
    establishmentDate: '1999-09-09',
    legalPerson: '张勇',
    creditCode: '91330100716105852F',
    companyType: '有限责任公司',
    businessScope: '网络技术产品开发；计算机软件、硬件开发；技术开发、技术咨询、技术服务、技术转让。',
    businessStatus: '存续',
    companyAddress: '浙江省杭州市',
    contactPhone: '0571-88888888',
    contactEmail: 'contact@alibaba.com'
  },
  {
    id: 3,
    name: '腾讯科技(深圳)有限公司',
    industry: '科技行业',
    verified: true,
    registeredCapital: '30000万元',
    establishmentDate: '1998-11-11',
    legalPerson: '马化腾',
    creditCode: '91440300708461136T',
    companyType: '有限责任公司',
    businessScope: '计算机软、硬件的设计、技术开发、销售；数据库及计算机网络服务；国内商业、物资供销业。',
    businessStatus: '存续',
    companyAddress: '广东省深圳市',
    contactPhone: '0755-86013388',
    contactEmail: 'contact@tencent.com'
  }
]

const companies = ref([])

// 注册表单数据
const formData = ref({
  companyName: '',
  companyType: '',
  registeredCapital: '',
  establishmentDate: '',
  legalPerson: '',
  creditCode: '',
  businessScope: '',
  industry: '',
  businessStatus: '',
  companyAddress: '',
  contactPhone: '',
  contactEmail: ''
})

// 编辑表单数据
const editFormData = ref({
  companyName: '',
  companyType: '',
  registeredCapital: '',
  establishmentDate: '',
  legalPerson: '',
  creditCode: '',
  businessScope: '',
  industry: '',
  businessStatus: '',
  companyAddress: '',
  contactPhone: '',
  contactEmail: ''
})

// 筛选后的公司列表
const filteredCompanies = computed(() => {
  if (!searchTerm.value) {
    return companies.value
  }
  const term = searchTerm.value.toLowerCase()
  return companies.value.filter(company => 
    company.name.toLowerCase().includes(term)
  )
})

// 加载公司数据
function loadCompanies() {
  try {
    const stored = localStorage.getItem('companies')
    companies.value = stored ? JSON.parse(stored) : defaultCompanies
  } catch (error) {
    console.error('加载公司失败:', error)
    companies.value = defaultCompanies
  }
}

// 保存公司数据
function saveCompanies() {
  try {
    localStorage.setItem('companies', JSON.stringify(companies.value))
  } catch (error) {
    console.error('保存公司失败:', error)
  }
}

// 搜索公司
function searchCompanies() {
  // 搜索逻辑已在 computed 中实现
}

// 查看公司详情
function viewCompanyDetail(company) {
  router.push({ name: 'CompanyDetail', params: { id: company.id } })
}

// 编辑公司 - 打开模态框
function editCompany(company) {
  currentEditingId.value = company.id
  // 填充编辑表单数据
  editFormData.value = {
    companyName: company.name,
    companyType: company.companyType || '有限责任公司',
    registeredCapital: company.registeredCapital.replace('万元', ''),
    establishmentDate: company.establishmentDate,
    legalPerson: company.legalPerson,
    creditCode: company.creditCode,
    businessScope: company.businessScope || '',
    industry: company.industry ? company.industry.replace('行业', '') : '科技',
    businessStatus: company.businessStatus || '存续',
    companyAddress: company.companyAddress || '',
    contactPhone: company.contactPhone || '',
    contactEmail: company.contactEmail || ''
  }
  showEditModal.value = true
}

// 提交编辑
function submitEditCompany() {
  if (!currentEditingId.value) return

  const index = companies.value.findIndex(c => c.id === currentEditingId.value)
  if (index !== -1) {
    // 更新公司信息
    const updatedCompany = {
      ...companies.value[index],
      name: editFormData.value.companyName,
      companyType: editFormData.value.companyType,
      registeredCapital: editFormData.value.registeredCapital + '万元',
      establishmentDate: editFormData.value.establishmentDate,
      legalPerson: editFormData.value.legalPerson,
      creditCode: editFormData.value.creditCode,
      businessScope: editFormData.value.businessScope,
      industry: editFormData.value.industry + '行业',
      businessStatus: editFormData.value.businessStatus,
      companyAddress: editFormData.value.companyAddress,
      contactPhone: editFormData.value.contactPhone,
      contactEmail: editFormData.value.contactEmail
    }
    
    companies.value[index] = updatedCompany
    saveCompanies()
    
    alert('公司信息修改成功！')
    showEditModal.value = false
  }
}

// 提交公司注册
function submitCompanyRegistration() {
  const newCompany = {
    id: Date.now(),
    name: formData.value.companyName,
    industry: formData.value.industry + '行业',
    verified: false,
    registeredCapital: formData.value.registeredCapital + '万元',
    establishmentDate: formData.value.establishmentDate,
    legalPerson: formData.value.legalPerson,
    creditCode: formData.value.creditCode,
    businessScope: formData.value.businessScope,
    businessStatus: formData.value.businessStatus,
    companyAddress: formData.value.companyAddress,
    contactPhone: formData.value.contactPhone,
    contactEmail: formData.value.contactEmail,
    companyType: formData.value.companyType
  }
  
  companies.value.unshift(newCompany)
  saveCompanies()
  
  alert('公司注册信息提交成功！')
  resetForm()
  activeTab.value = 'my-companies'
}

// 重置表单
function resetForm() {
  formData.value = {
    companyName: '',
    companyType: '',
    registeredCapital: '',
    establishmentDate: '',
    legalPerson: '',
    creditCode: '',
    businessScope: '',
    industry: '',
    businessStatus: '',
    companyAddress: '',
    contactPhone: '',
    contactEmail: ''
  }
}

// 初始化
onMounted(() => {
  loadCompanies()
})
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

.management-container {
  max-width: 1200px;
  margin: 0 auto;
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
  color: #1e293b;
  position: relative;
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
}

.search-input {
  padding: 10px 40px 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;
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
  animation: fadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.company-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Tech Card Style for Companies */
.company-card {
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
  position: relative;
  border-left: 4px solid #3b82f6;
}

.company-card:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0 15px 30px rgba(6, 182, 212, 0.15));
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(6, 182, 212, 0.3);
}

.company-card::after {
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

.company-card:hover::after {
  opacity: 1;
}

.company-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  opacity: 1;
}

.company-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.company-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
}

.company-card-subtitle {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 12px;
  font-weight: 500;
}

.company-status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-active {
  background-color: #f0fdf4;
  color: #16a34a;
  border: 1px solid #dcfce7;
}

.status-inactive {
  background-color: #fff1f2;
  color: #e11d48;
  border: 1px solid #ffe4e6;
}

.company-info {
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
  align-items: baseline;
}

.info-label {
  width: 120px;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 500;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #334155;
  font-weight: 500;
}

.card-actions {
  display: flex;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
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

/* Form Styles */
.company-form {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  padding: 40px;
  max-width: 850px;
  margin: 0 auto;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.form-section {
  margin-bottom: 30px;
}

.form-section-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f1f5f9;
  color: #1e293b;
  display: flex;
  align-items: center;
}

.form-section-title::before {
  content: '';
  width: 4px;
  height: 18px;
  background: var(--primary-color);
  margin-right: 10px;
  border-radius: 2px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #475569;
  font-size: 14px;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #334155;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background: white;
}

.tech-select-full {
  width: 100%;
  min-width: unset; /* Override default min-width if needed */
}

/* Target the inner container of TechSelect to ensure full width if necessary */
:deep(.tech-select) {
  width: 100%;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-help {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 6px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 30px;
  border-top: 1px solid #f1f5f9;
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .search-input {
    width: 100%;
  }

  .tabs {
    overflow-x: auto;
    white-space: nowrap;
  }

  .company-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
  
  .company-form {
    padding: 24px;
  }
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  width: 90%;
  max-width: 850px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: slideUp 0.3s ease;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 30px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.close {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 28px;
  font-weight: 400;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1;
  z-index: 10;
}

.close:hover {
  color: #1e293b;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
