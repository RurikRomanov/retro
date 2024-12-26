"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PermissionButtons } from "./permission-buttons"
import { showAlert, haptics, getTelegramApp, getUserData } from '@/utils/telegram'
import { useAppHaptics } from '@/hooks/useAppHaptics'
import { sendMessage, sendAdminNotification } from '@/utils/bot-api'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BookingForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("")
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const { successHaptic, errorHaptic, buttonPressHaptic } = useAppHaptics()

  useEffect(() => {
    const tg = getTelegramApp()
    if (!tg) return

    tg.ready()
    tg.BackButton.show()
    tg.BackButton.onClick(() => {
      tg.close()
    })

    const userData = getUserData()
    if (userData) {
      setName(userData.first_name + (userData.last_name ? ` ${userData.last_name}` : ''))
    }

    // Request location using new API
    tg.LocationManager.getLocation((result) => {
      if (result) {
        setLocation(result)
      }
    })

    return () => {
      tg.BackButton.offClick(() => {
        tg.close()
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    buttonPressHaptic()

    if (!name || !service) {
      errorHaptic()
      await showAlert({
        title: "Ошибка",
        message: "Пожалуйста, заполните все обязательные поля",
        buttons: [{ id: "ok", text: "OK", type: "ok" }]
      })
      return
    }

    try {
      const userData = getUserData()
      if (userData?.id) {
        const bookingId = Date.now()

        await sendMessage(
          userData.id,
          `🎉 <b>Новая запись!</b>\n\n` +
          `Клиент: ${name}\n` +
          `Услуга: ${service}\n` +
          (phone ? `Телефон: ${phone}\n` : '') +
          (location ? `Геолокация: ${location.latitude}, ${location.longitude}\n` : '') +
          `\nСпасибо за запись! Мы свяжемся с вами для подтверждения.`
        )

        await sendAdminNotification(
          `📅 <b>Новая запись!</b>\n\n` +
          `Клиент: ${name}\n` +
          `Услуга: ${service}\n` +
          (phone ? `Телефон: ${phone}\n` : '') +
          (location ? `Геолокация: ${location.latitude}, ${location.longitude}\n` : '') +
          `\nПожалуйста, свяжитесь с клиентом для подтверждения записи.`,
          bookingId
        )
      }

      successHaptic()
      await showAlert({
        title: "Успех",
        message: "Запись успешно создана! Мы отправили подтверждение в бот.",
        buttons: [{ id: "ok", text: "OK", type: "ok" }]
      })

      getTelegramApp()?.close()
    } catch (error) {
      errorHaptic()
      await showAlert({
        title: "Ошибка",
        message: "Не удалось создать запись",
        buttons: [{ id: "ok", text: "OK", type: "ok" }]
      })
    }
  }

  const userData = getUserData()

  return (
    <div className="space-y-6">
      {userData && (
        <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow">
          <Avatar>
            {userData.photo_url ? (
              <AvatarImage src={userData.photo_url} alt={userData.first_name} />
            ) : (
              <AvatarFallback>{userData.first_name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{userData.first_name} {userData.last_name}</p>
            {userData.username && (
              <p className="text-sm text-muted-foreground">@{userData.username}</p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ваше имя</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Иван" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Выберите услугу</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Выберите услугу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="haircut">Стрижка</SelectItem>
              <SelectItem value="beard">Борода</SelectItem>
              <SelectItem value="complex">Комплекс</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <PermissionButtons 
          onPhoneReceived={setPhone} 
          onLocationReceived={setLocation}
        />

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground"
        >
          Записаться
        </Button>
      </form>
    </div>
  )
}

