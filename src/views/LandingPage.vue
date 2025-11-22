<template>
  <div class="landing-page">
    <!-- 顶部导航 -->
    <header class="site-header" :class="{ 'scrolled': isScrolled }">
      <div class="container header-content">
        <div class="logo">
          <div class="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="logo-text">无知智投</span>
        </div>
        <nav class="main-nav">
          <a href="#features" class="nav-link" @click.prevent="scrollToSection('features')">核心功能</a>
          <a href="#data" class="nav-link" @click.prevent="scrollToSection('data')">数据覆盖</a>
          <a href="#about" class="nav-link" @click.prevent="scrollToSection('about')">关于我们</a>
        </nav>
        <div class="header-actions">
          <router-link to="/explore" class="btn btn-primary glow-effect">
            <span>进入控制台</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero 区域 -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-overlay"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-text-wrapper">
          <div class="badge-pill fade-in-up" style="animation-delay: 0.1s">
            <span class="badge-dot"></span>
            AI 驱动的下一代投研平台
          </div>
          <h1 class="hero-title fade-in-up" style="animation-delay: 0.2s">
            洞察市场 <br>
            <span class="text-gradient">预见未来价值</span>
          </h1>
          <p class="hero-subtitle fade-in-up" style="animation-delay: 0.3s">
            结合海量另类数据与深度学习算法，为您构建全景式产业链图谱。
            <br>让每一次投资决策都建立在数据的基石之上。
          </p>
          <div class="hero-buttons fade-in-up" style="animation-delay: 0.4s">
            <router-link to="/explore" class="btn btn-lg btn-primary glow-effect">
              立即体验
            </router-link>
            <button class="btn btn-lg btn-glass">
              了解更多
            </button>
          </div>
        </div>
        <div class="hero-visual fade-in-up" style="animation-delay: 0.5s">
          <div class="dashboard-preview">
            <div class="preview-header">
              <div class="dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div class="preview-content">
              <div class="chart-placeholder">
                <div class="chart-line"></div>
                <div class="chart-bars">
                  <div class="bar" style="--h: 40%"></div>
                  <div class="bar" style="--h: 70%"></div>
                  <div class="bar" style="--h: 55%"></div>
                  <div class="bar" style="--h: 85%"></div>
                  <div class="bar" style="--h: 60%"></div>
                </div>
              </div>
              <div class="data-row">
                <div class="data-block"></div>
                <div class="data-block"></div>
              </div>
            </div>
            <!-- 浮动卡片 -->
            <div class="float-card card-1">
              <div class="icon-box">AI</div>
              <div class="text-box">
                <div class="line sm"></div>
                <div class="line lg"></div>
              </div>
            </div>
            <div class="float-card card-2">
              <div class="icon-box">Data</div>
              <div class="text-box">
                <div class="line sm"></div>
                <div class="line lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>向下滚动</span>
      </div>
    </section>

    <!-- 特性区域 -->
    <section id="features" class="features-section">
      <div class="container">
        <div class="section-header-center scroll-reveal">
          <h2 class="section-title">重新定义投研效率</h2>
          <p class="section-subtitle">通过先进的 AI 技术，我们将繁杂的数据转化为清晰的投资信号</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card scroll-reveal" style="transition-delay: 0.1s">
            <div class="card-inner">
              <div class="feature-icon-wrapper">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
              </div>
              <h3>全维数据覆盖</h3>
              <p>整合宏观、行业、个股等多维度数据，打破信息孤岛，提供全景式投资视角。</p>
              <div class="card-hover-bg"></div>
            </div>
          </div>

          <div class="feature-card scroll-reveal" style="transition-delay: 0.2s">
            <div class="card-inner">
              <div class="feature-icon-wrapper">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
              </div>
              <h3>智能信号捕捉</h3>
              <p>基于 NLP 技术实时监控全网舆情，第一时间捕捉影响市场的关键事件与信号。</p>
              <div class="card-hover-bg"></div>
            </div>
          </div>

          <div class="feature-card scroll-reveal" style="transition-delay: 0.3s">
            <div class="card-inner">
              <div class="feature-icon-wrapper">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
              </div>
              <h3>产业链图谱</h3>
              <p>动态构建产业链上下游关系网，精准定位价值传导路径，发现隐形冠军。</p>
              <div class="card-hover-bg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据展示区域 -->
    <section id="data" class="data-section">
      <div class="data-bg-overlay"></div>
      <div class="container">
        <div class="data-content-wrapper">
          <div class="data-text scroll-reveal">
            <h2 class="section-title text-white">海量数据资产</h2>
            <p class="section-desc text-white-50">
              我们要做的不仅仅是数据的搬运工，更是价值的挖掘者。<br>
              实时更新的市场行情，深度的基本面数据，另类数据全覆盖。
            </p>
            <div class="stats-grid">
              <div class="stat-box">
                <div class="stat-number"><span class="counter" data-target="100">0</span>M+</div>
                <div class="stat-label">企业数据</div>
              </div>
              <div class="stat-box">
                <div class="stat-number"><span class="counter" data-target="5000">0</span>+</div>
                <div class="stat-label">行业细分</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">24/7</div>
                <div class="stat-label">实时监控</div>
              </div>
            </div>
          </div>
          <div class="data-visual scroll-reveal" style="transition-delay: 0.2s">
            <div class="visual-container">
              <div class="radar-scanner">
                <div class="radar-beam"></div>
                <div class="radar-grid"></div>
                <div class="blip blip-1"></div>
                <div class="blip blip-2"></div>
                <div class="blip blip-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card scroll-reveal">
          <div class="cta-content">
            <h2>准备好开启智能投研之旅了吗？</h2>
            <p>加入数万名专业投资者的行列，体验数据驱动的投资未来。</p>
            <router-link to="/explore" class="btn btn-lg btn-white">
              免费开始使用
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>
          <div class="cta-decoration">
            <div class="circle-dec"></div>
            <div class="circle-dec-2"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer id="about" class="site-footer">
      <div class="container footer-content">
        <div class="footer-col brand-col">
          <div class="logo mb-4">
            <span class="logo-text">无知智投</span>
          </div>
          <p>致力于为专业投资者提供最先进的 AI 投研工具，让数据创造价值。</p>
        </div>
        <div class="footer-col">
          <h4>产品服务</h4>
          <a href="#">智能研报</a>
          <a href="#">产业链图谱</a>
          <a href="#">风险预警</a>
          <a href="#">数据API</a>
        </div>
        <div class="footer-col">
          <h4>关于我们</h4>
          <a href="#">公司介绍</a>
          <a href="#">加入我们</a>
          <a href="#">合作伙伴</a>
          <a href="#">联系方式</a>
        </div>
        <div class="footer-col">
          <h4>关注我们</h4>
          <div class="social-links">
            <a href="#" class="social-link" title="微信公众号">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5 16.5c-4.4 0-8-3.1-8-7s3.6-7 8-7 8 3.1 8 7-3.6 7-8 7zm0-12c-3.3 0-6 2.2-6 5s2.7 5 6 5 6-2.2 6-5-2.7-5-6-5z"/>
                <path d="M17.5 16.5c-2.5 0-4.5-1.8-4.5-4s2-4 4.5-4 4.5 1.8 4.5 4-2 4-4.5 4z"/>
              </svg>
            </a>
            <a href="#" class="social-link" title="官方微博">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.2 12.5c-1.6 0-2.9-1.3-2.9-2.9 0-1.6 1.3-2.9 2.9-2.9 1.6 0 2.9 1.3 2.9 2.9 0 1.6-1.3 2.9-2.9 2.9zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-3.9 0-7-2-7-5s3.1-5 7-5 7 2 7 5-3.1 5-7 5z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; 2025 无知智投. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

// 平滑滚动
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// 滚动监听
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// 数字增长动画
const animateValue = (obj, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
        // 格式化大数字
        if (end >= 1000) {
             obj.innerHTML = (end / 1000).toFixed(0) + ',' + (end % 1000).toString().padStart(3, '0');
        }
    }
  };
  window.requestAnimationFrame(step);
};

// Intersection Observer for scroll animations
let observer = null;

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  // 设置观察器
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // 如果是数字元素，触发计数动画
        if (entry.target.querySelector('.counter')) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateValue(counter, 0, target, 2000);
                counter.classList.remove('counter'); // 防止重复触发
            });
        }
        
        observer.unobserve(entry.target); // 只触发一次
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* 
  字体引入建议：在index.html中引入 Inter 字体
*/
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:deep(*) {
  box-sizing: border-box;
}

.landing-page {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1a202c;
  background-color: #fff;
  width: 100%;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
}

/* Utility Classes */
.text-gradient {
  background: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glow-effect {
  position: relative;
  overflow: hidden;
}

.glow-effect::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%);
  transform: scale(0);
  opacity: 0;
  transition: transform 0.5s, opacity 0.5s;
}

.glow-effect:hover::after {
  transform: scale(1);
  opacity: 1;
}

/* Header */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 24px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: transparent;
}

.site-header.scrolled {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(0,0,0,0.05);
  padding: 16px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-icon {
  color: #2563EB;
}

.logo-text {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0F172A;
}

.site-header.scrolled .logo-text {
  color: #0F172A;
}

.main-nav {
  display: flex;
  gap: 40px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 24px;
  border-radius: 99px;
  backdrop-filter: blur(4px);
}

.nav-link {
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #2563EB;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #2563EB;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  overflow: hidden;
  z-index: 1;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0B1121;
  z-index: -1;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, #4F46E5 0%, transparent 70%);
  animation-delay: 0s;
}

.orb-2 {
  bottom: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, #2563EB 0%, transparent 70%);
  animation-delay: -5s;
}

.orb-3 {
  top: 40%;
  left: 40%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle, #06B6D4 0%, transparent 70%);
  animation-delay: -10s;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  color: white;
}

.hero-text-wrapper {
  z-index: 2;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 99px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 32px;
  backdrop-filter: blur(4px);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10B981;
}

.hero-title {
  font-size: 64px;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: 20px;
  color: #94A3B8;
  margin-bottom: 48px;
  line-height: 1.6;
  max-width: 540px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background: #2563EB;
  color: white;
  border: none;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
}

.btn-primary:hover {
  background: #1D4ED8;
  transform: translateY(-2px);
}

.btn-glass {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-white {
  background: white;
  color: #2563EB;
  border: none;
}

.btn-white:hover {
  background: #f8fafc;
  transform: translateY(-2px);
}

.btn-lg {
  padding: 16px 36px;
  font-size: 18px;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  perspective: 1000px;
}

.dashboard-preview {
  background: rgba(20, 30, 55, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transform: rotateY(-10deg) rotateX(5deg);
  transition: transform 0.5s ease;
}

.dashboard-preview:hover {
  transform: rotateY(-5deg) rotateX(2deg);
}

.preview-header {
  margin-bottom: 24px;
}

.dots {
  display: flex;
  gap: 6px;
}

.dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.dots span:nth-child(1) { background: #EF4444; }
.dots span:nth-child(2) { background: #F59E0B; }
.dots span:nth-child(3) { background: #10B981; }

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-placeholder {
  height: 200px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  gap: 15px;
}

.chart-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1));
}

.chart-bars {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: space-around;
}

.bar {
  width: 12%;
  height: var(--h);
  background: linear-gradient(to top, #3B82F6, #60A5FA);
  border-radius: 4px 4px 0 0;
  opacity: 0.8;
  animation: grow-bar 1.5s ease-out forwards;
}

.data-row {
  display: flex;
  gap: 16px;
}

.data-block {
  height: 80px;
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.float-card {
  position: absolute;
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  animation: float 6s infinite ease-in-out;
}

.card-1 {
  top: -30px;
  right: -30px;
  width: 180px;
  animation-delay: 0s;
}

.card-2 {
  bottom: -30px;
  left: -30px;
  width: 160px;
  animation-delay: -3s;
}

.icon-box {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
}

.text-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.line {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.line.sm { width: 60%; }
.line.lg { width: 100%; }

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  animation: fade-in-up 1s ease-out 1s forwards;
  opacity: 0;
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-wheel 2s infinite;
}

/* Features Section */
.features-section {
  padding: 120px 0;
  background: #F8FAFC;
}

.section-header-center {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 80px;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 18px;
  color: #64748B;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
}

.feature-card {
  background: white;
  border-radius: 24px;
  padding: 8px;
  transition: transform 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.feature-card.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.card-inner {
  background: white;
  padding: 40px 32px;
  border-radius: 20px;
  height: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px solid #F1F5F9;
  transition: border-color 0.3s ease;
}

.card-inner:hover {
  border-color: #BFDBFE;
}

.feature-icon-wrapper {
  width: 64px;
  height: 64px;
  background: #EFF6FF;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563EB;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon-wrapper {
  background: #2563EB;
  color: white;
  transform: scale(1.1) rotate(5deg);
}

.feature-card h3 {
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 16px;
}

.feature-card p {
  color: #64748B;
  line-height: 1.6;
}

/* Data Section */
.data-section {
  padding: 120px 0;
  background: #0F172A;
  position: relative;
  overflow: hidden;
  color: white;
}

.data-bg-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%);
}

.data-content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.text-white { color: white; }
.text-white-50 { color: rgba(255, 255, 255, 0.6); font-size: 18px; line-height: 1.6; margin-bottom: 48px; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.stat-number {
  font-size: 48px;
  font-weight: 800;
  color: #60A5FA;
  line-height: 1;
  margin-bottom: 8px;
  font-feature-settings: "tnum";
}

.stat-label {
  color: #94A3B8;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.visual-container {
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-scanner {
  width: 360px;
  height: 360px;
  position: relative;
}

.radar-grid {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(37, 99, 235, 0.3);
  border-radius: 50%;
  background: 
    radial-gradient(circle, transparent 69%, rgba(37, 99, 235, 0.3) 70%, transparent 71%),
    radial-gradient(circle, transparent 39%, rgba(37, 99, 235, 0.3) 40%, transparent 41%);
}

.radar-grid::before, .radar-grid::after {
  content: '';
  position: absolute;
  background: rgba(37, 99, 235, 0.3);
}

.radar-grid::before {
  top: 0; bottom: 0; left: 50%; width: 1px;
}

.radar-grid::after {
  left: 0; right: 0; top: 50%; height: 1px;
}

.radar-beam {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 2px;
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.8), transparent);
  transform-origin: 0 0;
  animation: scan 4s infinite linear;
}

.radar-beam::after {
  content: '';
  position: absolute;
  top: -100px;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 200px;
  background: linear-gradient(to bottom, transparent, rgba(37, 99, 235, 0.2), transparent);
  transform: skewX(20deg);
  filter: blur(20px);
}

.blip {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #60A5FA;
  border-radius: 50%;
  box-shadow: 0 0 8px #60A5FA;
  opacity: 0;
  animation: blip 4s infinite;
}

.blip-1 { top: 30%; left: 60%; animation-delay: 0.5s; }
.blip-2 { top: 70%; left: 30%; animation-delay: 2s; }
.blip-3 { top: 40%; left: 20%; animation-delay: 3.2s; }

/* CTA Section */
.cta-section {
  padding: 100px 0;
  background: white;
}

.cta-card {
  background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%);
  border-radius: 32px;
  padding: 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: white;
  opacity: 0;
  transform: translateY(40px);
}

.cta-card.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
}

.cta-decoration div {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.circle-dec {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
}

.circle-dec-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: -50px;
}

/* Footer */
.site-footer {
  background: #0F172A;
  color: #94A3B8;
  padding: 80px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  padding-bottom: 60px;
}

.footer-col h4 {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
}

.footer-col a {
  display: block;
  color: #94A3B8;
  text-decoration: none;
  margin-bottom: 12px;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: white;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  color: white;
}

.social-link:hover {
  background: #2563EB;
  color: white;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 32px 0;
  text-align: center;
  font-size: 14px;
}

/* Animations moved to global style.css */
/* Responsive */
@media (max-width: 1024px) {
  .hero-title { font-size: 48px; }
  .hero-content { gap: 40px; }
}

@media (max-width: 768px) {
  .hero-content { grid-template-columns: 1fr; text-align: center; }
  .hero-subtitle { margin: 0 auto 40px; }
  .hero-buttons { justify-content: center; }
  .hero-visual { display: none; }
  
  .data-content-wrapper { grid-template-columns: 1fr; }
  .data-visual { display: none; }
  
  .footer-content { grid-template-columns: 1fr 1fr; }
  .brand-col { grid-column: 1 / -1; }
  
  .main-nav { display: none; }
}
</style>
