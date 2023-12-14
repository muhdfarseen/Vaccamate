import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "./App";

const root = document.getElementById("root");

createRoot(root).render(

  <React.StrictMode>
    <App />
  </React.StrictMode>

);



