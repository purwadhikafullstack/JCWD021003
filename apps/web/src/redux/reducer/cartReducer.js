import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalCount: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
        const { id, name, price, image } = action.payload;

        const existingItem = state.items.find((item) => item.id === id);
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({
            id,
            name,
            price,
            image,
            quantity: 1,
          });
        }
  
        state.totalCount += 1;

        state.totalPrice = state.items.reduce((total, item) => {
            return total + item.price * item.quantity;
          }, 0);
          localStorage.setItem('cart', JSON.stringify(state));

    },
    removeFromCart: (state, action) => {
        const productIdToRemove = action.payload;
        const removedItem = state.items.find((item) => item.id === productIdToRemove);

      if (removedItem) {
        state.totalCount -= removedItem.quantity;

        state.totalPrice -= removedItem.price * removedItem.quantity;

        state.items = state.items.filter((item) => item.id !== productIdToRemove);
      }
      },
      updateQuantity: (state, action) => {
        const { productId, newQuantity } = action.payload;
        const targetItem = state.items.find((item) => item.id === productId);
  
        if (targetItem) {
          targetItem.quantity = newQuantity || 1;
        }
  
        state.totalCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
        state.totalPrice = state.items.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);

    }
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
