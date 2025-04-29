import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cartItems");
    if (serializedCart === null) return undefined;
    return { cartItems: JSON.parse(serializedCart) };
  } catch (e) {
    console.warn("Could not load cart from storage", e);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartFromStorage() || { cartItems: [] },
  },
});

// Save cart to localStorage whenever it changes
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
  } catch (e) {
    console.warn("Could not save cart to storage", e);
  }
});

export default store;
