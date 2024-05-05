import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/assets/vector/bg_vector.svg')"
      }
    },
  },
  plugins: [],
};
export default withMT(config);
