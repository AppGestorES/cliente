import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <div className="bg-slate-500">hola</div>
    </PrimeReactProvider>
  </React.StrictMode>
);
