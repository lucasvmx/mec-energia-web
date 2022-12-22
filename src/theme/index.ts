import { createTheme } from "@mui/material";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR } from "@mui/x-date-pickers";

declare module "@mui/material/styles" {
  interface Palette {
    highlighted: Palette["primary"];
  }

  interface PaletteOptions {
    highlighted: PaletteOptions["primary"];
  }
}

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#0A5C67",
      },
      secondary: {
        main: "#FB736C",
      },
      background: {
        default: "#EEF4F4",
        paper: "#fff",
      },
      warning: {
        main: "#FB736C",
      },
      highlighted: {
        main: "rgba(10, 92, 103, 0.12)",
      },
    },
    typography: {
      fontFamily: ["Lexend", "sans-serif"].join(","),
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  },
  ptBR,
  corePtBR
);

export default theme;
