module.exports = {
  content: ["./*.html", "./src/**/*.css", "./src/**/*.tsx"],
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  safelist: [
    {
      pattern: /./,
    },
  ],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  theme: {
    extend: {
      animation: {
        type: "type 2.7s ease-out .8s infinite alternate both",
      },
      keyframes: {
        type: {
          "0%": { transform: "translateX(0ch)" },
          "5%, 10%": { transform: "translateX(1ch)" },
          "15%, 20%": { transform: "translateX(2ch)" },
          "25%, 30%": { transform: "translateX(3ch)" },
          "35%, 40%": { transform: "translateX(4ch)" },
          "45%, 50%": { transform: "translateX(5ch)" },
          "55%, 60%": { transform: "translateX(6ch)" },
          "65%, 70%": { transform: "translateX(7ch)" },
          "95%, 100%": { transform: "translateX(8ch)" },
        },
      },
    },
  },
};
