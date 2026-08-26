import { useEffect, useState } from "react";
import { getProfileIconUrl } from "../services/ddragon";

// O badge acompanha o ícone: num ícone de 40px o pill de 10px do perfil
// ficaria desproporcional. Por isso o tamanho é um preset e não um className
// solto — quem chama não precisa saber a proporção certa.
const SIZES = {
  sm: {
    icon: "h-10 w-10 rounded-lg",
    badge: "-bottom-1.5 px-1.5 text-[9px]",
  },
  lg: {
    icon: "h-20 w-20 rounded-xl",
    badge: "-bottom-2 px-2 py-0.5 text-[10px]",
  },
};

/**
 * Ícone de perfil da Data Dragon com o nível sobreposto na base.
 *
 * Ids de ícone de evento/raros nem sempre existem na versão da DDragon que
 * estamos usando (respondem 403, não 404), então o onError é obrigatório:
 * sem ele o navegador mostra o ícone de imagem quebrada.
 *
 * @param {number} profileIconId id vindo do SUMMONER-V4
 * @param {number} level summonerLevel — omitido esconde o badge
 * @param {"sm"|"lg"} size preset de tamanho
 */
function ProfileIcon({ profileIconId, level, size = "lg" }) {
  const [falhou, setFalhou] = useState(false);
  const src = getProfileIconUrl(profileIconId);
  const estilo = SIZES[size] ?? SIZES.lg;

  // id novo depois de um erro merece nova tentativa
  useEffect(() => {
    setFalhou(false);
  }, [profileIconId]);

  return (
    <div className="relative flex-shrink-0">
      {src && !falhou ? (
        <img
          src={src}
          // decorativo: o nome do invocador já aparece ao lado
          alt=""
          onError={() => setFalhou(true)}
          className={`${estilo.icon} border border-strong object-cover`}
        />
      ) : (
        <div
          className={`${estilo.icon} border border-strong`}
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 4px, #F5EEDA 4px, #F5EEDA 8px)",
          }}
        />
      )}

      {level != null && (
        <span
          className={`${estilo.badge} absolute left-1/2 -translate-x-1/2 rounded-full border border-gold-400/40 bg-[#17223A] font-bold leading-tight text-white`}
        >
          {level}
        </span>
      )}
    </div>
  );
}

export default ProfileIcon;
