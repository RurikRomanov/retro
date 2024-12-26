import { Star } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    id: 1,
    name: "Александр",
    rating: 5,
    text: "Отличный барбершоп! Мастер Мусыч - настоящий профессионал своего дела. Всегда доволен результатом.",
    date: "15.03.2024"
  },
  {
    id: 2,
    name: "Дмитрий",
    rating: 5,
    text: "Хожу уже больше года, ни разу не пожалел. Отличная атмосфера и качество работы.",
    date: "10.03.2024"
  },
  {
    id: 3,
    name: "Игорь",
    rating: 4,
    text: "Приятная атмосфера, профессиональный подход. Рекомендую!",
    date: "05.03.2024"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Отзывы
          <span className="block text-lg text-red-600 mt-2">что говорят наши клиенты</span>
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{testimonial.text}</p>
                  </CardContent>
                  <CardFooter>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

