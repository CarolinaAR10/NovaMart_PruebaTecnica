// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/register.css"; // ⬅️ estilos separados

export default function Register() {
  const navigate = useNavigate();

  // estado del formulario
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://i.pravatar.cc/150", // avatar por defecto
  });
  // control de carga y error
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // envía el formulario al backend
  const submit = async (e) => {
    e.preventDefault(); // evita recarga de página
    try {
      setErr("");
      setLoading(true);
      await api.post("/users", form); // crea el usuario
      navigate("/login"); // redirige a Sign in
    } catch (e) {
      // muestra mensaje de error del backend o uno genérico
      setErr(e?.response?.data?.message || e.message || "Error al registrar");
    } finally {
      setLoading(false); // quita el estado de carga
    }
  };

  return (
    <main className="reg-page">
      <div className="reg-wrap">
        {/* Encabezado como en el figma que hiceeee */}
        <header className="reg-head">
          <h1 className="reg-title">Create Your Account</h1>
          <p className="reg-subtitle">Join NovaMart and start shopping today!</p>
        </header>

        {/* Card*/}
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
                  onChange={(e) => setForm({ ...form, name: e.target.value })} // actualiza estado
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
                  onChange={(e) => setForm({ ...form, email: e.target.value })} // actualiza estado
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
                  onChange={(e) => setForm({ ...form, password: e.target.value })} // actualiza estado
                  className="reg-input__control"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* mensaje de error si algo falla */}
            {err && <div className="reg-error">{err}</div>}

            {/* botón de enviar: cambia texto si está cargando */}
            <button
              type="submit"
              disabled={loading}
              className="reg-btn"
            >
              {loading ? "Creating…" : "Create Account"}
            </button>

            {/* link para ir a iniciar sesión si ya tiene cuenta */}
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
