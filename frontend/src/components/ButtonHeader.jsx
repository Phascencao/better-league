import { useNavigate } from "react-router-dom";

function ButtonHeader({ label, active, onClick }) {
const navigation = useNavigate();
const onNavigationButton = (label) => {
    navigation(`/${label}`);
}
  return (
    <button
      onClick={() => onNavigationButton(label)}
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
