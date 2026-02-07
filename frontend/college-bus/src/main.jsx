import React from "react";
import ReactDOM from "react-dom/client"; // Make sure this is react-dom/client
import App from "./App";
import "./index.css"
// Tailwind or your CSS
import { BrowserRouter } from "react-router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
