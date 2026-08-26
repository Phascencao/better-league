import { useRef, useState } from "react";
import { searchSummoner } from "../services/summoner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SummonerSelect from "./SummonerSelect";

const STORAGE_KEY = "recentSummoners";
const MAX_RECENT = 5;

function InputSummoner() {
  const [summonerName, setSummonerName] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const regex = /^[a-zA-ZÀ-ÿ0-9]+(?: [a-zA-ZÀ-ÿ0-9]+)*#[a-zA-Z0-9]+$/;

  const summonerNameIsValid = regex.test(summonerName.trim());

  const [recentSummoners, setRecentSummoners] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  function persistRecentSummoners(list) {
    setRecentSummoners(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function addRecentSummoner(summoner) {
    persistRecentSummoners(
      [
        summoner,
        ...recentSummoners.filter(
          (item) => item.name !== summoner.name || item.tag !== summoner.tag,
        ),
      ].slice(0, MAX_RECENT),
    );
  }

  function removeRecentSummoner(summoner) {
    persistRecentSummoners(
      recentSummoners.filter(
        (item) => item.name !== summoner.name || item.tag !== summoner.tag,
      ),
    );
  }

  function goToProfile(name, tag) {
    navigate(`/profile/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
  }

  // Perfil escolhido na lista: já foi buscado antes, vai direto pro perfil
  function handleSelectSummoner(summoner) {
    setSummonerName(`${summoner.name}#${summoner.tag}`);
    setIsSelectOpen(false);
    goToProfile(summoner.name, summoner.tag);
  }

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

      //só entra nos recentes se a busca deu certo.
      //ícone e nível ficam salvos junto pro dropdown não precisar
      //refazer a busca só pra desenhar a lista.
      addRecentSummoner({
        name,
        tag,
        profileIconId: data.summoner?.profileIconId,
        summonerLevel: data.summoner?.summonerLevel,
      });
      setIsSelectOpen(false);
      goToProfile(name, tag);
      console.log("resposta do backend:", data);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível buscar esse invocador.");
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* relative: é a âncora do dropdown de perfis salvos */}
      <div className="relative w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex bg-surface-raised w-full items-center rounded-xl border border-strong bg-surface p-2 shadow-input focus-within:border-gold-700 focus-within:ring-2 focus-within:ring-gold-500/20"
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
            ref={inputRef}
            type="text"
            placeholder="Nome do invocador # TAG"
            value={summonerName}
            onChange={(e) => {
              setSummonerName(e.target.value);
              setIsSelectOpen(true);
            }}
            onFocus={() => setIsSelectOpen(true)}
            role="combobox"
            aria-expanded={isSelectOpen}
            aria-autocomplete="list"
            className="h-11 flex-1 bg-transparent px-3 text-sm text-primary outline-none placeholder:text-muted"
          />

          <button
            type="submit"
            className="rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-gold-900 transition-colors hover:bg-gold-600"
          >
            Buscar
          </button>
        </form>

        <SummonerSelect
          summoners={recentSummoners}
          query={summonerName}
          open={isSelectOpen}
          inputRef={inputRef}
          onSelect={handleSelectSummoner}
          onRemove={removeRecentSummoner}
          onClose={() => setIsSelectOpen(false)}
        />
      </div>

      {recentSummoners.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-xs font-semibold tracking-widest text-gold-700">
            RECENTES
          </span>

          {recentSummoners.map((summoner) => (
            <button
              key={`${summoner.name}#${summoner.tag}`}
              type="button"
              onClick={() =>
                setSummonerName(`${summoner.name}#${summoner.tag}`)
              }
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
