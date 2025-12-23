/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { onMounted, onUnmounted, ref } from 'vue';
const canvasRef = ref(null);
let ctx = null;
let animationFrameId;
let particles = [];
// Configuration
const particleCount = 60;
const connectionDistance = 150;
const mouseDistance = 200;
let mouseX = -1000;
let mouseY = -1000;
const initParticles = (width, height) => {
    particles = [];
    // Adjust particle count based on screen size
    const area = width * height;
    const count = Math.floor(area / 15000); // Responsive count
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1.5 // Slightly larger: 1.5-3.5
        });
    }
};
const draw = () => {
    if (!ctx || !canvasRef.value)
        return;
    const width = canvasRef.value.width / (window.devicePixelRatio || 1);
    const height = canvasRef.value.height / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, width, height);
    // Update and draw particles
    particles.forEach(p => {
        // Movement
        p.x += p.vx;
        p.y += p.vy;
        // Mouse repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const repulsionStrength = 0.05;
            p.vx -= forceDirectionX * force * repulsionStrength;
            p.vy -= forceDirectionY * force * repulsionStrength;
        }
        // Bounce off edges
        if (p.x < 0 || p.x > width)
            p.vx *= -1;
        if (p.y < 0 || p.y > height)
            p.vy *= -1;
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'; // Reduced opacity (was 0.4)
        ctx.fill();
    });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / connectionDistance)})`; // Reduced opacity (was 0.25)
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    animationFrameId = requestAnimationFrame(draw);
};
const handleResize = () => {
    if (canvasRef.value && ctx) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.value.width = window.innerWidth * dpr;
        canvasRef.value.height = window.innerHeight * dpr;
        canvasRef.value.style.width = `${window.innerWidth}px`;
        canvasRef.value.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);
        initParticles(window.innerWidth, window.innerHeight);
    }
};
const handleMouseMove = (e) => {
    // Mouse coordinates need to be relative to the viewport, which they are
    mouseX = e.clientX;
    mouseY = e.clientY;
};
onMounted(() => {
    if (canvasRef.value) {
        ctx = canvasRef.value.getContext('2d');
        handleResize(); // Initialize size and particles
        draw();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
    }
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(animationFrameId);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ref: "canvasRef",
    ...{ class: "fixed inset-0 pointer-events-none z-0" },
});
/** @type {typeof __VLS_ctx.canvasRef} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['z-0']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            canvasRef: canvasRef,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=BackgroundParticles.vue.js.map