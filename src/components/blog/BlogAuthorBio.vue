<template>
  <div
    class="mb-12 rounded-2xl border border-purple-900/20 bg-[#1e1e1e]/80 p-6 backdrop-blur-sm sm:p-8"
  >
    <h3 class="mb-4 flex items-center text-lg font-semibold text-white">
      <UserIcon class="mr-2 h-4 w-4 text-purple-400" />
      About the author
    </h3>
    <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <img
        :src="avatarUrl"
        :alt="displayAuthor.name"
        class="h-24 w-24 rounded-full border-2 border-purple-600"
      />
      <div>
        <h4 class="mb-2 text-lg font-medium text-white">{{ displayAuthor.name }}</h4>
        <p class="mb-4 text-sm text-gray-300">
          {{ displayAuthor.description }}
        </p>
        <div class="flex gap-3">
          <a
            v-for="link in socialLinks"
            :key="link.platform"
            :href="link.url"
            target="_blank"
            class="rounded-lg bg-white/5 p-2 text-gray-400 transition-colors hover:bg-purple-600 hover:text-white"
            :aria-label="link.ariaLabel"
          >
            <component :is="getIcon()" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { UserIcon, GlobeAltIcon } from "@heroicons/vue/24/solid";
import type { PropType } from "vue";
import { aboutData } from "@/constants/about";

interface AuthorDisplay {
  name: string;
  avatar?: string;
  bio?: string;
}

const props = defineProps({
  author: {
    type: Object as PropType<AuthorDisplay | null>,
    required: false,
  },
});

// Use aboutData as the source of truth for the owner's blog
const displayAuthor = computed(() => {
  // If the passed author name matches the owner (or we want to enforce owner bio for now)
  // We prioritize aboutData for rich details
  return {
    name: aboutData.name, // Or use props.author.name if distinct logic needed
    description: aboutData.description,
    avatar: aboutData.profileImage.src,
  };
});

const avatarUrl = computed(() => displayAuthor.value.avatar);
const socialLinks = aboutData.socialLinks;

// Map platform names to HeroIcons (or usage generic globe if not found)
// Since we don't have specific brand icons in HeroIcons (they are in separate pack usually),
// we will use GlobeAltIcon for all or text.
const getIcon = () => {
  return GlobeAltIcon;
};
</script>
