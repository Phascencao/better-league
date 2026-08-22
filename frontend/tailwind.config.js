/** @type {import('tailwindcss').Config} */

// Escala base. Os hex de --bg-base, --border-subtle, --text-primary,
// --positive e --negative vieram da tabela; os gold-* foram lidos das amostras.
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

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold,
        base: "#F4EBDA", // fundo da página
        surface: {
          DEFAULT: gold[50], // card, tabela
          raised: gold[200], // header de tabela, menu
        },
        accent: {
          DEFAULT: gold[700], // link, ícone, texto de ação
          fill: gold[400], // badge, barra, realce
        },
        positive: "#1E7A5C", // win rate, delta de LP
        negative: "#B23B33",
      },
      textColor: {
        primary: "#17223A", // números, títulos
        secondary: gold[900], // corpo, labels
        muted: gold[700], // metadado, timestamp
      },
      boxShadow: {
        // sombra quente, na escala gold, para uso sobre bg-base
        input: '0 2px 4px -2px rgb(66 45 20 / 0.18), 0 8px 20px -6px rgb(66 45 20 / 0.30)',
      },
      borderColor: {
        subtle: "#E3D3B6", // divisor de linha
        strong: gold[600], // contorno de card, input
      },
    },
  },
  plugins: [],
};
