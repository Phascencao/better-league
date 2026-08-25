import { useState } from "react";
import { searchSummoner } from "../services/summoner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function InputSummoner() {
  const [summonerName, setSummonerName] = useState("");
  const navigate = useNavigate();
  
  const regex = /^[a-zA-ZÀ-ÿ0-9]+(?: [a-zA-ZÀ-ÿ0-9]+)*#[a-zA-Z0-9]+$/;
  
  const summonerNameIsValid = regex.test(summonerName.trim());
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    //validação do nome do invocador
    if (!summonerNameIsValid) {
      toast.error("Por favor, digite um nome de invocador válido.");
      return;
    }
    
    const riotId = summonerName.trim();
    
    try {
      const data = await searchSummoner(riotId); //Manda o nome + id para o services/summoner.js que por sua vez manda para o back end
      const [name, tag] = riotId.split("#");
      addRecentSummoner({ name, tag });
      
  
        
        navigate(
        `/profile/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`
        );
        console.log("resposta do backend:", data);
      
      //só entra nos recentes se a busca deu certo
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível buscar esse invocador.");
    }
  }

  const [recentSummoners, setRecentSummoners] = useState(() => {
    const saved = localStorage.getItem("recentSummoners");
    return saved ? JSON.parse(saved) : [];
  });

  function addRecentSummoner(summoner) {
    const updated = [
      summoner,
      ...recentSummoners.filter(
        (item) => item.name !== summoner.name || item.tag !== summoner.tag
      ),
    ].slice(0, 3);
    setRecentSummoners(updated);
    localStorage.setItem("recentSummoners", JSON.stringify(updated)); 
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex bg-surface-raised w-full max-w-3xl items-center rounded-xl border border-strong bg-surface p-2 shadow-input focus-within:border-gold-700 focus-within:ring-2 focus-within:ring-gold-500/20"
      >
        {/* HARDCODED - ALTERAR FUTURAMENTE QUANDO IMPLEMENTAR AS REGIÕES */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-primary"
        >
          BR1
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 text-muted"
          >
            <path d="M5.5 7.5 10 12l4.5-4.5" />
          </svg>
        </button>

        <span aria-hidden className="mx-2 h-7 border-l border-subtle" />

        <input
          type="text"
          placeholder="Nome do invocador # TAG"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          className="h-11 flex-1 bg-transparent px-3 text-sm text-primary outline-none placeholder:text-muted"
        />

        <button
          type="submit"
          className="rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-gold-900 transition-colors hover:bg-gold-600"
        >
          Buscar
        </button>
      </form>
      {recentSummoners.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-xs font-semibold tracking-widest text-gold-700">RECENTES</span>

          {recentSummoners.map((summoner) => (
            <button
              key={`${summoner.name}#${summoner.tag}`}
              type="button"
              onClick={() => setSummonerName(`${summoner.name}#${summoner.tag}`)}
              className="rounded-full border border-gold-200 bg-white/40 px-3 py-1.5 text-xs text-primary transition-colors hover:border-gold-400 hover:bg-white/70"
            >
              {summoner.name}#{summoner.tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputSummoner;
