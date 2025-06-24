<template>
    <div class="flex min-h-screen w-full items-center justify-center py-12 pb-24 md:pb-12">
        <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="title-with-bg-shadow" data-text="SHOP">
                <h1 class="modern-title mb-8 text-center text-2xl sm:text-3xl lg:text-4xl">
                    <span class="accent">—</span>
                    SHOP
                </h1>
            </div>

            <CartHeader />

            <!-- Category Filters -->
            <div class="mb-12 overflow-x-auto pb-2">
                <div class="flex w-max flex-nowrap gap-1 sm:mx-auto sm:gap-3">
                    <button @click="setActiveFilter('all')" :class="[
                        'filter-button rounded-xl px-2 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:px-5 sm:text-sm',
                        activeFilter === 'all'
                            ? 'filter-active shadow-glow bg-[#6d28d9] text-white'
                            : 'border border-white/10 bg-[#1e1e1e]/70 text-gray-300 backdrop-blur-sm hover:bg-[#2d2d2d]'
                    ]">
                        All Products
                    </button>
                    <button @click="setActiveFilter('digital')" :class="[
                        'filter-button rounded-xl px-2 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:px-5 sm:text-sm',
                        activeFilter === 'digital'
                            ? 'filter-active shadow-glow bg-[#6d28d9] text-white'
                            : 'border border-white/10 bg-[#1e1e1e]/70 text-gray-300 backdrop-blur-sm hover:bg-[#2d2d2d]'
                    ]">
                        Digital Products
                    </button>
                    <button @click="setActiveFilter('courses')" :class="[
                        'filter-button rounded-xl px-2 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:px-5 sm:text-sm',
                        activeFilter === 'courses'
                            ? 'filter-active shadow-glow bg-[#6d28d9] text-white'
                            : 'border border-white/10 bg-[#1e1e1e]/70 text-gray-300 backdrop-blur-sm hover:bg-[#2d2d2d]'
                    ]">
                        Courses
                    </button>
                    <button @click="setActiveFilter('physical')" :class="[
                        'filter-button rounded-xl px-2 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:px-5 sm:text-sm',
                        activeFilter === 'physical'
                            ? 'filter-active shadow-glow bg-[#6d28d9] text-white'
                            : 'border border-white/10 bg-[#1e1e1e]/70 text-gray-300 backdrop-blur-sm hover:bg-[#2d2d2d]'
                    ]">
                        Merchandise
                    </button>
                </div>
            </div>

            <!-- Products Grid Component -->
            <Loading v-if="loading" text="Loading products..." size="md" />
            <ProductsGrid v-else :products="paginatedProducts" :is-mobile="isMobile"
                :active-product-index="activeProductIndex" @view-product="viewProduct" @add-to-cart="addToCart" />

            <!-- Pagination Component -->
            <Pagination v-if="!loading && filteredProducts.length > itemsPerPage" :current-page="currentPage"
                :total-pages="totalPages" @prev="prevPage" @next="nextPage" @goto="gotoPage" />

            <!-- Shopping Cart Sidebar Component -->
            <ShoppingCartSidebar :show="showCart" :items="cart" :total="cartTotal" @close="toggleCart"
                @update-quantity="updateQuantity" @remove="removeFromCart" @checkout="checkout" />

            <!-- Newsletter Component -->
            <Newsletter />
        </div>
    </div>
</template>

<script>
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { PRODUCTS } from '@/constants/products';
import ShoppingCartSidebar from '@/components/Shop/ShoppingCartSidebar.vue';
import ProductsGrid from '@/components/Shop/ProductsGrid.vue';
import Loading from '@/components/Loading.vue';
import Newsletter from '@/components/Newsletter.vue';
import Pagination from '@/components/Pagination.vue';
import CartHeader from '@/components/Shop/CartHeader.vue';
import { useRouter } from 'vue-router';
import { useCart } from '@/hooks/useCart';

export default {
    name: 'Shop',
    components: {
        ShoppingCartIcon,
        ShoppingCartSidebar,
        ProductsGrid,
        Loading,
        Newsletter,
        Pagination,
        CartHeader
    },
    setup() {
        const router = useRouter();
        const { cart, showCart, cartItemsCount, cartTotal, addToCart, removeFromCart, updateQuantity, toggleCart, checkout } = useCart();
        return { router, cart, showCart, cartItemsCount, cartTotal, addToCart, removeFromCart, updateQuantity, toggleCart, checkout };
    },
    data() {
        return {
            activeFilter: 'all',
            isMobile: false,
            activeProductIndex: null,
            products: [],
            loading: true,
            ticking: false,
            currentPage: 1,
            itemsPerPage: 6
        };
    },
    computed: {
        filteredProducts() {
            if (this.activeFilter === 'all') {
                return this.products;
            }
            return this.products.filter(product => product.category === this.activeFilter);
        },
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredProducts.slice(start, end);
        }
    },
    mounted() {
        this.checkIfMobile();
        window.addEventListener('resize', this.checkIfMobile);
        window.addEventListener('scroll', this.handleScroll);
        setTimeout(() => {
            this.products = PRODUCTS;
            this.loading = false;
            this.animateProductCards();
        }, 2000);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkIfMobile);
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        checkIfMobile() {
            this.isMobile = window.innerWidth < 768;
            if (!this.isMobile) {
                this.activeProductIndex = null;
            }
        },
        setActiveFilter(filter) {
            this.activeFilter = filter;
            this.currentPage = 1;
            this.activeProductIndex = null;

            this.$nextTick(() => {
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    card.classList.remove('fadeInUp');
                    void card.offsetWidth;
                });
                setTimeout(() => {
                    this.animateProductCards();
                }, 50);
            });
        },
        viewProduct(product) {
            this.router.push(`/shop/${product.id}`);
        },
        addToCart(product) {
            this.addToCart(product, 1); // Add one item to cart
        },
        handleScroll() {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.animateProductCards();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        },
        animateProductCards() {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach((card, index) => {
                if (this.isInViewport(card)) {
                    setTimeout(() => {
                        card.classList.add('fadeInUp');
                    }, index * 100);
                }
            });
        },
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
                rect.bottom >= 0
            );
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.animateProductCards();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.animateProductCards();
            }
        },
        gotoPage(page) {
            this.currentPage = page;
            this.animateProductCards();
        }
    }
};
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