---
title: "Arquitetura Front-end: .env e conexão com o Backend"
projeto: Better League
stack: [Vite, React 18, TailwindCSS]
tags: [react, vite, arquitetura, api, env, mentoria]
criado: 2026-08-22
---

# Arquitetura: `.env` e conexão com o Backend

> [!abstract] Resumo em uma frase
> `.env` no front **não é segredo** — é configuração de build. Segredo mora no backend. E `fetch` **nunca** vive dentro do componente.

---

## 1. Onde vai o `.env`

Na **raiz do projeto**, ao lado do `package.json`. Nunca dentro de `src/`.
O Vite carrega o `.env` a partir do *root* dele (cwd), não da pasta do código.

```
better-league.op/
├── .env              # defaults compartilhados, SEM segredo — pode commitar
├── .env.local        # sobrescreve local, NUNCA commita
├── .env.example      # template com chaves vazias — commita, é a doc viva
├── .env.production   # valores de build de prod (também sem segredo)
├── package.json
├── vite.config.js
└── src/
```

### `.gitignore`

O `*.local` já cobre o `.env.local`, mas vale ser explícito:

```gitignore
.env
.env.*
!.env.example
```

### `.env.example` (commitado — serve de documentação)

```bash
# URL do BFF. Em dev fica vazio (usa o proxy do Vite).
VITE_API_URL=
```

---

## 2. 🔴 A regra de ouro

> [!danger] Tudo que começa com `VITE_` é injetado no bundle em texto puro
> Qualquer pessoa abre o DevTools → aba Sources → e lê. Sem exceção.

```bash
# ✅ pode
VITE_API_URL=http://localhost:3333
VITE_APP_VERSION=1.0.0

# ❌ NUNCA
VITE_RIOT_API_KEY=RGAPI-xxxx    # vaza para todo mundo
VITE_DB_PASSWORD=...            # idem
```

**Consumo:** `import.meta.env.VITE_API_URL`
(não `process.env` — isso é Node/CRA; no Vite não existe no browser)

---

## 3. Por que esse projeto **obriga** um backend

A chave da Riot não pode ir para o browser. Três motivos, em ordem de gravidade:

| # | Motivo | Consequência sem backend |
|---|--------|--------------------------|
| 1 | **Segredo** | A API key vaza no bundle |
| 2 | **CORS** | A Riot não manda header CORS → o preflight morre. Sem workaround honesto. |
| 3 | **Rate limit** | 20 req/s e 100 req/2min na dev key. Cada aba chamando direto = ban. |

### O padrão: BFF (Backend For Frontend)

```
[ React ] ──► [ BFF (Node) ] ──► [ Riot API ]
                guarda a key
                faz cache
                normaliza o dado
```

O BFF devolve o JSON **no formato que a sua tela precisa**, não no formato da Riot.

> [!tip] Atalho válido
> O BFF pode ser uma **serverless function** (`/api/summoners.js` na Vercel): mesmo repo, zero servidor pra manter, e a `RIOT_API_KEY` fica como env var do servidor — sem prefixo `VITE_`, logo nunca entra no bundle.

---

## 4. As 4 camadas

> [!important] O erro mais comum
> Escrever `fetch` direto no `onSubmit` do componente. Funciona no dia 1, vira inferno no dia 30.

```
src/
├── lib/http.js            # 1. Transporte  → baseURL, erro, JSON
├── services/summoner.js   # 2. Domínio     → endpoints + normalização
├── hooks/useSummoner.js   # 3. Estado      → loading/error/data, cancelamento
└── components/            # 4. UI          → só recebe props e renderiza
```

**Cada camada só conhece a de baixo.** O componente não sabe que existe HTTP.

---

### Camada 1 — Cliente HTTP

Um lugar só que conhece a URL base e traduz falha de rede em erro seu.

```js
// src/lib/http.js
const BASE = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function http(path, { signal, ...opts } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    signal,
    ...opts,
  });

  // PEGADINHA: fetch NÃO rejeita em 404/500. Só em falha de rede.
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message ?? "Erro na requisição", res.status, body);
  }

  return res.status === 204 ? null : res.json();
}
```

> [!warning] Bug nº 1 de quem está começando
> `fetch` **não** rejeita em 404 ou 500. Sem o `if (!res.ok)`, você acha que caiu no `catch` e não caiu — e renderiza um HTML de erro como se fosse dado.

---

### Camada 2 — Serviço + Normalização

> [!important] Nunca deixe o formato da API externa vazar para dentro dos componentes.

```js
// src/services/summoner.js
import { http } from "../lib/http";

// DTO (o que vem) → Model (o que a sua UI fala)
function toSummoner(dto) {
  return {
    id: dto.puuid,
    name: dto.gameName,
    tag: dto.tagLine,
    level: dto.summonerLevel ?? 0,
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${dto.profileIconId}.png`,
  };
}

export async function searchSummoner(riotId, { signal } = {}) {
  const [name, tag = "BR1"] = riotId.split("#");
  const data = await http(
    `/summoners?name=${encodeURIComponent(name)}&tag=${encodeURIComponent(tag)}`,
    { signal }
  );
  return toSummoner(data);
}
```

**Por que importa:** quando a Riot renomear `profileIconId`, você muda **uma função**. Sem isso, você caça `dto.profileIconId` em 14 componentes.

**`encodeURIComponent`:** nome de invocador tem espaço e caractere especial. Sem isso, a URL quebra.

---

### Camada 3 — O Hook (onde mora o estado)

```js
// src/hooks/useSummoner.js
import { useState, useCallback, useRef, useEffect } from "react";
import { searchSummoner } from "../services/summoner";
import { ApiError } from "../lib/http";

export function useSummoner() {
  const [state, setState] = useState({ status: "idle", data: null, error: null });
  const abortRef = useRef(null);

  const search = useCallback(async (query) => {
    if (!query.trim()) return;

    abortRef.current?.abort();          // cancela a busca anterior
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ status: "loading", data: null, error: null });
    try {
      const data = await searchSummoner(query, { signal: controller.signal });
      setState({ status: "success", data, error: null });
    } catch (err) {
      if (err.name === "AbortError") return;   // não é erro, foi substituída
      setState({
        status: "error",
        data: null,
        error:
          err instanceof ApiError && err.status === 404
            ? "Invocador não encontrado."
            : "Não foi possível buscar agora. Tente de novo.",
      });
    }
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []); // limpa ao desmontar

  return { ...state, search };
}
```

#### Três decisões que evitam bug fantasma

1. **`status` como máquina de estado** (`idle | loading | success | error`) em vez de três booleanos soltos.
   Com booleanos você consegue representar estados impossíveis (`loading: true` **e** `error: "..."`) — e uma hora vai representar.

2. **`AbortController` resolve *race condition*.**
   Você busca "Faker", depois "Caps". Se a resposta de Faker chegar por último, a tela mostra **Faker**. Cancelar a anterior mata isso.

3. **Mensagem de erro traduzida no hook**, não no componente.
   O componente não deve saber o que é HTTP 404.

---

### Camada 4 — O Componente

```jsx
// src/Home.jsx
const [query, setQuery] = useState("");
const { status, data, error, search } = useSummoner();

<form onSubmit={(e) => { e.preventDefault(); search(query); }}>
  <input value={query} onChange={(e) => setQuery(e.target.value)} />
  <button disabled={status === "loading"}>Buscar</button>
</form>

{status === "loading" && <Skeleton />}
{status === "error"   && <p role="alert">{error}</p>}
{status === "success" && <SummonerCard summoner={data} />}
```

Sem `fetch`. Sem `try/catch`. Sem `.json()`.
O componente só decide **o que desenhar para cada estado** — testável e legível.

---

## 5. Buscar no submit vs. buscar ao digitar

|  | Submit (Enter/botão) | Ao digitar |
|---|---|---|
| Requisições | 1 por busca | 1 a cada pausa de digitação |
| Rate limit Riot | tranquilo | estoura fácil |
| Quando usar | perfil completo | autocomplete / sugestão |

> [!check] Para League, **submit é a escolha certa**
> O usuário digita um Riot ID inteiro (`Nome#TAG`). Buscar a cada tecla desperdiça rate limit em queries que nem são nomes válidos.

Se um dia quiser autocomplete: **debounce** (~400ms) + `AbortController`, e o debounce vai **dentro do hook**, nunca espalhado no componente.

---

## 6. Dev: proxy do Vite em vez de CORS

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": { target: "http://localhost:3333", changeOrigin: true },
    },
  },
});
```

- **Dev:** `VITE_API_URL` vazio → chamadas viram `/api/...` → mesma origem → zero CORS.
- **Prod:** define a URL real no painel da Vercel/Netlify.

Dois ambientes, **mesmo código**.

---

## 7. Armadilhas conhecidas

> [!bug] Import com case errado
> `main.jsx` importa `./home.jsx`, mas o arquivo é `Home.jsx`.
> Windows é case-insensitive e não reclama. O build na Vercel roda em **Linux** e quebra com `Failed to resolve import`.
> **Arrumar antes do primeiro deploy.**

> [!note] `StrictMode` roda o efeito duas vezes em dev
> Ao usar `useEffect` para buscar dados você verá **duas requisições** e vai achar que é bug. Não é — é o React 18 testando se o seu cleanup funciona. Com o `AbortController` acima, está tudo certo.

> [!warning] `fetch` não tem timeout nativo
> Uma requisição pode ficar pendurada para sempre. Quando precisar: `AbortSignal.timeout(8000)`.

---

## 8. Roadmap sugerido

- [ ] Criar `.env.example` + `.env.local` com `VITE_API_URL`
- [ ] Corrigir o import `./home.jsx` → `./Home.jsx`
- [ ] Subir o BFF com **um** endpoint: `GET /api/summoners?name=&tag=` (sem banco, sem auth — só provar o caminho ponta a ponta)
- [ ] `lib/http.js` → `services/summoner.js` → `useSummoner` → plugar no form
- [ ] Cache no backend (o `puuid` de um Riot ID é imutável → cacheia pra sempre)
- [ ] Histórico de partidas + `CardBestChoices` com dado real
- [ ] Migrar para **TanStack Query** quando tiver 3+ telas buscando dados

> [!tip] Por que só migrar para TanStack Query no final
> Ele dá cache, dedupe, retry e revalidação de graça. Mas escreva o hook manual primeiro — senão você não entende **o que a lib está resolvendo**.

---

## Conceitos para aprofundar

- [[Race condition em requisições]]
- [[AbortController]]
- [[Máquina de estados na UI]]
- [[DTO vs Model]]
- [[BFF - Backend For Frontend]]
- [[Rate limiting]]
- [[TanStack Query]]
