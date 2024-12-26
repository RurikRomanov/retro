import Image from "next/image"
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const masters = [
  {
    name: "Мусыч",
    specialty: "Главный мастер",
    experience: "7 лет",
    description: "Специалист по креативным стрижкам и оформлению бороды",
    rating: 5,
    isMain: true
  },
  {
    name: "Александр",
    specialty: "Барбер",
    experience: "5 лет",
    rating: 4.8,
    isMain: false
  },
  {
    name: "Михаил",
    specialty: "Барбер-стилист",
    experience: "3 года",
    rating: 4.7,
    isMain: false
  }
]

export function MastersSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Наши мастера
          <span className="block text-lg text-red-600 mt-2">профессионалы своего дела</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {masters.map((master) => (
            <Card 
              key={master.name} 
              className={`overflow-hidden group hover:shadow-xl transition-shadow duration-300
                         ${master.isMain ? 'ring-2 ring-red-600' : ''}`}
            >
              <CardHeader className="p-0">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=256&width=384"
                    alt={master.name}
                    width={384}
                    height={256}
                    className="object-cover w-full h-full"
                  />
                  {master.isMain && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      TOP мастер
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{master.name}</h3>
                <p className="text-red-600 mb-1">{master.specialty}</p>
                <p className="text-gray-600 mb-4">Опыт: {master.experience}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(master.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {master.rating}
                  </span>
                </div>
                {master.description && (
                  <p className="text-gray-600 mb-4">{master.description}</p>
                )}
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Записаться
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

