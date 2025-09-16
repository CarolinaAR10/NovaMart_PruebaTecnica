import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Contextos globales (para carrito y autenticación)
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Componentes principales
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import OrderHistory from "./pages/OrderHistory";
import TrackOrder from "./pages/TrackOrder";
import MobileTabbar from "./components/MovileTabBar";

export default function App() {
  return (
    // BrowserRouter envuelve toda la app para manejar rutas (URLs)
    <BrowserRouter>
      {/* AuthProvider maneja sesión de usuario (login/logout, perfil) */}
      <AuthProvider>
        {/* CartProvider maneja el estado global del carrito */}
        <CartProvider>
          {/* Navbar visible en todas las páginas */}
          <Navbar />

          {/* Aquí definimos las rutas de la app */}
          <Routes>
            <Route path="/" element={<Home />} />               {/* Inicio */}
            <Route path="/search" element={<Search />} />       {/* Resultados de búsqueda */}
            <Route path="/product/:id" element={<ProductDetail />} /> {/* Detalle producto */}
            <Route path="/categories" element={<Categories />} /> {/* Categorías */}
            <Route path="/cart" element={<Cart />} />           {/* Carrito */}
            <Route path="/login" element={<Login />} />         {/* Iniciar sesión */}
            <Route path="/register" element={<Register />} />   {/* Crear cuenta */}
            <Route path="/orders" element={<OrderHistory />} /> {/* Historial de pedidos */}
            <Route path="/track" element={<TrackOrder />} />    {/* Seguimiento pedido */}
          </Routes>

          {/* Tab bar móvil (menú inferior en pantallas pequeñas) */}
          <MobileTabbar />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
/*Ta potente esto */