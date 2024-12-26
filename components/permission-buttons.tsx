"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MapPin, Phone } from 'lucide-react'
import { requestLocation, requestContact, showAlert, haptics } from '@/utils/telegram'
import { useAppHaptics } from '@/hooks/useAppHaptics'

interface PermissionButtonsProps {
  onPhoneReceived?: (phone: string) => void;
  onLocationReceived?: (location: { latitude: number; longitude: number }) => void;
}

export function PermissionButtons({ onPhoneReceived, onLocationReceived }: PermissionButtonsProps) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { buttonPressHaptic, successHaptic, errorHaptic } = useAppHaptics()

  const handleLocationRequest = async () => {
    try {
      setIsLoading(true)
      buttonPressHaptic()
      
      const result = await requestLocation()
      if (result) {
        setLocation(result)
        onLocationReceived?.(result)
        successHaptic()
        await showAlert({
          title: "Успех",
          message: `Получены координаты: ${result.latitude}, ${result.longitude}`,
          buttons: [{ id: "ok", text: "OK", type: "ok" }]
        })
      } else {
        errorHaptic()
        await showAlert({
          title: "Ошибка",
          message: "Не удалось получить геолокацию. Пожалуйста, предоставьте доступ к геолокации.",
          buttons: [{ id: "ok", text: "OK", type: "ok" }]
        })
      }
    } catch (error) {
      errorHaptic()
      console.error('Ошибка при запросе геолокации:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneRequest = async () => {
    try {
      setIsLoading(true)
      buttonPressHaptic()
      
      const result = await requestContact()
      if (result) {
        setPhoneNumber(result.phone_number)
        onPhoneReceived?.(result.phone_number)
        successHaptic()
        await showAlert({
          title: "Успех",
          message: `Получен номер телефона: ${result.phone_number}`,
          buttons: [{ id: "ok", text: "OK", type: "ok" }]
        })
      } else {
        errorHaptic()
        await showAlert({
          title: "Ошибка",
          message: "Не удалось получить номер телефона. Пожалуйста, предоставьте доступ к контактам.",
          buttons: [{ id: "ok", text: "OK", type: "ok" }]
        })
      }
    } catch (error) {
      errorHaptic()
      console.error('Ошибка при запросе номера телефона:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button 
        type="button"
        onClick={handlePhoneRequest}
        disabled={isLoading}
        className="flex items-center gap-2 bg-[var(--tg-theme-secondary-bg-color)]"
      >
        <Phone className="w-4 h-4" />
        {isLoading ? 'Загрузка...' : phoneNumber ? 'Изменить номер телефона' : 'Отправить номер телефона'}
      </Button>
      
      <Button 
        type="button"
        onClick={handleLocationRequest}
        disabled={isLoading}
        className="flex items-center gap-2 bg-[var(--tg-theme-secondary-bg-color)]"
      >
        <MapPin className="w-4 h-4" />
        {isLoading ? 'Загрузка...' : location ? 'Обновить геолокацию' : 'Отправить геолокацию'}
      </Button>

      {location && (
        <div className="text-sm text-gray-600">
          Ваши координаты: {location.latitude}, {location.longitude}
        </div>
      )}
      
      {phoneNumber && (
        <div className="text-sm text-gray-600">
          Ваш номер: {phoneNumber}
        </div>
      )}
    </div>
  )
}

