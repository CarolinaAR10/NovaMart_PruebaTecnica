# Novamart – Build sin Tailwind

Este proyecto fue adaptado para no depender de Tailwind. Se añadieron:

- `src/styles/theme.css` (tokens / variables / base)
- `src/styles/components.css` (componentes: navbar, buscador, botones, cards, grid, sidebar, badges)
- Se importan estos estilos desde `src/main.jsx`.
- Se limpiaron referencias a `@tailwind` y `@import "tailwindcss"` en CSS.

## ¿Qué clases usar?
- Botones: `btn`, `btn--primary`, `btn--outline`, `btn--ghost`
- Inputs: `input`
- Tarjetas: `card`, `card--hover`, `product-card__img`, `product-card__title`, `product-card__price`
- Grid productos: `products`
- Paginación: `pagination` (+ `is-active` en el botón actual)
- Navbar: `navbar`, `navbar__inner`, `navbar__brand`, `navbar__title`, `navbar__menu`, `navbar__link`, `navbar__link--active`
- Buscador: `search`, `search__icon`, `search__input`
- Sidebar categorías: `sidebar`, `group`, `check`
- Badges: `badge`, `badge--green`, `badge--blue`, `badge--yellow`

## Pasos si falla un import de Tailwind
- Verifica que **no** existan líneas `@tailwind` o `@import "tailwindcss"` en tus `.css`.
- Asegúrate de **no tener** `postcss.config.*` con Tailwind.
