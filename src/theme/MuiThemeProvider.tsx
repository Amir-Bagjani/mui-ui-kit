import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    black: Palette["primary"];
    blue: Palette["primary"];
    green: Palette["primary"];
    orange: Palette["primary"];
  }

  interface PaletteOptions {
    black?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    orange?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#019BA7", //main
      dark: "#026B77", //hover
      light: "#BFD5D8", //disabled
      "100": "#63BAC1", //primary-01
      "200": "#AEE7EC", //primary-02
      "300": "#BFD5D8", //primary-03
      "400": "#EAF7F7", //primary-04
    },
    secondary: {
      main: "#A70148", //main
      dark: "#820138", //hover
      light: "#EA9EA5", //disabled
      "100": "#B7366D", //01
      "200": "#C890A8", //02
      "300": "#F8EEF2", //03
    },
    text: {
      primary: "#505050",
      secondary: "#707070",
      disabled: "#B6B6B6",
    },
    error: {
      main: "#E14856", //main
      dark: "#C22A38", //hover
      light: "#EA9EA5", //disabled
      "100": "#F8DEE1", //01
    },
    success: {
      main: "#1CAE81", //main
      "100": "#CEEED6", //01
      "200": "#EBF7EE", //02
    },

    grey: {
      "100": "#B6B6B6", //gray 01-B6
      "200": "#D1D1D1", //gray 02-D1
      "300": "#EDEDED", //gray 03-ED
      "400": "#EFEFEF", //gray 04-EF
      "500": "#F4F4F4", //gray 05-F4
      "600": "#F9F9F9", //gray 06-F9
    },
    black: {
      "300": "#303030", //black 30
      "500": "#505050", //black 50
      "700": "#707070", //black 70
      "900": "#909090", //black 90
    },
    blue: {
      "100": "#E0EEFF", //01
    },
    green: {
      "100": "#E9FEF5", //01
    },
    orange: {
      main: "#F86534", //main
      dark: "#FA4A10", //hover
      "100": "#FF8056", //01
      "200": "#FFDACD", //02
      "300": "#FFF3EF", //03
    },
  },
  typography: {
    fontFamily: "IranYekan, Arial",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (t) => ({
        "*": {
          "&::-webkit-scrollbar": {
            width: "0.5rem",
            height: "0.5rem",
          },
          "&::-webkit-scrollbar-track": {
            background: t.palette.grey[500],
            borderRadius: "24px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: t.palette.grey[100],
            borderRadius: "5px",
          },
        },
      }),
    },
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const MUIThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        {children}
      </CacheProvider>
    </ThemeProvider>
  );
};
