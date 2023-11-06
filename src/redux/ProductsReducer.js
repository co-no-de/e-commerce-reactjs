import { createSlice } from "@reduxjs/toolkit";
import slugify from "../helpers/slugify";

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    visitedProducts: [],
  },
  reducers: {
    storeProducts: (state, action) => {
      state.products = action.payload;  
    },
    addVisitedProducts: (state, action) => {
      const itemPresent = state.visitedProducts.find(
        product => product.id === action.payload.id
      );

      if (!itemPresent) {
        state.visitedProducts.push(action.payload.product);
      }
    },
  },
});

export const { addVisitedProducts, storeProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
