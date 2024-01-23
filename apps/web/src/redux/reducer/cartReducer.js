import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.totalCount += 1;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
