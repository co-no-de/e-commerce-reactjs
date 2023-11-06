import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    orderPlaced: false
  },
  reducers: {
    addToCart: (state, action) => {
      state.orderPlaced = false;     

      const itemPresent = state.cart.find(
        item => item.id === action.payload.id
      );

      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));

    },
    removeFromCart: (state, action) => {
      const cartWithoutRemovedItem = state.cart.filter(
        item => item.id !== action.payload.id
      );
      state.cart = cartWithoutRemovedItem;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      const itemQuantityToIncrease = state.cart.find(
        item => item.id === action.payload.id
      );
      itemQuantityToIncrease.quantity++;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      const itemQuantityToDecrease = state.cart.find(
        item => item.id === action.payload.id
      );
      if(itemQuantityToDecrease.quantity === 1) {
        itemQuantityToDecrease.quantity = 0;
        const cartWithoutRemovedItem = state.cart.filter(
          item => item.id !== action.payload.id
        );
        state.cart = cartWithoutRemovedItem;
      } else {
        itemQuantityToDecrease.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    emptyCart: state => {
      state.cart = [];
      state.orderPlaced = true
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    getCartFromStorage: (state, action) => {
      state.cart = action.payload
    }
  },
});


export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity, emptyCart, getCartFromStorage} = CartSlice.actions;

export default CartSlice.reducer;