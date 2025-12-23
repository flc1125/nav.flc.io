
// Particle interface definition
interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
}

// State
let canvas: OffscreenCanvas | null = null
let ctx: OffscreenCanvasRenderingContext2D | null = null
let width = 0
let height = 0
let particles: Particle[] = []
let animationFrameId: number
let mouseX = -1000
let mouseY = -1000

// Configuration
const connectionDistance = 150
const mouseDistance = 200

// Initialize particles based on screen size
function initParticles(w: number, h: number) {
    width = w
    height = h
    particles = []

    const area = width * height
    const count = Math.floor(area / 15000) // Responsive count

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1.5
        })
    }
}

function draw() {
    if (!ctx || !canvas) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Update and draw particles
    particles.forEach(p => {
        // Movement
        p.x += p.vx
        p.y += p.vy

        // Mouse repulsion
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouseDistance - distance) / mouseDistance
            const repulsionStrength = 0.05

            p.vx -= forceDirectionX * force * repulsionStrength
            p.vy -= forceDirectionY * force * repulsionStrength
        }

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Draw particle
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.25)'
        ctx!.fill()
    })

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
                ctx!.beginPath()
                ctx!.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / connectionDistance)})`
                ctx!.lineWidth = 1
                ctx!.moveTo(particles[i].x, particles[i].y)
                ctx!.lineTo(particles[j].x, particles[j].y)
                ctx!.stroke()
            }
        }
    }

    animationFrameId = requestAnimationFrame(draw)
}

// Handle messages from the main thread
self.onmessage = (e: MessageEvent) => {
    const { type, payload } = e.data

    switch (type) {
        case 'init':
            canvas = payload.canvas
            ctx = canvas!.getContext('2d') as OffscreenCanvasRenderingContext2D
            initParticles(payload.width, payload.height)
            // Initial scale if needed, though dpr usually handled in width/height from main thread
            ctx.scale(payload.dpr, payload.dpr)
            draw()
            break

        case 'resize':
            width = payload.width
            height = payload.height
            if (canvas) {
                canvas.width = width
                canvas.height = height
            }
            if (ctx) {
                ctx.scale(payload.dpr, payload.dpr)
            }
            initParticles(payload.width / payload.dpr, payload.height / payload.dpr)
            break

        case 'mousemove':
            // Coordinates already adjusted for DPR if necessary, or raw clientX/Y
            // The drawing logic uses raw pixels usually, so we might need to adjust
            // But passing raw clientX/Y relative to canvas is usually fine if canvas is full screen
            mouseX = payload.x
            mouseY = payload.y
            break
    }
}
