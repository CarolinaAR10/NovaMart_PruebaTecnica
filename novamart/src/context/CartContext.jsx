import React, { createContext, useContext, useMemo, useReducer } from "react";

const Ctx = createContext(null);
function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const i = state.items.findIndex(x => x.id === action.item.id);
      const items = [...state.items];
      if (i >= 0) items[i] = { ...items[i], qty: (items[i].qty||1) + (action.item.qty||1) };
      else items.push({ ...action.item, qty: action.item.qty || 1 });
      return { ...state, items };
    }
    case "UPDATE_QTY": {
      const items = state.items.map(x => x.id === action.id ? { ...x, qty: action.qty } : x);
      return { ...state, items };
    }
    case "REMOVE": return { ...state, items: state.items.filter(x => x.id !== action.id) };
    case "CLEAR": return { ...state, items: [] };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const add = (item) => dispatch({ type: "ADD", item });
  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty });
  const remove = (id) => dispatch({ type: "REMOVE", id });
  const clear = () => dispatch({ type: "CLEAR" });

  const totals = useMemo(() => {
    const subtotal = state.items.reduce((s, i) => s + Number(i.price)*(i.qty||1), 0);
    const shipping = state.items.length ? 0 : 0; // gratis
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [state.items]);

  return <Ctx.Provider value={{ ...state, add, updateQty, remove, clear, ...totals }}>{children}</Ctx.Provider>;
}
export const useCart = () => useContext(Ctx);
