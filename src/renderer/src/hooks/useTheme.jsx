// This file is kept for compatibility but functionality has been removed
// as dark mode has been disabled for StoryMagic app (which is for kids)

import { createContext, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Simply render children without any theme context
  return children
}

export function useTheme() {
  // Return empty values as the theme functionality is removed
  return { 
    darkMode: false,
    toggleDarkMode: () => {},
    setThemeMode: () => {}
  }
}
