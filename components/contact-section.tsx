import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function ContactSection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Контакты
          <span className="block text-lg text-red-600 mt-2">ждем вас в гости</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Адрес</h3>
                <p className="text-gray-300">ул. Примерная, 123, Москва</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Телефон</h3>
                <p className="text-gray-300">+7 (999) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-300">info@pempo.ru</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Режим работы</h3>
                <p className="text-gray-300">Пн-Вс: 10:00 - 22:00</p>
              </div>
            </div>
          </div>
          <div className="h-[400px] bg-gray-800 rounded-lg">
            {/* Here you would integrate your map component */}
            <div className="w-full h-full rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                Карта
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

