import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";

// pestañas disponibles
const TABS = ["All", "Processing", "Shipped", "Delivered", "Returns"];

// lista simulada de pedidos
const ORDERS = [
  { id: "ORD-1001", date: "2025-07-15", status: "Delivered", productName: "Aromatherapy Essential Oil", image: "https://i.imgur.com/1twoaDy.jpeg" },
  { id: "ORD-1002", date: "2025-07-15", status: "Delivered", productName: "Organic Turmeric Powder", image: "https://i.imgur.com/ZKGofuB.jpeg" },
  { id: "ORD-1003", date: "2025-07-15", status: "Delivered", productName: "Mini Supplement Bottle", image: "https://i.imgur.com/9DqEOV5.jpeg" },
  { id: "ORD-1004", date: "2025-07-12", status: "Shipped", productName: "Wireless Earbuds", image: "https://i.imgur.com/BG8J0Fj.jpg" },
  { id: "ORD-1005", date: "2025-07-10", status: "Processing", productName: "Hydrating Face Serum", image: "https://i.imgur.com/SolkFEB.jpeg" },
  { id: "ORD-1006", date: "2025-07-01", status: "Returns", productName: "Travel Skincare Set", image: "https://i.imgur.com/Ex5x3IU.jpg" },
];

// formatea fecha en formato largo (ej: July 15, 2025)
const fmtDateLong = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

// utilidad para juntar clases condicionales
const cx = (...cls) => cls.filter(Boolean).join(" ");

export default function OrderHistory() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All");

  // filtra órdenes según la pestaña seleccionada
  const list = useMemo(() => {
    if (tab === "All") return ORDERS;
    return ORDERS.filter((o) => o.status === tab);
  }, [tab]);

  return (
    <main className="oh-page">
      <div className="oh-container">

        {/* Tabs */}
        <div className="oh-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cx("oh-tab", tab === t && "is-active")}
            >
              {t}
              {tab === t && <span className="oh-tab-underline" />}
            </button>
          ))}
        </div>

        {/* Lista de órdenes */}
        <div className="oh-list">
          {list.map((o) => (
            <article key={o.id} className="oh-item">
              {/* cosas de la izquierda */}
              <div className="oh-left">
                {/* texto según el estado */}
                <p className="oh-kicker">
                  {o.status === "Delivered"
                    ? `Delivered on ${fmtDateLong(o.date)}`
                    : o.status === "Shipped"
                      ? `Shipped on ${fmtDateLong(o.date)}`
                      : o.status === "Processing"
                        ? `Processing since ${fmtDateLong(o.date)}`
                        : o.status === "Returns"
                          ? `Return started on ${fmtDateLong(o.date)}`
                          : fmtDateLong(o.date)}
                </p>

                {/* link a detalles */}
                <button
                  onClick={() => navigate("/track")}
                  className="oh-link"
                >
                  View Order Details
                  <svg className="oh-link-ico" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <p className="oh-meta">Product Name</p>

                {/* botón para trackear */}
                <button
                  onClick={() => navigate("/track")}
                  className="oh-cta"
                >
                  Track Order
                  <svg className="oh-cta-ico" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 7a1 1 0 011-1h11a1 1 0 01.894.553l3 6A1 1 0 0118 14H7a1 1 0 01-1-1V8H4a1 1 0 01-1-1zm3 9a2 2 0 114 0 2 2 0 01-4 0zm10 0a2 2 0 114 0 2 2 0 01-4 0z" />
                  </svg>
                </button>
              </div>

              {/* las cosas de la derecha */}
              <div className="oh-right">
                <img src={o.image} alt={o.productName} className="oh-img" loading="lazy" />
              </div>
            </article>
          ))}

          {/* mensaje si no hay órdenes */}
          {list.length === 0 && (
            <p className="oh-empty">No orders found for this filter.</p>
          )}
        </div>
      </div>
    </main>
  );
}
