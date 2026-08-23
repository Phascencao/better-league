import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import Home from "./Home.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Home />

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
