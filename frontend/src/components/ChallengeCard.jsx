function ChallengeCard({ title, subtitle, objectives, reward, onActivate }) {
  return (
    <div className="group relative">
      {/* Card base: imagem de fundo (hachura por enquanto) */}
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden border border-[#C9A961]/50 cursor-pointer transition-transform duration-300 ease-out group-hover:scale-110 group-hover:z-30 group-hover:shadow-xl"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 6px, #F5EEDA 6px, #F5EEDA 12px)",
        }}
      >
        {/* Gradiente escuro na base pra o texto ficar legível sobre a imagem */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17223A]/80 via-[#17223A]/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-3 py-3 text-center">
          <p className="text-white text-sm font-bold leading-tight">
            {title}
          </p>
          <p className="text-white/70 text-[10px] uppercase tracking-wide mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Painel expandido: só aparece no hover, sobrepõe os cards abaixo */}
      <div className="absolute left-0 right-0 top-full mt-1 bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-4 py-4 opacity-0 scale-95 pointer-events-none origin-top transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-40 shadow-xl">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A6A1B] mb-2">
          Objetivos
        </p>
        <ul className="mb-3 space-y-1">
          {objectives.map((obj) => (
            <li key={obj} className="text-xs text-[#17223A] flex gap-1.5">
              <span className="text-[#C9A961]">•</span>
              {obj}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase text-[#8A6A1B]">
            Recompensa
          </span>
          <span className="text-xs font-bold text-[#17223A]">{reward}</span>
        </div>

        <button
          onClick={onActivate}
          className="w-full bg-[#C9A961] text-[#17223A] text-xs font-bold uppercase tracking-wide rounded-md py-2 hover:opacity-90 transition-opacity"
        >
          Ativar desafio
        </button>
      </div>
    </div>
  );
}

export default ChallengeCard;