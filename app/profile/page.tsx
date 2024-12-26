import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"

// Это заглушка для данных пользователя. В реальном приложении эти данные должны приходить с сервера.
const userData = {
  name: "Иван Иванов",
  email: "ivan@example.com",
  phone: "+7 (999) 123-45-67",
  appointments: [
    { id: 1, service: "Мужская стрижка", date: "2024-03-25", time: "14:00" },
    { id: 2, service: "Оформление бороды", date: "2024-04-10", time: "11:00" },
  ]
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Личный кабинет</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Личные данные</h2>
          <p><strong>Имя:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Телефон:</strong> {userData.phone}</p>
          <Button className="mt-4">Редактировать профиль</Button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Мои записи</h2>
          {userData.appointments.map(appointment => (
            <div key={appointment.id} className="mb-4 p-4 border rounded">
              <p><strong>Услуга:</strong> {appointment.service}</p>
              <p><strong>Дата:</strong> {appointment.date}</p>
              <p><strong>Время:</strong> {appointment.time}</p>
              <Button variant="outline" className="mt-2">Отменить запись</Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

