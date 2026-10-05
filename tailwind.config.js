/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bgDark: "#0B2A24",
        cardDark: "#133C34",
        borderDark: "#1E5448",
        accentMint: "#5DCAA5",
        textLight: "#F3FBF8",
        textMuted: "#9FE1CB",
        textSubtle: "#5E7C75",
        errorRed: "#FF6B6B",
      },
    },
  },
  plugins: [],
};
