import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/better-league-logo.png";
import ButtonHeader from "./ButtonHeader";

// O label é o que aparece na tela, o path é a URL. Os dois são coisas
// diferentes: label muda com tradução/copy, path é contrato da aplicação.
const NAV_ITEMS = [
  { label: "Início", path: "/" },
  { label: "Tier list", path: "/tier-list" },
  { label: "Campeões", path: "/campeoes" },
  { label: "Ao vivo", path: "/ao-vivo" },
  { label: "Ranking", path: "/ranking" },
];

const REGIONS = [
  "BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2",
  "ME1", "NA1", "OC1", "RU", "SG2", "TR1", "TW2", "VN2",
];

function Header() {
  const { pathname } = useLocation();
  const isProfilePage = pathname.startsWith("/profile");

  return (
    <header className="bg-surface-raised shadow-md border-b border-strong py-4 px-6 flex items-center">
      <h1>
        <img src={logo} alt="logo" style={{ height: 45, width: "auto" }} />
      </h1>

      <nav className="flex items-center gap-8 px-10 mr-auto">
        {NAV_ITEMS.map((item) => (
          <ButtonHeader
            key={item.path}
            label={item.label}
            path={item.path}
            active={pathname === item.path}
          />
        ))}
      </nav>

      {pathname === "/ao-vivo" ? (
        <LiveMatchBadge />
      ) : isProfilePage ? (
        <SearchBar />
      ) : (
        <HeaderControls />
      )}
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

//HARDCODED - ALTERAR FUTURAMENTE QUANDO IMPLEMENTAR A BUSCA DE INVOCADOR DE VERDADE
function SearchBar() {
  const [region, setRegion] = useState("BR1");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;

    // TODO: quando o back-end existir, validar de verdade o formato "Nome#TAG"
    const [gameName, tagLine] = trimmed.split("#");
    if (gameName && tagLine) {
      navigate(`/profile/${gameName}/${tagLine}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center rounded-md border border-strong bg-surface overflow-hidden"
    >
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="bg-gold-50 text-primary text-sm font-semibold px-3 py-1.5 border-r border-strong focus:outline-none cursor-pointer"
      >
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar invocador"
        className="bg-transparent text-sm text-primary placeholder:text-accent/60 px-3 py-1.5 w-48 focus:outline-none"
      />
    </form>
  );
}

export default Header;