import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import hero from "../assets/login.jpg";
import "../styles/login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      setLoading(true);
      await login(form);
      remember
        ? localStorage.setItem("rememberEmail", form.email)
        : localStorage.removeItem("rememberEmail");
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="lgp">
      <div className="lgp__wrap">
        {/* Banner */}
        <section className="lgp__hero">
          <img src={hero} alt="Welcome" className="lgp__hero-img" />
          <div className="lgp__hero-copy">
            <h1>Welcome back</h1>
            <p>Log in to continue on NovaMart</p>
          </div>
        </section>

        {/* Card / Form */}
        <section className="lgp__card">
          <form className="lgp__form" onSubmit={submit}>
            {/* Email */}
            <label className="lgp__label" htmlFor="email">
              Email
            </label>
            <div className="lgp__input">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="lgp__control"
                required
              />
              <span className="lgp__righticon" aria-hidden>
                {/* mail icon */}
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5Z"
                  />
                </svg>
              </span>
            </div>

            {/* Password */}
            <label className="lgp__label" htmlFor="pass">
              Password
            </label>
            <div className="lgp__input">
              <input
                id="pass"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="lgp__control"
                required
              />
              <span className="lgp__righticon" aria-hidden>
                {/* eye icon */}
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
                  />
                </svg>
              </span>
            </div>

            <div className="lgp__row">
              <label className="lgp__check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>

              <button
                type="button"
                className="lgp__link"
                onClick={() => alert("Forgot password flow not implemented")}
              >
                Forgot your password?
              </button>
            </div>

            {err && <div className="lgp__error">{err}</div>}

            <button className="lgp__btn" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>

            <p className="lgp__small">
              Don’t have an account?{" "}
              <Link to="/register" className="lgp__link">
                Sign up
              </Link>
            </p>
          </form>
        </section>
      </div>

      <footer className="lgp__footer">© 2025 NovaMart. All rights reserved.</footer>
    </main>
  );
}
