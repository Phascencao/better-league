const positionIconMap = {
  ALL: "icon-position-fill.png",
  TOP: "icon-position-top.png",
  JG: "icon-position-jungle.png",
  MID: "icon-position-middle.png",
  ADC: "icon-position-bottom.png",
  SUP: "icon-position-utility.png",
};

const BASE_URL =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/";

function RoleIcon({ role, className = "h-4 w-4" }) {
  const fileName = positionIconMap[role];
  const iconUrl = `${BASE_URL}${fileName}`;

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${iconUrl})`,
        maskImage: `url(${iconUrl})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export default RoleIcon;