import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Barbershop interior"
          width={1920}
          height={600}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full">
        <div className="flex flex-col justify-center h-full max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Классический барбершоп в ретро стиле
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Мужские стрижки, оформление бороды и традиционное бритье опасной бритвой
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Записаться онлайн
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Наши услуги
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

