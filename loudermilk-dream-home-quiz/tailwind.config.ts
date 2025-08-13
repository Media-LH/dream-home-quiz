import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}","./emails/**/*.{js,ts,jsx,tsx}","./lib/**/*.{js,ts,jsx,tsx}","./content/**/*.{json}"],
  theme: { extend: {} },
  plugins: [],
}
export default config
