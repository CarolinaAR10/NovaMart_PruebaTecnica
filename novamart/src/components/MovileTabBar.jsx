// src/components/MobileTabbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/mobile-tabbar.css";

export default function MobileTabbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

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
      {/* Home */}
      <NavLink to="/" end className="mb-item">
        <div className="mb-ico">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
          </svg>
        </div>
        <span className="mb-txt">Home</span>
      </NavLink>

      {/* Categories */}
      <NavLink to="/categories" className="mb-item">
        <div className="mb-ico">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <span className="mb-txt">Categories</span>
      </NavLink>

      {/* Cart */}
      <NavLink to="/cart" className="mb-item">
        <div className="mb-ico">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.25 2.25h2.25l1.5 12h12l1.5-9H6" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>
        </div>
        <span className="mb-txt">Cart</span>
      </NavLink>

      {/* Profile */}
      <div className="mb-profile" ref={menuRef}>
        <button
          type="button"
          className="mb-profile-btn"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="mb-ico">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" />
            </svg>
          </div>
          <span className="mb-txt">Profile</span>
        </button>

        {open && (
          <div className="mtb-menu">
            {user ? (
              <>
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
                      await logout?.();
                    } finally {
                      navigate("/");
                    }
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
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
