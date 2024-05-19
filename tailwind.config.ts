import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";
/* eslint-disable-next-line */
const plugin = require('tailwindcss/plugin');

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    asideScrollbars: {
      light: 'light',
      gray: 'gray',
    },
    extend: {
      backgroundImage: {
        main: "url('/assets/vector/bg_vector.svg')"
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'aside-scrollbars': (value: string) => {
            const track = value === 'light' ? '100' : '900'
            const thumb = value === 'light' ? '300' : '600'
            const color = value === 'light' ? 'gray' : value

            return {
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme(`colors.${color}.${thumb}`)} ${theme(
                `colors.${color}.${track}`
              )}`,
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: theme(`colors.${color}.${track}`),
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '0.25rem',
                backgroundColor: theme(`colors.${color}.${thumb}`),
              },
            }
          },
        },
        { values: theme('asideScrollbars') }
      )
    }),
  ]
};
export default withMT(config);
