<template>
  <div
    v-if="author"
    class="mb-12 rounded-2xl border border-purple-900/20 bg-[#1e1e1e]/80 p-6 backdrop-blur-sm sm:p-8"
  >
    <h3 class="mb-4 flex items-center text-lg font-semibold text-white">
      <UserIcon class="mr-2 h-4 w-4 text-purple-400" />
      About the author
    </h3>
    <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <img
        :src="avatarUrl"
        :alt="author.name"
        class="h-24 w-24 rounded-full border-2 border-purple-600"
      />
      <div>
        <h4 class="mb-2 text-lg font-medium text-white">{{ author.name }}</h4>
        <p class="mb-4 text-sm text-gray-300">
          {{ author.bio || defaultBio }}
        </p>
        <div class="flex gap-3">
          <!-- Social links placeholder -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { UserIcon } from "@heroicons/vue/24/solid";
import type { PropType } from "vue";

interface AuthorDisplay {
  name: string;
  avatar?: string;
  bio?: string;
}

const props = defineProps({
  author: {
    type: Object as PropType<AuthorDisplay | null>,
    required: true,
  },
});

const defaultBio = `Software developer and technical writer specialized in frontend development.`;

const avatarUrl = computed(() => {
  if (props.author?.avatar) return props.author.avatar;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.author?.name || "Author")}&background=random`;
});
</script>
