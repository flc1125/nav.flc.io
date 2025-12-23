<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchBox from './components/SearchBox.vue'
import SideNav from './components/SideNav.vue'
import BackgroundParticles from './components/BackgroundParticles.vue'
import SpotlightCard from './components/SpotlightCard.vue'

interface NavItem {
  title: string
  url: string
  icon: string
  desc?: string
}

interface Category {
  name: string
  items: NavItem[]
}

interface NavData {
  title: string
  categories: Category[]
}

const navData = ref<NavData | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/data.json')
    navData.value = await response.json()
    if (navData.value && navData.value.title) {
      document.title = navData.value.title + ' - FLC 和他的导航'
    }
  } catch (e) {
    console.error('Failed to load nav data:', e)
  }
})
</script>

<template>
  <div>
    <!-- Fixed Background Gradient -->
    <div class="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>
    
    <!-- Background Effect -->
    <BackgroundParticles />

    <!-- Fixed GitHub Link (Top-Right) -->
    <a
      href="https://github.com/flc1125/nav.flc.io"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed top-6 right-20 2xl:right-6 z-[60] p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
      aria-label="View on GitHub"
    >
      <svg class="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>

    <div class="min-h-screen w-full relative z-10 p-6 md:p-12">
      <div v-if="navData" class="max-w-6xl mx-auto">
        <!-- Fixed Sidebar Navigation -->
        <SideNav :categories="navData.categories" />

        <!-- Header -->
        <header class="mb-12 text-center space-y-8 pt-20 md:pt-0">
          <div class="space-y-3">
            <h1 class="shimmer-title font-bold font-mono leading-relaxed" style="font-size: clamp(2rem, 8vw, 3rem);">{{ navData.title }}</h1>
            <p class="text-white/50 font-mono text-sm">
              <span class="text-purple-400">while</span>(<span class="text-cyan-400">exploring</span>) { <span class="text-yellow-400">grow</span>(); }
            </p>
          </div>
          
          <!-- Search Component -->
          <SearchBox />
        </header>

        <!-- Main Content -->
        <main class="space-y-12">
          <section 
            v-for="category in navData.categories" 
            :key="category.name"
            :id="`category-${category.name}`"
          >
            <h2 class="text-xl font-medium text-white/80 mb-6 ml-2">{{ category.name }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <SpotlightCard
                v-for="item in category.items"
                :key="item.url"
                :item="item"
              />
            </div>
          </section>
        </main>
        
        <!-- Footer -->
        <footer class="mt-20 py-8 border-t border-white/10 text-center text-white/40">
          <p>© {{ new Date().getFullYear() }} {{ navData.title }}. All rights reserved.</p>
        </footer>
      </div>

      <!-- Loading State -->
      <div v-else class="flex items-center justify-center h-[50vh]">
        <div class="animate-pulse text-white/50 text-xl font-light">Loading...</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shimmer-title {
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #e9d5ff 20%,
    #c084fc 40%,
    #a855f7 50%,
    #c084fc 60%,
    #e9d5ff 80%,
    #ffffff 100%
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 12s ease-in-out infinite alternate;
}

@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 70% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
