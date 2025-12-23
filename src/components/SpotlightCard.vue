<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  title: string
  url: string
  icon: string
  desc?: string
}

defineProps<{
  item: NavItem
}>()

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function handleMouseEnter() {
  isHovering.value = true
}

function handleMouseLeave() {
  isHovering.value = false
}
</script>

<template>
  <a
    ref="cardRef"
    :href="item.url"
    target="_blank"
    class="spotlight-card group block relative rounded-2xl transition-all duration-300 hover:-translate-y-1"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Border glow layer (底层边框发光) -->
    <div
      class="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: isHovering
          ? `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.4), transparent 40%)`
          : ''
      }"
    />

    <!-- Card background (卡片主体背景) -->
    <div class="relative rounded-2xl bg-white/5 border border-white/10 p-4 h-full backdrop-blur-md transition-all duration-300 group-hover:border-white/20">
      <!-- Spotlight overlay (聚光灯光斑层) -->
      <div
        class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        :style="{
          background: isHovering
            ? `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.06), transparent 40%)`
            : ''
        }"
      />

      <!-- Card content (卡片内容) -->
      <div class="relative flex items-center space-x-4">
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
    </div>
  </a>
</template>

<style scoped>
.spotlight-card {
  /* 外层阴影效果 */
  box-shadow: 0 0 0 0 rgba(168, 85, 247, 0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.spotlight-card:hover {
  box-shadow: 0 10px 40px -10px rgba(168, 85, 247, 0.3);
}
</style>
