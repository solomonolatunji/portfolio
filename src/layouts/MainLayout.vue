<template>
    <div class="flex h-screen bg-[#121212] overflow-hidden">
        <!-- Main Content Area -->
        <div class="flex flex-1 flex-col">
            <div class="w-full p-4 md:p-8 flex flex-col items-center justify-center text-white h-full">
                <!-- Router View to load different pages -->
                <div class="w-full h-full overflow-auto">
                    <router-view />
                </div>

                <!-- Navigation Icons -->
                <div class="hidden md:flex fixed right-8 top-1/2 transform -translate-y-1/2 flex-col gap-6">
                    <router-link to="/"
                        class="bg-[#1e1e1e] hover:bg-[#2d2d2d] border border-[#333] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg">
                        <HomeIcon class="w-5 h-5 text-[#6d28d9]" />
                    </router-link>
                    <router-link to="/about"
                        class="bg-[#1e1e1e] hover:bg-[#2d2d2d] border border-[#333] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg">
                        <UserIcon class="w-5 h-5 text-[#6d28d9]" />
                    </router-link>
                    <router-link to="/portfolio"
                        class="bg-[#1e1e1e] hover:bg-[#2d2d2d] border border-[#333] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg">
                        <BriefcaseIcon class="w-5 h-5 text-[#6d28d9]" />
                    </router-link>
                    <router-link to="/contact"
                        class="bg-[#1e1e1e] hover:bg-[#2d2d2d] border border-[#333] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg">
                        <EnvelopeIcon class="w-5 h-5 text-[#6d28d9]" />
                    </router-link>
                    <router-link to="/blog"
                        class="bg-[#1e1e1e] hover:bg-[#2d2d2d] border border-[#333] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg">
                        <ChatBubbleLeftRightIcon class="w-5 h-5 text-[#6d28d9]" />
                    </router-link>
                </div>

                <!-- Mobile Navigation -->
                <div
                    class="md:hidden fixed bottom-0 left-0 w-full bg-[#1e1e1e] border-t border-[#333] p-3 flex justify-around items-center backdrop-blur-lg bg-opacity-95 z-50">
                    <router-link to="/"
                        class="flex flex-col items-center text-[#6d28d9] hover:text-[#8b5cf6] transition-all">
                        <HomeIcon class="w-6 h-6" />
                        <span class="text-xs mt-1 text-gray-300">Home</span>
                    </router-link>
                    <router-link to="/about"
                        class="flex flex-col items-center text-[#6d28d9] hover:text-[#8b5cf6] transition-all">
                        <UserIcon class="w-6 h-6" />
                        <span class="text-xs mt-1 text-gray-300">About</span>
                    </router-link>
                    <router-link to="/portfolio"
                        class="flex flex-col items-center text-[#6d28d9] hover:text-[#8b5cf6] transition-all">
                        <BriefcaseIcon class="w-6 h-6" />
                        <span class="text-xs mt-1 text-gray-300">Portfolio</span>
                    </router-link>
                    <router-link to="/contact"
                        class="flex flex-col items-center text-[#6d28d9] hover:text-[#8b5cf6] transition-all">
                        <EnvelopeIcon class="w-6 h-6" />
                        <span class="text-xs mt-1 text-gray-300">Contact</span>
                    </router-link>
                    <router-link to="/blog"
                        class="flex flex-col items-center text-[#6d28d9] hover:text-[#8b5cf6] transition-all">
                        <ChatBubbleLeftRightIcon class="w-6 h-6" />
                        <span class="text-xs mt-1 text-gray-300">Blog</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HomeIcon, UserIcon, BriefcaseIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'MainLayout',
    components: {
        HomeIcon,
        UserIcon,
        BriefcaseIcon,
        EnvelopeIcon,
        ChatBubbleLeftRightIcon
    }
}
</script>

<style>
body {
    overflow: hidden;
    margin: 0;
    padding: 0;
}
</style>