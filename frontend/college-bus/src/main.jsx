import React from "react";
import ReactDOM from "react-dom/client"; // Make sure this is react-dom/client
import App from "./App";
// Tailwind or your CSS
import { BrowserRouter } from "react-router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
