import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// importa TU CSS base si lo tienes:
import "./index.css";
// importa la compatibilidad de utilidades:
import "./styles/compat.css";
import "./styles/theme.css";
import "./styles/components.css";
import "./styles/pagination.css";
import "./styles/mobile-tabbar.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
