"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBookings, sendAdminNotification } from '@/utils/bot-api'
import { showAlert, haptics } from '@/utils/telegram'
import { format, parseISO, isAfter } from 'date-fns'

interface Booking {
  id: number;
  name: string;
  service: string;
  date: string;
  time: string;
}

export function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  useEffect(() => {
    if (dateFilter) {
      const filtered = bookings.filter(booking => booking.date === dateFilter)
      setFilteredBookings(filtered)
    } else {
      setFilteredBookings(bookings)
    }
  }, [dateFilter, bookings])

  const fetchBookings = async () => {
    setIsLoading(true)
    try {
      const data = await getBookings()
      setBookings(data)
      setFilteredBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      await showAlert({
        title: "Ошибка",
        message: "Не удалось загрузить список записей",
        buttons: [{ id: "ok", text: "OK", type: "ok" }]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendReminder = async (booking: Booking) => {
    haptics.impact('light')
    try {
      await sendAdminNotification(
        `Напоминание о записи:\n\n` +
        `Клиент: ${booking.name}\n` +
        `Услуга: ${booking.service}\n` +
        `Дата: ${booking.date}\n` +
        `Время: ${booking.time}`
      )
      haptics.notification('success')
      await showAlert({
        title: "Успех",
        message: "Напоминание отправлено",
        buttons: [{ id: "ok", text: "OK", type: "ok" }]
      })
    } catch (error) {
      console.error('Error sending reminder:', error)
      haptics.notification('error')
      await showAlert({
        title: "Ошибка",
        message: "Не удалось отправить напоминание",
        buttons: [{ id: "ok", text: "OK", type: "ok" }]
      })
    }
  }

  const isBookingCompleted = (booking: Booking) => {
    const bookingDateTime = parseISO(`${booking.date}T${booking.time}`)
    return isAfter(new Date(), bookingDateTime)
  }

  const renderBookingList = (bookings: Booking[], showCompleted: boolean) => {
    return bookings
      .filter(booking => isBookingCompleted(booking) === showCompleted)
      .map((booking) => (
        <div key={booking.id} className="p-4 bg-white rounded-lg shadow mb-4">
          <p><strong>Клиент:</strong> {booking.name}</p>
          <p><strong>Услуга:</strong> {booking.service}</p>
          <p><strong>Дата:</strong> {booking.date}</p>
          <p><strong>Время:</strong> {booking.time}</p>
          {!showCompleted && (
            <Button onClick={() => handleSendReminder(booking)} className="mt-2">
              Отправить напоминание
            </Button>
          )}
        </div>
      ))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Панель администратора</h2>
      <div className="flex items-center space-x-2">
        <Button onClick={fetchBookings} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Обновить список записей'}
        </Button>
        <Label htmlFor="date-filter">Фильтр по дате:</Label>
        <Input
          id="date-filter"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Предстоящие записи</TabsTrigger>
          <TabsTrigger value="completed">Завершенные записи</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {renderBookingList(filteredBookings, false)}
        </TabsContent>
        <TabsContent value="completed">
          {renderBookingList(filteredBookings, true)}
        </TabsContent>
      </Tabs>
    </div>
  )
}

