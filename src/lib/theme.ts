import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: 'rgb(30, 157, 241)',
      contrastText: 'rgb(255, 255, 255)',
    },

    secondary: {
      main: 'rgb(15, 20, 25)',
      contrastText: 'rgb(255, 255, 255)',
    },

    error: {
      main: 'rgb(244, 33, 46)',
      contrastText: 'rgb(255, 255, 255)',
    },

    background: {
      default: 'rgb(255, 255, 255)',
      paper: 'rgb(247, 248, 248)',
    },

    text: {
      primary: 'rgb(15, 20, 25)',
      secondary: 'rgb(15, 20, 25)',
    },

    divider: 'rgb(225, 234, 239)',
  },

  typography: {
    fontFamily: `'Open Sans', sans-serif`,

    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },

    body1: {
      fontSize: '1rem',
    },

    button: {
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 20, // dari --radius: 1.3rem (~20px)
  },

  spacing: 4, // dari --spacing: 0.25rem

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'rgb(255, 255, 255)',
          color: 'rgb(15, 20, 25)',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(247, 248, 248)',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(247, 248, 248)',
          border: '1px solid rgb(225, 234, 239)',
          borderRadius: 20,
          boxShadow: 'none', // sesuai token lu (shadow = 0)
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // biar pill style kayak modern UI
          padding: '8px 16px',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(247, 249, 250)', // --input
          borderRadius: 999,
        },
        notchedOutline: {
          borderColor: 'rgb(225, 234, 239)',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgb(225, 234, 239)',
        },
      },
    },
  },
});

export default theme;