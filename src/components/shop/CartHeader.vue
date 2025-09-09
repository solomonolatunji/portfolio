<template>
    <div class="mb-8 flex justify-end px-2 sm:px-0">
        <button @click="toggleCart"
            class="inline-flex items-center rounded-xl border border-white/10 bg-[#1e1e1e]/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#2d2d2d]">
            <ShoppingCartIcon class="mr-2 h-5 w-5" />
            Cart ({{ cartItemsCount }})
            <span v-if="cartTotal > 0" class="ml-2 text-[#6d28d9]">${{ cartTotal.toFixed(2) }}</span>
        </button>
    </div>
</template>

<script>
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { useCart } from '@/hooks/useCart';

export default {
    name: 'CartHeader',
    components: {
        ShoppingCartIcon
    },
    setup() {
        const { cartItemsCount, cartTotal, toggleCart } = useCart();
        return { cartItemsCount, cartTotal, toggleCart };
    }
};
</script>