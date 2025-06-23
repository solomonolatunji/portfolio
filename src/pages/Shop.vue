<template>
  <div class="flex min-h-screen w-full items-center justify-center py-12 pb-24 md:pb-12">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="title-with-bg-shadow" data-text="SHOP">
        <h1 class="modern-title mb-8 text-center text-2xl sm:text-3xl lg:text-4xl">
          <span class="accent">—</span>
          SHOP
        </h1>
      </div>

      <!-- Category Filters -->
      <div class="mb-12 overflow-x-auto pb-2">
        <div class="flex w-max flex-nowrap gap-1 sm:mx-auto sm:gap-3">
          <button
            @click="setActiveFilter('all')"
            :class="[
              'filter-button rounded-xl px-2 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:px-5 sm:text-sm',
              activeFilter === 'all'
                ? 'filter-active shadow-glow bg-[#6d28d9] text-white'
                : 'border border-white/10 bg-[#1e1e1e]/70 text-gray-300 backdrop-blur-sm hover:bg-[#2d2d2d]',
            ]"
          >
            All Products
          </button>
          <button
            @click="setActiveFilter('digital')"
            :class="[
              'filter-button rounded-xl px-2 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:px-5 sm:text-sm',
              activeFilter === 'digital'
                ? 'filter-active shadow-glow bg-[#6d28d9] text-white'
                : 'border border-white/10 bg-[#1e1e1e]/70 text-gray-300 backdrop-blur-sm hover:bg-[#2d2d2d]',
            ]"
          >
            Digital Products
          </button>
          <button
            @click="setActiveFilter('courses')"
            :class="[
              'filter-button rounded-xl px-2 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:px-5 sm:text-sm',
              activeFilter === 'courses'
                ? 'filter-active shadow-glow bg-[#6d28d9] text-white'
                : 'border border-white/10 bg-[#1e1e1e]/70 text-gray-300 backdrop-blur-sm hover:bg-[#2d2d2d]',
            ]"
          >
            Courses
          </button>
          <button
            @click="setActiveFilter('physical')"
            :class="[
              'filter-button rounded-xl px-2 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:px-5 sm:text-sm',
              activeFilter === 'physical'
                ? 'filter-active shadow-glow bg-[#6d28d9] text-white'
                : 'border border-white/10 bg-[#1e1e1e]/70 text-gray-300 backdrop-blur-sm hover:bg-[#2d2d2d]',
            ]"
          >
            Merchandise
          </button>
        </div>
      </div>

      <!-- Shopping Cart Summary -->
      <div class="mb-8 flex justify-end px-2 sm:px-0">
        <button
          @click="toggleCart"
          class="inline-flex items-center rounded-xl border border-white/10 bg-[#1e1e1e]/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#2d2d2d]"
        >
          <ShoppingCartIcon class="mr-2 h-5 w-5" />
          Cart ({{ cartItemsCount }})
          <span v-if="cartTotal > 0" class="ml-2 text-[#6d28d9]">${{ cartTotal.toFixed(2) }}</span>
        </button>
      </div>

      <!-- Products Grid Component -->
      <ProductsGrid
        :products="filteredProducts"
        :is-mobile="isMobile"
        :active-product-index="activeProductIndex"
        @view-product="openProductModal"
        @add-to-cart="addToCart"
      />

      <!-- Newsletter Component -->
      <Newsletter @subscribed="handleNewsletterSubscription" />

      <!-- Shopping Cart Sidebar Component -->
      <ShoppingCartSidebar
        :show="showCart"
        :items="cart"
        :total="cartTotal"
        @close="toggleCart"
        @update-quantity="updateQuantity"
        @remove="removeFromCart"
        @checkout="checkout"
      />

      <!-- Product Modal Component -->
      <ProductModal
        :show="showProductModal"
        :product="selectedProduct"
        @close="closeProductModal"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script>
  import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
  import { PRODUCTS } from '@/constants/products'
  import ShoppingCartSidebar from '@/components/Shop/ShoppingCartSidebar.vue'
  import ProductsGrid from '@/components/Shop/ProductsGrid.vue'
  import ProductModal from '@/components/Shop/ProductModal.vue'
  import Newsletter from '@/components/Newsletter.vue'

  export default {
    name: 'Shop',
    components: {
      ShoppingCartIcon,
      ShoppingCartSidebar,
      ProductsGrid,
      ProductModal,
    },
    data() {
      return {
        activeFilter: 'all',
        showCart: false,
        showProductModal: false,
        selectedProduct: null,
        cart: [],
        email: '',
        isMobile: false,
        activeProductIndex: null,
        products: PRODUCTS,
      }
    },
    computed: {
      filteredProducts() {
        if (this.activeFilter === 'all') {
          return this.products
        }
        return this.products.filter(product => product.category === this.activeFilter)
      },
      cartItemsCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0)
      },
      cartTotal() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    },
    mounted() {
      this.checkIfMobile()
      window.addEventListener('resize', this.checkIfMobile)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.checkIfMobile)
    },
    methods: {
      checkIfMobile() {
        this.isMobile = window.innerWidth < 768
        if (!this.isMobile) {
          this.activeProductIndex = null
        }
      },
      setActiveFilter(filter) {
        this.activeFilter = filter
        this.activeProductIndex = null
      },
      toggleCart() {
        this.showCart = !this.showCart
      },
      addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id)
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          this.cart.push({ ...product, quantity: 1 })
        }
      },
      removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId)
      },
      updateQuantity({ id, quantity }) {
        if (quantity <= 0) {
          this.removeFromCart(id)
          return
        }
        const item = this.cart.find(item => item.id === id)
        if (item) {
          item.quantity = quantity
        }
      },
      openProductModal(product) {
        this.selectedProduct = product
        this.showProductModal = true
      },
      closeProductModal() {
        this.showProductModal = false
      },
      checkout() {
        alert(`Proceeding to checkout with total: $${this.cartTotal.toFixed(2)}`)
      },
    },
  }
</script>

<style scoped>
  .filter-button {
    position: relative;
    overflow: hidden;
  }

  .filter-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: rgba(109, 40, 217, 0.1);
    transition: width 0.3s ease;
    z-index: -1;
  }

  .filter-button:hover::after {
    width: 100%;
  }

  .filter-active {
    position: relative;
  }

  .filter-active::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    background-color: white;
    border-radius: 2px;
  }

  @media (max-width: 640px) {
    .container {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>
