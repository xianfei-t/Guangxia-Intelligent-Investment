<template>
  <main class="main-content">
    <div class="detail-container" v-if="company">
        <!-- 页面头部 -->
      <div class="header">
        <!-- 背景装饰 -->
        <img src="@/assets/decorations/title-neural-bg.svg" class="header-deco" />
        
        <button class="back-to-list" @click="goBack">&larr;</button>
        <div class="company-header">
          <h1 class="company-title fade-in-up">{{ company.name }}</h1>
          <div class="company-tags fade-in-up delay-200">
            <span class="tag">{{ company.industry }}</span>
            <span class="tag">{{ company.founded }}</span>
            <span class="tag">{{ company.location || '未知地点' }}</span>
            <span class="tag" style="display: flex; align-items: center; gap: 5px; background: rgba(16, 185, 129, 0.2); color: #fff; border: 1px solid rgba(16, 185, 129, 0.5);">
              <img src="@/assets/icons/icon-risk-shield.svg" style="width: 16px; height: 16px;" />
              风险评估通过
            </span>
          </div>
        </div>
      </div>
      
      <!-- 主要内容区域 -->
      <div class="detail-content">
        <!-- 侧边栏 -->
        <div class="sidebar">
          <div class="sidebar-header">
            <div class="avatar">
              <img src="/logo.svg" alt="无知智投" class="logo-image" style="width: 40px; height: 40px; border-radius: 50%;"/>
            </div>
            <div class="sidebar-company-info">
              <h2 class="company-name">无知智投</h2>
            </div>
          </div>
          
          <!-- 首页 -->
          <div class="nav-group">
            <h3 class="nav-group-title">主导航</h3>
            <ul class="nav-list">
              <li class="nav-item"><router-link to="/home">首页</router-link></li>
              <li class="nav-item"><router-link to="/profile">个人中心</router-link></li>
            </ul>
          </div>
          <!-- 项目库 -->
          <div class="nav-group">
            <h3 class="nav-group-title">项目库</h3>
            <ul class="nav-list">
              <li class="nav-item"><router-link to="/all-projects">全部项目</router-link></li>
            </ul>
          </div>
          
          <!-- 企业信息 -->
          <div class="nav-group">
            <h3 class="nav-group-title">企业信息</h3>
            <div class="info-item">
              <div class="info-label">企业全称</div>
              <div class="info-value">{{ company.name }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">成立时间</div>
              <div class="info-value">{{ company.founded }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">总部地点</div>
              <div class="info-value">{{ company.location || '未公开' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">所属行业</div>
              <div class="info-value">{{ company.industry }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">企业规模</div>
              <div class="info-value">{{ company.staff || '10000人以上' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">发展阶段</div>
              <div class="info-value">{{ company.status || '行业龙头' }}</div>
            </div>
          </div>
        </div>
        
        <!-- 主内容区 -->
        <div class="main-content-section">
          <!-- 企业简介 -->
          <section class="main-content-section scroll-reveal">
            <h2 class="section-title">企业简介</h2>
            <div style="position: relative;">
              <p class="description">{{ companyDescription }}</p>
              <!-- 视频播放按钮 -->
              <div class="video-play-button-container">
                <button class="video-play-button glow-effect" @click="playCompanyVideo">
                  <span class="play-icon">▶</span>
                  <span class="play-text">观看企业介绍视频</span>
                </button>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>
          
          <!-- 产品介绍 -->
          <section class="products-info scroll-reveal">
            <h2 class="section-title">产品介绍</h2>
            <div class="products-overview">
              公司拥有丰富的产品线，覆盖多个领域，为客户提供全面的解决方案和服务支持。
            </div>
            <div class="product-details">
              <div class="product-item scroll-reveal" v-for="(product, index) in products" :key="index" :style="{ transitionDelay: `${index * 0.1}s` }">
                <h3 class="product-title">{{ product.title }}</h3>
                <div class="product-content">
                  <div class="product-image"></div>
                  <div class="product-info">
                    <p class="product-description">{{ product.description }}</p>
                    <div class="product-features">
                      <h4>产品特点：</h4>
                      <ul class="feature-list">
                        <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 团队介绍 -->
          <section class="team-info scroll-reveal">
            <h2 class="section-title">团队介绍</h2>
            <div class="team-description">
              该企业拥有一支专业、高效的管理团队，核心成员在行业内拥有丰富的经验和深厚的专业背景，带领企业不断创新发展。
            </div>
            <div class="team-members">
              <div class="member-card card-hover-lift scroll-reveal" v-for="(member, index) in teamMembers" :key="member.name" :style="{ transitionDelay: `${index * 0.1}s` }">
                <div class="member-photo"></div>
                <h4 class="member-name">{{ member.name }}</h4>
                <p class="member-position">{{ member.position }}</p>
                <p class="member-bio">{{ member.bio }}</p>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>
          
          <!-- 市场分析 -->
          <section class="market-analysis">
            <h2 class="section-title">市场分析</h2>
            <div class="market-overview">
              当前行业处于快速发展阶段，市场规模持续扩大，行业竞争格局逐步清晰，新技术不断推动行业变革。
            </div>
            <div class="market-details">
              <div class="market-section">
                <h3 class="market-subtitle">市场规模</h3>
                <p class="market-content">
                  根据行业数据显示，2024年市场规模达到1000亿元，预计未来五年将保持年均20%以上的增长率，到2029年市场规模有望突破2500亿元。
                </p>
              </div>
              <div class="market-section">
                <h3 class="market-subtitle">竞争格局</h3>
                <p class="market-content">
                  行业内主要竞争者包括国际巨头和本土领军企业，市场集中度逐步提高，公司凭借技术优势和创新能力，市场份额稳步提升，目前在细分领域排名前三。
                </p>
              </div>
              <div class="market-section">
                <h3 class="market-subtitle">行业趋势</h3>
                <p class="market-content">
                  行业正朝着数字化、智能化、绿色化方向发展，新技术如人工智能、大数据、物联网等深度融合，客户需求更加个性化和多元化。
                </p>
              </div>
              <div class="market-section">
                <h3 class="market-subtitle">SWOT分析</h3>
                <div class="swot-analysis">
                  <div class="swot-item strength">
                    <h4>优势</h4>
                    <ul class="swot-list">
                      <li>技术研发实力雄厚，拥有多项核心专利</li>
                      <li>品牌知名度高，客户口碑良好</li>
                      <li>团队专业，经验丰富</li>
                    </ul>
                  </div>
                  <div class="swot-item weakness">
                    <h4>劣势</h4>
                    <ul class="swot-list">
                      <li>国际化程度有待提高</li>
                      <li>产品线还需进一步完善</li>
                    </ul>
                  </div>
                  <div class="swot-item opportunity">
                    <h4>机会</h4>
                    <ul class="swot-list">
                      <li>政策支持力度加大</li>
                      <li>新兴市场需求增长迅速</li>
                      <li>技术创新空间广阔</li>
                    </ul>
                  </div>
                  <div class="swot-item threat">
                    <h4>威胁</h4>
                    <ul class="swot-list">
                      <li>国际竞争加剧</li>
                      <li>技术迭代速度加快</li>
                      <li>市场不确定性因素增多</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>
          
          <!-- 目前数据情况 -->
          <section class="current-data">
            <h2 class="section-title">目前数据情况</h2>
            <div class="data-overview">
              公司近年来业务持续增长，各项关键指标表现良好，市场份额稳步提升，用户满意度保持在较高水平。
            </div>
            <div class="data-metrics">
              <div class="metrics-grid">
                <div class="metric-card">
                  <h4 class="metric-title">年度营收</h4>
                  <p class="metric-value">50亿元</p>
                  <p class="metric-change">同比增长 25%</p>
                </div>
                <div class="metric-card">
                  <h4 class="metric-title">用户规模</h4>
                  <p class="metric-value">1000万+</p>
                  <p class="metric-change">月活跃用户增长 15%</p>
                </div>
                <div class="metric-card">
                  <h4 class="metric-title">市场份额</h4>
                  <p class="metric-value">12%</p>
                  <p class="metric-change">环比增长 2%</p>
                </div>
                <div class="metric-card">
                  <h4 class="metric-title">客户满意度</h4>
                  <p class="metric-value">92%</p>
                  <p class="metric-change">连续三个季度提升</p>
                </div>
              </div>
              <div class="data-details">
                <div class="data-section">
                  <h3 class="data-subtitle">业务指标详情</h3>
                  <table class="data-table">
                    <tbody>
                      <tr>
                        <td class="data-label">产品线数量：</td>
                        <td class="data-data">8条</td>
                      </tr>
                      <tr>
                        <td class="data-label">研发投入比例：</td>
                        <td class="data-data">15%</td>
                      </tr>
                      <tr>
                        <td class="data-label">专利数量：</td>
                        <td class="data-data">120项</td>
                      </tr>
                      <tr>
                        <td class="data-label">合作伙伴数量：</td>
                        <td class="data-data">200+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="data-section">
                  <h3 class="data-subtitle">运营数据概览</h3>
                  <table class="data-table">
                    <tbody>
                      <tr>
                        <td class="data-label">员工人数：</td>
                        <td class="data-data">3000人</td>
                      </tr>
                      <tr>
                        <td class="data-label">分支机构数量：</td>
                        <td class="data-data">25个</td>
                      </tr>
                      <tr>
                        <td class="data-label">服务覆盖城市：</td>
                        <td class="data-data">150+</td>
                      </tr>
                      <tr>
                        <td class="data-label">平均响应时间：</td>
                        <td class="data-data">2小时内</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>
          
          <!-- 融资需求 -->
          <section class="funding-requirements">
            <h2 class="section-title">融资需求</h2>
            <div class="funding-overview">
              公司计划通过新一轮融资进一步扩大业务规模，加速技术创新和市场拓展，提升市场竞争力。
            </div>
            <div class="funding-details">
              <div class="funding-card">
                <h3 class="funding-title">融资信息</h3>
                <div class="funding-info">
                  <div class="funding-item">
                    <span class="funding-label">融资轮次：</span>
                    <span class="funding-value">C轮融资</span>
                  </div>
                  <div class="funding-item">
                    <span class="funding-label">融资金额：</span>
                    <span class="funding-value">10亿元人民币</span>
                  </div>
                  <div class="funding-item">
                    <span class="funding-label">股权出让：</span>
                    <span class="funding-value">15%</span>
                  </div>
                  <div class="funding-item">
                    <span class="funding-label">估值：</span>
                    <span class="funding-value">66.7亿元人民币</span>
                  </div>
                </div>
              </div>
              <div class="funding-card">
                <h3 class="funding-title">资金用途</h3>
                <ul class="funding-usage-list">
                  <li class="usage-item">
                    <span class="usage-label">产品研发：</span>
                    <span class="usage-value">40%（新产品开发、技术迭代、专利布局）</span>
                  </li>
                  <li class="usage-item">
                    <span class="usage-label">市场拓展：</span>
                    <span class="usage-value">30%（新市场开拓、渠道建设、品牌推广）</span>
                  </li>
                  <li class="usage-item">
                    <span class="usage-label">团队建设：</span>
                    <span class="usage-value">20%（高端人才招聘、团队培训、激励机制）</span>
                  </li>
                  <li class="usage-item">
                    <span class="usage-label">基础设施：</span>
                    <span class="usage-value">10%（服务器扩容、办公场地、设备升级）</span>
                  </li>
                </ul>
              </div>
              <div class="funding-card">
                <h3 class="funding-title">理想投资方画像</h3>
                <div class="investor-profile">
                  <div class="investor-item">
                    <h4>行业背景</h4>
                    <p>具有相关行业投资经验，了解行业发展趋势和竞争格局，能够提供行业资源和战略指导。</p>
                  </div>
                  <div class="investor-item">
                    <h4>投资规模</h4>
                    <p>单笔投资能力在2亿元以上，具有多轮投资经验，能够在后续融资中持续支持。</p>
                  </div>
                  <div class="investor-item">
                    <h4>增值服务</h4>
                    <p>能够提供产业资源对接、国际化拓展支持、人才引进等多方面的增值服务。</p>
                  </div>
                  <div class="investor-item">
                    <h4>投资理念</h4>
                    <p>认可公司长期发展战略，愿意陪伴企业成长，共同推动行业发展和创新。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 发展规划 -->
          <section class="development-plan">
            <h2 class="section-title">发展规划</h2>
            <div class="plan-overview">
              公司制定了清晰的短期、中期和长期发展战略，旨在实现业务持续增长，提升市场影响力，成为行业领军企业。
            </div>
            <div class="plan-timeline">
              <div class="plan-card short-term">
                <div class="plan-header">
                  <h3 class="plan-title">短期规划（1年内）</h3>
                  <div class="plan-duration">12个月</div>
                </div>
                <div class="plan-content">
                  <ul class="plan-goals">
                    <li class="goal-item" v-for="goal in shortTermGoals" :key="goal">
                      <span class="goal-icon">▶</span>
                      <span class="goal-text">{{ goal }}</span>
                    </li>
                  </ul>
                  <div class="plan-metrics">
                    <h4 class="metrics-title">关键绩效指标</h4>
                    <table class="metrics-table">
                      <tbody>
                        <tr>
                          <td class="metric-name">年度营收目标：</td>
                          <td class="metric-target">65亿元人民币</td>
                        </tr>
                        <tr>
                          <td class="metric-name">用户规模目标：</td>
                          <td class="metric-target">1500万用户</td>
                        </tr>
                        <tr>
                          <td class="metric-name">研发专利目标：</td>
                          <td class="metric-target">新增50项</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="plan-card mid-term">
                <div class="plan-header">
                  <h3 class="plan-title">中期规划（1-3年）</h3>
                  <div class="plan-duration">24个月</div>
                </div>
                <div class="plan-content">
                  <ul class="plan-goals">
                    <li class="goal-item" v-for="goal in midTermGoals" :key="goal">
                      <span class="goal-icon">▶</span>
                      <span class="goal-text">{{ goal }}</span>
                    </li>
                  </ul>
                  <div class="plan-metrics">
                    <h4 class="metrics-title">关键绩效指标</h4>
                    <table class="metrics-table">
                      <tbody>
                        <tr>
                          <td class="metric-name">年度营收目标：</td>
                          <td class="metric-target">100亿元人民币</td>
                        </tr>
                        <tr>
                          <td class="metric-name">国际市场收入占比：</td>
                          <td class="metric-target">20%以上</td>
                        </tr>
                        <tr>
                          <td class="metric-name">市场份额目标：</td>
                          <td class="metric-target">25%以上</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="plan-card long-term">
                <div class="plan-header">
                  <h3 class="plan-title">长期规划（3-5年）</h3>
                  <div class="plan-duration">36个月以上</div>
                </div>
                <div class="plan-content">
                  <ul class="plan-goals">
                    <li class="goal-item" v-for="goal in longTermGoals" :key="goal">
                      <span class="goal-icon">▶</span>
                      <span class="goal-text">{{ goal }}</span>
                    </li>
                  </ul>
                  <div class="plan-metrics">
                    <h4 class="metrics-title">关键绩效指标</h4>
                    <table class="metrics-table">
                      <tbody>
                        <tr>
                          <td class="metric-name">年度营收目标：</td>
                          <td class="metric-target">200亿元人民币以上</td>
                        </tr>
                        <tr>
                          <td class="metric-name">全球市场覆盖：</td>
                          <td class="metric-target">50个以上国家和地区</td>
                        </tr>
                        <tr>
                          <td class="metric-name">品牌价值目标：</td>
                          <td class="metric-target">行业前三</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 财务概览 -->
          <section class="financial-info">
            <h2 class="section-title">财务概览</h2>
            <div class="financial-chart">
              财务数据可视化图表
            </div>
          </section>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>未找到对应的公司信息</p>
      <router-link to="/all-projects" class="btn btn-primary">返回项目列表</router-link>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScrollReveal } from '../composables/useScrollReveal'

// 初始化滚动显示动画
useScrollReveal()

const route = useRoute()
const router = useRouter()

const company = ref(null)

// 企业描述映射
const companyDescriptions = {
  '国家电网有限公司': '国家电网是全球最大的电力公司之一，负责中国大部分地区的电网建设和运营。公司致力于构建安全、经济、清洁、可持续的能源供应体系，推动能源革命和数字革命融合发展。',
  '中国石油化工集团有限公司': '中石化是中国最大的石油化工企业之一，业务涵盖石油天然气勘探开发、炼油、化工、产品销售等完整产业链。公司注重科技创新，在绿色低碳发展方面持续投入。',
  '中国船舶集团有限公司': '中国船舶集团是全球最大的造船集团之一，主要从事船舶制造、海洋工程装备、国防装备等研发和生产。公司在高端装备制造领域具有核心竞争力。',
  '中国移动通信集团有限公司': '中国移动是中国最大的移动通信运营商，拥有全球最大的移动通讯网络和客户群体。公司积极推动5G、云计算、大数据等新技术应用，构建数字经济基础设施。',
  '中国电子科技集团有限公司': '中国电科是中国电子信息领域的领军企业，主要从事电子信息、军工电子、网信安全等领域的研发和生产。公司在国防电子、科技创新方面具有突出贡献。',
  '字节跳动科技有限公司': '字节跳动是一家全球领先的科技创新公司，以短视频平台抖音/TikTok和信息流产品今日头条闻名。公司业务覆盖全球150多个国家和地区，用户规模超过10亿。',
  '阿里巴巴集团控股有限公司': '阿里巴巴是全球最大的电子商务和数字支付公司之一，业务涵盖电商平台淘宝、天猫，云计算服务阿里云，以及数字娱乐等多个领域。公司推动了中国数字经济的快速发展。',
  '腾讯控股有限公司': '腾讯是中国领先的互联网增值服务提供商，旗下拥有微信、QQ等社交平台，以及腾讯游戏、腾讯云、微信支付等核心业务。公司在社交、游戏、金融科技等领域处于领先地位。',
  '华为海思半导体有限公司': '华为海思是中国领先的芯片设计公司，主要从事集成电路设计、半导体、人工智能等领域的研发。公司在5G通信芯片、AI芯片等领域拥有核心技术。',
  '小米汽车有限公司': '小米汽车是小米集团旗下的新能源汽车公司，专注于智能电动汽车的研发和制造。公司致力于将智能手机的用户体验和互联网思维带入汽车行业。',
  '拼多多': '拼多多是中国领先的社交电商平台，以拼团模式和低价策略迅速崛起。公司积极推动农产品上行和乡村振兴，同时在技术创新和用户体验方面持续投入。',
  '大疆创新科技有限公司': '大疆是全球领先的无人机研发制造商，占据全球消费级无人机市场70%以上份额。公司业务扩展至专业航拍、农业植保、巡检等多个领域，引领全球无人机技术发展。'
}

const companyDescription = computed(() => {
  if (!company.value) return '正在加载企业信息...'
  return companyDescriptions[company.value.name] || '该企业是行业内的重要参与者，具有较强的市场竞争力和发展潜力。公司致力于技术创新和产品优化，为客户提供高质量的产品和服务。'
})

const products = computed(() => [
  {
    title: '核心产品一',
    description: '这是公司的旗舰产品，具有高效、稳定、安全等特点，能够满足客户在核心业务上的各种需求。',
    features: [
      '高性能设计，响应速度快',
      '智能化操作，用户体验佳',
      '安全可靠，数据加密保护',
      '扩展性强，支持定制化需求'
    ]
  },
  {
    title: '核心产品二',
    description: '该产品专注于解决特定领域的问题，通过创新技术为客户创造独特价值，提升业务效率。',
    features: [
      '专业化解决方案，针对性强',
      '实时数据分析，决策支持',
      '集成便捷，易于部署',
      '持续优化，定期更新迭代'
    ]
  }
])

const teamMembers = computed(() => [
  {
    name: '张明',
    position: '创始人兼CEO',
    bio: '拥有20年行业经验，曾任职于多家知名企业高管职位，带领团队成功完成多项重大项目。'
  },
  {
    name: '李华',
    position: '技术总监',
    bio: '技术专家，在核心技术研发领域拥有丰富经验，负责公司技术战略规划和团队管理。'
  },
  {
    name: '王芳',
    position: '市场总监',
    bio: '市场营销专家，擅长品牌建设和市场拓展，负责公司市场战略和品牌推广。'
  },
  {
    name: '赵强',
    position: '运营总监',
    bio: '运营管理专家，在企业运营和流程优化方面经验丰富，确保公司高效运作。'
  }
])

const shortTermGoals = computed(() => [
  '完成C轮融资，加速产品研发和市场拓展',
  '推出3-5款新产品，丰富产品线，满足多样化客户需求',
  '拓展10个重点城市市场，提升市场覆盖率至20%以上',
  '优化团队结构，引进50名行业高端人才，强化研发和市场团队',
  '建立完善的用户反馈机制，提升客户满意度至95%以上'
])

const midTermGoals = computed(() => [
  '完成D轮融资，筹备IPO事宜，实现公司价值最大化',
  '打造完整的产品生态系统，形成产品矩阵，提升市场竞争力',
  '进入国际市场，优先拓展东南亚、欧洲等地区，建立海外分支机构',
  '通过并购整合行业资源，提升公司整体实力和市场地位',
  '加大技术创新投入，建设国家级研发中心，引领行业技术发展方向'
])

const longTermGoals = computed(() => [
  '成功上市，成为行业领导者，市值突破500亿元人民币',
  '实现全球化布局，覆盖主要国际市场，成为具有全球影响力的企业',
  '持续技术创新，引领行业发展，成为行业标准制定者之一',
  '构建开放生态系统，与合作伙伴共同推动行业健康发展',
  '积极履行社会责任，推动可持续发展，实现经济效益和社会效益双赢'
])

function goBack() {
  // 返回应用首页
  router.push('/home')
}

function playCompanyVideo() {
  if (company.value) {
    sessionStorage.setItem('companyName', company.value.name)
    sessionStorage.setItem('industry', company.value.industry)
    sessionStorage.setItem('foundedYear', company.value.founded)
    sessionStorage.setItem('location', company.value.location || '')
    sessionStorage.setItem('companyInfo', JSON.stringify(company.value))
  }
  
  const videoFile = 'http://localhost:8082/uploads/test.mp4'
  router.push({ name: 'VideoPlayer', query: { video: videoFile, companyId: company.value?.id } })
}

// 加载公司数据
watchEffect(() => {
  const id = route.params.id || route.query.companyId
  
  // 优先从 sessionStorage 加载（与原始 HTML 保持一致）
  const companyName = sessionStorage.getItem('companyName')
  const industry = sessionStorage.getItem('industry')
  const foundedYear = sessionStorage.getItem('foundedYear')
  const location = sessionStorage.getItem('location')
  
  if (companyName) {
    company.value = {
      id: id || 1,
      name: companyName,
      industry: industry || '未知行业',
      founded: foundedYear || '未知成立时间',
      location: location || '未知地点',
      staff: '10000人以上',
      status: '行业龙头'
    }
    return
  }
  
  // 从 localStorage 加载项目数据
  if (id) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    const found = projects.find(p => p.id == id)
    if (found) {
      company.value = {
        ...found,
        location: found.location || '未公开',
        staff: found.staff || '10000人以上',
        status: found.status || '行业龙头'
      }
      return
    }
  }
  
  // 从 sessionStorage 的 companyInfo 加载
  const stored = sessionStorage.getItem('companyInfo')
  if (stored) {
    try {
      const companyInfo = JSON.parse(stored)
      company.value = {
        ...companyInfo,
        location: companyInfo.location || '未知地点',
        staff: companyInfo.staff || '10000人以上',
        status: companyInfo.status || '行业龙头'
      }
      return
    } catch {
      // 解析失败，使用默认数据
    }
  }
  
  // 使用默认数据
  company.value = {
    id: 1,
    name: '示例企业',
    industry: '科技',
    founded: '2020-01',
    location: '北京',
    staff: '10000人以上',
    status: '行业龙头'
  }
})
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px;
  background-color: var(--app-bg);
}

.detail-container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background: #0f172a;
  color: white;
  padding: 40px 20px;
  margin: -20px -20px 30px -20px;
  position: relative;
  overflow: hidden; /* 防止装饰溢出 */
}

.header-deco {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 200%;
  object-fit: cover;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}

.back-to-list {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 10; /* 确保按钮在装饰之上 */
}

.back-to-list:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.company-header {
  text-align: center;
  margin-top: 20px;
  position: relative;
  z-index: 1; /* 确保内容在装饰之上 */
}

.company-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.company-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.tag {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
}

.sidebar {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.nav-group {
  margin-bottom: 25px;
}

.nav-group-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 10px;
  letter-spacing: 0.5px;
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
  color: var(--dark-color);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.nav-item a:hover {
  background-color: var(--hover-color);
}

.nav-item a.router-link-active {
  background-color: var(--primary-color);
  color: white;
}

.section-divider {
  height: 60px;
  width: 100%;
  background-image: url('@/assets/decorations/flow-lines.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 30px 0;
  opacity: 0.8;
}

.info-item {
  margin-bottom: 20px;
}

.info-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.info-value {
  font-size: 16px;
  font-weight: 500;
}

.main-content-section {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.description {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
}

.video-play-button-container {
  position: absolute;
  bottom: -15px;
  right: 0;
}

.video-play-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 40px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
}

.video-play-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.play-icon {
  font-size: 16px;
  font-weight: bold;
}

.products-overview {
  margin-bottom: 20px;
  color: var(--text-muted);
  line-height: 1.8;
}

.product-item {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
}

.product-item:last-child {
  border-bottom: none;
}

.product-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.product-content {
  display: flex;
  gap: 20px;
}

.product-image {
  width: 200px;
  height: 150px;
  background-color: var(--light-color);
  border-radius: 8px;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
}

.product-description {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 16px;
}

.product-features h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-list {
  list-style: none;
  padding-left: 0;
  color: var(--text-muted);
  line-height: 1.8;
}

.feature-list li {
  padding-left: 20px;
  position: relative;
}

.feature-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-color);
}

.team-description {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 24px;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.member-card {
  text-align: center;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.member-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--light-color);
  margin: 0 auto 12px;
}

.member-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.member-position {
  color: var(--text-muted);
  margin-bottom: 12px;
}

.member-bio {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.6;
}

.market-overview {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 24px;
}

.market-section {
  margin-bottom: 24px;
}

.market-subtitle {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.market-content {
  color: var(--text-muted);
  line-height: 1.8;
}

.swot-analysis {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.swot-item {
  padding: 16px;
  border-radius: 8px;
}

.swot-item.strength {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
}

.swot-item.weakness {
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
}

.swot-item.opportunity {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
}

.swot-item.threat {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
}

.swot-item h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.swot-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
  color: var(--text-muted);
  line-height: 1.8;
}

.swot-list li {
  padding-left: 20px;
  position: relative;
}

.swot-list li::before {
  content: '•';
  position: absolute;
  left: 0;
}

.data-overview {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 24px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.metric-card {
  background-color: var(--light-color);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.metric-title {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.metric-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--dark-color);
  margin-bottom: 4px;
}

.metric-change {
  font-size: 12px;
  color: var(--success-color);
}

.data-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.data-section {
  padding: 20px;
  background-color: var(--light-color);
  border-radius: 8px;
}

.data-subtitle {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table tr {
  border-bottom: 1px solid var(--border-color);
}

.data-table tr:last-child {
  border-bottom: none;
}

.data-label {
  padding: 8px 0;
  color: var(--text-muted);
  font-size: 14px;
}

.data-data {
  padding: 8px 0;
  text-align: right;
  font-weight: 500;
}

.funding-overview {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 24px;
}

.funding-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.funding-card {
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.funding-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.funding-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.funding-item {
  display: flex;
  justify-content: space-between;
}

.funding-label {
  color: var(--text-muted);
}

.funding-value {
  font-weight: 500;
}

.funding-usage-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.usage-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.usage-item:last-child {
  border-bottom: none;
}

.usage-label {
  width: 100px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.usage-value {
  flex: 1;
  color: var(--dark-color);
}

.investor-profile {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.investor-item h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.investor-item p {
  color: var(--text-muted);
  line-height: 1.8;
}

.plan-overview {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 24px;
}

.plan-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.plan-card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
}

.plan-card.short-term {
  border-left: 4px solid #52c41a;
}

.plan-card.mid-term {
  border-left: 4px solid #1890ff;
}

.plan-card.long-term {
  border-left: 4px solid #722ed1;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.plan-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.plan-duration {
  color: var(--text-muted);
  font-size: 14px;
}

.plan-goals {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.goal-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--text-muted);
  line-height: 1.6;
}

.goal-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.plan-metrics {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.metrics-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.metrics-table {
  width: 100%;
  border-collapse: collapse;
}

.metrics-table tr {
  border-bottom: 1px solid var(--border-color);
}

.metrics-table tr:last-child {
  border-bottom: none;
}

.metric-name {
  padding: 8px 0;
  color: var(--text-muted);
}

.metric-target {
  padding: 8px 0;
  text-align: right;
  font-weight: 500;
}

.financial-chart {
  width: 100%;
  height: 300px;
  background-color: var(--light-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .company-title {
    font-size: 28px;
  }

  .back-to-list {
    top: 10px;
    left: 10px;
  }

  .video-play-button-container {
    position: relative;
    bottom: 0;
    margin-top: 15px;
    text-align: right;
  }

  .product-content {
    flex-direction: column;
  }

  .product-image {
    width: 100%;
    height: 200px;
  }

  .swot-analysis {
    grid-template-columns: 1fr;
  }

  .funding-details {
    grid-template-columns: 1fr;
  }

  .data-details {
    grid-template-columns: 1fr;
  }
}
</style>
