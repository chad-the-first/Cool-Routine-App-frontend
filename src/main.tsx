import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.Node_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
