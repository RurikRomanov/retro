"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const galleryItems = [
  {
    id: 1,
    title: "Классическая стрижка",
    image: "/placeholder.svg?height=400&width=300",
    category: "Стрижки"
  },
  {
    id: 2,
    title: "Оформление бороды",
    image: "/placeholder.svg?height=400&width=300",
    category: "Борода"
  },
  {
    id: 3,
    title: "Королевское бритье",
    image: "/placeholder.svg?height=400&width=300",
    category: "Бритье"
  },
  // Добавьте больше работ по необходимости
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Наши работы
          <span className="block text-lg text-red-600 mt-2">примеры стрижек</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="relative h-80 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm">{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            {selectedImage && (
              <div className="relative h-[600px]">
                <Image
                  src={selectedImage}
                  alt="Увеличенное изображение"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

