import { useNavigate } from "react-router-dom";

function ButtonHeader({ label, path, active }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
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
