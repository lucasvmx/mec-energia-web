import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { ptBR } from "@mui/x-date-pickers";
import { ptBR as corePtBR } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#264653",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },
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
