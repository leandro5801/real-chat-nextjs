import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        test: "url('/images/scene 4.png')",
      },
      colors: {
        myColor: {
          "50": "#eaebec",
          "100": "#d5d6d8",
          "200": "#acadb1",
          "300": "#82858b",
          "400": "#595c64",
          "500": "#2f333d",
          "600": "#262931",
          "700": "#1c1f25",
          "800": "#131418",
          "900": "#090a0c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
