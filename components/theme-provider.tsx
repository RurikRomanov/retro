"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { getTelegramApp } from '@/utils/telegram'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'light',
  setTheme: () => {},
})

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const tg = getTelegramApp()
    if (tg) {
      setTheme(tg.colorScheme as Theme)

      tg.onEvent('themeChanged', () => {
        setTheme(tg.colorScheme as Theme)
      })
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

