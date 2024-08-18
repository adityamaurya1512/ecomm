import { create } from 'zustand';

interface CartItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  quantity: number;
  email: string;
}

interface CartState {
  items: CartItem[];
  initializeCart: (email: string) => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: number, email: string) => Promise<void>;
  incrementQuantity: (productId: number, email: string) => Promise<void>;
  decrementQuantity: (productId: number, email: string) => Promise<void>;
  isInCart: (productId: number, email: string) => boolean;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  initializeCart: async (email: string) => {
    try {
      const response = await fetch(`/api/cart?email=${email}`);
      if (response.ok) {
        const cartItems: CartItem[] = await response.json();
        set({ items: cartItems });
      }
    } catch (error) {
      console.error('Error initializing cart:', error);
    }
  },

  addToCart: async (item: CartItem) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        set((state: CartState) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId && i.email === item.email
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  },

  removeFromCart: async (productId: number, email: string) => {
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, email }),
      });

      if (response.ok) {
        set((state: CartState) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  },

  incrementQuantity: async (productId: number, email: string) => {
    try {
      const response = await fetch('/api/cart/increment', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, email }),
      });

      if (response.ok) {
        set((state: CartState) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.quantity < item.stock
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      }
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  },

  decrementQuantity: async (productId: number, email: string) => {
    try {
      const response = await fetch('/api/cart/decrement', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, email }),
      });

      if (response.ok) {
        set((state: CartState) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      }
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  },

  isInCart: (productId: number, email: string) => {
    const state = get();
    return state.items.some((item) => item.productId === productId && item.email === email);
  },
}));
