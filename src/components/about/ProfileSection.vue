<template>
  <div
    class="flex flex-col items-center justify-center gap-8 md:flex-row lg:gap-12"
  >
    <div class="mb-8 flex w-full items-center justify-center md:mb-0 md:w-1/3">
      <div class="floating relative">
        <div
          class="profile-gradient animate-spin-slow absolute inset-0 rounded-full"
        ></div>
        <div
          class="profile-image-container h-48 w-48 overflow-hidden rounded-full border-4 border-[#6d28d9] shadow-2xl sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72"
        >
          <img
            src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Solomon Olatunji"
            class="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
      </div>
    </div>

    <div class="w-full md:w-2/3">
      <div class="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8">
        <div class="info-item transition-transform hover:-translate-y-1">
          <p class="flex items-center text-xs text-gray-400 sm:text-sm">
            <UserIcon class="mr-1.5 h-4 w-4 text-[#6d28d9]" />
            First Name:
          </p>
          <p class="text-base font-medium text-white sm:text-lg">Solomon</p>
        </div>
        <div class="info-item transition-transform hover:-translate-y-1">
          <p class="flex items-center text-xs text-gray-400 sm:text-sm">
            <UserIcon class="mr-1.5 h-4 w-4 text-[#6d28d9]" />
            Last Name:
          </p>
          <p class="text-base font-medium text-white sm:text-lg">Olatunji</p>
        </div>
        <div class="info-item transition-transform hover:-translate-y-1">
          <p class="flex items-center text-xs text-gray-400 sm:text-sm">
            <GlobeAltIcon class="mr-1.5 h-4 w-4 text-[#6d28d9]" />
            Nationality:
          </p>
          <p class="text-base font-medium text-white sm:text-lg">Nigerian</p>
        </div>
        <div class="info-item transition-transform hover:-translate-y-1">
          <p class="flex items-center text-xs text-gray-400 sm:text-sm">
            <BriefcaseIcon class="mr-1.5 h-4 w-4 text-[#6d28d9]" />
            Freelance:
          </p>
          <p class="text-base font-medium text-white sm:text-lg">Available</p>
        </div>
        <div class="info-item transition-transform hover:-translate-y-1">
          <p class="flex items-center text-xs text-gray-400 sm:text-sm">
            <MapPinIcon class="mr-1.5 h-4 w-4 text-[#6d28d9]" />
            Address:
          </p>
          <p class="text-base font-medium text-white sm:text-lg">
            Ilorin, Nigeria
          </p>
        </div>
        <div class="info-item transition-transform hover:-translate-y-1">
          <p class="flex items-center text-xs text-gray-400 sm:text-sm">
            <PhoneIcon class="mr-1.5 h-4 w-4 text-[#6d28d9]" />
            Phone:
          </p>
          <p class="text-base font-medium text-white sm:text-lg">
            +2349017818024
          </p>
        </div>
        <div
          class="info-item col-span-2 transition-transform hover:-translate-y-1"
        >
          <p class="flex items-center text-xs text-gray-400 sm:text-sm">
            <EnvelopeIcon class="mr-1.5 h-4 w-4 text-[#6d28d9]" />
            Email:
          </p>
          <p class="text-base font-medium break-all text-white sm:text-lg">
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
  EnvelopeIcon,
} from "@heroicons/vue/24/solid";

export default {
  name: "ProfileSection",
  components: {
    UserIcon,
    GlobeAltIcon,
    BriefcaseIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
  },
};
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
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.info-item:hover {
  background-color: rgba(109, 40, 217, 0.1);
}
</style>
