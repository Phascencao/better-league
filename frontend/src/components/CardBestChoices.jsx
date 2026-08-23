function CardBestChoices({ title, badge, children }) {
  return (
    <div className="w-full max-w-sm bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-6 py-5">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#C9A961]/30">
        <h2 className="text-[#17223A] text-sm font-bold uppercase tracking-wide">
          {title}
        </h2>
        {badge && (
          <span className="text-[#B8860B] text-xs font-semibold uppercase tracking-wide">
            {badge}
          </span>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
}

export default CardBestChoices;