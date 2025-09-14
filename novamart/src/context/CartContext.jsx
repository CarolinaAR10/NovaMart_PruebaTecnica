import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + (action.payload.qty || 1) } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map(i => (i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i)),
      };
    case "CLEAR":
      return { items: [] };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}
export function useCart(){ return useContext(CartStateContext); }
export function useCartDispatch(){ return useContext(CartDispatchContext); }
