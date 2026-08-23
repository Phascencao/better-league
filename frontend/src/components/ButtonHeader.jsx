function ButtonHeader({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "pb-1 text-sm font-semibold underline-offset-8 transition-colors " +
        (active
          ? "text-primary underline decoration-accent-fill decoration-2"
          : "text-accent hover:text-primary hover:underline")
      }
    >
      {label}
    </button>
  );
}

export default ButtonHeader;
