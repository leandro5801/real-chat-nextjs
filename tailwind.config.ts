import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "bg-chat": "url('/images/background-cool-black.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        test: "url('/images/scene 4.png')",
        "my-gradient-modal":
          "linear-gradient(45deg, transparent 0%, transparent 11%,rgba(156, 156, 156,0.06) 11%, rgba(156, 156, 156,0.06) 81%,transparent 81%, transparent 100%),linear-gradient(45deg, transparent 0%, transparent 18%,rgba(156, 156, 156,0.06) 18%, rgba(156, 156, 156,0.06) 64%,transparent 64%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 13%,rgba(156, 156, 156,0.06) 13%, rgba(156, 156, 156,0.06) 22%,transparent 22%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));",

        "my-gradient-modal-button":
          "linear-gradient(259deg, rgba(117, 117, 117, 0.03) 0%, rgba(117, 117, 117, 0.03) 50%,rgba(8, 8, 8, 0.03) 50%, rgba(8, 8, 8, 0.03) 100%),linear-gradient(157deg, rgba(245, 245, 245, 0.05) 0%, rgba(245, 245, 245, 0.05) 50%,rgba(68, 68, 68, 0.05) 50%, rgba(68, 68, 68, 0.05) 100%),linear-gradient(384deg, rgba(107, 107, 107, 0.07) 0%, rgba(107, 107, 107, 0.07) 50%,rgba(7, 7, 7, 0.07) 50%, rgba(7, 7, 7, 0.07) 100%),linear-gradient(221deg, rgba(9, 9, 9, 0.09) 0%, rgba(9, 9, 9, 0.09) 50%,rgba(120, 120, 120, 0.09) 50%, rgba(120, 120, 120, 0.09) 100%),linear-gradient(268deg, rgba(202, 202, 202, 0.01) 0%, rgba(202, 202, 202, 0.01) 50%,rgba(19, 19, 19, 0.01) 50%, rgba(19, 19, 19, 0.01) 100%),linear-gradient(308deg, rgba(64, 64, 64, 0.04) 0%, rgba(64, 64, 64, 0.04) 50%,rgba(4, 4, 4, 0.04) 50%, rgba(4, 4, 4, 0.04) 100%),linear-gradient(188deg, rgb(17,249,61),rgb(16,189,193));",
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
  plugins: [nextui()],
};
export default config;
