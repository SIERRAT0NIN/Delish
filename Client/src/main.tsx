import React from "react";
import ReactDOM from "react-dom/client";

import RouterApp from "./components/RouterApp.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <NextUIProvider>
        <RouterApp />
      </NextUIProvider>
    </Router>
  </React.StrictMode>
);
