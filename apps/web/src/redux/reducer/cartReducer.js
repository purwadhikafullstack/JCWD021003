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

        // Check if the item is already in the cart
        const existingItem = state.items.find((item) => item.id === id);
  
        if (existingItem) {
          // If it exists, just increase the quantity
          existingItem.quantity += 1;
        } else {
          // If it doesn't exist, add a new item with initial quantity 1
          state.items.push({
            id,
            name,
            price,
            image,
            quantity: 1,
          });
        }
  
        // Update total count
        state.totalCount += 1;

        state.totalPrice = state.items.reduce((total, item) => {
            return total + item.price * item.quantity;
          }, 0);
    },
    removeFromCart: (state, action) => {
        const productIdToRemove = action.payload;
        const removedItem = state.items.find((item) => item.id === productIdToRemove);

      if (removedItem) {
        // Decrement the totalCount by the quantity of the removed item
        state.totalCount -= removedItem.quantity;

        state.totalPrice -= removedItem.price * removedItem.quantity;

        // Remove the item from the cart
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
