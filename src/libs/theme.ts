import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1e9df1",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0f1419",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f4212e",
      contrastText: "#ffffff",
    },

    background: {
      default: "#ffffff",
      paper: "#f7f8f8",
    },

    text: {
      primary: "#0f1419",
      secondary: "#536471",
    },

    divider: "#e1e8ed",
  },

  typography: {
    fontFamily: "var(--font-sans)",
    button: {
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12, // fallback
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        },
      },
    },

    // 🔥 CARD
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-sm)",
        },
      },
    },

    // 🔥 PAPER (buat modal, menu, dll)
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--card)",
        },
      },
    },

    // 🔥 BUTTON (override total pakai var)
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          padding: "10px 16px",
          fontWeight: 500,
        },

        containedPrimary: {
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          "&:hover": {
            backgroundColor: "var(--primary)",
            opacity: 0.9,
          },
        },

        containedSecondary: {
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
        },

        containedError: {
          backgroundColor: "var(--destructive)",
          color: "var(--destructive-foreground)",
        },
      },
    },

    // 🔥 INPUT
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--input)",
          borderRadius: "12px",
        },
      },
    },

    // 🔥 APP BAR
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
