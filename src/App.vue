<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchBox from './components/SearchBox.vue'
import SideNav from './components/SideNav.vue'
import BackgroundParticles from './components/BackgroundParticles.vue'

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
      document.title = navData.value.title
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

    <div class="min-h-screen w-full relative z-10 p-6 md:p-12">
      <div v-if="navData" class="max-w-6xl mx-auto">
        <!-- Fixed Sidebar Navigation -->
        <SideNav :categories="navData.categories" />

        <!-- Header -->
        <header class="mb-12 text-center space-y-8">
          <div>
            <h1 class="text-4xl font-bold text-white mb-2">{{ navData.title }}</h1>
            <p class="text-white/60">极简 · 现代 · 导航</p>
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
              <a 
                v-for="item in category.items" 
                :key="item.url"
                :href="item.url"
                target="_blank"
                class="group block p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 flex-shrink-0 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                    <img :src="item.icon" :alt="item.title" class="w-8 h-8 object-contain" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                      {{ item.title }}
                    </h3>
                    <p class="text-white/40 text-sm truncate">
                      {{ item.desc }}
                    </p>
                  </div>
                </div>
              </a>
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
