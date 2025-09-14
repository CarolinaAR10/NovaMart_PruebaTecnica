import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e){ e.preventDefault(); alert("Login simulated: " + email); }

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-2">Bienvenido de vuelta</h1>
        <p className="text-gray-500 mb-4">Inicia sesión para continuar en NovaMart</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-sm">Correo electrónico</label>
            <input className="w-full border px-3 py-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div><label className="text-sm">Contraseña</label>
            <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={e=>setPassword(e.target.value)} /></div>
          <div className="flex items-center justify-between text-sm">
            <label><input type="checkbox" className="mr-2" />Recuérdame</label>
            <a className="text-[#2E6FF2]">¿Olvidaste tu contraseña?</a>
          </div>
          <button className="w-full bg-[#2E6FF2] text-white py-2 rounded">Iniciar Sesión</button>
        </form>
        <p className="text-center text-sm mt-4">¿No tienes una cuenta? <a className="text-[#2E6FF2]" href="/register">Regístrate</a></p>
      </div>
    </main>
  );
}
