// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/register.css"; // ⬅️ estilos separados

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://i.pravatar.cc/150",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      setLoading(true);
      await api.post("/users", form);
      navigate("/login"); // redirige a Sign in
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="reg-page">
      <div className="reg-wrap">
        {/* Encabezado como en Figma */}
        <header className="reg-head">
          <h1 className="reg-title">Create Your Account</h1>
          <p className="reg-subtitle">Join NovaMart and start shopping today!</p>
        </header>

        {/* Card / Form */}
        <section className="reg-card">
          <form onSubmit={submit} className="reg-form">
            {/* Name */}
            <div className="reg-field">
              <label htmlFor="name" className="reg-label">Name</label>
              <div className="reg-input">
                <input
                  id="name"
                  type="text"
                  placeholder="Your  Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="reg-input__control"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="reg-field">
              <label htmlFor="email" className="reg-label">Email</label>
              <div className="reg-input">
                <input
                  id="email"
                  type="email"
                  placeholder="Your  Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="reg-input__control"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="reg-field">
              <label htmlFor="password" className="reg-label">Password</label>
              <div className="reg-input">
                <input
                  id="password"
                  type="password"
                  placeholder="Your  Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="reg-input__control"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {err && <div className="reg-error">{err}</div>}

            <button
              type="submit"
              disabled={loading}
              className="reg-btn"
            >
              {loading ? "Creating…" : "Create Account"}
            </button>

            <p className="reg-small">
              Already have an account?{" "}
              <Link to="/login" className="reg-link">Sign in</Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
