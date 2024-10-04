const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const {nextui} = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      success: '#8e9bef',
      pending: '#ecde4b',
      light: '#ccc'
    },
    extend: {
      container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem'
      }
    }
    },
  },
  darkMode: "class",
  plugins: [nextui(
    {
      addCommonColors: true,
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
                success: '#8e9bef',
                pending: '#ecde4b',
                light: '#ccc',
                blue: {
          50: "#e6f1fe",
          100: "#cce3fd",
          200: "#99c7fb",
          300: "#66aaf9",
          400: "#338ef7",
          500: "#006FEE",
          600: "#005bc4",
          700: "#9cc2ee",
          800: "#002e62",
          900: "#001731",
        },
          } // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
                success: '#8e9bef',
                pending: '#ecde4b',
                light: '#ccc',
                blue: {
          50: "#e6f1fe",
          100: "#cce3fd",
          200: "#99c7fb",
          300: "#66aaf9",
          400: "#338ef7",
          500: "#006FEE",
          600: "#005bc4",
          700: "#004493",
          800: "#002e62",
          900: "#001731",
        },
          } // dark theme colors
        },
        modern: {
          extend: 'dark', // <- inherit default values from dark theme
          colors: {
            background: '#0D001A',
            foreground: '#ffffff',
            primary: {
              50: '#3B096C',
              100: '#520F83',
              200: '#7318A2',
              300: '#9823C2',
              400: '#c031e2',
              500: '#DD62ED',
              600: '#F182F6',
              700: '#FCADF9',
              800: '#FDD5F9',
              900: '#FEECFE',
              DEFAULT: '#DD62ED',
              foreground: '#ffffff'
            },
            focus: '#F182F6'
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '1px',
              medium: '2px',
              large: '4px'
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px'
            }
          }
        }
      }
    }
  )],
};
