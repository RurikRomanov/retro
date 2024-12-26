"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Smile } from 'lucide-react'
import { getTelegramApp, showAlert } from '@/utils/telegram'

export function EmojiStatusManager() {
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    checkEmojiStatusAccess()
  }, [])

  const checkEmojiStatusAccess = () => {
    const tg = getTelegramApp()
    if (tg) {
      tg.requestEmojiStatusAccess((result) => {
        setHasAccess(result)
      })
    }
  }

  const setEmojiStatus = () => {
    const tg = getTelegramApp()
    if (tg && hasAccess) {
      // Replace with your custom emoji ID
      const customEmojiId = '5368324170671202286'
      tg.setEmojiStatus(customEmojiId, {
        duration: 3600 // Set status for 1 hour
      }, (result) => {
        if (result) {
          showAlert({
            title: "Успех",
            message: "Статус с эмодзи установлен",
            buttons: [{ id: "ok", text: "OK", type: "ok" }]
          })
        } else {
          showAlert({
            title: "Ошибка",
            message: "Не удалось установить статус с эмодзи",
            buttons: [{ id: "ok", text: "OK", type: "ok" }]
          })
        }
      })
    }
  }

  if (!hasAccess) return null

  return (
    <Button onClick={setEmojiStatus} variant="outline" size="icon" className="fixed bottom-4 right-4">
      <Smile className="h-4 w-4" />
    </Button>
  )
}

