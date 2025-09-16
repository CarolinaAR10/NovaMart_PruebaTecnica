import React from "react";

export default function Pagination({ page, pages, onChange }) {
  if (!pages || pages <= 1) return null;

  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;
  if (end > pages) {
    end = pages;
    start = Math.max(1, end - windowSize + 1);
  }
  const numbers = [];
  for (let n = start; n <= end; n++) numbers.push(n);

  return (
    <nav className="nm-pg" aria-label="Pagination">
      <button
        type="button"
        className="nm-pg-arrow"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Anterior"
      >
        <svg viewBox="0 0 24 24" className="nm-pg-ico" aria-hidden="true">
          <path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {numbers.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`nm-pg-btn ${page === n ? "active" : ""}`}
          aria-current={page === n ? "page" : undefined}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        className="nm-pg-arrow"
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        aria-label="Siguiente"
      >
        <svg viewBox="0 0 24 24" className="nm-pg-ico" aria-hidden="true">
          <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </nav>
  );
}