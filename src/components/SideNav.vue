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

const scrollToCategory = (name: string) => {
  const element = document.getElementById(`category-${name}`)
  if (element) {
    // Offset for better positioning (header height etc)
    const y = element.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
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
</script>

<template>
  <nav class="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
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
</template>
