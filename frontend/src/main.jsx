import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./Home.jsx";
import Profile from "./pages/Profile.jsx";
import EmBreve from "./pages/EmBreve.jsx";
import Challenges from "./pages/Challenges.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:gameName/:tagLine" element={<Profile />} />

        {/* SEÇÕES AINDA SEM PÁGINA - trocar pelo componente real quando existir */}
        <Route path="/tier-list" element={<EmBreve secao="Tier list" />} />
        <Route path="/campeoes" element={<EmBreve secao="Campeões" />} />
        <Route path="/ao-vivo" element={<EmBreve secao="Ao vivo" />} />
        <Route path="/ranking" element={<EmBreve secao="Ranking" />} />
        <Route path="/desafios" element={<Challenges />} />

        <Route path="*" element={<Navigate to="/" replace />} />
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
