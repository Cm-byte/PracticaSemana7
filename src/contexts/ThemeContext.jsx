import { useState } from 'react'
import { ThemeContext } from './theme.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('claro')

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'claro' ? 'oscuro' : 'claro'
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
