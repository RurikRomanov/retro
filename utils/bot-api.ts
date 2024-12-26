const BOT_TOKEN = '6839877873:AAHs6IlMsGh4IN6FM2BKA1XQcrLcrwmVHqc'
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`
const ADMIN_ID = 541646526
const WEBAPP_URL = 'https://tzektaa83m4oijp2.vercel.app/'

export async function sendMessage(chatId: number, text: string, extra?: any) {
  try {
    const response = await fetch(`${API_BASE}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        ...extra
      })
    })
    return await response.json()
  } catch (error) {
    console.error('Error sending message:', error)
    return null
  }
}

export async function sendAdminNotification(text: string, bookingId?: number) {
  let message = text
  if (bookingId) {
    const openBookingUrl = `${WEBAPP_URL}?booking=${bookingId}`
    message += `\n\n<a href="${openBookingUrl}">Открыть запись</a>`
  }
  return sendMessage(ADMIN_ID, message, { parse_mode: 'HTML' })
}

export async function getBookings() {
  // В реальном приложении здесь был бы запрос к базе данных
  // Для примера возвращаем моковые данные
  return [
    { id: 1, name: "Иван Иванов", service: "Стрижка", date: "2024-03-25", time: "14:00" },
    { id: 2, name: "Петр Петров", service: "Борода", date: "2024-03-26", time: "15:30" },
    { id: 3, name: "Сергей Сергеев", service: "Комплекс", date: "2024-03-24", time: "10:00" },
    { id: 4, name: "Алексей Алексеев", service: "Стрижка", date: "2024-03-27", time: "11:00" },
  ]
}

