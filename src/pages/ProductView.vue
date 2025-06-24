<template>
    <div class="flex min-h-screen w-full items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <!-- Breadcrumbs and Back Button -->
            <div class="mb-8 flex items-center justify-between">
                <nav class="text-sm text-gray-400" aria-label="Breadcrumb">
                    <ol class="flex flex-wrap items-center gap-2">
                        <li>
                            <router-link to="/" class="hover:text-[#6d28d9] transition-colors">Home</router-link>
                        </li>
                        <li class="flex items-center">
                            <span class="mx-2">/</span>
                            <router-link to="/shop" class="hover:text-[#6d28d9] transition-colors">Shop</router-link>
                        </li>
                        <li v-if="product" class="flex items-center">
                            <span class="mx-2">/</span>
                            <span class="text-gray-300">{{ product.title }}</span>
                        </li>
                    </ol>
                </nav>
                <router-link to="/shop"
                    class="inline-flex items-center text-gray-400 transition-colors hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                    Back to Shop
                </router-link>
            </div>

            <CartHeader />

            <!-- Loading State -->
            <Loading v-if="loading" text="Loading product..." size="md" />

            <!-- Product Content -->
            <div v-else-if="product" class="mb-12">
                <!-- Product Header -->
                <div class="mb-8 flex flex-col gap-6 sm:mb-10 sm:gap-8 lg:flex-row">
                    <!-- Product Image -->
                    <div class="w-full lg:w-3/5">
                        <div
                            class="relative aspect-video overflow-hidden rounded-xl bg-[#1e1e1e] shadow-xl sm:aspect-auto">
                            <img :src="imageSrc || product.image" :alt="product.title"
                                class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                @error="handleImageError" />
                            <!-- Product Type Badge -->
                            <div class="absolute top-4 left-4">
                                <span :class="[
                                    'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-white/20',
                                    getBadgeColor(product.category)
                                ]">
                                    <span class="h-2 w-2 rounded-full bg-current opacity-75"></span>
                                    {{ product.type }}
                                </span>
                            </div>
                            <!-- Price Badge -->
                            <div
                                class="absolute top-4 right-4 rounded-full bg-[#6d28d9] px-3 py-1 text-sm text-white shadow-md">
                                ${{ product.price.toFixed(2) }}
                            </div>
                        </div>
                    </div>

                    <!-- Product Info -->
                    <div class="w-full lg:w-2/5">
                        <div
                            class="h-full rounded-xl border border-[#333] bg-[#1e1e1e] p-5 shadow-lg transition-colors duration-300 hover:border-[#6d28d9]/30 sm:p-6">
                            <h1 class="mb-4 text-2xl font-bold text-white md:text-3xl">
                                {{ product.title }}
                            </h1>
                            <div class="mb-6 space-y-4">
                                <!-- Rating -->
                                <div class="flex items-center gap-4">
                                    <div class="flex items-center gap-1">
                                        <StarIcon v-for="i in 5" :key="i" :class="[
                                            'h-5 w-5',
                                            i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                                        ]" />
                                        <span class="ml-2 text-base font-medium text-gray-300">
                                            {{ product.rating }} / 5
                                        </span>
                                    </div>
                                    <span class="text-sm text-gray-500">
                                        ({{ product.reviews || 0 }} reviews)
                                    </span>
                                </div>
                                <!-- Category -->
                                <div class="flex items-start">
                                    <div class="mr-3 rounded-lg bg-[#2d2d2d] p-2">
                                        <TagIcon class="h-5 w-5 text-[#6d28d9]" />
                                    </div>
                                    <div>
                                        <h3 class="text-sm text-gray-400">Category</h3>
                                        <p class="text-white">{{ product.type }}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Quantity and Purchase Section -->
                            <div class="space-y-4">
                                <!-- Quantity Selector -->
                                <div class="flex items-center justify-between">
                                    <span class="text-base font-medium text-gray-300">Quantity:</span>
                                    <div class="flex items-center gap-3">
                                        <button @click="decrementQuantity" :disabled="quantity <= 1"
                                            class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3d3d3d] text-white transition-colors hover:bg-[#4d4d4d] disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"
                                            aria-label="Decrease quantity">
                                            <MinusIcon class="h-5 w-5" />
                                        </button>
                                        <span class="w-12 text-center text-lg font-semibold text-white"
                                            aria-live="polite">
                                            {{ quantity }}
                                        </span>
                                        <button @click="incrementQuantity" :disabled="quantity >= 99"
                                            class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3d3d3d] text-white transition-colors hover:bg-[#4d4d4d] disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"
                                            aria-label="Increase quantity">
                                            <PlusIcon class="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <!-- Price and Add to Cart -->
                                <div class="flex flex-wrap items-baseline gap-2">
                                    <span class="text-2xl font-bold text-[#6d28d9]">
                                        ${{ (product.price * quantity).toFixed(2) }}
                                    </span>
                                    <span v-if="product.originalPrice && product.originalPrice > product.price"
                                        class="text-lg text-gray-500 line-through">
                                        ${{ (product.originalPrice * quantity).toFixed(2) }}
                                    </span>
                                </div>
                                <!-- Savings Badge -->
                                <span v-if="product.originalPrice && product.originalPrice > product.price"
                                    class="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-1 text-sm font-medium text-green-400 ring-1 ring-green-500/30">
                                    <span class="mr-2">💰</span>
                                    Save ${{ ((product.originalPrice - product.price) * quantity).toFixed(2) }}
                                </span>
                                <!-- Add to Cart Button -->
                                <button @click="addToCart" :disabled="quantity < 1 || isAdding"
                                    class="group relative w-full overflow-hidden rounded-xl bg-[#6d28d9] px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:hover:scale-100 disabled:hover:shadow-none">
                                    <span class="relative z-10 flex items-center justify-center gap-2">
                                        <ShoppingCartIcon v-if="!isAdding" class="h-6 w-6" />
                                        <ArrowPathIcon v-else class="h-6 w-6 animate-spin" />
                                        <span>{{ isAdding ? 'Adding...' : `Add ${quantity} to Cart` }}</span>
                                    </span>
                                    <div
                                        class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-300 group-hover:translate-x-full">
                                    </div>
                                </button>
                                <!-- Confirmation Message -->
                                <div v-if="showConfirmation && product"
                                    class="mt-4 flex items-center justify-center gap-2 rounded-md bg-green-500/20 p-3 ring-1 ring-green-400/30"
                                    role="status" aria-live="polite">
                                    <CheckCircleIcon class="h-5 w-5 text-green-400" />
                                    <span class="text-base font-semibold text-green-400">
                                        {{ quantity }} {{ product.title }}{{ quantity > 1 ? 's' : '' }} added to cart!
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Description -->
                <div class="mb-10">
                    <h2 class="modern-section-title mb-6 text-xl font-semibold">
                        <span class="text-accent">—</span>
                        PRODUCT DETAILS
                    </h2>
                    <div
                        class="rounded-lg border border-[#333] bg-[#1e1e1e] p-5 shadow-lg transition-all duration-200 hover:border-[#6d28d9]/30 sm:p-6">
                        <div class="prose prose-invert max-w-none">
                            <p class="text-base leading-relaxed text-gray-300 sm:text-lg">
                                {{ product.description }}
                            </p>
                            <div class="mt-6 mb-3 flex items-center text-lg font-semibold text-white sm:text-xl">
                                <span class="mr-2.5 inline-block h-6 w-1.5 rounded-full bg-[#6d28d9]"></span>
                                Key Features:
                            </div>
                            <ul class="space-y-3 pl-0">
                                <li v-for="(feature, index) in product.features" :key="index"
                                    class="flex items-center text-base text-gray-300 hover:text-white transition-colors duration-200">
                                    <svg class="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-[#6d28d9]"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span>{{ feature }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Related Products -->
                <RelatedProducts v-if="product" :products="relatedProducts" />
            </div>

            <!-- Not Found State -->
            <div v-else
                class="animate-slideUp flex flex-col items-center justify-center rounded-lg border border-[#333] bg-[#1e1e1e]/70 p-6 py-10 text-center shadow-xl backdrop-blur-md sm:p-10 sm:py-20">
                <div class="mb-6">
                    <ExclamationTriangleIcon class="h-16 w-16 text-[#6d28d9]" />
                </div>
                <h1 class="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                    Product Not Found
                </h1>
                <p class="mx-auto mb-4 max-w-md text-gray-400">
                    The product you're looking for doesn't exist or has been removed. Check out other products instead.
                </p>
                <router-link to="/shop"
                    class="inline-flex items-center gap-2 rounded-full bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-[#5b21b6] hover:shadow-[#222]">
                    <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Back to Shop
                </router-link>
            </div>

            <!-- Shopping Cart Sidebar -->
            <ShoppingCartSidebar :show="showCart" :items="cart" :total="cartTotal" @close="toggleCart"
                @update-quantity="updateQuantity" @remove="removeFromCart" @checkout="checkout" />
        </div>
    </div>
</template>

<script>
import {
    StarIcon,
    PlusIcon,
    MinusIcon,
    ShoppingCartIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ExclamationTriangleIcon,
    TagIcon
} from '@heroicons/vue/24/solid';
import { useRoute, useRouter } from 'vue-router';
import { PRODUCTS } from '@/constants/products';
import Loading from '@/components/Loading.vue';
import ShoppingCartSidebar from '@/components/Shop/ShoppingCartSidebar.vue';
import CartHeader from '@/components/Shop/CartHeader.vue';
import RelatedProducts from '@/components/Shop/RelatedProducts.vue';
import { useCart } from '@/hooks/useCart';
import { computed } from 'vue';

export default {
    name: 'ProductView',
    components: {
        StarIcon,
        PlusIcon,
        MinusIcon,
        ShoppingCartIcon,
        CheckCircleIcon,
        ArrowPathIcon,
        ExclamationTriangleIcon,
        TagIcon,
        Loading,
        ShoppingCartSidebar,
        CartHeader,
        RelatedProducts
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { cart, showCart, cartItemsCount, cartTotal, addToCart, removeFromCart, updateQuantity, toggleCart, checkout } = useCart();

        return { route, router, cart, showCart, cartItemsCount, cartTotal, addToCart, removeFromCart, updateQuantity, toggleCart, checkout };
    },
    data() {
        return {
            quantity: 1,
            showConfirmation: false,
            isAdding: false,
            imageSrc: null,
            product: null,
            loading: true
        };
    },
    computed: {
        relatedProducts() {
            if (!this.product) return [];
            return PRODUCTS
                .filter(
                    (p) =>
                        p.id !== this.product.id &&
                        p.category === this.product.category
                )
                .slice(0, 3); // Limit to 3 related products
        }
    },
    mounted() {
        const productId = Number(this.route.params.id);
        if (!productId || isNaN(productId)) {
            this.router.push('/shop');
            return;
        }
        this.product = PRODUCTS.find(p => p.id === productId) || null;
        this.imageSrc = this.product?.image;
        this.loading = false;
    },
    methods: {
        incrementQuantity() {
            if (this.quantity < 99) {
                this.quantity++;
            }
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        async addToCart() {
            if (!this.product || this.quantity < 1 || this.isAdding) return;

            this.isAdding = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 300));

                this.addToCart(this.product, this.quantity);

                this.showConfirmation = true;

                setTimeout(() => {
                    this.showConfirmation = false;
                }, 3000);
            } catch (error) {
                console.error('Error adding to cart:', error);
            } finally {
                this.isAdding = false;
            }
        },
        handleImageError() {
            this.imageSrc = 'https://via.placeholder.com/500x400/2d2d2d/666666?text=Image+Not+Available';
        },
        getBadgeColor(category) {
            const colors = {
                digital: 'bg-blue-500/80 ring-blue-400/30',
                courses: 'bg-green-500/80 ring-green-400/30',
                physical: 'bg-orange-500/80 ring-orange-400/30',
                service: 'bg-purple-500/80 ring-purple-400/30',
                default: 'bg-gray-500/80 ring-gray-400/30'
            };
            return colors[category] || colors.default;
        }
    }
};
</script>

<style scoped>
.prose h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.prose ul {
    list-style-type: none;
    padding-left: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>