import { useState } from "react";
import { searchSummoner } from "../services/summoner";
import { toast } from "sonner";

function InputSummoner() {
  const [summonerName, setSummonerName] = useState("");

  const regex = /^[a-zA-ZÀ-ÿ0-9]+(?: [a-zA-ZÀ-ÿ0-9]+)*#[a-zA-Z0-9]+$/;

  const summonerNameIsValid = regex.test(summonerName.trim());

  async function handleSubmit(e) {
    e.preventDefault();

    if (!summonerNameIsValid) {
      toast.error("Por favor, digite um nome de invocador válido.");
      return;
    }

    const data = await searchSummoner(summonerName);
    console.log("resposta do backend:", data);
  }

  return (
    <div className="flex justify-center">
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
    </div>
  );
}

export default InputSummoner;
