const tabs = [
  "Tier list",
  "High Elo",
  "Mayhem",
  "Stats",
  "ARAM",
  "Campeões de Arena",
  "Sinergias de Arena",
];

function TierListSubmenu({ activeTab, onChange }) {
  return (
    <div className="flex gap-6 border-b border-[#C9A961]/30 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`text-sm font-semibold uppercase tracking-wide pb-3 whitespace-nowrap border-b-2 transition-colors ${
            activeTab === tab
              ? "text-[#17223A] border-[#C9A961]"
              : "text-[#8A6A1B] border-transparent hover:text-[#17223A]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default TierListSubmenu;