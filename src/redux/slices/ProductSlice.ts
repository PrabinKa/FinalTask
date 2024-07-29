import {createSlice} from '@reduxjs/toolkit';
import {ProductInterface} from '../../types/ProductTypes';

interface InitialStateTypes {
  productDetails: ProductInterface;
}

const initialState: InitialStateTypes = {
  productDetails: {} as ProductInterface,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});

export const {setProductDetails} = productSlice.actions;

export default productSlice.reducer;
