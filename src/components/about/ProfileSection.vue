<template>
    <div class="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">
        <div class="w-full md:w-1/3 flex items-center justify-center mb-8 md:mb-0">
            <div class="relative floating">
                <div class="profile-gradient absolute inset-0 rounded-full animate-spin-slow"></div>
                <div
                    class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-[#6d28d9] profile-image-container">
                    <img src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="Solomon Olatunji"
                        class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
            </div>
        </div>

        <div class="w-full md:w-2/3">
            <div class="grid grid-cols-2 gap-y-6 gap-x-4 sm:gap-x-8">
                <div class="info-item hover:-translate-y-1 transition-transform">
                    <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                        <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                        First Name:
                    </p>
                    <p class="text-white font-medium text-base sm:text-lg">Solomon</p>
                </div>
                <div class="info-item hover:-translate-y-1 transition-transform">
                    <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                        <UserIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                        Last Name:
                    </p>
                    <p class="text-white font-medium text-base sm:text-lg">Olatunji</p>
                </div>
                <div class="info-item hover:-translate-y-1 transition-transform">
                    <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                        <GlobeAltIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                        Nationality:
                    </p>
                    <p class="text-white font-medium text-base sm:text-lg">Nigerian</p>
                </div>
                <div class="info-item hover:-translate-y-1 transition-transform">
                    <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                        <BriefcaseIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                        Freelance:
                    </p>
                    <p class="text-white font-medium text-base sm:text-lg">Available</p>
                </div>
                <div class="info-item hover:-translate-y-1 transition-transform">
                    <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                        <MapPinIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                        Address:
                    </p>
                    <p class="text-white font-medium text-base sm:text-lg">Ilorin, Nigeria</p>
                </div>
                <div class="info-item hover:-translate-y-1 transition-transform">
                    <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                        <PhoneIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                        Phone:
                    </p>
                    <p class="text-white font-medium text-base sm:text-lg">+2349017818024</p>
                </div>
                <div class="col-span-2 info-item hover:-translate-y-1 transition-transform">
                    <p class="text-gray-400 text-xs sm:text-sm flex items-center">
                        <EnvelopeIcon class="w-4 h-4 mr-1.5 text-[#6d28d9]" />
                        Email:
                    </p>
                    <p class="text-white font-medium text-base sm:text-lg break-all">
                        hello@solomonolatunji.com
                    </p>
                </div>
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
    name: 'ProfileSection',
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

<style scoped>
/* Profile image gradient border */
.profile-gradient {
    background: linear-gradient(135deg, #6d28d9, #9333ea, #6d28d9, #4c1d95);
    opacity: 0.5;
    transform: scale(1.05);
    filter: blur(8px);
}

.profile-image-container {
    position: relative;
    z-index: 1;
}

/* Animations */
@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}

.floating {
    animation: float 6s ease-in-out infinite;
}

@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 12s linear infinite;
}

/* Info item hover effect */
.info-item {
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.info-item:hover {
    background-color: rgba(109, 40, 217, 0.1);
}
</style>