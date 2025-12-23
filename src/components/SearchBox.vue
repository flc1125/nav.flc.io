<script setup lang="ts">
import { ref } from 'vue'

const engines = [
  { name: 'Google', url: 'https://www.google.com/search?q=', placeholder: 'Google Search...', icon: 'https://www.google.com/favicon.ico' },
  { name: 'Baidu', url: 'https://www.baidu.com/s?wd=', placeholder: '百度一下...', icon: 'https://www.baidu.com/favicon.ico' },
  { name: 'Bing', url: 'https://www.bing.com/search?q=', placeholder: 'Bing Search...', icon: 'https://www.bing.com/favicon.ico' },
  { name: 'GitHub', url: 'https://github.com/search?q=', placeholder: 'Search GitHub...', icon: 'https://github.com/favicon.ico' },
]

const currentEngine = ref(engines[0])
const searchText = ref('')
const isFocused = ref(false)
const isDropdownOpen = ref(false)

// 鼠标位置追踪
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

const handleSearch = () => {
  if (!searchText.value.trim()) return
  window.open(currentEngine.value.url + encodeURIComponent(searchText.value), '_blank')
  searchText.value = ''
}

const selectEngine = (engine: typeof engines[0]) => {
  currentEngine.value = engine
  isDropdownOpen.value = false
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto relative z-10">
    <!-- Search Wrapper with Spotlight Effect -->
    <div 
      class="search-wrapper relative rounded-2xl overflow-hidden transition-all duration-300"
      :class="{ 'transform -translate-y-1': isFocused }"
      :style="{
        '--mouse-x': `${mouseX}px`,
        '--mouse-y': `${mouseY}px`
      }"
      @mousemove="handleMouseMove"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <!-- Search Engine Switcher -->
      <div class="absolute left-0 top-0 bottom-0 z-30">
        <button 
          @click="isDropdownOpen = !isDropdownOpen"
          class="h-full px-4 rounded-l-2xl text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer font-medium"
          title="Switch Search Engine"
        >
          <img 
            :src="currentEngine.icon" 
            :alt="currentEngine.name" 
            class="w-5 h-5 object-contain opacity-80" 
            :class="{ 'invert': currentEngine.name === 'GitHub' }"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="w-4 h-4 opacity-50 transition-transform duration-300" 
            :class="{ 'rotate-180': isDropdownOpen }"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div 
          v-if="isDropdownOpen"
          class="absolute top-full left-0 mt-2 w-48 py-2 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl overflow-hidden origin-top-left animate-in fade-in zoom-in-95 duration-200"
        >
          <button
            v-for="engine in engines"
            :key="engine.name"
            @click="selectEngine(engine)"
            class="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group"
            :class="{ 'text-purple-400 bg-white/5': currentEngine.name === engine.name }"
          >
            <img 
              :src="engine.icon" 
              :alt="engine.name" 
              class="w-5 h-5 object-contain opacity-70 group-hover:opacity-100" 
              :class="{ 'invert': engine.name === 'GitHub' }"
            />
            <span class="flex-1">{{ engine.name }}</span>
            <svg 
              v-if="currentEngine.name === engine.name"
              xmlns="http://www.w3.org/2000/svg" 
              class="w-4 h-4 text-purple-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
          
      <!-- Backdrop for closing dropdown -->
      <div 
        v-if="isDropdownOpen" 
        @click="isDropdownOpen = false" 
        class="fixed inset-0 z-20"
      ></div>

      <!-- Input Field -->
      <input
        v-model="searchText"
        @keydown.enter="handleSearch"
        @focus="isFocused = true"
        @blur="isFocused = false"
        type="text"
        :placeholder="currentEngine.placeholder"
        class="w-full h-14 pl-20 pr-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
      />

      <!-- Search Button -->
      <button 
        @click="handleSearch"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  --mouse-x: 0px;
  --mouse-y: 0px;
}

/* 流光效果 - 使用伪元素，完美继承圆角 */
.search-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    500px circle at var(--mouse-x) var(--mouse-y),
    rgba(168, 85, 247, 0.15),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.search-wrapper:hover::after {
  opacity: 1;
}

/* Focus 状态更亮的效果 */
.search-wrapper:focus-within::after {
  opacity: 1;
  background: radial-gradient(
    500px circle at var(--mouse-x) var(--mouse-y),
    rgba(168, 85, 247, 0.25),
    transparent 40%
  );
}
</style>

