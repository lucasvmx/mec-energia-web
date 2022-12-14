import createTheme from "@mui/material/styles/createTheme";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR } from "@mui/x-date-pickers";
import { PaletteOptions } from "@mui/material";

const palette: PaletteOptions = {
  primary: {
    main: "#0A5C67",
  },
  secondary: {
    main: "#FB736C",
  },
  background: {
    default: "#EFF4F4",
  },
};

const theme = createTheme(
  {
    palette,
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
