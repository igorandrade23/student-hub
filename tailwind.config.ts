import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f6f4ef",
        ink: "#232323",
        muted: "#6b6f76",
        line: "#dedbd2",
        first: "#2f7d73",
        second: "#b45f43",
        third: "#4d68a8",
        theory: "#7a5c99"
      },
      boxShadow: {
        panel: "0 18px 45px rgba(31, 33, 36, 0.09)"
      },
      borderRadius: {
        panel: "8px"
      }
    }
  },
  plugins: []
};

export default config;
