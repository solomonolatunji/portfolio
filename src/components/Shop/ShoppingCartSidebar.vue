<template>
    <div>
        <!-- Cart Overlay -->
        <div v-if="show" @click="$emit('close')" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"></div>

        <!-- Shopping Cart Sidebar -->
        <div :class="[
            'fixed top-0 right-0 z-50 h-full w-80 transform bg-[#1a1a1a] shadow-2xl transition-transform duration-300',
            show ? 'translate-x-0' : 'translate-x-full',
        ]">
            <div class="flex h-full flex-col">
                <div class="flex items-center justify-between border-b border-white/10 p-6">
                    <h3 class="text-xl font-bold text-white">Shopping Cart</h3>
                    <button @click="$emit('close')" class="text-gray-400 hover:text-white">
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-6">
                    <div v-if="items.length === 0" class="text-center text-gray-400">
                        Your cart is empty
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="item in items" :key="item.id"
                            class="flex items-center space-x-4 rounded-lg bg-[#2d2d2d]/50 p-4">
                            <img :src="item.image" :alt="item.title" class="h-16 w-16 rounded-lg object-cover" />
                            <div class="flex-1">
                                <h4 class="font-medium text-white">{{ item.title }}</h4>
                                <p class="text-sm text-gray-400">${{ item.price }}</p>
                                <div class="mt-2 flex items-center space-x-2">
                                    <button @click="
                                        $emit('update-quantity', {
                                            id: item.id,
                                            quantity: item.quantity - 1,
                                        })
                                        "
                                        class="flex h-6 w-6 items-center justify-center rounded bg-[#6d28d9] text-white">
                                        -
                                    </button>
                                    <span class="text-white">{{ item.quantity }}</span>
                                    <button @click="
                                        $emit('update-quantity', {
                                            id: item.id,
                                            quantity: item.quantity + 1,
                                        })
                                        "
                                        class="flex h-6 w-6 items-center justify-center rounded bg-[#6d28d9] text-white">
                                        +
                                    </button>
                                </div>
                            </div>
                            <button @click="$emit('remove', item.id)" class="text-red-400 hover:text-red-300">
                                <TrashIcon class="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="items.length > 0" class="border-t border-white/10 p-6">
                    <div class="mb-4 flex items-center justify-between text-xl font-bold text-white">
                        <span>Total:</span>
                        <span>${{ total.toFixed(2) }}</span>
                    </div>
                    <button @click="$emit('checkout')"
                        class="w-full transform rounded-xl bg-[#6d28d9] py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#5b21b6]">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XMarkIcon, TrashIcon } from "@heroicons/vue/24/solid";

export default {
    name: "ShoppingCartSidebar",
    components: {
        XMarkIcon,
        TrashIcon,
    },
    props: {
        show: Boolean,
        items: Array,
        total: Number,
    },
    emits: ["close", "update-quantity", "remove", "checkout"],
};
</script>
