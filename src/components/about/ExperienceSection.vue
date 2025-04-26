<template>
    <div class="mt-20" id="experience-section">
        <div class="section-title mb-10 text-center">
            <h2 class="text-2xl sm:text-3xl font-bold text-white">
                <span class="text-[#6d28d9]">—</span> EXPERIENCE
            </h2>
            <div class="h-1 w-16 bg-[#6d28d9] mx-auto mt-4"></div>
        </div>

        <div class="relative">
            <div
                class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#6d28d9]/30 via-[#6d28d9] to-[#6d28d9]/30">
            </div>

            <div class="flex flex-col space-y-12">
                <div v-for="(exp, index) in experiences" :key="index" :class="[
                    'relative flex flex-col md:flex-row md:items-center timeline-item',
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                ]">
                    <div
                        class="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-[#6d28d9] bg-[#121212] z-10 timeline-dot">
                    </div>

                    <div class="ml-8 md:ml-0 md:w-1/2" :class="index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'">
                        <div
                            class="bg-[#1e1e1e]/70 p-6 rounded-xl border border-[#333] hover:border-[#6d28d9] transition-all duration-300 shadow-xl hover:shadow-[#6d28d9]/20 timeline-card">
                            <span
                                class="inline-block px-4 py-1.5 bg-[#2d2d2d] text-[#6d28d9] text-xs font-bold rounded-full mb-3">{{
                                    exp.period }}</span>
                            <h3 class="text-white font-bold text-xl mb-2">{{ exp.role }}</h3>
                            <h4 class="text-[#6d28d9]/90 mb-3 font-medium">{{ exp.company }}</h4>
                            <p class="text-gray-300 text-sm leading-relaxed">{{ exp.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExperienceSection',
    props: {
        experiences: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
/* Timeline animations */
.timeline-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline-item-visible {
    opacity: 1;
    transform: translateY(0);
}

.timeline-dot {
    box-shadow: 0 0 0 4px rgba(109, 40, 217, 0.3);
}

/* Section fade in animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-section {
    animation: fadeIn 1s ease forwards;
}
</style>