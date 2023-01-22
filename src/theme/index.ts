import { createTheme } from "@mui/material";
import "@mui/x-data-grid/themeAugmentation";
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

const primaryMain = "#0A5C67";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: primaryMain,
      },
      secondary: {
        main: "#FB736C",
      },
      background: {
        default: "#EEF4F4",
        paper: "#fff",
      },
      error: {
        main: "#B31B0A",
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
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          standardError: {
            backgroundColor: "#B31B0A",
            color: "#FFFFFF",
          },
          standardSuccess: {
            backgroundColor: "#418026",
            color: "#FFFFFF",
          },
          standardInfo:{
            backgroundColor: '#0E438C',
            color:"#FFFFFF",
          },
          icon: {
            color: "#FFFFFF",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "& .MuiDataGrid-columnHeader--filledGroup": {
              backgroundColor: "rgba(10, 92, 103, 0.08)",
              color: "rgba(0, 0, 0, 0.87)",
            },
            "& .MuiDataGrid-columnHeader--emptyGroup": {
              backgroundColor: "unset",
            },

            border: "unset",
          },
          row: {
            ":nth-of-type(odd)": {
              backgroundColor: "white",
            },
          },
          columnHeader: {
            color: "white",
            backgroundColor: primaryMain,
            ":focus": {
              outline: "none",
            },
            button: {
              color: "white",
            },
          },
        },
      },
    },
  },
  ptBR,
  corePtBR
);

export default theme;
