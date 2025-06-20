<template>
    <div class="mt-20 mb-8 relative">
        <div class="absolute inset-0 bg-[#6d28d9]/5 rounded-2xl"></div>
        <div
            class="relative z-10 py-12 px-6 md:px-12 rounded-2xl bg-gradient-to-r from-[#141414] via-[#141414] to-[#141414]/90 overflow-hidden border border-[#222]">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#6d28d9]/20 rounded-full filter blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-[#8b5cf6]/10 rounded-full filter blur-3xl"></div>

            <div class="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
                <div>
                    <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">Want to see my work?</h2>
                    <p class="text-gray-400 text-lg">Check out my latest projects and case studies</p>
                </div>
                <router-link to="/portfolio"
                    class="flex items-center bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] px-6 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 group">
                    View Projects
                    <ArrowRightIcon class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'PortfolioCTA',
    components: {
        ArrowRightIcon
    }
}
</script>