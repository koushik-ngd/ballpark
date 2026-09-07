import React from "react";
import { createRoot } from "react-dom/client";
import Ballpark from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Ballpark />
  </React.StrictMode>
);
