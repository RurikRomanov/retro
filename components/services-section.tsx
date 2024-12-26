import { Button } from "@/components/ui/button"

const services = [
  {
    name: "Мужская стрижка",
    duration: "60 минут",
    price: "1500 ₽",
    description: "Стрижка любой сложности с укладкой",
  },
  {
    name: "Оформление бороды",
    duration: "30 минут",
    price: "800 ₽",
    description: "Моделирование и стрижка бороды",
  },
  {
    name: "Комплекс",
    duration: "90 минут",
    price: "2000 ₽",
    description: "Стрижка + борода + укладка",
  }
]

interface ServicesSectionProps {
  onBookService: () => void;
}

export function ServicesSection({ onBookService }: ServicesSectionProps) {
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div key={service.name} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold">{service.name}</h3>
          <p className="text-gray-600">{service.duration}</p>
          <p className="text-lg font-semibold text-red-600 mt-2">{service.price}</p>
          <p className="text-gray-700 mt-2">{service.description}</p>
          <Button onClick={onBookService} className="mt-4 w-full">
            Записаться
          </Button>
        </div>
      ))}
    </div>
  )
}

