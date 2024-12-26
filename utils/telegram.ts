export interface User {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
}

let telegramAppInitialized = false

export const isBrowser = typeof window !== 'undefined'

export const waitForTelegramWebApp = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isBrowser) {
      console.log('Not in browser environment')
      resolve(false)
      return
    }

    if (window.Telegram?.WebApp) {
      console.log('Telegram WebApp already available')
      resolve(true)
      return
    }

    let attempts = 0
    const maxAttempts = 50 // 50 * 200ms = 10 seconds

    console.log('Waiting for Telegram WebApp to become available...')
    const checkInterval = setInterval(() => {
      if (window.Telegram?.WebApp) {
        clearInterval(checkInterval)
        console.log('Telegram WebApp became available')
        resolve(true)
        return
      }

      attempts++
      if (attempts >= maxAttempts) {
        clearInterval(checkInterval)
        console.log('Telegram WebApp did not become available after waiting')
        resolve(false)
      }
    }, 200)
  })
}

export const getTelegramApp = () => {
  if (!isBrowser) {
    console.log('getTelegramApp: Not in browser environment')
    return null
  }
  const app = window.Telegram?.WebApp
  console.log('getTelegramApp:', app ? 'WebApp found' : 'WebApp not found')
  return app
}

export const initializeTelegramApp = async () => {
  console.log('Initializing Telegram WebApp...')
  if (telegramAppInitialized) {
    console.log('Telegram WebApp already initialized')
    return true
  }

  const isAvailable = await waitForTelegramWebApp()
  if (!isAvailable) {
    throw new Error('Telegram WebApp is not available after waiting. Please ensure you are opening this app through Telegram.')
  }

  const tg = getTelegramApp()
  if (!tg) {
    throw new Error('Failed to initialize Telegram WebApp: WebApp object is null')
  }

  try {
    console.log('Setting viewport settings...')
    tg.setViewportSettings({
      height: window.innerHeight
    })
    
    console.log('Calling tg.ready()...')
    tg.ready()
    
    console.log('Enabling closing confirmation...')
    tg.enableClosingConfirmation()

    telegramAppInitialized = true
    console.log('Telegram WebApp initialized successfully')
    return true
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error)
    throw new Error(`Failed to initialize Telegram WebApp: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export const getUserData = (): User | null => {
  const tg = getTelegramApp()
  if (!tg?.initDataUnsafe?.user) return null
  return tg.initDataUnsafe.user as User
}

export const requestLocation = () => {
  return new Promise<{ latitude: number; longitude: number } | null>((resolve) => {
    const tg = getTelegramApp()
    if (!tg) {
      resolve(null)
      return
    }

    tg.LocationManager.getLocation((result) => {
      if (result) {
        resolve(result)
      } else {
        resolve(null)
      }
    }, (error) => {
      console.error('Error requesting location:', error)
      resolve(null)
    })
  })
}

export const requestContact = () => {
  return new Promise<{ phone_number: string } | null>((resolve) => {
    const tg = getTelegramApp()
    if (!tg) {
      resolve(null)
      return
    }

    tg.requestContact((result) => {
      if (result) {
        resolve({ phone_number: result.phone_number })
      } else {
        resolve(null)
      }
    }, (error) => {
      console.error('Error requesting contact:', error)
      resolve(null)
    })
  })
}

export const haptics = {
  impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {
    if (!isBrowser) return
    getTelegramApp()?.HapticFeedback.impactOccurred(style)
  },
  notification: (type: 'error' | 'success' | 'warning') => {
    if (!isBrowser) return
    getTelegramApp()?.HapticFeedback.notificationOccurred(type)
  },
  selection: () => {
    if (!isBrowser) return
    getTelegramApp()?.HapticFeedback.selectionChanged()
  }
}

export const showAlert = async (params: {
  title?: string
  message: string
  buttons?: Array<{
    id: string
    text: string
    type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
  }>
}) => {
  const tg = getTelegramApp()
  if (!tg) return null

  return new Promise((resolve) => {
    tg.showPopup({
      ...params,
      callback: (buttonId) => {
        resolve({ button_id: buttonId })
      }
    })
  })
}

export const showConfirm = async (message: string) => {
  const tg = getTelegramApp()
  if (!tg) return false

  return new Promise<boolean>((resolve) => {
    tg.showConfirm(message, (confirmed) => {
      resolve(confirmed)
    })
  })
}

export const closeMiniApp = () => {
  const tg = getTelegramApp()
  if (tg) {
    tg.close()
  }
}

export const expandMiniApp = () => {
  const tg = getTelegramApp()
  if (tg) {
    tg.expand()
  }
}

export const requestFullscreen = () => {
  const tg = getTelegramApp()
  if (tg) {
    tg.requestFullscreen()
  }
}

export const exitFullscreen = () => {
  const tg = getTelegramApp()
  if (tg) {
    tg.exitFullscreen()
  }
}

export const addToHomeScreen = () => {
  const tg = getTelegramApp()
  if (tg) {
    tg.addToHomeScreen()
  }
}

export const checkHomeScreenStatus = (callback: (isAdded: boolean) => void) => {
  const tg = getTelegramApp()
  if (tg) {
    tg.checkHomeScreenStatus(callback)
  }
}

export const setEmojiStatus = (
  customEmojiId: string,
  params?: { duration?: number },
  callback?: (success: boolean) => void
) => {
  const tg = getTelegramApp()
  if (tg) {
    tg.setEmojiStatus(customEmojiId, params, callback)
  }
}

export const requestEmojiStatusAccess = (callback: (hasAccess: boolean) => void) => {
  const tg = getTelegramApp()
  if (tg) {
    tg.requestEmojiStatusAccess(callback)
  }
}

export const shareMessage = (text: string)=> {
  const tg = getTelegramApp()
  if (tg) {
    tg.shareMessage(text)
  }
}

export const downloadFile = (url: string, filename: string) => {
  const tg = getTelegramApp()
  if (tg) {
    tg.downloadFile(url, filename)
  }
}

export const onThemeChanged = (callback: (colorScheme: 'light' | 'dark') => void) => {
  const tg = getTelegramApp()
  if (tg) {
    tg.onEvent('themeChanged', () => {
      callback(tg.colorScheme)
    })
  }
}

