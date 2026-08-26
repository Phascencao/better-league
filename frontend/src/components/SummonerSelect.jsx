import { useEffect, useRef, useState } from "react";
import ProfileIcon from "./ProfileIcon";

/**
 * Lista suspensa com os perfis salvos no localStorage.
 * Renderiza logo abaixo do campo de busca — quem posiciona é o pai,
 * que precisa envolver o form num container `relative`.
 *
 * O componente é só apresentação + navegação: quem guarda e altera a lista
 * continua sendo o InputSummoner.
 *
 * @param {Array<{name: string, tag: string}>} summoners perfis salvos
 * @param {string} query texto atual do input, usado pra filtrar
 * @param {boolean} open se a lista está aberta
 * @param {React.RefObject<HTMLInputElement>} inputRef input que controla a lista
 * @param {Function} onSelect chamado com o perfil escolhido
 * @param {Function} onRemove chamado com o perfil removido da lista
 * @param {Function} onClose pedido de fechamento (Esc, clique fora, seleção)
 */
function SummonerSelect({
  summoners,
  query = "",
  open,
  inputRef,
  onSelect,
  onRemove,
  onClose,
}) {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const term = query.trim().toLowerCase();
  const options = term
    ? summoners.filter((summoner) =>
        `${summoner.name}#${summoner.tag}`.toLowerCase().includes(term),
      )
    : summoners;

  const isVisible = open && options.length > 0;

  // Cada abertura/filtragem recomeça sem item destacado
  useEffect(() => {
    setActiveIndex(-1);
  }, [open, term]);

  // Teclado: o listener mora aqui, mas escuta o input do pai.
  // Assim toda a lógica do combobox fica dentro do componente.
  useEffect(() => {
    const input = inputRef?.current;
    if (!input || !isVisible) return;

    function handleKeyDown(e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((index) => (index + 1) % options.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((index) =>
          index <= 0 ? options.length - 1 : index - 1,
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        // impede o submit do form quando há uma opção destacada
        e.preventDefault();
        onSelect(options[activeIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    }

    input.addEventListener("keydown", handleKeyDown);
    return () => input.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, options, activeIndex, inputRef, onSelect, onClose]);

  // Clique fora fecha — o input não conta como "fora"
  useEffect(() => {
    if (!isVisible) return;

    function handleMouseDown(e) {
      const clicouNaLista = listRef.current?.contains(e.target);
      const clicouNoInput = inputRef?.current?.contains(e.target);
      if (!clicouNaLista && !clicouNoInput) onClose();
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isVisible, inputRef, onClose]);

  if (!isVisible) return null;

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Perfis salvos"
      className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-xl border border-strong bg-surface p-1.5 shadow-input"
    >
      <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-gold-700">
        Perfis salvos
      </p>

      {options.map((summoner, index) => {
        const riotId = `${summoner.name}#${summoner.tag}`;

        return (
          <div
            key={riotId}
            role="option"
            aria-selected={index === activeIndex}
            onMouseEnter={() => setActiveIndex(index)}
            // py-3: o badge de nível invade a base do ícone, precisa de
            // folga embaixo pra não encostar na linha seguinte
            className={
              "group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors " +
              (index === activeIndex ? "bg-surface-raised" : "")
            }
          >
            <button
              type="button"
              onClick={() => onSelect(summoner)}
              className="flex flex-1 items-center gap-3 text-left"
            >
              <ProfileIcon
                profileIconId={summoner.profileIconId}
                level={summoner.summonerLevel}
                size="sm"
              />

              <span className="truncate text-sm text-primary">
                {summoner.name}
                <span className="text-muted">#{summoner.tag}</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => onRemove(summoner)}
              aria-label={`Remover ${riotId} dos perfis salvos`}
              title="Remover"
              className="rounded-md p-1 text-muted opacity-0 transition-opacity hover:text-negative focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-3.5 w-3.5"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SummonerSelect;
