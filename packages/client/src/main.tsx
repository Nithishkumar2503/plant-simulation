import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SimulationProvider } from "./store/simulation.store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
        <SimulationProvider>
          <App />
        </SimulationProvider>
  </React.StrictMode>
);
