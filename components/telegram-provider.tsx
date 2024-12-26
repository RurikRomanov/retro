"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getTelegramApp, initializeTelegramApp, User } from "@/utils/telegram"
import { ErrorBoundary } from "@/components/error-boundary"

interface TelegramContextType {
  isInitialized: boolean
  error: string | null
  user: User | null
  updateState: (updates: Partial<TelegramContextType>) => void
  handleError: (error: unknown) => void
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined)

function TelegramProviderInner({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TelegramContextType>({
    isInitialized: false,
    error: null,
    user: null,
    updateState: () => {},
    handleError: () => {}
  })

  const handleError = (error: unknown) => {
    setState(prevState => ({
      ...prevState,
      error: error instanceof Error ? error.message : String(error)
    }))
    console.error('Telegram Provider Error:', error)
  }

  const updateState = (updates: Partial<TelegramContextType>) => {
    try {
      if (typeof updates === 'object' && updates !== null) {
        setState(prevState => ({
          ...prevState,
          ...updates
        }))
      } else {
        throw new Error('Invalid state update: updates must be an object')
      }
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    const initializeTelegram = async () => {
      try {
        console.log("TelegramProviderInner: Initializing Telegram WebApp...")
        await initializeTelegramApp()
        console.log("TelegramProviderInner: Telegram WebApp initialized successfully")
        
        const tg = getTelegramApp()
        if (tg?.initDataUnsafe?.user) {
          updateState({ user: tg.initDataUnsafe.user as User })
        }
        
        updateState({ isInitialized: true })
      } catch (error) {
        handleError(error)
      }
    }

    initializeTelegram()
  }, [])

  const value = {
    ...state,
    updateState,
    handleError
  }

  if (!state.isInitialized) {
    console.log("TelegramProviderInner: Not initialized, showing loading spinner")
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--tg-theme-bg-color,#ffffff)]">
        <div className="w-8 h-8 border-2 border-[var(--tg-theme-button-color,#3390ec)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  console.log("TelegramProviderInner: Initialized, rendering children")
  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}

export function TelegramProvider({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <TelegramProviderInner>{children}</TelegramProviderInner>
    </ErrorBoundary>
  )
}

export const useTelegram = () => {
  const context = useContext(TelegramContext)
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider')
  }
  return context
}

