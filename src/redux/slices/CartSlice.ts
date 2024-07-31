import {createSlice} from '@reduxjs/toolkit';
import {ProductInterface, ProductWithQuantity} from '../../types/ProductTypes';

interface InitialStateTypes {
  cartProducts: ProductWithQuantity[];
  error: string | null;
}

const initialState: InitialStateTypes = {
  cartProducts: [],
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    increaseQuantity: (state, action) => {
      const product = state.cartProducts;
      const selectedProduct = action.payload;

      product.forEach(item => {
        if (item.minimumOrderQuantity >= item.quantity + 1 && item.stock >= 1) {
          if (item.id === selectedProduct.id) {
            item.quantity++;
            item.stock--;
          }
        } else {
          state.error = 'Limit you can order for this product has reached!';
        }
      });
    },
    decreaseQuantity: (state, action) => {
      const product = state.cartProducts;
      const selectedProduct = action.payload;

      product.forEach(item => {
        if (item.id === selectedProduct.id && item.quantity >= 2) {
          item.quantity--;
          item.stock++;
        }
      });
    },
    removeProductFromCart: (state, action) => {
      const product = state.cartProducts;
      const selectedProduct = action.payload;

      const filteredProducts = product.filter(item => {
        return item.id !== selectedProduct.id;
      });

      state.cartProducts = filteredProducts;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
