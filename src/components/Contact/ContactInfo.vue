<template>
    <div class="contact-card space-y-10 h-full flex flex-col">
        <div>
            <h2 class="text-xl font-semibold mb-6 text-white flex items-center">
                <span
                    class="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <UserIcon class="w-4 h-4 text-white" />
                </span>
                Connect With Me
            </h2>

            <div class="space-y-5">
                <a href="mailto:hello@solomonolatunji.com"
                    class="flex items-center p-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl transition-all group border border-transparent hover:border-[#6d28d9]/20">
                    <div
                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <EnvelopeIcon class="w-5 h-5 text-[#6d28d9]" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-400">Email Me At</p>
                        <p class="text-white font-medium">hello@solomonolatunji.com</p>
                    </div>
                </a>

                <a href="tel:+2349017818024"
                    class="flex items-center p-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl transition-all group border border-transparent hover:border-[#6d28d9]/20">
                    <div
                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <PhoneIcon class="w-5 h-5 text-[#6d28d9]" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-400">Call Me</p>
                        <p class="text-white font-medium">+2349017818024</p>
                    </div>
                </a>

                <div
                    class="flex items-center p-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl transition-all group border border-transparent hover:border-[#6d28d9]/20">
                    <div
                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <MapPinIcon class="w-5 h-5 text-[#6d28d9]" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-400">Location</p>
                        <p class="text-white font-medium">Ilorin, Nigeria</p>
                    </div>
                </div>

                <div
                    class="flex items-center p-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl transition-all group border border-transparent hover:border-[#6d28d9]/20">
                    <div
                        class="w-10 h-10 bg-[#6d28d9]/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <BriefcaseIcon class="w-5 h-5 text-[#6d28d9]" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-400">Availability</p>
                        <p class="text-white font-medium">Available for hire</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { MapPinIcon, PhoneIcon, EnvelopeIcon, BriefcaseIcon, UserIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'ContactInfo',
    components: {
        MapPinIcon,
        PhoneIcon,
        EnvelopeIcon,
        BriefcaseIcon,
        UserIcon
    }
}
</script>