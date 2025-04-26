<template>
    <div class="mt-20" id="education-section">
        <div class="section-title mb-10 text-center">
            <h2 class="text-2xl sm:text-3xl font-bold text-white">
                <span class="text-[#6d28d9]">—</span> EDUCATION
            </h2>
            <div class="h-1 w-16 bg-[#6d28d9] mx-auto mt-4"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="(edu, index) in education" :key="index"
                class="glass-card p-6 rounded-xl border border-white/10 hover:border-[#6d28d9] transition-all duration-300 shadow-xl hover:shadow-[#6d28d9]/20 backdrop-blur-sm edu-card">
                <div class="flex items-start">
                    <div class="bg-[#6d28d9]/20 p-3 rounded-lg mr-4 edu-icon">
                        <AcademicCapIcon class="w-7 h-7 text-[#6d28d9]" />
                    </div>
                    <div>
                        <span class="text-xs bg-[#2d2d2d] text-[#6d28d9] px-3 py-1 rounded-full font-bold">{{
                            edu.period
                            }}</span>
                        <h3 class="text-white font-bold text-xl mt-2 mb-1">{{ edu.degree }}</h3>
                        <h4 class="text-[#6d28d9]/80 mb-3 font-medium">{{ edu.institution }}</h4>
                        <p class="text-gray-300 text-sm leading-relaxed">{{ edu.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AcademicCapIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'EducationSection',
    components: {
        AcademicCapIcon
    },
    props: {
        education: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
/* Glass morphism effect */
.glass-card {
    background: rgba(30, 30, 30, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
    backdrop-filter: blur(8px);
}

/* Education card animations */
.edu-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.edu-card-visible {
    opacity: 1;
    transform: translateY(0);
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