import React from "react";

export default function TrackOrder() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Track Order</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="font-medium">Order #12345</p>
        <p className="text-sm text-gray-500">Placed on 2025-09-01</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">✓</div>
            <div><p className="font-medium">Order Placed</p><p className="text-sm text-gray-500">01 Sep 2025</p></div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">📦</div>
            <div><p className="font-medium">Shipped</p><p className="text-sm text-gray-500">03 Sep 2025</p></div>
          </div>
          <div className="flex items-start gap-3 opacity-50">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">🚚</div>
            <div><p className="font-medium">Out for Delivery</p><p className="text-sm text-gray-500">Estimated: 06 Sep 2025</p></div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="px-3 py-2 rounded bg-gray-100">Contact Support</button>
          <button className="px-3 py-2 rounded bg-[#2E6FF2] text-white">Download Invoice</button>
        </div>
      </div>
    </main>
  );
}
