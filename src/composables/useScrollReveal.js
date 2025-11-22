import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer = null

  const initScrollReveal = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // 只触发一次
          }
        })
      },
      {
        threshold: 0.01, // 降低阈值，更容易触发
        rootMargin: '0px' // 移除负边距，让元素更容易被检测到
      }
    )

    // 使用 nextTick 确保 DOM 已更新
    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        // 检查元素是否已经在视口内
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isVisible) {
          // 如果已经在视口内，立即显示
          el.classList.add('is-visible')
        } else {
          // 否则观察它
          observer.observe(el)
        }
      })
    }, 100)
  }

  onMounted(() => {
    initScrollReveal()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    initScrollReveal
  }
}

