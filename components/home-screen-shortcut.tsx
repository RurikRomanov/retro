"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { getTelegramApp, showAlert } from '@/utils/telegram'

export function HomeScreenShortcut() {
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    checkHomeScreenStatus()
  }, [])

  const checkHomeScreenStatus = () => {
    const tg = getTelegramApp()
    if (tg) {
      tg.checkHomeScreenStatus((status) => {
        setIsAdded(status)
      })
    }
  }

  const addToHomeScreen = () => {
    const tg = getTelegramApp()
    if (tg) {
      tg.addToHomeScreen()
      tg.onEvent('homeScreenAdded', () => {
        setIsAdded(true)
        showAlert({
          title: "Успех",
          message: "Приложение добавлено на главный экран",
          buttons: [{ id: "ok", text: "OK", type: "ok" }]
        })
      })
    }
  }

  if (isAdded) return null

  return (
    <Button onClick={addToHomeScreen} variant="outline" size="icon">
      <Plus className="h-4 w-4" />
    </Button>
  )
}

