// app/contacts/page.tsx
export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-neutral-950 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Контакты</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Информация */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
                        <h2 className="text-xl font-bold text-white mb-4">ФИКСавто-плюс</h2>

                        <div className="space-y-4 text-gray-300">
                            <p>📞 Телефон: <a href="tel:+79788366059" className="text-white hover:text-red-500 transition">+7 (978) 836-60-59</a></p>
                            <p>✉️ Email: <a href="mailto:info@autoparts.ru" className="text-white hover:text-red-500 transition">info@autoparts.ru</a></p>
                            <p>📍 Адрес: г. Севастополь, Фиолентовское шоссе, 6</p>
                            <p>🕒 Режим работы: ежедневно 09:00–18:00</p>
                        </div>

                        {/* Соцсети */}
                        <div className="mt-6 pt-6 border-t border-neutral-800">
                            <h3 className="text-lg font-bold text-white mb-4">Мы в соцсетях</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://t.me/FIXauto_plus"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    Telegram
                                </a>
                                <a
                                    href="https://vk.com/sevasakum"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    ВКонтакте
                                </a>
                                <a
                                    href="https://wa.me/79788366059"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Яндекс Карта */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden h-[400px] min-h-[400px]">
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
        </div>
    )
}