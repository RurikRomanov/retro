'use client'

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Appointment {
  id: number
  client: string
  service: string
  date: string
  time: string
}

const appointments: Appointment[] = [
  { id: 1, client: "Иван Иванов", service: "Мужская стрижка", date: "2024-03-25", time: "14:00" },
  { id: 2, client: "Петр Петров", service: "Оформление бороды", date: "2024-03-25", time: "15:00" },
  { id: 3, client: "Сергей Сергеев", service: "Комплекс", date: "2024-03-26", time: "11:00" },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Панель администратора</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Записи на сегодня</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Клиент</TableHead>
                <TableHead>Услуга</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Время</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map(appointment => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.client}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Изменить</Button>
                    <Button variant="destructive" size="sm">Отменить</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}

