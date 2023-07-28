import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : []
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.product.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity ? action.payload.quantity : 1;
      } else {
        state.items.push({ product: action.payload.product, quantity: action.payload.quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clear: state => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload);
      if (existingItem) {
        existingItem.quantity++;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
  },
});

export const { actions } = cartSlice;
export default cartSlice.reducer;