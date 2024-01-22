import React from "react";
import ReactDOM from "react-dom/client";
import { ScrollShadow } from "@nextui-org/react";

import RouterApp from "./components/RouterApp.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <NextUIProvider>
        <ScrollShadow className="w-[100%] h-[30%]">
          <RouterApp />
        </ScrollShadow>
      </NextUIProvider>
    </Router>
  </React.StrictMode>
);
