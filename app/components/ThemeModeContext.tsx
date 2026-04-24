'use client';

import * as React from 'react';
import { ThemeMode } from '@/app/theme';

type ThemeModeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const ThemeModeContext = React.createContext<ThemeModeContextValue | undefined>(undefined);

export function ThemeModeProvider({
  value,
  children,
}: {
  value: ThemeModeContextValue;
  children: React.ReactNode;
}) {
  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const context = React.useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return context;
}
