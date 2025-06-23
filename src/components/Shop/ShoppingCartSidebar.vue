<template>
    <div>
        <!-- Cart Overlay -->
        <transition name="overlay">
            <div v-if="show" @click="$emit('close')"
                class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300"></div>
        </transition>

        <!-- Shopping Cart Sidebar -->
        <transition name="slide">
            <div v-if="show"
                class="fixed top-0 right-0 z-50 h-full w-full max-w-md transform bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] shadow-2xl ring-1 ring-white/10 sm:w-96">
                <div class="flex h-full flex-col">
                    <!-- Header -->
                    <div
                        class="flex items-center justify-between border-b border-white/20 bg-[#1e1e1e]/80 backdrop-blur-md p-6">
                        <div class="flex items-center space-x-3">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#6d28d9]/20">
                                <ShoppingBagIcon class="h-5 w-5 text-[#6d28d9]" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white">Shopping Cart</h3>
                                <p class="text-xs text-gray-400">{{ items.length }} {{ items.length === 1 ? 'item' :
                                    'items' }}</p>
                            </div>
                        </div>
                        <button @click="$emit('close')"
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-all hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]">
                            <XMarkIcon class="h-5 w-5" />
                        </button>
                    </div>

                    <!-- Cart Items -->
                    <div class="flex-1 overflow-hidden">
                        <div class="h-full overflow-y-auto">
                            <!-- Empty State -->
                            <div v-if="items.length === 0"
                                class="flex h-full flex-col items-center justify-center p-8 text-center">
                                <div
                                    class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                                    <ShoppingBagIcon class="h-10 w-10 text-gray-500" />
                                </div>
                                <h4 class="mb-2 text-lg font-semibold text-white">Your cart is empty</h4>
                                <p class="mb-6 text-sm text-gray-400">Add some products to get started</p>
                                <button @click="$emit('close')"
                                    class="rounded-lg bg-[#6d28d9] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5b21b6]">
                                    Continue Shopping
                                </button>
                            </div>

                            <!-- Cart Items List -->
                            <div v-else class="space-y-1 p-4">
                                <transition-group name="cart-item" tag="div" class="space-y-3">
                                    <div v-for="item in items" :key="`${item.id}-${item.selectedOptions || ''}`"
                                        class="group relative overflow-hidden rounded-xl bg-[#2d2d2d]/60 p-4 backdrop-blur-sm ring-1 ring-white/5 transition-all hover:bg-[#3d3d3d]/60 hover:ring-white/10">

                                        <!-- Item Content -->
                                        <div class="flex space-x-4">
                                            <!-- Product Image -->
                                            <div class="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                                                <img :src="item.image" :alt="item.title"
                                                    class="h-full w-full object-cover transition-transform group-hover:scale-110"
                                                    @error="handleImageError($event)" />
                                                <div
                                                    class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
                                                </div>
                                            </div>

                                            <!-- Item Details -->
                                            <div class="flex-1 min-w-0">
                                                <h4 class="font-semibold text-white text-sm leading-tight truncate">{{
                                                    item.title }}</h4>
                                                <div class="mt-1 flex items-center space-x-2">
                                                    <span class="text-sm font-bold text-[#6d28d9]">${{
                                                        item.price.toFixed(2) }}</span>
                                                    <span v-if="item.originalPrice && item.originalPrice > item.price"
                                                        class="text-xs text-gray-500 line-through">
                                                        ${{ item.originalPrice.toFixed(2) }}
                                                    </span>
                                                </div>

                                                <!-- Quantity Controls -->
                                                <div class="mt-3 flex items-center justify-between">
                                                    <div class="flex items-center space-x-2">
                                                        <button @click="updateQuantity(item, item.quantity - 1)"
                                                            :disabled="item.quantity <= 1"
                                                            class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4d4d4d] text-white transition-colors hover:bg-[#5d5d5d] disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"
                                                            aria-label="Decrease quantity">
                                                            <MinusIcon class="h-3 w-3" />
                                                        </button>
                                                        <span class="w-8 text-center text-sm font-medium text-white">{{
                                                            item.quantity }}</span>
                                                        <button @click="updateQuantity(item, item.quantity + 1)"
                                                            :disabled="item.quantity >= 99"
                                                            class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4d4d4d] text-white transition-colors hover:bg-[#5d5d5d] disabled:cursor-not-allowed disabled:bg-gray-700"
                                                            aria-label="Increase quantity">
                                                            <PlusIcon class="h-3 w-3" />
                                                        </button>
                                                    </div>

                                                    <!-- Item Total -->
                                                    <div class="text-right">
                                                        <div class="text-sm font-bold text-white">
                                                            ${{ (item.price * item.quantity).toFixed(2) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Remove Button -->
                                            <button @click="removeItem(item)"
                                                class="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-red-400 opacity-0 transition-all hover:bg-red-500/30 hover:text-red-300 group-hover:opacity-100"
                                                aria-label="Remove item">
                                                <TrashIcon class="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </transition-group>
                            </div>
                        </div>
                    </div>

                    <!-- Footer with Totals and Checkout -->
                    <div v-if="items.length > 0" class="border-t border-white/20 bg-[#1e1e1e]/80 backdrop-blur-md p-6">
                        <!-- Order Summary -->
                        <div class="mb-4 space-y-2">
                            <div class="flex items-center justify-between text-sm text-gray-300">
                                <span>Subtotal ({{ totalItems }} items)</span>
                                <span>${{ subtotal.toFixed(2) }}</span>
                            </div>
                            <div v-if="savings > 0" class="flex items-center justify-between text-sm text-green-400">
                                <span>You Save</span>
                                <span>-${{ savings.toFixed(2) }}</span>
                            </div>
                            <div
                                class="flex items-center justify-between border-t border-white/10 pt-2 text-lg font-bold text-white">
                                <span>Total</span>
                                <span class="text-[#6d28d9]">${{ total.toFixed(2) }}</span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="space-y-3">
                            <button @click="handleCheckout" :disabled="isProcessing"
                                class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:bg-gray-600">
                                <span class="relative z-10 flex items-center justify-center space-x-2">
                                    <CreditCardIcon v-if="!isProcessing" class="h-5 w-5" />
                                    <ArrowPathIcon v-else class="h-5 w-5 animate-spin" />
                                    <span>{{ isProcessing ? 'Processing...' : 'Proceed to Checkout' }}</span>
                                </span>
                                <div
                                    class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full">
                                </div>
                            </button>

                            <button @click="$emit('close')"
                                class="w-full rounded-lg border border-white/20 bg-transparent py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {
    XMarkIcon,
    TrashIcon,
    ShoppingBagIcon,
    MinusIcon,
    PlusIcon,
    CreditCardIcon,
    ArrowPathIcon
} from "@heroicons/vue/24/solid";

export default {
    name: "ShoppingCartSidebar",
    components: {
        XMarkIcon,
        TrashIcon,
        ShoppingBagIcon,
        MinusIcon,
        PlusIcon,
        CreditCardIcon,
        ArrowPathIcon,
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default: () => []
        },
        total: {
            type: Number,
            default: 0
        },
    },
    emits: ["close", "update-quantity", "remove", "checkout"],
    data() {
        return {
            isProcessing: false,
        };
    },
    computed: {
        totalItems() {
            return this.items.reduce((sum, item) => sum + item.quantity, 0);
        },
        subtotal() {
            return this.items.reduce((sum, item) => {
                const price = item.originalPrice || item.price;
                return sum + (price * item.quantity);
            }, 0);
        },
        savings() {
            return this.items.reduce((sum, item) => {
                if (item.originalPrice && item.originalPrice > item.price) {
                    return sum + ((item.originalPrice - item.price) * item.quantity);
                }
                return sum;
            }, 0);
        },
    },
    watch: {
        show(newVal) {
            if (newVal) {
                document.body.style.overflow = 'hidden';
                this.$nextTick(() => {
                    this.trapFocus();
                });
            } else {
                document.body.style.overflow = '';
            }
        },
    },
    methods: {
        updateQuantity(item, newQuantity) {
            if (newQuantity < 1) {
                this.removeItem(item);
                return;
            }
            if (newQuantity > 99) return;

            this.$emit('update-quantity', {
                id: item.id,
                quantity: newQuantity,
                selectedOptions: item.selectedOptions
            });
        },
        removeItem(item) {
            this.$emit('remove', item.id, item.selectedOptions);
        },
        async handleCheckout() {
            if (this.isProcessing) return;

            this.isProcessing = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.$emit('checkout');
            } catch (error) {
                console.error('Checkout error:', error);
            } finally {
                this.isProcessing = false;
            }
        },
        handleImageError(event) {
            event.target.src = "https://via.placeholder.com/64x64/2d2d2d/666666?text=N/A";
        },
        trapFocus() {
            const sidebar = this.$el.querySelector('[class*="fixed top-0 right-0"]');
            if (!sidebar) return;

            const focusableElements = sidebar.querySelectorAll(
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
                if (e.key === 'Escape') {
                    this.$emit('close');
                }
            };

            sidebar.addEventListener('keydown', handleTabKey);
            firstElement.focus();
        },
    },
    beforeUnmount() {
        document.body.style.overflow = '';
    },
};
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.cart-item-enter-active,
.cart-item-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-item-enter-from {
    opacity: 0;
    transform: translateX(50px);
}

.cart-item-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

.cart-item-move {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(109, 40, 217, 0.6);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(109, 40, 217, 0.8);
}
</style>