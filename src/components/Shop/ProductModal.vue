<template>
    <transition name="modal">
        <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true"
            :aria-labelledby="product ? 'product-modal-title' : 'product-modal-fallback'">
            <!-- Overlay -->
            <div class="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
                @click="$emit('close')"></div>

            <!-- Modal Container -->
            <div class="flex min-h-screen items-center justify-center p-4 sm:p-6">
                <!-- Modal Content -->
                <div
                    class="relative w-full max-w-lg sm:max-w-2xl md:max-w-4xl transform overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] shadow-2xl ring-1 ring-white/10 transition-all duration-300">

                    <!-- Close Button - repositioned to avoid overlap -->
                    <button @click="$emit('close')"
                        class="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-gray-300 backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:ring-offset-2 focus:ring-offset-gray-900"
                        aria-label="Close modal">
                        <XMarkIcon class="h-5 w-5" />
                    </button>

                    <!-- Product Content -->
                    <div v-if="product" class="flex flex-col lg:flex-row">
                        <!-- Product Image -->
                        <div class="relative h-64 w-full overflow-hidden sm:h-80 lg:h-auto lg:w-1/2">
                            <img :src="imageSrc || product.image" :alt="product.title"
                                class="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105 lg:h-full lg:min-h-[500px]"
                                @error="handleImageError" />

                            <!-- Gradient Overlay -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20">
                            </div>

                            <!-- Product Type Badge -->
                            <div class="absolute top-6 left-6">
                                <span :class="[
                                    'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/20 sm:text-sm',
                                    getBadgeColor(product.category)
                                ]">
                                    <span class="mr-1.5 h-2 w-2 rounded-full bg-current opacity-75"></span>
                                    {{ product.type }}
                                </span>
                            </div>

                            <!-- Price Badge -->
                            <div class="absolute bottom-6 right-6">
                                <div class="flex flex-col items-end space-y-1">
                                    <span
                                        class="rounded-full bg-[#6d28d9]/90 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md ring-1 ring-white/20 sm:text-base">
                                        ${{ product.price.toFixed(2) }}
                                    </span>
                                    <span v-if="product.originalPrice && product.originalPrice > product.price"
                                        class="rounded-full bg-red-500/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-md line-through">
                                        ${{ product.originalPrice.toFixed(2) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Product Details -->
                        <div class="flex-1 p-6 sm:p-8 lg:p-10">
                            <!-- Header with Title and Rating -->
                            <div class="mb-6">
                                <div class="mb-3 flex items-start justify-between">
                                    <h2 id="product-modal-title"
                                        class="text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight">
                                        {{ product.title }}
                                    </h2>
                                </div>

                                <!-- Rating moved below title to avoid close button overlap -->
                                <div class="flex items-center space-x-4">
                                    <div class="flex items-center space-x-1">
                                        <StarIcon v-for="i in 5" :key="i" :class="[
                                            'h-4 w-4 sm:h-5 sm:w-5',
                                            i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                                        ]" />
                                        <span class="ml-2 text-sm font-medium text-gray-300 sm:text-base">
                                            {{ product.rating }} / 5
                                        </span>
                                    </div>
                                    <span class="text-xs text-gray-500 sm:text-sm">
                                        ({{ product.reviews || 0 }} reviews)
                                    </span>
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="mb-6">
                                <p class="text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
                                    {{ product.description }}
                                </p>
                            </div>

                            <!-- Features -->
                            <div class="mb-6">
                                <h3 class="mb-3 text-lg font-semibold text-white sm:text-xl">Key Features</h3>
                                <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <div v-for="(feature, i) in product.features" :key="i"
                                        class="flex items-center space-x-2 rounded-lg bg-[#2d2d2d]/50 p-2 backdrop-blur-sm">
                                        <CheckIcon class="h-4 w-4 text-green-400 flex-shrink-0" />
                                        <span class="text-xs text-gray-300 sm:text-sm">{{ feature }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Quantity and Purchase Section -->
                            <div class="space-y-4 rounded-xl bg-[#2a2a2a]/50 p-4 backdrop-blur-sm ring-1 ring-white/5">
                                <!-- Quantity Selector -->
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-gray-300 sm:text-base">Quantity:</span>
                                    <div class="flex items-center space-x-3">
                                        <button @click="decrementQuantity" :disabled="quantity <= 1"
                                            class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3d3d3d] text-white transition-colors hover:bg-[#4d4d4d] disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500 sm:h-10 sm:w-10"
                                            aria-label="Decrease quantity">
                                            <MinusIcon class="h-4 w-4" />
                                        </button>
                                        <span class="w-12 text-center text-lg font-semibold text-white"
                                            aria-live="polite">
                                            {{ quantity }}
                                        </span>
                                        <button @click="incrementQuantity" :disabled="quantity >= 99"
                                            class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3d3d3d] text-white transition-colors hover:bg-[#4d4d4d] disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500 sm:h-10 sm:w-10"
                                            aria-label="Increase quantity">
                                            <PlusIcon class="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Price and Add to Cart -->
                                <div class="space-y-4">
                                    <!-- Price Section -->
                                    <div class="flex flex-wrap items-baseline gap-2">
                                        <span class="text-2xl font-bold text-[#6d28d9] sm:text-3xl">
                                            ${{ (product.price * quantity).toFixed(2) }}
                                        </span>
                                        <span v-if="product.originalPrice && product.originalPrice > product.price"
                                            class="text-lg text-gray-500 line-through sm:text-xl">
                                            ${{ (product.originalPrice * quantity).toFixed(2) }}
                                        </span>
                                    </div>

                                    <!-- Savings Badge -->
                                    <div v-if="product.originalPrice && product.originalPrice > product.price"
                                        class="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1.5 text-sm font-medium text-green-400 ring-1 ring-green-500/30">
                                        <span class="mr-1">💰</span>
                                        Save ${{ ((product.originalPrice - product.price) * quantity).toFixed(2) }}
                                    </div>

                                    <!-- Add to Cart Button -->
                                    <button @click="addToCart" :disabled="quantity < 1 || isAdding"
                                        class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:hover:scale-100 disabled:hover:shadow-none">
                                        <span class="relative z-10 flex items-center justify-center space-x-2">
                                            <ShoppingCartIcon v-if="!isAdding" class="h-5 w-5" />
                                            <ArrowPathIcon v-else class="h-5 w-5 animate-spin" />
                                            <span class="text-base sm:text-lg">{{ isAdding ? 'Adding...' : `Add
                                                ${quantity} to Cart` }}</span>
                                        </span>
                                        <div
                                            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full">
                                        </div>
                                    </button>
                                </div>

                                <!-- Confirmation Message -->
                                <transition name="slide-up">
                                    <div v-if="showConfirmation"
                                        class="flex items-center justify-center space-x-2 rounded-lg bg-green-500/20 p-3 ring-1 ring-green-400/30"
                                        aria-live="polite">
                                        <CheckCircleIcon class="h-5 w-5 text-green-400" />
                                        <p class="text-sm font-medium text-green-400 sm:text-base">
                                            {{ quantity }} {{ product.title }}{{ quantity > 1 ? 's' : '' }} added to
                                            cart!
                                        </p>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>

                    <!-- Fallback for No Product -->
                    <div v-else class="p-8 text-center">
                        <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                            <ExclamationTriangleIcon class="h-8 w-8 text-gray-400" />
                        </div>
                        <p id="product-modal-fallback" class="mb-4 text-lg text-gray-300">No product data available.</p>
                        <button @click="$emit('close')"
                            class="rounded-lg bg-[#6d28d9] px-6 py-3 font-bold text-white transition-colors hover:bg-[#5b21b6]">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {
    XMarkIcon,
    StarIcon,
    PlusIcon,
    MinusIcon,
    ShoppingCartIcon,
    CheckIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ExclamationTriangleIcon
} from "@heroicons/vue/24/solid";

export default {
    name: "ProductModal",
    components: {
        XMarkIcon,
        StarIcon,
        PlusIcon,
        MinusIcon,
        ShoppingCartIcon,
        CheckIcon,
        CheckCircleIcon,
        ArrowPathIcon,
        ExclamationTriangleIcon,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        product: {
            type: Object,
            default: null,
        },
    },
    emits: ["close", "add-to-cart"],
    data() {
        return {
            quantity: 1,
            showConfirmation: false,
            isAdding: false,
            imageSrc: null,
        };
    },
    watch: {
        show(newVal) {
            if (newVal) {
                this.resetModalState();
                this.imageSrc = this.product?.image;
                this.trapFocus();
                document.body.style.overflow = 'hidden';
                window.addEventListener('keydown', this.handleEscape);
            } else {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', this.handleEscape);
            }
        },
        product: {
            handler(newProduct) {
                if (newProduct) {
                    this.imageSrc = newProduct.image;
                    this.resetModalState();
                }
            },
            immediate: true,
        },
    },
    methods: {
        resetModalState() {
            this.quantity = 1;
            this.showConfirmation = false;
            this.isAdding = false;
        },
        incrementQuantity() {
            if (this.quantity < 99) {
                this.quantity += 1;
            }
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity -= 1;
            }
        },
        async addToCart() {
            if (!this.product || this.quantity < 1 || this.isAdding) return;

            this.isAdding = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 800));

                this.$emit("add-to-cart", {
                    ...this.product,
                    quantity: this.quantity,
                    totalPrice: this.product.price * this.quantity
                });

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
            this.imageSrc = "https://via.placeholder.com/500x400/2d2d2d/666666?text=Image+Not+Available";
        },
        handleEscape(event) {
            if (event.key === 'Escape' && this.show) {
                this.$emit('close');
            }
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
        },
        trapFocus() {
            this.$nextTick(() => {
                const modal = this.$el;
                if (!modal) return;

                const focusableElements = modal.querySelectorAll(
                    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                const handleTabKey = (e) => {
                    if (e.key === 'Tab') {
                        if (e.shiftKey && document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        } else if (!e.shiftKey && document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                };

                modal.addEventListener('keydown', handleTabKey);
                firstElement.focus();
            });
        },
    },
    beforeUnmount() {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', this.handleEscape);
    },
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
}

.modal-enter-to .modal-content,
.modal-leave-from .modal-content {
    opacity: 1;
    transform: translateY(0) scale(1);
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

.modal-content::-webkit-scrollbar {
    width: 6px;
}

.modal-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
    background: rgba(109, 40, 217, 0.6);
    border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
    background: rgba(109, 40, 217, 0.8);
}
</style>