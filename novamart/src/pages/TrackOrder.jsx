import React from "react";
import { useParams } from "react-router-dom";
import "../styles/track.css";
import paquete from "../assets/paquete.png";

/* --------- Icons --------- */
const Icon = {
  placed: (
    <svg className="to-ico" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm4.3 8.3l-5 5a1 1 0 01-1.4 0l-2-2a1 1 0 111.4-1.4l1.3 1.3 4.3-4.3a1 1 0 111.4 1.4z" />
    </svg>
  ),
  processing: (
    <svg className="to-ico" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 5v5a1 1 0 01-.553.894l-4 2A1 1 0 116.553 13.3L11 11.528V7a1 1 0 012 0z" />
    </svg>
  ),
  shipped: (
    <svg className="to-ico" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 7a1 1 0 011-1h11a1 1 0 01.894.553l3 6A1 1 0 0118 14H7a1 1 0 01-1-1V8H4a1 1 0 01-1-1zm3 9a2 2 0 114 0 2 2 0 01-4 0zm10 0a2 2 0 114 0 2 2 0 01-4 0z" />
    </svg>
  ),
  out: (
    <svg className="to-ico" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12a1 1 0 011-1h9.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 13H4a1 1 0 01-1-1z" />
    </svg>
  ),
  delivered: (
    <svg className="to-ico" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22a10 10 0 1110-10 10.011 10.011 0 01-10 10zm4.3-12.7a1 1 0 00-1.4-1.4L11 11.8l-1.9-1.9a1 1 0 10-1.4 1.4l2.6 2.6a1 1 0 001.4 0l5.6-5.6z" />
    </svg>
  ),
};

/* --------- Timeline steps --------- */
const steps = [
  { key: "placed",     title: "Order Placed",     date: "July 15, 2024, 10:00 AM", dot: "to-dot--green",  text: "to-text--green",  icon: Icon.placed },
  { key: "processing", title: "Processing",       date: "July 15, 2024, 2:00 PM",  dot: "to-dot--gray",   text: "to-text--dark",   icon: Icon.processing },
  { key: "shipped",    title: "Shipped",          date: "July 16, 2024, 10:00 AM", dot: "to-dot--blue",   text: "to-text--dark",   icon: Icon.shipped },
  { key: "out",        title: "Out for Delivery", date: "July 17, 2024, 9:00 AM",  dot: "to-dot--amber",  text: "to-text--dark",   icon: Icon.out },
  { key: "delivered",  title: "Delivered",        date: "July 17, 2024, 1:00 PM",  dot: "to-dot--gray",   text: "to-text--dark",   icon: Icon.delivered },
];

/* --------- Mock order (puedes traerlo por id) --------- */
const orderData = {
  id: 54321,
  purchaseDate: "July 15, 2024",
  shippingAddress: "123 Maple Street, Anytown, USA",
  totalPaid: 150.0,
  photo: paquete,
  photoCaption: "Order placed successfully, photo attached",
  items: [
    { name: "Minimalist Desk Lamp", price: 50, qty: 2 },
    { name: "Geometric Wall Art", price: 25, qty: 2 },
  ],
};

export default function TrackOrder() {
  const { id } = useParams();
  const ord = orderData;

  return (
    <main className="to-page">
      <div className="to-container">
        <h1 className="to-h1">Track Order</h1>

        {/* Header meta */}
        <div className="to-meta">
          <p className="to-meta-id">Order #{id ?? ord.id}</p>
          <p className="to-meta-line">
            Purchase Date: <span>{ord.purchaseDate}</span> | Shipping Address:{" "}
            <span>{ord.shippingAddress}</span> | Total Paid:{" "}
            <span>${ord.totalPaid.toFixed(2)}</span>
          </p>
        </div>

        {/* Grid */}
        <div className="to-grid">
          {/* left: timeline + items */}
          <section>
            <ol className="to-timeline">
              {steps.map((s) => (
                <li key={s.key} className="to-step">
                  <span className={`to-dot ${s.dot}`} aria-hidden>
                    {s.icon}
                  </span>
                  <p className={`to-step-title ${s.text}`}>{s.title}</p>
                  <p className="to-step-date">{s.date}</p>
                </li>
              ))}
            </ol>

            {/* Products */}
            <div className="to-products">
              <h2 className="to-h2">Products in Order</h2>
              <ul className="to-products-list">
                {ord.items.map((it, i) => (
                  <li key={i} className="to-prod">
                    <p className="to-prod-name">{it.name}</p>
                    <p className="to-prod-sub">${it.price.toFixed(2)} × {it.qty}</p>
                  </li>
                ))}
              </ul>

              <div className="to-actions">
                <button className="to-btn to-btn--ghost">Contact Support</button>
                <button className="to-btn to-btn--primary">Download Invoice</button>
              </div>
            </div>
          </section>

          {/* right: card with image */}
          <aside className="to-card">
            <img src={ord.photo} alt="Proof of delivery" className="to-card-img" loading="lazy" />
            <div className="to-card-body">
              <p className="to-card-text">{ord.photoCaption}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
