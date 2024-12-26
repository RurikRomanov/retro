import { notFound } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { BookingForm } from "@/components/booking-form"

const services = [
  {
    slug: "muzhskaya-strizhka",
    title: "Мужская стрижка",
    description: "Профессиональная мужская стрижка с учетом индивидуальных особенностей и пожеланий клиента.",
    price: "1500 ₽",
    duration: "60 минут"
  },
  {
    slug: "oformlenie-borody",
    title: "Оформление бороды",
    description: "Моделирование и стрижка бороды, придание ей желаемой формы и ухоженного вида.",
    price: "800 ₽",
    duration: "30 минут"
  },
  {
    slug: "kompleks",
    title: "Комплекс",
    description: "Полный комплекс услуг, включающий стрижку, оформление бороды и укладку.",
    price: "2000 ₽",
    duration: "90 минут"
  },
  {
    slug: "korolevskoe-britye",
    title: "Королевское бритье",
    description: "Классическое бритье опасной бритвой с использованием горячих полотенец и ароматных масел.",
    price: "1200 ₽",
    duration: "45 минут"
  }
]

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-xl mb-4">{service.description}</p>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-2xl font-bold text-red-600 mb-2">{service.price}</p>
          <p className="text-gray-600">Продолжительность: {service.duration}</p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Записаться на услугу</h2>
        <BookingForm />
      </main>
    </div>
  )
}

