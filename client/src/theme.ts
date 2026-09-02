import { createTheme } from "@mui/material/styles";
import { semanticTokens } from "./styles/semanticTokens";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: semanticTokens.color.brandPrimary,
      contrastText: semanticTokens.color.bgSurface,
    },
    secondary: {
      main: semanticTokens.color.textPrimary,
      contrastText: semanticTokens.color.bgSurface,
    },
    background: {
      default: semanticTokens.color.bgCanvas,
      paper: semanticTokens.color.bgSurface,
    },
    text: {
      primary: semanticTokens.color.textPrimary,
      secondary: semanticTokens.color.textSecondary,
    },
    info: {
      main: semanticTokens.color.info,
      contrastText: semanticTokens.color.bgSurface,
    },
    success: {
      main: semanticTokens.color.success,
      contrastText: semanticTokens.color.bgSurface,
    },
    warning: {
      main: semanticTokens.color.warning,
      contrastText: semanticTokens.color.textPrimary,
    },
    error: {
      main: semanticTokens.color.error,
      contrastText: semanticTokens.color.bgSurface,
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      '"IBM Plex Sans"',
      '"Noto Serif TC"',
      '"PingFang HK"',
      '"PingFang TC"',
      '"Microsoft JhengHei"',
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: '"Noto Serif TC", serif',
      fontWeight: 700,
      color: semanticTokens.color.textPrimary,
      lineHeight: 1.1,
      letterSpacing: "-0.01em",
    },
    h2: {
      fontFamily: '"Noto Serif TC", serif',
      fontWeight: 700,
      color: semanticTokens.color.textPrimary,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: '"Noto Serif TC", serif',
      fontWeight: 700,
      color: semanticTokens.color.textPrimary,
      lineHeight: 1.25,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: '"Noto Serif TC", serif',
      fontWeight: 700,
      color: semanticTokens.color.textPrimary,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    body1: {
      color: semanticTokens.color.textBody,
      lineHeight: 1.6,
    },
    body2: {
      color: semanticTokens.color.textBody,
      lineHeight: 1.6,
    },
    caption: {
      ...semanticTokens.typography.caption,
      color: semanticTokens.color.textSecondary,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
          padding: "10px 18px",
          minHeight: 40,
        },
        contained: {
          backgroundColor: semanticTokens.color.brandPrimary,
          color: semanticTokens.color.bgSurface,
          "&:hover": {
            backgroundColor: semanticTokens.color.brandPrimaryHover,
          },
        },
        outlined: {
          borderColor: semanticTokens.color.borderDefault,
          color: semanticTokens.color.textPrimary,
          "&:hover": {
            backgroundColor: semanticTokens.color.bgCanvas,
            borderColor: semanticTokens.color.textPrimary,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: semanticTokens.color.bgSurface,
          color: semanticTokens.color.textPrimary,
          boxShadow: semanticTokens.shadow.appBar,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: semanticTokens.color.chipBg,
          color: semanticTokens.color.textSecondary,
          fontWeight: 600,
        },
        colorPrimary: {
          backgroundColor: semanticTokens.color.textPrimary,
          color: semanticTokens.color.bgSurface,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: semanticTokens.color.bgSurface,
          borderRight: `1px solid ${semanticTokens.color.borderSubtle}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: semanticTokens.color.bgSurface,
          boxShadow: semanticTokens.shadow.card,
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: semanticTokens.color.bgSurface,
          border: `1px solid ${semanticTokens.color.borderSubtle}`,
          borderRadius: 12,
          boxShadow: semanticTokens.shadow.card,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: semanticTokens.color.textLink,
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

export default theme;
