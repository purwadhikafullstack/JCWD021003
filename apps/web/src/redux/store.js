import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return undefined;
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const store = configureStore({
  reducer: {
    AuthReducer: authReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartFromLocalStorage(),
  },
});

store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
});
