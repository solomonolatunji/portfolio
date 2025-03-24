<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8 md:py-10">
            <h1 class="text-xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center">
                <span class="text-[#6d28d9]">—</span> ABOUT ME
            </h1>

            <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                <!-- Image/Profile Area -->
                <div class="w-full md:w-1/3 flex items-center justify-center">
                    <div
                        class="w-48 h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 rounded-full bg-gradient-to-r from-[#3c3b3f] to-[#605c3c] flex items-center justify-center overflow-hidden shadow-xl">
                        <div class="text-4xl md:text-5xl font-bold text-gray-300">
                            PHOTO
                        </div>
                    </div>
                </div>

                <!-- Personal Information -->
                <div class="w-full md:w-2/3">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="mb-3">
                            <p class="text-gray-400 text-sm">First Name:</p>
                            <p class="text-white font-medium">Solomon</p>
                        </div>
                        <div class="mb-3">
                            <p class="text-gray-400 text-sm">Last Name:</p>
                            <p class="text-white font-medium">Olatunji</p>
                        </div>
                        <div class="mb-3">
                            <p class="text-gray-400 text-sm">Nationality:</p>
                            <p class="text-white font-medium">Nigerian</p>
                        </div>
                        <div class="mb-3">
                            <p class="text-gray-400 text-sm">Freelance:</p>
                            <p class="text-white font-medium">Available</p>
                        </div>
                        <div class="mb-3">
                            <p class="text-gray-400 text-sm">Address:</p>
                            <p class="text-white font-medium">Ilorin, Nigeria</p>
                        </div>
                        <div class="mb-3">
                            <p class="text-gray-400 text-sm">Phone:</p>
                            <p class="text-white font-medium">+2349017818024</p>
                        </div>
                        <div class="mb-3">
                            <p class="text-gray-400 text-sm">Email:</p>
                            <p class="text-white font-medium">hello@solomonolatunji.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Skills Section -->
            <div class="mt-10 md:mt-12">
                <h2 class="text-xl md:text-2xl font-bold mb-6 text-center">
                    <span class="text-[#6d28d9]">—</span> MY SKILLS
                </h2>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    <div class="bg-[#1e1e1e] p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                            alt="JavaScript" class="w-10 h-10 mb-2" />
                        <span class="text-gray-300 font-medium">JavaScript</span>
                    </div>
                    <div class="bg-[#1e1e1e] p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                            alt="Vue.js" class="w-10 h-10 mb-2" />
                        <span class="text-gray-300 font-medium">Vue.js</span>
                    </div>
                    <div class="bg-[#1e1e1e] p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                            alt="React" class="w-10 h-10 mb-2" />
                        <span class="text-gray-300 font-medium">React</span>
                    </div>
                    <div class="bg-[#1e1e1e] p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                            alt="TypeScript" class="w-10 h-10 mb-2" />
                        <span class="text-gray-300 font-medium">TypeScript</span>
                    </div>
                    <div class="bg-[#1e1e1e] p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                            alt="Node.js" class="w-10 h-10 mb-2" />
                        <span class="text-gray-300 font-medium">Node.js</span>
                    </div>
                    <div class="bg-[#1e1e1e] p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP"
                            class="w-10 h-10 mb-2" />
                        <span class="text-gray-300 font-medium">PHP</span>
                    </div>
                    <div class="bg-[#1e1e1e] p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg"
                            alt="Laravel" class="w-10 h-10 mb-2" />
                        <span class="text-gray-300 font-medium">Laravel</span>
                    </div>
                    <div class="bg-[#1e1e1e] p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg"
                            alt="Golang" class="w-10 h-10 mb-2" />
                        <span class="text-gray-300 font-medium">Golang</span>
                    </div>
                </div>
            </div>

            <!-- CTA Button -->
            <div class="mt-12 flex justify-center">
                <router-link to="/projects"
                    class="bg-[#1e1e1e] hover:bg-[#2d2d2d] text-white transition-colors px-6 py-3 rounded-full inline-flex items-center font-medium text-base md:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    VIEW MY PROJECTS
                    <span
                        class="ml-2 bg-[#6d28d9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">→</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About'
}
</script>
