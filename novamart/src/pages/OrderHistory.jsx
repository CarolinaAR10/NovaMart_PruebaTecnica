import React from "react";

export default function OrderHistory() {
  const sample = [
    { id: "ORD-001", date: "2025-08-01", status: "Delivered", total: 120.5, items: 3 },
    { id: "ORD-002", date: "2025-08-10", status: "Shipped", total: 25.0, items: 1 },
  ];
  const badgeColor = s => s==="Delivered" ? "bg-green-100 text-green-800"
                     : s==="Shipped" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800";

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <div className="space-y-4">
        {sample.map(o => (
          <div key={o.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#2E6FF2]">{o.id}</h3>
              <p className="text-sm text-gray-500">{o.date} · {o.items} items</p>
            </div>
            <div className="text-right">
              <div className={`inline-block px-3 py-1 rounded ${badgeColor(o.status)} text-sm`}>{o.status}</div>
              <p className="mt-2 font-semibold">${o.total.toFixed(2)}</p>
              <button className="mt-2 text-sm text-[#2E6FF2]">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
