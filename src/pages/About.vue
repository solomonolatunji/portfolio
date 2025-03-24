<template>
    <div class="w-full min-h-screen flex items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
                <span class="text-[#6d28d9]">—</span> ABOUT ME
            </h1>

            <div class="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">
                <!-- Profile Area -->
                <div class="w-full md:w-1/3 flex items-center justify-center mb-8 md:mb-0">
                    <div
                        class="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-r from-[#3c3b3f] to-[#605c3c] flex items-center justify-center overflow-hidden shadow-xl">
                        <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300">
                            PHOTO
                        </div>
                    </div>
                </div>

                <!-- Personal Information -->
                <div class="w-full md:w-2/3">
                    <div class="grid grid-cols-2 gap-y-4 gap-x-4 sm:gap-x-6">
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                First Name:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Solomon</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Last Name:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Olatunji</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <GlobeAltIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Nationality:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Nigerian</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <BriefcaseIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Freelance:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Available</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <MapPinIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Address:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">Ilorin, Nigeria</p>
                        </div>
                        <div class="mb-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <PhoneIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Phone:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg">+2349017818024</p>
                        </div>
                        <div class="mb-2 col-span-2">
                            <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                                <EnvelopeIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                                Email:
                            </p>
                            <p class="text-white font-medium text-base sm:text-lg break-all">hello@solomonolatunji.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Skills Section -->
            <div class="mt-12 lg:mt-16">
                <h2 class="text-xl sm:text-2xl font-bold mb-6 text-center">
                    <span class="text-[#6d28d9]">—</span> MY SKILLS
                </h2>

                <!-- Removed card styling from skills -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
                    <div
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                            alt="JavaScript" class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">JavaScript</span>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                            alt="Vue.js" class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">Vue.js</span>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                            alt="React" class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">React</span>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                            alt="TypeScript" class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">TypeScript</span>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                            alt="Node.js" class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">Node.js</span>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP"
                            class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">PHP</span>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg"
                            alt="Laravel" class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">Laravel</span>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center group transition-transform duration-300 hover:-translate-y-1">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg"
                            alt="Golang" class="w-12 h-12 mb-2" />
                        <span class="text-gray-300 font-medium text-sm sm:text-base">Golang</span>
                    </div>
                </div>
            </div>

            <!-- CTA Button -->
            <div class="mt-12 lg:mt-16 flex justify-center mb-16 md:mb-0">
                <router-link to="/projects"
                    class="bg-[#1e1e1e] hover:bg-[#2d2d2d] text-white transition-all duration-300 px-6 py-3 rounded-full inline-flex items-center font-medium text-base sm:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    VIEW MY PROJECTS
                    <span
                        class="ml-2 bg-[#6d28d9] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">→</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {
    UserIcon,
    GlobeAltIcon,
    BriefcaseIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon
} from '@heroicons/vue/24/solid'

export default {
    name: 'About',
    components: {
        UserIcon,
        GlobeAltIcon,
        BriefcaseIcon,
        MapPinIcon,
        PhoneIcon,
        EnvelopeIcon
    }
}
</script>