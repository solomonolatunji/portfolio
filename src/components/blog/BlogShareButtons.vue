<template>
  <div class="mt-8 border-t border-[#333] pt-6">
    <h3 class="mb-4 flex items-center text-lg font-semibold text-white">
      <ShareIcon class="mr-2 h-4 w-4 text-purple-400" />
      Share this article
    </h3>
    <div class="flex gap-3">
      <button
        @click="share('twitter')"
        class="rounded-full bg-[#1e1e1e] p-2 text-white transition-colors hover:bg-blue-600"
        aria-label="Share on Twitter"
      >
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
          ></path>
        </svg>
      </button>
      <button
        @click="share('linkedin')"
        class="rounded-full bg-[#1e1e1e] p-2 text-white transition-colors hover:bg-blue-900"
        aria-label="Share on LinkedIn"
      >
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.258 1.87H1.742a1.742 1.742 0 00-1.742 1.742v16.776a1.742 1.742 0 001.742 1.742h20.516a1.742 1.742 0 001.742-1.742V3.612a1.742 1.742 0 00-1.742-1.742zM7.74 19.355h-3.87v-11.61h3.87v11.61zM5.823 6.216a2.129 2.129 0 11.004-4.258 2.129 2.129 0 01-.004 4.258zm13.53 13.139h-3.87V13.32c0-1.448-.024-3.313-2.023-3.313-2.022 0-2.335 1.575-2.335 3.206v6.142h-3.87v-11.61h3.717v1.706h.052a4.08 4.08 0 013.677-2.022c3.927 0 4.652 2.584 4.652 5.95v5.976z"
          ></path>
        </svg>
      </button>
      <button
        @click="share('pinterest')"
        class="rounded-full bg-[#1e1e1e] p-2 text-white transition-colors hover:bg-red-600"
        aria-label="Share on Pinterest"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0C3.582 0 0 3.582 0 8c0 3.39 2.108 6.285 5.084 7.45-.07-.633-.133-1.604.028-2.295.146-.625.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.11.646-1.943 1.448-1.943.683 0 1.012.513 1.012 1.127 0 .687-.436 1.713-.662 2.664-.19.797.4 1.445 1.185 1.445 1.42 0 2.514-1.498 2.514-3.662 0-1.915-1.376-3.254-3.342-3.254-2.276 0-3.61 1.707-3.61 3.472 0 .687.263 1.424.593 1.825.066.08.075.15.057.23-.06.252-.196.796-.223.907-.035.146-.115.178-.268.107-.998-.465-1.624-1.926-1.624-3.1 0-2.524 1.834-4.84 5.287-4.84 2.774 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z"
          />
        </svg>
      </button>
      <!-- Add Facebook share button if needed -->
      <!-- <button @click="share('facebook')" class="p-2 bg-[#1e1e1e] hover:bg-blue-700 text-white rounded-full transition-colors" aria-label="Share on Facebook"> ... </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ShareIcon } from '@heroicons/vue/24/solid'

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  })

  const share = (platform: 'twitter' | 'linkedin' | 'pinterest' | 'facebook') => {
    const encodedUrl = encodeURIComponent(props.url)
    const encodedTitle = encodeURIComponent(props.title)
    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'pinterest':
        // Pinterest requires an image URL, which we don't have here directly.
        // You might need to pass the post image URL as a prop if you want full Pinterest functionality.
        // For now, it just shares the link.
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`
        break
      // Add Facebook case if needed
      // case 'facebook':
      //   shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      //   break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
    }
  }
</script>
