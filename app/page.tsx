"use client"

import { useEffect, useState } from 'react'
import { BookingForm } from "@/components/booking-form"
import { AdminPanel } from "@/components/admin-panel"
import { FullscreenButton } from "@/components/fullscreen-button"
import { HomeScreenShortcut } from "@/components/home-screen-shortcut"
import { EmojiStatusManager } from "@/components/emoji-status-manager"
import { getUserData } from '@/utils/telegram'
import { useTelegram } from "@/components/telegram-provider"

const ADMIN_ID = 541646526

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false)
  const { isInitialized } = useTelegram()

  useEffect(() => {
    if (isInitialized) {
      const userData = getUserData()
      if (userData && userData.id === ADMIN_ID) {
        setIsAdmin(true)
      }
    }
  }, [isInitialized])

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        {isAdmin ? "Панель администратора" : "Запись на стрижку"}
      </h1>
      <div className="flex justify-end space-x-2 mb-4">
        <FullscreenButton />
        <HomeScreenShortcut />
      </div>
      {isAdmin ? <AdminPanel /> : <BookingForm />}
      <EmojiStatusManager />
    </div>
  )
}

