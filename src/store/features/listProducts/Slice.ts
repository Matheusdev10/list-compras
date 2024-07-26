import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IProduct {
  id: string;
  name: string;
}
export interface IListProducts {
  products: Array<IProduct>;
}

const initialState: IListProducts = {
  products: [],
};

export const listProductsSlice = createSlice({
  name: 'listProducts',
  initialState,
  reducers: {
    setNewProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { setNewProduct, deleteProduct } = listProductsSlice.actions;

export default listProductsSlice.reducer;
