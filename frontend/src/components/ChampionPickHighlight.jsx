import ChampionPlaceholder from "./ChampionPlaceholder";

function ChampionPickHighlight({
  championName,
  blurb,
  runes,
  summonerSpells,
  buildItems,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-5 pb-6 mb-6 border-b border-[#C9A961]/30">
      <ChampionPlaceholder className="w-full md:w-40 h-40 rounded-lg flex-shrink-0" />

      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A1B] mb-1">
          Escolha principal
        </p>
        <h3 className="font-serif text-[#17223A] text-xl font-bold mb-2">
          {championName}
        </h3>
        <p className="text-[#5B5142] text-sm leading-relaxed mb-4">{blurb}</p>

        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A6A1B] mb-2">
              Runas
            </p>
            <div className="flex gap-2">
              {runes.map((rune) => (
                <div
                  key={rune}
                  title={rune}
                  className="w-8 h-8 rounded-full border border-[#C9A961]/50"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 3px, #F5EEDA 3px, #F5EEDA 6px)",
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A6A1B] mb-2">
              Feitiços de invocador
            </p>
            <div className="flex gap-2">
              {summonerSpells.map((spell) => (
                <div
                  key={spell}
                  title={spell}
                  className="w-8 h-8 rounded-md border border-[#C9A961]/50"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 3px, #F5EEDA 3px, #F5EEDA 6px)",
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A6A1B] mb-2">
              Build
            </p>
            <div className="flex gap-2">
              {buildItems.map((item, i) => (
                <div
                  key={i}
                  title={item}
                  className="w-8 h-8 rounded-md border border-[#C9A961]/50"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 3px, #F5EEDA 3px, #F5EEDA 6px)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChampionPickHighlight;