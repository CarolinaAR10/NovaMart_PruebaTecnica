import React from "react";

export default function Pagination({ page, pages, onChange }) {
  // si no hay páginas o solo hay una, no mostramos nada
  if (!pages || pages <= 1) return null;

  // cuántos números de página se van a mostrar a la vez
  const windowSize = 5;

  // calculamos desde qué número hasta qué número mostrar
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;

  // si el final se pasa del total de páginas, lo ajustamos
  if (end > pages) {
    end = pages;
    start = Math.max(1, end - windowSize + 1);
  }

  // guardamos los números en un array
  const numbers = [];
  for (let n = start; n <= end; n++) numbers.push(n);

  return (
    <nav className="nm-pg" aria-label="Pagination">
      {/* botón anterior */}
      <button
        type="button"
        className="nm-pg-arrow"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1} // desactivado si estamos en la primera página
        aria-label="Anterior"
      >
        <svg viewBox="0 0 24 24" className="nm-pg-ico" aria-hidden="true">
          <path
            d="M15 19l-7-7 7-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* botones con los números de página */}
      {numbers.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)} // cambia a la página seleccionada
          className={`nm-pg-btn ${page === n ? "active" : ""}`} // activa si es la página actual
          aria-current={page === n ? "page" : undefined}
        >
          {n}
        </button>
      ))}

      {/* botón siguiente */}
      <button
        type="button"
        className="nm-pg-arrow"
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages} // desactivado si estamos en la última página
        aria-label="Siguiente"
      >
        <svg viewBox="0 0 24 24" className="nm-pg-ico" aria-hidden="true">
          <path
            d="M9 5l7 7-7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
}
