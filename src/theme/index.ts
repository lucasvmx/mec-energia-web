import createTheme from "@mui/material/styles/createTheme";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR } from "@mui/x-date-pickers";

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
    },
  },
  ptBR,
  corePtBR
);

export default theme;
