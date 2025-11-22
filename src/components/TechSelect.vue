<template>
  <div class="tech-select" ref="container" :class="{ 'is-open': isOpen }">
    <div class="select-trigger" @click="toggle">
      <span class="selected-text" :class="{ placeholder: !modelValue && modelValue !== 0 }">
        {{ selectedLabel }}
      </span>
      <svg 
        class="arrow-icon" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <transition name="dropdown-fade">
      <ul v-if="isOpen" class="select-options">
        <li 
          v-for="option in options" 
          :key="option.value" 
          class="option-item"
          :class="{ selected: modelValue === option.value }"
          @click="select(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const container = ref(null)

const selectedLabel = computed(() => {
  const found = props.options.find(opt => opt.value === props.modelValue)
  return found ? found.label : props.placeholder
})

function toggle() {
  isOpen.value = !isOpen.value
}

function select(option) {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

function handleClickOutside(event) {
  if (container.value && !container.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.tech-select {
  position: relative;
  min-width: 140px;
  font-family: 'Rajdhani', 'Noto Sans SC', sans-serif;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  color: #334155;
}

.select-trigger:hover {
  background: white;
  border-color: #cbd5e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.is-open .select-trigger {
  background: white;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.selected-text {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selected-text.placeholder {
  color: #94a3b8;
}

.arrow-icon {
  color: #94a3b8;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.is-open .arrow-icon {
  transform: rotate(180deg);
  color: var(--primary-color);
}

.select-options {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 6px;
  margin: 0;
  list-style: none;
  z-index: 50;
  max-height: 250px;
  overflow-y: auto;
}

/* Scrollbar Styling */
.select-options::-webkit-scrollbar {
  width: 6px;
}

.select-options::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.select-options::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}

.option-item {
  padding: 10px 12px;
  font-size: 14px;
  color: #475569;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.option-item:hover {
  background-color: #f8fafc;
  color: var(--primary-color);
}

.option-item.selected {
  background-color: #eff6ff;
  color: var(--primary-color);
  font-weight: 600;
}

/* Animation */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>
