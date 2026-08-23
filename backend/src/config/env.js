// Único lugar que lê process.env. O resto do código importa daqui.
// Assim, se uma variável mudar de nome, você conserta em um arquivo só.

export const env = {
  port: Number(process.env.PORT ?? 3333),
  riotApiKey: process.env.RIOT_API_KEY ?? "",
  riotRegion: process.env.RIOT_REGION ?? "americas",
  corsOrigin: process.env.CORS_ORIGIN ?? "*",
};

// Aviso na subida em vez de derrubar o servidor: assim /health e as rotas
// que não dependem da Riot continuam funcionando enquanto você configura.
if (!env.riotApiKey) {
  console.warn(
    "\n[AVISO] RIOT_API_KEY não configurada em backend/.env" +
      "\n        Pegue uma chave em https://developer.riotgames.com" +
      "\n        As rotas que consultam a Riot vão responder 500 até lá.\n"
  );
}
