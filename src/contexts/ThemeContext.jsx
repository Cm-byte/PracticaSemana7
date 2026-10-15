import { useContext } from 'react'
import ThemeContext from './theme-context.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('taskflow-theme', 'claro')

  function toggleTheme() {
    setTheme((current) =>
      current === 'claro' ? 'oscuro' : 'claro'
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// This hook must be exported alongside the provider for consumers to access the context.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error(
      'useTheme debe utilizarse dentro de ThemeProvider'
    )
  }

  return context
}
