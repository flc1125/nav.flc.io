/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, onMounted, onUnmounted } from 'vue';
const props = defineProps();
const activeId = ref('');
const scrollToCategory = (name) => {
    const element = document.getElementById(`category-${name}`);
    if (element) {
        // Offset for better positioning (header height etc)
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};
let observer = null;
onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Logic: if element is intersecting, set it as active
            // We process entries to find the most visible one if needed, 
            // but simple intersection is often enough for a sidebar spy
            if (entry.isIntersecting) {
                activeId.value = entry.target.id;
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% visible
        rootMargin: '-10% 0px -50% 0px' // Adjust active area to top half of screen
    });
    // Observe all category sections
    props.categories.forEach((cat) => {
        const el = document.getElementById(`category-${cat.name}`);
        if (el)
            observer?.observe(el);
    });
});
onUnmounted(() => {
    observer?.disconnect();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4" },
});
for (const [category] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.scrollToCategory(category.name);
            } },
        key: (category.name),
        ...{ class: "group relative flex items-center justify-end w-40" },
        ...{ class: ({ 'opacity-100': __VLS_ctx.activeId === `category-${category.name}`, 'opacity-50 hover:opacity-100': __VLS_ctx.activeId !== `category-${category.name}` }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "mr-4 text-sm font-medium text-white transition-all duration-300 transform origin-right" },
        ...{ class: ([
                __VLS_ctx.activeId === `category-${category.name}` || 'group-hover:translate-x-0 group-hover:opacity-100',
                __VLS_ctx.activeId === `category-${category.name}` ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
            ]) },
    });
    (category.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "w-3 h-3 rounded-full transition-all duration-500 border border-white/20 backdrop-blur-md" },
        ...{ class: ([
                __VLS_ctx.activeId === `category-${category.name}` ? 'bg-purple-500 scale-125 shadow-[0_0_15px_rgba(168,85,247,0.5)] border-purple-400' : 'bg-white/10 group-hover:bg-white/30 group-hover:scale-110'
            ]) },
    });
}
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['right-8']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['origin-right']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            activeId: activeId,
            scrollToCategory: scrollToCategory,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SideNav.vue.js.map