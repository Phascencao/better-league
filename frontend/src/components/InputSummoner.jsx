import { useState } from "react";

function InputSummoner(props) {
  const [summonerName, setSummonerName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!summonerName.trim()) {
      return alert("Por favor, digite um nome de invocador válido.");
    }

    props.SerchRiotSummoner(summonerName);
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl items-center shadow-xl overflow-hidden rounded-lg border border-strong bg-surface pr-1 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20"
      >
        <input
          type="text"
          placeholder="Digite algo..."
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2 text-sm  outline-none"
        />
        <button
          type="button"
          aria-label="Buscar"
          onClick={(e) => {
            if (!summonerName.trim()) {
              return alert("Por favor, digite um nome de invocador válido.");
            }

            handleSubmit(e);
          }}
          className="rounded px-3 py-1.5 text-sm text-amber-800 hover:bg-amber-50"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default InputSummoner;
