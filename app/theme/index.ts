import { createTheme } from '@mui/material/styles';

export type ThemeMode = 'light' | 'dark';

export function getAppTheme(mode: ThemeMode) {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#8b9dff' : '#4e63d8',
        light: isDark ? '#b3c0ff' : '#7c8df0',
        dark: isDark ? '#657be6' : '#394aa7',
      },
      secondary: {
        main: isDark ? '#5fe1c2' : '#2d9f8a',
        light: isDark ? '#8ef0d7' : '#61c6b2',
        dark: isDark ? '#3db89d' : '#1f7464',
      },
      background: {
        default: isDark ? '#0b1020' : '#f3f6ff',
        paper: isDark ? '#111833' : '#ffffff',
      },
      text: {
        primary: isDark ? '#e6e9f5' : '#1b2238',
        secondary: isDark ? '#adb6d8' : '#4d597d',
      },
      divider: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(17,24,39,0.12)',
    },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          minHeight: '100vh',
          color: themeParam.palette.text.primary,
          background:
            themeParam.palette.mode === 'dark'
              ? 'radial-gradient(circle at 20% 0%, rgba(139, 157, 255, 0.2), transparent 35%), radial-gradient(circle at 80% 10%, rgba(95, 225, 194, 0.15), transparent 30%), linear-gradient(160deg, #0b1020 0%, #111833 100%)'
              : 'radial-gradient(circle at 15% 0%, rgba(78, 99, 216, 0.14), transparent 35%), radial-gradient(circle at 88% 10%, rgba(45, 159, 138, 0.12), transparent 28%), linear-gradient(160deg, #f8faff 0%, #e9efff 100%)',
        },
      }),
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme: cardTheme }) => ({
          border: `1px solid ${cardTheme.palette.divider}`,
          boxShadow:
            cardTheme.palette.mode === 'dark'
              ? '0 18px 35px rgba(0,0,0,0.25)'
              : '0 14px 26px rgba(20, 40, 120, 0.10)',
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 14,
          minHeight: 36,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 999,
        },
      },
    },
  },
  });
}
