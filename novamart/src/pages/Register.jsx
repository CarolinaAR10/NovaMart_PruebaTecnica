import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e){ e.preventDefault(); alert("Register simulated: " + name); }

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-2">Create Your Account</h1>
        <p className="text-gray-500 mb-4">Join NovaMart and start shopping today!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-[#2E6FF2] text-white py-2 rounded">Create Account</button>
        </form>
        <p className="text-center text-sm mt-4">Already have an account? <a className="text-[#2E6FF2]" href="/login">Sign in</a></p>
      </div>
    </main>
  );
}
