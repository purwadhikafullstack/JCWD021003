import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";

export const store = configureStore({
  reducer: {
    AuthReducer: authReducer,
    cart: cartReducer,
  },
});
