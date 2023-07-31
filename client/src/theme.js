import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
   ...(mode === 'light'
      ? {
         primary: {
            100: "#eef0fd",
            200: "#dde0fb",
            300: "#cbd1f9",
            400: "#bac1f7",
            500: "#a9b2f5",
            600: "#878ec4",
            700: "#656b93",
            800: "#444762",
            900: "#222431"
         },
         blackAccent: {
            100: "#d7d9de",
            200: "#aeb3be",
            300: "#868c9d",
            400: "#5d667d",
            500: "#35405c",
            600: "#2a334a",
            700: "#202637",
            800: "#151a25",
            900: "#0b0d12"
         },
         grayAccent: {
            100: "#f3f5fd",
            200: "#e6ebfb",
            300: "#dae0fa",
            400: "#cdd6f8",
            500: "#c1ccf6",
            600: "#9aa3c5",
            700: "#747a94",
            800: "#4d5262",
            900: "#272931"
         },
         yellowAccent: {
            100: "#fbf1d5",
            200: "#f7e3ac",
            300: "#f4d682",
            400: "#f0c859",
            500: "#ecba2f",
            600: "#bd9526",
            700: "#8e701c",
            800: "#5e4a13",
            900: "#2f2509"
         },
         whiteAccent: {
            100: "#fcfcfe",
            200: "#f9f9fd",
            300: "#f7f7fd",
            400: "#f4f4fc",
            500: "#f1f1fb",
            600: "#c1c1c9",
            700: "#919197",
            800: "#606064",
            900: "#303032"
         }
      }:
      
      {
         primary: {
            100: "#222431",
            200: "#444762",
            300: "#656b93",
            400: "#878ec4",
            500: "#a9b2f5",
            600: "#bac1f7",
            700: "#cbd1f9",
            800: "#dde0fb",
            900: "#eef0fd"
         },
         blackAccent: {
            100: "#0b0d12",
            200: "#151a25",
            300: "#202637",
            400: "#2a334a",
            500: "#35405c",
            600: "#5d667d",
            700: "#868c9d",
            800: "#aeb3be",
            900: "#d7d9de"
         },
         grayAccent: {
            100: "#272931",
            200: "#4d5262",
            300: "#747a94",
            400: "#9aa3c5",
            500: "#c1ccf6",
            600: "#cdd6f8",
            700: "#dae0fa",
            800: "#e6ebfb",
            900: "#f3f5fd"
         },
         yellowAccent: {
            100: "#2f2509",
            200: "#5e4a13",
            300: "#8e701c",
            400: "#bd9526",
            500: "#ecba2f",
            600: "#f0c859",
            700: "#f4d682",
            800: "#f7e3ac",
            900: "#fbf1d5"
         },
         whiteAccent: {
            100: "#303032",
            200: "#606064",
            300: "#919197",
            400: "#c1c1c9",
            500: "#f1f1fb",
            600: "#f4f4fc",
            700: "#f7f7fd",
            800: "#f9f9fd",
            900: "#fcfcfe"
         }
      })
});

export const themeSettings = (mode) => {
   const colors = tokens(mode);

   return {
      palette: {
         mode: mode,
         ...(mode === "light"
            ? {
               primary: {
                  main: colors.primary[100]
               },
               secondary: {
                  main: colors.yellowAccent[800],
               },
               neutral: {
                  dark: colors.primary[700],
                  main: colors.primary[500],
                  light: colors.primary[100],
               },
               background: {
                  default: colors.primary[100]
               },
            } : {
               primary: {
                  main: colors.primary[100]
               },
               secondary: {
                  main: colors.yellowAccent[500],
               },
               neutral: {
                  dark: colors.primary[100],
                  main: colors.primary[500],
                  light: colors.primary[700],
               },
               background: {
                  default: colors.primary[100]
               },
            }
         )
      },
      typography: {
         fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
         fontSize: 12,
         h1: {
           fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
           fontSize: 40,
         },
         h2: {
           fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
           fontSize: 32,
         },
         h3: {
           fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
           fontSize: 24,
         },
         h4: {
           fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
           fontSize: 20,
         },
         h5: {
           fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
           fontSize: 16,
         },
         h6: {
           fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
           fontSize: 14,
         },
      }

   };
};

// context for color mode
export const ColorModeContext = createContext({
   toggleColorMode: () => {},
 });
 
 export const useMode = () => {
   const [mode, setMode] = useState("light");
 
   const colorMode = useMemo(
     () => ({
       toggleColorMode: () =>
         setMode((prev) => (prev === "light" ? "dark" : "light")),
     }),
     []
   );
 
   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
   return [theme, colorMode];
 };
