import React, { createContext, useContext, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart as addToCartAction } from '../redux/reducer/cartReducer';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(addToCartAction(product));
  };

  const contextValue = {
    addToCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
