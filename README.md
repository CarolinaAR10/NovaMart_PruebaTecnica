# NovaMart — Prueba Técnica (Frontend)

NovaMart es un **frontend de e-commerce** construido con **React + Vite** que consume la API pública de EscuelaJS. Incluye **listado y búsqueda de productos**, **detalle**, **carrito**, **autenticación básica**, **historial de pedidos (mock)** y **UI responsive** con navbar y **barra inferior móvil**.

> **Nota de veracidad:** este README se basa en los archivos y fragmentos que compartiste (componentes, servicios, estilos y configuración). Si hay archivos adicionales en el repo que no vimos, ajusta el contenido según aplique.

---

## 🧭 Tabla de contenido

- [¿Por qué se creó?](#por-qué-se-creó)
- [Tecnologías](#tecnologías)
- [Arquitectura y carpetas](#arquitectura-y-carpetas)
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Scripts disponibles](#scripts-disponibles)
- [Flujo funcional](#flujo-funcional)
- [API consumida](#api-consumida)
- [Despliegue en Render](#despliegue-en-render)
- [Resolución de problemas comunes](#resolución-de-problemas-comunes)
- [Limitaciones y supuestos](#limitaciones-y-supuestos)
- [Licencia](#licencia)
- [Documento separado del Front (índice sugerido)](#documento-separado-del-front-índice-sugerido)

---

## ¿Por qué se creó?

- **Prueba técnica**: demostrar diseño de componentes, manejo de estado, ruteo, llamadas a API y despliegue.
- **Buenas prácticas**: separación por **pages/components/context/services/styles**, estados de **carga y error**, y **UI responsive**.
- **Rapidez y DX**: Vite para dev/build, React Router para navegación, Axios para cliente HTTP.

---

## Tecnologías

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
</p>

- **React** 19 + **Vite** 7
- **React Router** (rutas SPA)
- **Axios** (HTTP)
- **CSS** modular por páginas/áreas (sin framework pesado)
- **Context API + useReducer/useMemo** (carrito y auth)
- **Node** ≥ 18 (Render usa Node 22 por defecto)

---

## Arquitectura y carpetas

```
novamart/
├─ public/
│  ├─ favicon.ico / logo.png / apple-touch-icon.png  (assets públicos)
│
├─ src/
│  ├─ assets/
│  │  ├─ logo.png
│  │  └─ carrito.png
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ MobileTabbar.jsx
│  │  ├─ ProductCard.jsx
│  │  └─ Pagination.jsx
│  ├─ context/
│  │  ├─ CartContext.jsx
│  │  └─ AuthContext.jsx   (asumido por uso en componentes)
│  ├─ lib/
│  │  └─ format.js         (money, etc.)
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Categories.jsx / CategoriesPage.jsx
│  │  ├─ Search.jsx
│  │  ├─ ProductDetail.jsx
│  │  ├─ Cart.jsx
│  │  ├─ Login.jsx
│  │  ├─ Register.jsx
│  │  ├─ OrderHistory.jsx
│  │  └─ TrackOrder.jsx
│  ├─ services/
│  │  ├─ api.js
│  │  ├─ products.js
│  │  └─ auth.js
│  ├─ styles/
│  │  ├─ home.css
│  │  ├─ categories.css
│  │  ├─ cart.css
│  │  ├─ detail.css
│  │  ├─ orders.css
│  │  ├─ nav.css
│  │  ├─ search.css
│  │  └─ mobile-tabbar.css
│  ├─ App.jsx
│  └─ main.jsx
│
├─ index.html
├─ package.json
└─ .env          (VITE_API_URL)
```

---

## Variables de entorno

Crea un archivo **`.env`** en la raíz del proyecto (ya va incluido en el repo):

```env
VITE_API_URL=https://api.escuelajs.co/api/v1
```

En Vite, las variables que comienzan con `VITE_` se leen con `import.meta.env`.  
Ejemplo (en `src/services/api.js`):

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
```

> En producción (Render, Netlify, Vercel, etc.) define **VITE_API_URL** en el panel de variables de entorno del servicio.

---

## Instalación y ejecución local

1) **Clona** el repo y entra a la carpeta `novamart/` (donde está `package.json`).
2) Instala dependencias:

```bash
npm install
# o
yarn
```

3) Crea `.env` con `VITE_API_URL` (ver sección anterior).

4) **Modo desarrollo**:

```bash
npm run dev
```

5) **Build de producción**:

```bash
npm run build
```

6) **Previsualizar build**:

```bash
npm start
# -> debe usar: vite preview --host 0.0.0.0 --port $PORT
```

---

## Scripts disponibles

- `npm run dev` — servidor de desarrollo Vite.
- `npm run build` — compila a `dist/`.
- `npm start` — previsualiza la build (útil para Web Service en Render).

---

## Flujo funcional

- **Home**: muestra **hero** y “Featured Products” con **skeletons** mientras carga; **paginación** de 15 items por página.
- **Categories**: **filtros por categorías** (mapeadas por `FIGMA_MAP`) y **rango de precio**. Sidebar colapsable en móvil. Paginación.
- **Search**: toma `?q=` de la URL y hace búsqueda **client-side** sobre un pool (`limitPool`) con skeletons/errores.
- **Product Detail**: pide `/products/:id`, calcula **imagen** con `pickImage`, muestra descripción/price/cantidad y **Add to Cart** (usa `CartContext`), categoría y **ratings estáticos**. Relacionados con `relatedById` (si la API lo soporta).
- **Cart**: muestra ítems, subtotal, envío (placeholder) y total; permite **eliminar** ítems; botón **Finalize Purchase** (redirige a `/track`).
- **Auth**: `login()` guarda `access_token` en `localStorage`; `profile()` obtiene datos; `logout()` limpia token.
- **Order History**: datos **mock** con tabs por estado (UI demostrativa).
- **Navbar + MobileTabbar**: navegación principal (superior) y barra inferior en móviles.
- **Estados**: cada página maneja **loading** y **error** (alertas/skeletons).

---

## API consumida

Base: `VITE_API_URL` (p.ej. `https://api.escuelajs.co/api/v1`)

- `GET /products?offset=&limit=` — listado (se normaliza y filtra por imagen válida).
- `GET /products/:id` — detalle (normalizado).
- `GET /products/:id/related` — **si existe** en la API (si no, manejar fallback).
- `GET /categories` — categorías.
- `POST /auth/login` — login (guarda `access_token`).
- `GET /auth/profile` — perfil (requiere token).

---

## Despliegue en Render

### Opción A — **Static Site** (recomendada si es solo frontend)

- **Root Directory**: `novamart`
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`
- **Environment**: define `VITE_API_URL`

> Para SPA, agrega una regla de **rewrite** a `/index.html`:  
> `/*  ->  /index.html` (200)

### Opción B — **Web Service**

- **Root Directory**: `novamart`
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`  
  (usa `vite preview --host 0.0.0.0 --port $PORT`)

---

## Resolución de problemas comunes

- **“Service Root Directory … is missing”**  
  Usa **`novamart`** como Root Directory.
- **“No open ports detected on 0.0.0.0”**  
  Asegúrate que `start` use `vite preview --host 0.0.0.0 --port $PORT`.
- **Favicon no cambia**  
  Pon `public/favicon.ico` o `<link rel="icon" href="/logo.png">`.
- **Rutas SPA dan 404**  
  Agrega rewrite `/* -> /index.html`.

---

## Limitaciones y supuestos

- **`FIGMA_MAP`**: mapeo manual → ids de categoría.
- **Búsqueda**: es **client-side** sobre un **pool limitado** (`limitPool`).
- **Relaciones**: `relatedById` depende de la API.
- **Auth**: token en `localStorage`; se recomienda interceptor en `api.js`.

---

## Licencia

Indica aquí la licencia del proyecto (MIT, Apache-2.0, privada, etc.).

---

## Documento separado del Front (índice sugerido)

1. **Introducción y objetivos de UX**
2. **Arquitectura de componentes**
3. **Páginas y flujos**
4. **Estado y Contextos**
5. **Servicios**
6. **Estilos**
7. **Manejo de errores y carga**
8. **Responsive y mobile-first**
9. **Buenas prácticas y próximos pasos**
