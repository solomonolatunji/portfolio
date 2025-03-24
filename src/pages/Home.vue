<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                <!-- Image/Placeholder Area -->
                <div class="w-full md:w-1/3 flex items-center justify-center">
                    <div
                        class="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-r from-[#3c3b3f] to-[#605c3c] flex items-center justify-center overflow-hidden shadow-xl">
                        <div class="text-4xl md:text-5xl font-bold text-gray-300">
                            746X1020
                        </div>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
                    <h1
                        class="text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 whitespace-nowrap overflow-hidden">
                        <span class="text-[#6d28d9]">—</span> SOLOMON OLATUNJI
                    </h1>
                    <h2 class="text-lg md:text-xl lg:text-2xl font-medium mb-4 md:mb-6 text-gray-400">
                        SOFTWARE ENGINEER
                    </h2>

                    <p class="mb-6 text-gray-300 leading-relaxed text-base md:text-lg max-w-2xl">
                        I'm a Nigerian-based Software Engineer with expertise in frontend development,
                        focused on building scalable and user-friendly applications. I'm passionate
                        about creating innovative solutions and contributing to projects that make a
                        positive impact.
                    </p>

                    <router-link to="/about"
                        class="bg-[#1e1e1e] hover:bg-[#2d2d2d] text-white transition-colors px-6 py-3 rounded-full inline-flex items-center font-medium text-base md:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1">
                        MORE ABOUT ME
                        <span
                            class="ml-2 bg-[#6d28d9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">→</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>