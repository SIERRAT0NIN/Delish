import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./components/Auth/AuthContext.tsx";

import RouterApp from "./components/Route/RouterApp.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "./components/Home/Footer.tsx";
import NavBar from "./components/Home/NavBar.tsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <NextUIProvider>
        <AuthProvider>
          <SnackbarProvider>
            <NavBar />
            <RouterApp />
            <Footer />
          </SnackbarProvider>
        </AuthProvider>
      </NextUIProvider>
    </Router>
  </React.StrictMode>
);
