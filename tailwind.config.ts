import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "green-base": "#657E00",
        "davys-gray": "#484848",
        "light-gray": "#E5E5E5",
        'custom-gray': '#D9D9D9',

      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
