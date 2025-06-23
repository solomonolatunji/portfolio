<template>
  <div class="contact-card flex h-full flex-col space-y-10">
    <div>
      <h2 class="mb-6 flex items-center text-xl font-semibold text-white">
        <span
          class="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          <UserIcon class="h-4 w-4 text-white" />
        </span>
        Connect With Me
      </h2>

      <div class="space-y-5">
        <a
          href="mailto:hello@solomonolatunji.com"
          class="group flex items-center rounded-xl border border-white/5 bg-[#1e1e1e]/70 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#6d28d9]/50 hover:bg-[#2d2d2d] hover:shadow-2xl"
        >
          <div
            class="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#6d28d9]/10 transition-transform group-hover:scale-110"
          >
            <EnvelopeIcon class="h-5 w-5 text-[#6d28d9]" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Email Me At</p>
            <p class="font-medium text-white">hello@solomonolatunji.com</p>
          </div>
        </a>

        <a
          href="tel:+2349017818024"
          class="group flex items-center rounded-xl border border-white/5 bg-[#1e1e1e]/70 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#6d28d9]/50 hover:bg-[#2d2d2d] hover:shadow-2xl"
        >
          <div
            class="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#6d28d9]/10 transition-transform group-hover:scale-110"
          >
            <PhoneIcon class="h-5 w-5 text-[#6d28d9]" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Call Me</p>
            <p class="font-medium text-white">+2349017818024</p>
          </div>
        </a>

        <div
          class="group flex items-center rounded-xl border border-white/5 bg-[#1e1e1e]/70 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#6d28d9]/50 hover:bg-[#2d2d2d] hover:shadow-2xl"
        >
          <div
            class="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#6d28d9]/10 transition-transform group-hover:scale-110"
          >
            <MapPinIcon class="h-5 w-5 text-[#6d28d9]" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Location</p>
            <p class="font-medium text-white">Ilorin, Nigeria</p>
          </div>
        </div>

        <div
          class="group flex items-center rounded-xl border border-white/5 bg-[#1e1e1e]/70 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#6d28d9]/50 hover:bg-[#2d2d2d] hover:shadow-2xl"
        >
          <div
            class="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#6d28d9]/10 transition-transform group-hover:scale-110"
          >
            <BriefcaseIcon class="h-5 w-5 text-[#6d28d9]" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Availability</p>
            <p class="font-medium text-white">Available for hire</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/vue/24/solid";

export default {
  name: "ContactInfo",
  components: {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    BriefcaseIcon,
    UserIcon,
  },
};
</script>

<style scoped>
.contact-card > div > div > * {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.contact-card > div > div > :nth-child(1) {
  animation-delay: 0.1s;
}

.contact-card > div > div > :nth-child(2) {
  animation-delay: 0.2s;
}

.contact-card > div > div > :nth-child(3) {
  animation-delay: 0.3s;
}

.contact-card > div > div > :nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
