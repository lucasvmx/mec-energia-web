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

const primaryMain = "#1451B4";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#1451B4",
        dark: "#071E41",
        light: "#42A5F5",
        contrastText: "#fff",
      },
      secondary: {
        main: "#F5BC22",
        dark: "#C48508",
        light: "#BA68C8",
        contrastText: "#000",
      },
      background: {
        default: "#fff",
        paper: "#fff",
      },
      error: {
        main: "#B31B0A",
        dark: "#C62828",
        light: "#EF5350",
        contrastText: "#fff",
      },
      warning: {
        main: "#E67100",
        dark: "#E65100",
        light: "#FF9800",
        contrastText: "#000",
      },
      info: {
        main: "#0E438C",
        dark: "#01579B",
        light: "#03A9F4",
        contrastText: "#FFF",
      },
      success: {
        main: "#008C32",
        dark: "#1B5E20",
        light: "#4CAF50",
        contrastText: "#FFF",
      },
      highlighted: {
        main: "rgba(20, 81, 180, 0.12)",
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
          standardWarning: {
            backgroundColor: "RGB(217, 138, 11)",
            color: "#000",
          },
          outlinedInfo: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "rgb(41, 109, 204)",
            color: "rgb(41, 109, 204)",
          },
          standardInfo: {
            backgroundColor: "#E8EFF9",
            color: "#0F294D",
          },
          icon: {
            color: "#FFFFFF",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: primaryMain,

            "& .MuiTableCell-root": {
              color: "white",
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            "& .MuiTableRow-root": {
              "&:nth-of-type(odd)": {
                backgroundColor: "white",
              },
            },
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "& .MuiDataGrid-columnHeader--filledGroup": {
              backgroundColor: "rgba(20, 81, 180, 0.08)",
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
      MuiDrawer: {
        styleOverrides: { paper: { backgroundColor: "rgb(248, 248, 248)" } },
      },
    },
  },
  ptBR,
  corePtBR
);

export default theme;
