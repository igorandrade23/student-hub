import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Moldura (chrome escuro)
        bg: "#0B1026", // fundo profundo, faixas especiais
        aubergine: "#22162F", // sidebar, faixas-herói
        night: "#171A33", // cards/painéis escuros (constelação)

        // Superfícies de trabalho (claras, quentes)
        paper: "#f3ebda", // fundo da área de conteúdo
        surface: "#fffcf6", // cartões
        ivory: "#fff8ea", // cartões em destaque / inputs

        // Texto
        ink: "#23212a", // texto sobre claro
        inkInv: "#f8f3ea", // texto sobre escuro
        muted: "#6e6675", // secundário sobre claro
        mist: "#a8a0b6", // secundário sobre escuro

        // Linhas
        line: "#e6d8c4", // divisórias sobre claro
        lineDark: "rgba(255,255,255,0.14)", // divisórias sobre escuro

        // Marca + domínios (cor = significado)
        brand: {
          DEFAULT: "#8b6fb5",
          50: "#f4effa",
          100: "#e9e0f3",
          200: "#d6c6e8",
          600: "#6e54a0",
          700: "#574185",
          900: "#2a1e40"
        },
        accent: "#6e54a0", // links/realces sobre claro
        estudo: "#2f8f8b", // teal — cognição/revisão
        prova: "#c76557", // clay — provas/alertas
        evento: "#dca64a", // amber — calendário/aulas
        comunidade: "#d46a7e", // rose — avisos/comunidade
        progresso: "#6aae8e", // verde — quiz/evolução
        material: "#4c6fff", // azul — materiais/pesquisa

        // Aliases legados (eventos/fases) → mapeados aos domínios
        first: "#dca64a", // aula / 1ª infância (amber)
        second: "#c76557", // prova / 2ª infância (clay)
        third: "#2f8f8b", // entrega / 3ª infância (teal)
        theory: "#8b6fb5" // teorias (psi)
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        panel: "0 1px 2px rgba(35, 33, 42, 0.05)",
        soft: "0 2px 10px -4px rgba(35, 33, 42, 0.10)",
        lift: "0 16px 36px -20px rgba(35, 33, 42, 0.30)",
        glow: "0 20px 50px -24px rgba(11, 16, 38, 0.55)"
      },
      borderRadius: {
        panel: "12px",
        card: "16px"
      }
    }
  },
  plugins: []
};

export default config;
