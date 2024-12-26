import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Script from 'next/script'
import { TelegramProvider } from "@/components/telegram-provider"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Плантатор | Telegram Web App",
  description: "Мини-приложение Telegram",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <TelegramProvider>
            <div id="app" className="bg-[var(--tg-theme-bg-color,#ffffff)] text-[var(--tg-theme-text-color,#000000)]">
              {children}
            </div>
          </TelegramProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

