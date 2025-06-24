import { reactive, computed } from "vue";
import type { Product } from "@/interfaces/product";

interface CartItem extends Product {
  quantity: number;
}

const cartState = reactive({
  cart: [] as CartItem[],
  showCart: false,
});

export function useCart() {
  const cartItemsCount = computed<number>(() => {
    return cartState.cart.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed<number>(() => {
    return cartState.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  function addToCart(product: Product, quantity: number = 1): void {
    const existingItem = cartState.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartState.cart.push({ ...product, quantity });
    }
  }

  function removeFromCart(productId: number): void {
    cartState.cart = cartState.cart.filter((item) => item.id !== productId);
  }

  function updateQuantity({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }): void {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const item = cartState.cart.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
    }
  }

  function toggleCart(): void {
    cartState.showCart = !cartState.showCart;
  }

  function checkout(): void {
    alert(`Proceeding to checkout with total: $${cartTotal.value.toFixed(2)}`);
    cartState.cart = [];
    cartState.showCart = false;
  }

  return {
    cart: cartState.cart,
    showCart: computed(() => cartState.showCart),
    cartItemsCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    checkout,
  };
}
