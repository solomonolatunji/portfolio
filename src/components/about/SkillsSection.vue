<template>
    <div class="mt-16 lg:mt-24" id="skills-section">
        <div class="section-title mb-10 text-center">
            <h2 class="text-2xl sm:text-3xl font-bold text-white">
                <span class="text-[#6d28d9]">—</span> MY SKILLS
            </h2>
            <div class="h-1 w-16 bg-[#6d28d9] mx-auto mt-4"></div>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8">
            <div v-for="(tech, index) in technologies" :key="index"
                class="skill-card p-4 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:transform hover:scale-110 hover:shadow-glow">
                <img :src="tech.icon" :alt="tech.name" class="w-12 h-12 mb-3 animate-pulse-slow" />
                <span class="text-gray-300 font-medium text-sm sm:text-base">{{ tech.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkillsSection',
    props: {
        technologies: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
@keyframes pulse-slow {
    0% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.6;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
}

.shadow-glow {
    box-shadow: 0 0 15px rgba(109, 40, 217, 0.5);
}

/* Skill card hover effect */
.skill-card {
    background: rgba(30, 30, 30, 0.3);
    overflow: hidden;
    position: relative;
}

.skill-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(109, 40, 217, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.skill-card:hover::before {
    opacity: 1;
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