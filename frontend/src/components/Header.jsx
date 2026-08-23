import { useState } from "react";
import logo from "../assets/better-league-logo.png";
import ButtonHeader from "./ButtonHeader";

const NAV_ITEMS = ["Início", "Tier list", "Campeões", "Ao vivo", "Ranking"];

function Header() {
  const [activeItem, setActiveItem] = useState("Início");

  return (
    <header className="bg-surface-raised shadow-md border-b border-strong py-4 px-6 flex items-center">
      <h1>
        <img src={logo} alt="logo" style={{ height: 45, width: "auto" }} />
      </h1>

      <nav className="flex items-center gap-8 px-10 mr-auto">
        {NAV_ITEMS.map((item) => (
          <ButtonHeader
            key={item}
            label={item}
            active={activeItem === item}
            onClick={() => setActiveItem(item)}
          />
        ))}
      </nav>

      {activeItem === "Ao vivo" ? <LiveMatchBadge /> : <HeaderControls />}
    </header>
  );
}

//HARDCODED - ALTERAR FUTURAMENTE QUANDO PUXAR DADOS DA PARTIDA AO VIVO PELA API
function LiveMatchBadge() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-strong bg-surface px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-negative">
      <span className="h-2 w-2 rounded-full bg-negative" />
      Em partida · 12:41
    </div>
  );
}


//HARDCODED - ALTERAR FUTURAMENTE QUANDO IMPLEMENTAR O DARK MODE E AS REGIÕES
function HeaderControls() {
  return (
    <div className="flex items-center gap-3">
      <button className="flex bg-gold-50 items-center gap-1.5 rounded-md border border-strong bg-surface px-3 py-1.5 text-sm font-semibold text-primary">
        BR1
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3"
        >
          <path d="M5.5 7.5 10 12l4.5-4.5" />
        </svg>
      </button>

      <button
        aria-label="Alternar tema"
        className="rounded-md border border-strong bg-surface p-2 text-accent"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </button>
    </div>
  );
}

export default Header;
