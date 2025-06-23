<template>
  <div class="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 sm:px-0 lg:grid-cols-3" ref="productsGrid">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="product-card group transform overflow-hidden rounded-xl border border-white/5 bg-[#1e1e1e]/70 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#6d28d9]/50 hover:shadow-2xl"
      @click="handleProductClick(index)"
    >
      <div class="product-image-container relative overflow-hidden">
        <img
          :src="product.image"
          :alt="product.title"
          class="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

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

        <!-- Hover/Tap Actions -->
        <div
          :class="[
            'absolute inset-0 flex items-center justify-center gap-4 bg-gradient-to-b from-[#6d28d9]/80 to-[#4c1d95]/80 transition-all duration-500',
            (isMobile && activeIndex === index) ||
              (!isMobile && 'md:opacity-0 md:group-hover:opacity-100'),
            isMobile && activeIndex !== index ? 'opacity-0' : '',
          ]"
        >
          <button
            @click.stop="$emit('view-product', product)"
            class="hover:shadow-glow transform rounded-full bg-white p-3 text-[#6d28d9] transition-all duration-300 hover:scale-110 hover:bg-gray-100"
          >
            <EyeIcon class="h-5 w-5" />
          </button>
          <button
            @click.stop="$emit('add-to-cart', product)"
            class="hover:shadow-glow transform rounded-full bg-white p-3 text-[#6d28d9] transition-all duration-300 hover:scale-110 hover:bg-gray-100"
          >
            <ShoppingCartIcon class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="p-6">
        <div class="mb-2 flex items-start justify-between">
          <h3
            class="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#6d28d9]"
          >
            {{ product.title }}
          </h3>
          <div class="flex items-center">
            <StarIcon class="h-4 w-4 text-yellow-400" />
            <span class="ml-1 text-sm text-gray-300">{{ product.rating }}</span>
          </div>
        </div>

        <p class="mb-4 line-clamp-2 text-sm text-gray-300">{{ product.description }}</p>

        <div class="mb-4 flex flex-wrap gap-2">
          <span
            v-for="(feature, i) in product.features"
            :key="i"
            class="rounded-full bg-[#2d2d2d]/70 px-2.5 py-1 text-xs text-gray-300 backdrop-blur-sm transition-colors duration-300 hover:bg-[#6d28d9]/20 hover:text-white"
          >
            {{ feature }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-[#6d28d9]">${{ product.price }}</span>
            <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">
              ${{ product.originalPrice }}
            </span>
          </div>
          <button
            @click.stop="$emit('add-to-cart', product)"
            class="transform rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#5b21b6] hover:shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { EyeIcon, ShoppingCartIcon, StarIcon } from '@heroicons/vue/24/solid'

  export default {
    name: 'ProductsGrid',
    components: {
      EyeIcon,
      ShoppingCartIcon,
      StarIcon,
    },
    props: {
      products: {
        type: Array,
        required: true,
      },
      isMobile: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        activeIndex: null,
      }
    },
    emits: ['view-product', 'add-to-cart'],
    methods: {
      handleProductClick(index) {
        if (this.isMobile) {
          this.activeIndex = this.activeIndex === index ? null : index
        }
      },
    },
    mounted() {
      this.animateProductCards()
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.animateProductCards()
            this.ticking = false
          })
          this.ticking = true
        }
      },
      animateProductCards() {
        const productCards = this.$refs.productsGrid.querySelectorAll('.product-card')
        productCards.forEach((card, index) => {
          if (this.isInViewport(card)) {
            setTimeout(() => {
              card.classList.add('fadeInUp')
            }, index * 100)
          }
        })
      },
      isInViewport(element) {
        const rect = element.getBoundingClientRect()
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
          rect.bottom >= 0
        )
      },
    },
  }
</script>

<style scoped>
  .product-card {
    opacity: 0;
    transform: translateY(20px);
  }

  .product-card.fadeInUp {
    animation: fadeInUp 0.6s ease forwards;
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

  .shadow-glow {
    box-shadow: 0 0 15px rgba(109, 40, 217, 0.4);
  }

  .product-image-container {
    position: relative;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
