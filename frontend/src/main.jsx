import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:gameName/:tagLine" element={<Profile />} />
      </Routes>
    </BrowserRouter>

    <Toaster
      position="top-right"
      duration={3000}
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!bg-gold-100 !text-primary !border-gold-600 !shadow-input font-sans",
        },
      }}
    />
  </StrictMode>,
);