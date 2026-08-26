import RoleIcon from "./RoleIcon";

const roles = ["ALL", "TOP", "JG", "MID", "ADC", "SUP"];

const roleTitles = {
  ALL: "Auto fill",
  TOP: "Topo",
  JG: "Selva",
  MID: "Meio",
  ADC: "Atirador",
  SUP: "Suporte",
};

function RoleFilterButtons({ activeRole, onChange }) {
  return (
    <div className="flex gap-2">
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => onChange(role)}
          title={roleTitles[role]}
          className={`rounded-md p-2.5 border transition-colors ${
            activeRole === role
              ? "bg-[#C9A961] text-[#17223A] border-[#C9A961]"
              : "bg-[#FBF3E1] text-[#8A6A1B] border-[#C9A961]/40 hover:bg-[#F1E3BB]"
          }`}
        >
          <RoleIcon role={role} />
        </button>
      ))}
    </div>
  );
}

export default RoleFilterButtons;