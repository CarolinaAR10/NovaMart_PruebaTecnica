import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/mobile-tabbar.css";

export default function MobileTabbar() {
  // obtenemos al usuario y la función de logout del contexto
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // estado para saber si el menú de perfil está abierto
  const [open, setOpen] = useState(false);
  // referencia al menú para poder detectar clics fuera
  const menuRef = useRef(null);

  // cierra el menú si se hace clic afuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <nav className="mtb-bar">
      {/* Botón de inicio */}
      <NavLink to="/" end className="mb-item">
        <div className="mb-ico">
          {/* ícono de casita */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
          </svg>
        </div>
        <span className="mb-txt">Home</span>
      </NavLink>

      {/* Botón de categorías */}
      <NavLink to="/categories" className="mb-item">
        <div className="mb-ico">
          {/* ícono de menú */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <span className="mb-txt">Categories</span>
      </NavLink>

      {/* Botón del carrito */}
      <NavLink to="/cart" className="mb-item">
        <div className="mb-ico">
          {/* ícono carrito */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.25 2.25h2.25l1.5 12h12l1.5-9H6" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>
        </div>
        <span className="mb-txt">Cart</span>
      </NavLink>

      {/* Botón perfil con menú desplegable */}
      <div className="mb-profile" ref={menuRef}>
        <button
          type="button"
          className="mb-profile-btn"
          onClick={() => setOpen((v) => !v)} // abre o cierra el menú
        >
          <div className="mb-ico">
            {/* ícono usuario */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" />
            </svg>
          </div>
          <span className="mb-txt">Profile</span>
        </button>

        {/* menú que se abre cuando "open" es true */}
        {open && (
          <div className="mtb-menu">
            {user ? (
              <>
                {/* opciones si el usuario está logueado */}
                <button
                  className="mtb-menu-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                >
                  Profile
                </button>
                <button
                  className="mtb-menu-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/orders");
                  }}
                >
                  Order History
                </button>
                <button
                  className="mtb-menu-item mtb-danger"
                  onClick={async () => {
                    setOpen(false);
                    try {
                      await logout?.(); // cerrar sesión
                    } finally {
                      navigate("/"); // volver al inicio
                    }
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* opciones si no hay usuario */}
                <button
                  className="mtb-menu-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  Login
                </button>
                <button
                  className="mtb-menu-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/register");
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
