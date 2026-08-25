/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// PRIMITIVAS — escalas cruas. Nunca usar direto no componente, só através dos
// tokens semânticos abaixo (que saem das CSS vars definidas em src/index.css).
// ---------------------------------------------------------------------------

const gold = {
  50: "#FDF9F0",
  100: "#F9F0DD",
  200: "#F2E2BE",
  300: "#E8CE94",
  400: "#DDB765",
  500: "#CE9C3C",
  600: "#B5822A",
  700: "#8F6420",
  800: "#6B4A1B",
  900: "#422D14",
};

// O neutro do sistema. 400/600/700/800/900 vieram das amostras da direção
// "Aurum"; 50/100/200/300/500 foram interpolados na mesma rampa.
const navy = {
  50: "#F2F5FA",
  100: "#E1E8F3",
  200: "#C3D0E5",
  300: "#92A6C6",
  400: "#5A8FD6",
  500: "#3A5C96",
  600: "#23385E",
  700: "#16294A",
  800: "#101F38",
  900: "#0A1428",
};

// Token semântico: lê a CSS var, com o valor light como fallback.
const token = (name, fallback) => `var(--${name}, ${fallback})`;

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // primitivas
        gold,
        navy,

        // superfícies
        base: token("bg-base", gold[50]), // fundo da página
        surface: {
          DEFAULT: token("surface", gold[50]), // card, tabela
          raised: token("surface-raised", gold[200]), // header de tabela, menu
        },

        // ação
        accent: {
          DEFAULT: token("accent", gold[700]), // link, ícone, texto de ação
          hover: token("accent-hover", gold[600]),
          press: token("accent-press", gold[800]),
          fill: token("accent-fill", gold[400]), // badge, barra, realce
        },

        // semântica de dado
        positive: token("positive", "#1E7A5C"), // win rate, delta de LP
        negative: token("negative", "#B23B33"),
        focus: token("focus-ring", gold[600]),

        // série de gráfico — 6 categorias distinguíveis, ORDEM FIXA.
        // Luminância parecida entre as seis, então nenhuma domina lado a lado.
        // Em série de 2 use chart-1 e chart-2 (par mais distante em matiz).
        chart: {
          1: "#F2C97D",
          2: "#5A8FD6",
          3: "#46B08D",
          4: "#D6524A",
          5: "#A99BE0",
          6: "#C9A98A",
        },

        // matiz de cada tier. O fill/texto/borda saem das fórmulas
        // aplicadas na classe .tier (src/index.css), não daqui.
        tier: {
          ferro: "#6E7A8A",
          bronze: "#B0703E",
          prata: "#9AA9B8",
          ouro: "#E3B04B",
          platina: "#4FBFA8",
          diamante: "#5A8FD6",
          mestre: "#A57BD4",
          "grao-mestre": "#D6524A",
          desafiante: "#E8C15A",
        },
      },

      textColor: {
        primary: token("text-primary", "#17223A"), // números, títulos
        secondary: token("text-secondary", gold[900]), // corpo, labels
        muted: token("text-muted", gold[700]), // metadado, timestamp
      },

      borderColor: {
        subtle: token("border-subtle", "#E3D3B6"), // divisor de linha
        strong: token("border-strong", gold[600]), // contorno de card, input
      },

      // ---------------------------------------------------------------------
      // TIPOGRAFIA
      // Cinzel  -> rank, nome de campeão/invocador, títulos de seção, resultado
      // Barlow  -> interface: nav, parágrafos, labels de barra, botões, chips
      // IBM Plex Mono -> todo dado tabular (sempre com tabular-nums)
      // ---------------------------------------------------------------------
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // tamanhos que o PDF fixa
        display: ["52px", { lineHeight: "1.05", fontWeight: "600" }], // H1 da home
        "name-lg": ["34px", { lineHeight: "1.15" }], // nome do invocador
        name: ["30px", { lineHeight: "1.15" }],
        "rank-lg": ["24px", { lineHeight: "1.2" }], // "Platina II"
        rank: ["21px", { lineHeight: "1.2" }],
        "card-title": ["15px", { lineHeight: "1.3" }], // título de card
      },

      letterSpacing: {
        // labels em caixa alta no mono: RANQUEADA SOLO · S15
        label: "0.18em",
      },

      boxShadow: {
        // sombra quente, na escala gold, para uso sobre bg-base no tema light
        input:
          "0 2px 4px -2px rgb(66 45 20 / 0.18), 0 8px 20px -6px rgb(66 45 20 / 0.30)",
        // equivalente para o tema dark, onde a sombra quente some
        "input-dark":
          "0 2px 4px -2px rgb(10 20 40 / 0.45), 0 8px 20px -6px rgb(10 20 40 / 0.65)",
      },

      ringColor: {
        DEFAULT: token("focus-ring", gold[600]),
      },
    },
  },
  plugins: [],
};
