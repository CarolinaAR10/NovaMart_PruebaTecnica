import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // si no lo tienes, cambia logout por un prop

export default function MobileTabBar() {
  const { user, logout } = useAuth?.() || { user: null, logout: () => {} };
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <nav className="mb-bar md-hidden" aria-label="Primary mobile">
      <NavLink to="/" className="mb-item">
        <span className="mb-ico" aria-hidden>
          {/* home */}
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 10.5l9-7 9 7V20a2 2 0 01-2 2h-4a1 1 0 01-1-1v-5H10v5a1 1 0 01-1 1H5a2 2 0 01-2-2v-9.5z"/></svg>
        </span>
        <span className="mb-txt">Home</span>
      </NavLink>

      <NavLink to="/categories" className="mb-item">
        <span className="mb-ico" aria-hidden>
          {/* categories */}
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h6v6H4V5zm10 0h6v6h-6V5zM4 13h6v6H4v-6zm10 0h6v6h-6v-6z"/></svg>
        </span>
        <span className="mb-txt">Categories</span>
      </NavLink>

      <NavLink to="/cart" className="mb-item">
        <span className="mb-ico" aria-hidden>
          {/* cart */}
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zM6.2 6l.4 2h10.9a1 1 0 01.98 1.2l-1.1 5.5a2 2 0 01-1.96 1.6H9.1a2 2 0 01-1.96-1.6L5.1 5H3a1 1 0 110-2h3.3a1 1 0 01.98.8L7 6h-.8z"/></svg>
        </span>
        <span className="mb-txt">Cart</span>
      </NavLink>

      <div className="mb-item mb-profile" ref={ref}>
        <button className="mb-profile-btn" onClick={() => setOpen(v => !v)} aria-haspopup="menu" aria-expanded={open}>
          <span className="mb-ico" aria-hidden>
            {/* user */}
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0v1H5v-1z"/></svg>
          </span>
          <span className="mb-txt">Profile</span>
        </button>

        {open && (
          <div className="mb-menu" role="menu">
            <span className="mb-menu-item" role="menuitem">Profile (vacío)</span>
            <Link to="/orders" className="mb-menu-item" role="menuitem">Order History</Link>
            <button
              className="mb-menu-item mb-menu-danger"
              onClick={() => { setOpen(false); logout?.(); }}
              role="menuitem"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
