import { sendMessage, sendAdminNotification } from './bot-api'

const WEBAPP_URL = 'https://tzektaa83m4oijp2.vercel.app/'
const ADMIN_ID = 541646526

export async function handleStartCommand(userId: number, firstName: string, username: string) {
  // Приветствие пользователя
  const welcomeMessage = `Привет, ${firstName}! 👋 Добро пожаловать в наш барбершоп.`
  await sendMessage(userId, welcomeMessage)

  // Отправка кнопки со ссылкой на WebApp
  const webAppButton = JSON.stringify({
    inline_keyboard: [
      [{ text: "Записаться на стрижку", web_app: { url: WEBAPP_URL } }]
    ]
  })
  await sendMessage(userId, "Нажмите на кнопку ниже, чтобы открыть приложение для записи:", {
    reply_markup: webAppButton
  })

  // Уведомление администратора
  const adminNotification = `🆕 Новый пользователь запустил бота:
Имя: ${firstName}
Username: @${username}
User ID: ${userId}`
  await sendAdminNotification(adminNotification)
}

