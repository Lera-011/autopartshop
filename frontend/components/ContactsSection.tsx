// components/ContactsSection.tsx
'use client'

export default function ContactsSection() {
    return (
        <section id="contacts" className="py-16 md:py-24 bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                    Контакты
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Информация */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
                        <h3 className="text-xl font-bold text-white mb-4">ФИКСавто-плюс</h3>

                        <div className="space-y-4 text-gray-300">
                            <p>
                                <span className="font-medium text-white">📞 Телефон:</span>{' '}
                                <a href="tel:+79788366059" className="hover:text-red-500 transition">
                                    +7 (978) 836-60-59
                                </a>
                            </p>
                            <p>
                                <span className="font-medium text-white">✉️ Email:</span>{' '}
                                <a href="mailto:info@autoparts.ru" className="hover:text-red-500 transition">
                                    info@autoparts.ru
                                </a>
                            </p>
                            <p>
                                <span className="font-medium text-white">📍 Адрес:</span>{' '}
                                г. Севастополь, Фиолентовское шоссе, 6
                            </p>
                            <p>
                                <span className="font-medium text-white">🕒 Режим работы:</span>{' '}
                                ежедневно 09:00–18:00
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-neutral-800">
                            <h4 className="text-white font-medium mb-3">Мы в соцсетях</h4>
                            <div className="flex gap-3">
                                <a
                                    href="https://t.me/FIXauto_plus"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white text-sm rounded-md transition"
                                >
                                    Telegram
                                </a>
                                <a
                                    href="https://vk.com/sevasakum"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white text-sm rounded-md transition"
                                >
                                    ВКонтакте
                                </a>
                                <a
                                    href="https://wa.me/79788366059"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white text-sm rounded-md transition"
                                >
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Карта */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden h-[400px]">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=33.475507%2C44.596007&mode=poi&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D33784362871&source=mapframe&utm_source=mapframe&z=12"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            className="w-full h-full"
                            title="Яндекс Карта - ФИКСавто-плюс"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}