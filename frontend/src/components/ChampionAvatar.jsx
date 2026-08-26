function ChampionAvatar({ name }) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-20">
      <div
        className="w-14 h-14 rounded-full border-2 border-[#C9A961]/60 flex-shrink-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 4px, #F5EEDA 4px, #F5EEDA 8px)",
        }}
      />
      <span className="text-[#17223A] text-xs font-semibold text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

export default ChampionAvatar;