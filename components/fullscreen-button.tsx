"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from 'lucide-react'
import { getTelegramApp } from '@/utils/telegram'

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const tg = getTelegramApp()
    if (tg) {
      tg.onEvent('fullscreenChanged', (isFullscreen) => {
        setIsFullscreen(isFullscreen)
      })
    }
  }, [])

  const toggleFullscreen = () => {
    const tg = getTelegramApp()
    if (tg) {
      if (isFullscreen) {
        tg.exitFullscreen()
      } else {
        tg.requestFullscreen()
      }
    }
  }

  return (
    <Button onClick={toggleFullscreen} variant="outline" size="icon">
      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
    </Button>
  )
}

