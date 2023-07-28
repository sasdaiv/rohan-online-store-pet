import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

type Products = {
  products: Product[];
  error: string;
}

const initialState: Products = {
  products: [],
  error: "",
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    }
  }
})

export default productsSlice.reducer;
export const { actions } = productsSlice;