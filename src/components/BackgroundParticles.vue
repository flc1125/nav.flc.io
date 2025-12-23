<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let worker: Worker | null = null

const handleResize = () => {
  if (worker && canvasRef.value) {
    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth
    const height = window.innerHeight
    
    // We don't resize the canvas DOM element here because it's transferred
    // But we might need to update style if it wasn't valid css
    // Actually, we can't touch .width/.height of a transferred canvas
    
    worker.postMessage({
      type: 'resize',
      payload: {
        width: width * dpr,
        height: height * dpr,
        dpr
      }
    })
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (worker) {
    worker.postMessage({
      type: 'mousemove',
      payload: {
        x: e.clientX,
        y: e.clientY
      }
    })
  }
}

onMounted(() => {
  if (canvasRef.value) {
    // 1. Create Worker
    worker = new Worker(new URL('../workers/particle.worker.ts', import.meta.url), {
      type: 'module'
    })

    // 2. Setup Canvas
    const canvas = canvasRef.value
    // Set initial size
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    // 3. Transfer Control
    const offscreen = canvas.transferControlToOffscreen()

    // 4. Init Worker
    worker.postMessage({
      type: 'init',
      payload: {
        canvas: offscreen,
        width: window.innerWidth * dpr, // Send physical pixels
        height: window.innerHeight * dpr,
        dpr
      }
    }, [offscreen]) // Transfer the offscreen canvas

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  if (worker) {
    worker.terminate()
  }
})
</script>

<template>
  <canvas 
    ref="canvasRef" 
    class="fixed inset-0 pointer-events-none z-0"
  ></canvas>
</template>
