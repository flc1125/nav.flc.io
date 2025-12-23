<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Category {
  name: string
  items: any[]
}

const props = defineProps<{
  categories: Category[]
}>()

const activeId = ref('')
const isDrawerOpen = ref(false)

const scrollToCategory = (name: string) => {
  const element = document.getElementById(`category-${name}`)
  if (element) {
    // Offset for better positioning (header height etc)
    const y = element.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
    // Close drawer on mobile after clicking
    isDrawerOpen.value = false
  }
}

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

let observer: IntersectionObserver | null = null

onMounted(() => {
const visibleIds = new Set<string>()

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleIds.add(entry.target.id)
      } else {
        visibleIds.delete(entry.target.id)
      }
    })

    // Find the first category from our ordered list that is currently visible
    const firstVisible = props.categories.find(c => visibleIds.has(`category-${c.name}`))
    if (firstVisible) {
      activeId.value = `category-${firstVisible.name}`
    }
  }, {
    threshold: 0,
    rootMargin: '-90px 0px -80% 0px' // Active zone: starts 90px from top, ends at 20% viewport height
  })

  // Observe all category sections
  props.categories.forEach((cat) => {
    const el = document.getElementById(`category-${cat.name}`)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

defineExpose({ toggleDrawer })
</script>

<template>
  <!-- Desktop: Fixed Sidebar Navigation -->
  <nav class="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden 2xl:flex flex-col gap-3">
    <button
      v-for="category in categories"
      :key="category.name"
      @click="scrollToCategory(category.name)"
      class="group relative flex items-center justify-start w-48 py-2 px-3 rounded-xl transition-all duration-300 hover:bg-white/5"
      :class="{ 'opacity-100': activeId === `category-${category.name}`, 'opacity-60 hover:opacity-100': activeId !== `category-${category.name}` }"
    >
      <!-- Dot Indicator -->
      <div 
        class="relative w-4 h-4 flex items-center justify-center transition-all duration-500"
      >
         <!-- Active Glow Ring -->
        <div 
           class="absolute inset-0 rounded-full opacity-0 transition-all duration-500 bg-purple-500 blur-md"
           :class="{ 'opacity-50 scale-150': activeId === `category-${category.name}` }"
        ></div>
        
        <!-- The Dot itself -->
        <div 
          class="w-3 h-3 rounded-full transition-all duration-500 border border-white/20 backdrop-blur-md relative z-10"
          :class="[
            activeId === `category-${category.name}` 
              ? 'bg-purple-400 w-4 h-4 border-purple-300 shadow-[0_0_10px_rgba(192,132,252,0.6)]' 
              : 'bg-white/20 group-hover:bg-white/40 group-hover:scale-125'
          ]"
        ></div>
      </div>

      <!-- Label -->
      <span 
        class="ml-4 text-sm font-medium text-white transition-all duration-300 transform origin-left whitespace-nowrap"
        :class="[
          activeId === `category-${category.name}` || 'group-hover:translate-x-0 group-hover:opacity-100',
          activeId === `category-${category.name}` ? 'translate-x-0 opacity-100 font-bold text-purple-200' : '-translate-x-4 opacity-0'
        ]"
      >
        {{ category.name }}
      </span>
    </button>
  </nav>

  <!-- Mobile: Hamburger Button + Drawer -->
  <div class="2xl:hidden">
    <!-- Hamburger Menu Button (Fixed Top-Right) -->
    <button
      @click="toggleDrawer"
      class="fixed top-6 right-6 z-[60] p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 active:scale-95"
      aria-label="Toggle Navigation Menu"
    >
      <svg 
        class="w-6 h-6 text-white transition-transform duration-300"
        :class="{ 'rotate-90': isDrawerOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          :d="isDrawerOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
        />
      </svg>
    </button>

    <!-- Overlay -->
    <Transition name="fade">
      <div
        v-if="isDrawerOpen"
        @click="closeDrawer"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
      ></div>
    </Transition>

    <!-- Drawer Navigation -->
    <Transition name="slide">
      <nav
        v-if="isDrawerOpen"
        class="fixed left-0 top-0 bottom-0 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 z-[58] overflow-y-auto"
      >
        <div class="p-6 space-y-2">
          <h2 class="text-white/50 text-xs font-mono uppercase tracking-wider mb-4">导航</h2>
          <button
            v-for="category in categories"
            :key="category.name"
            @click="scrollToCategory(category.name)"
            class="group w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/10"
            :class="{ 'bg-purple-500/20': activeId === `category-${category.name}` }"
          >
            <!-- Dot Indicator -->
            <div 
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="[
                activeId === `category-${category.name}` 
                  ? 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]' 
                  : 'bg-white/30 group-hover:bg-white/50'
              ]"
            ></div>

            <!-- Label -->
            <span 
              class="text-sm font-medium transition-all duration-300"
              :class="[
                activeId === `category-${category.name}` 
                  ? 'text-purple-200 font-bold' 
                  : 'text-white/80 group-hover:text-white'
              ]"
            >
              {{ category.name }}
            </span>
          </button>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition for drawer */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
