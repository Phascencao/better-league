import Header from "./components/Header";
import CardBestChoices from "./components/CardBestChoices";

function Home() {
  return (
    <div className="min-h-screen w-full bg-base ">
      <Header />

      <h1 className="text-[#17223A] text-2xl font-bold text-center py-20">
        Leia a partida antes de jogá-la
      </h1>

      <div className="flex justify-center">
        <form className="flex w-full max-w-2xl items-center shadow-xl overflow-hidden rounded-lg border border-strong bg-surface pr-1 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20">
          <input
            type="text"
            placeholder="Digite algo..."
            className="flex-1 bg-transparent px-3 py-2 text-sm  outline-none"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="rounded px-3 py-1.5 text-sm text-amber-800 hover:bg-amber-50"
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="flex justify-center">
        <CardBestChoices>teste</CardBestChoices>
        <CardBestChoices>teste</CardBestChoices>
        <CardBestChoices>teste</CardBestChoices>
      </div>
    </div>
  );
}

export default Home;
