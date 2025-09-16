import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"; // ⬅️ useLocation
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import carro from "../assets/carrito.png";
import "../styles/nav.css";

const NavA = ({ to, children }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
    {children}
  </NavLink>
);

export default function Navbar() {
  const { items } = useCart() || { items: [] };
  const count = items.reduce((s, i) => s + (i.qty || 1), 0);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();                    // ⬅️ ruta actual
  const hideUI = ["/login", "/register"].includes(location.pathname); // ⬅️ ocultar en auth

  const [query, setQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  // dropdown
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <header className="nm-header">
      <div className="nm-container nm-nav">
        {/* IZQUIERDA: logo + links */}
        <div className="nm-left">
          <Link to="/" className="nm-brand">
            <img src={logo} alt="NovaMart" className="nm-logo" />
            <span className="nm-brand-text">NovaMart</span>
          </Link>

          {!hideUI && (
            <nav className="nm-links">
              <NavA to="/">Products</NavA>
              <NavA to="/categories">Categories</NavA>
              {user && <NavA to="/orders">Order History</NavA>}
              <NavA to="/contact">Contact</NavA>
            </nav>
          )}
        </div>

        {/* CENTRO: buscador */}
        {!hideUI && (
          <form onSubmit={onSubmit} className="nm-center">
            <div className="nm-search">
              <span className="nm-search-ico" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="nm-search-input"
              />
            </div>
          </form>
        )}

        {/* DERECHA: favoritos, carrito, user o auth CTAs */}
        {!hideUI && (
          <div className="nm-right">
            {user && (
              <button type="button" className="nm-icon-btn" aria-label="Favorites">
                <svg viewBox="0 0 24 24" className="nm-icon" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.04 4 9.54 4.81 10.4 6.09 11.26 4.81 12.76 4 14.3 4 16.8 4 18.8 6 18.8 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            )}

            <Link to="/cart" className="nm-cart">
              <span className="nm-icon-btn">
                <img src={carro} alt="Cart" className="nm-cart-ico" />
              </span>
              {count > 0 && <span className="nm-badge">{count}</span>}
            </Link>

            {user ? (
              <div className="nm-user" ref={ref}>
                <button
                  type="button"
                  className="nm-user-chip"
                  onClick={() => setOpen((v) => !v)}
                >
                  <img
                    src={user.avatar || `https://i.pravatar.cc/64?u=${user.email}`}
                    alt={user.name || "User"}
                    className="nm-avatar"
                  />
                  <svg className="nm-chev" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.11l3.71-3.88a.75.75 0 111.08 1.04l-4.25 4.45a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>

                {open && (
                  <div className="nm-menu">
                    <NavLink
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="nm-menu-item"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      onClick={() => setOpen(false)}
                      className="nm-menu-item"
                    >
                      My Orders
                    </NavLink>
                    <button
                      className="nm-menu-item nm-menu-danger"
                      onClick={() => {
                        setOpen(false);
                        logout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/register" className="nm-cta nm-cta-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="nm-cta nm-cta-ghost">
                  Log In
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
