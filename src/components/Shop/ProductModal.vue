<template>
  <transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/75 backdrop-blur-sm" @click="$emit('close')"></div>

      <!-- Modal Container -->
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Modal Content -->
        <div
          class="relative w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#1e1e1e] shadow-2xl transition-all"
        >
          <!-- Close Button -->
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 z-10 text-gray-400 hover:text-white"
          >
            <XMarkIcon class="h-8 w-8" />
          </button>

          <!-- Product Content -->
          <div class="flex flex-col md:flex-row">
            <!-- Product Image -->
            <div class="relative h-64 w-full overflow-hidden md:h-auto md:w-1/2">
              <img :src="product.image" :alt="product.title" class="h-full w-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"
              ></div>

              <!-- Product Type Badge -->
              <div class="absolute top-4 left-4">
                <span
                  :class="[
                    'rounded-full px-3 py-1 text-xs font-bold text-white backdrop-blur-sm',
                    product.category === 'digital'
                      ? 'bg-blue-600/80'
                      : product.category === 'courses'
                        ? 'bg-green-600/80'
                        : 'bg-orange-600/80',
                  ]"
                >
                  {{ product.type }}
                </span>
              </div>

              <!-- Price Badge -->
              <div class="absolute top-4 right-4">
                <span
                  class="rounded-full bg-[#6d28d9]/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
                >
                  ${{ product.price }}
                </span>
              </div>
            </div>

            <!-- Product Details -->
            <div class="flex-1 p-6 md:p-8">
              <div class="mb-4 flex items-start justify-between">
                <h2 class="text-2xl font-bold text-white">{{ product.title }}</h2>
                <div class="flex items-center">
                  <StarIcon class="h-5 w-5 text-yellow-400" />
                  <span class="ml-1 text-gray-300">{{ product.rating }}</span>
                </div>
              </div>

              <p class="mb-6 text-gray-300">{{ product.description }}</p>

              <div class="mb-6">
                <h3 class="mb-2 text-lg font-semibold text-white">Features</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(feature, i) in product.features"
                    :key="i"
                    class="rounded-full bg-[#2d2d2d]/70 px-2.5 py-1 text-xs text-gray-300 backdrop-blur-sm"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-2xl font-bold text-[#6d28d9]">${{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">
                    ${{ product.originalPrice }}
                  </span>
                </div>
                <button
                  @click="addToCart"
                  class="transform rounded-lg bg-[#6d28d9] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#5b21b6] hover:shadow-lg"
                >
                  Add to Cart - ${{ product.price }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { XMarkIcon, StarIcon } from '@heroicons/vue/24/solid'

  export default {
    name: 'ProductModal',
    components: {
      XMarkIcon,
      StarIcon,
    },
    props: {
      show: Boolean,
      product: Object,
    },
    emits: ['close', 'add-to-cart'],
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.product)
      },
    },
  }
</script>

<style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active .modal-content,
  .modal-leave-active .modal-content {
    transition: all 0.3s ease;
  }

  .modal-enter-from .modal-content,
  .modal-leave-to .modal-content {
    opacity: 0;
    transform: translateY(20px);
  }
</style>
