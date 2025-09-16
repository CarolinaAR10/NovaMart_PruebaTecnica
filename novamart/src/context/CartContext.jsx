import React, { createContext, useContext, useMemo, useReducer } from "react";

// creamos el contexto (aquí se guardará el estado del carrito)
const Ctx = createContext(null);

// función reducer que maneja las acciones del carrito
function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      // si el producto ya está en el carrito, se actualiza la cantidad
      const i = state.items.findIndex(x => x.id === action.item.id);
      const items = [...state.items];
      if (i >= 0) {
        items[i] = { ...items[i], qty: (items[i].qty || 1) + (action.item.qty || 1) };
      } else {
        // si no existe, lo agregamos con cantidad inicial
        items.push({ ...action.item, qty: action.item.qty || 1 });
      }
      return { ...state, items };
    }
    case "UPDATE_QTY": {
      // cambia la cantidad de un producto específico
      const items = state.items.map(x =>
        x.id === action.id ? { ...x, qty: action.qty } : x
      );
      return { ...state, items };
    }
    case "REMOVE":
      // elimina un producto por id
      return { ...state, items: state.items.filter(x => x.id !== action.id) };

    case "CLEAR":
      // vacía todo el carrito
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // inicializamos el estado con useReducer
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // helpers para despachar acciones de forma más simple
  const add = (item) => dispatch({ type: "ADD", item });
  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty });
  const remove = (id) => dispatch({ type: "REMOVE", id });
  const clear = () => dispatch({ type: "CLEAR" });

  // calculamos totales usando useMemo para optimizar
  const totals = useMemo(() => {
    const subtotal = state.items.reduce(
      (s, i) => s + Number(i.price) * (i.qty || 1),
      0
    );
    const shipping = state.items.length ? 0 : 0; // aquí puedes meter lógica de envío
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [state.items]);

  // devolvemos el contexto con estado, funciones y totales
  return (
    <Ctx.Provider value={{ ...state, add, updateQty, remove, clear, ...totals }}>
      {children}
    </Ctx.Provider>
  );
}

// hook para usar el carrito en cualquier componente
export const useCart = () => useContext(Ctx);
