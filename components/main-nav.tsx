"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: "/", label: "Главная" },
    { href: "/services", label: "Услуги" },
    { href: "/masters", label: "Мастера" },
    { href: "/gallery", label: "Галерея" },
    { href: "/contacts", label: "Контакты" },
  ]

  return (
    <nav className="bg-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link 
            href="/" 
            className="text-3xl font-extrabold text-red-600 transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            style={{ textShadow: '2px 2px 0 #000' }}
          >
            Pempo
            <span className="block text-sm font-normal text-white">барбершоп</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-red-500 transform hover:scale-110 transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 transform hover:scale-105 
                       transition-all duration-300 hover:shadow-lg"
            >
              Записаться
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-2 hover:text-red-500"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="block py-2 text-red-500 font-bold"
              onClick={() => setIsOpen(false)}
            >
              Записаться
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

