// components/StoreInfo.tsx
'use client'

import { useState } from 'react'

export default function StoreInfo() {
    const [showFullDescription, setShowFullDescription] = useState(false)

    return (
        <section className="py-16 bg-neutral-950">  {/* ✅ УБРАЛИ border-t */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="w-full">
                    {/* Заголовок */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Магазин автозапчастей и автотоваров
                        <span className="text-red-500"> ФИКСавто-плюс</span>
                    </h2>

                    {/* Описание с особенностями внутри */}
                    <div>
                        <p className={`text-gray-300 leading-relaxed text-lg ${!showFullDescription ? 'line-clamp-6' : ''}`}>
                            Магазин автозапчастей и автотоваров ФИКСавто-плюс предлагает широкий ассортимент
                            запчастей для японских, европейских, корейских, китайских и отечественных автомобилей.
                            В наличии моторные масла, аккумуляторы, фильтры, тормозные колодки, свечи зажигания,
                            антифриз и многое другое.
                            <br /><br />
                            <span className="text-white font-medium">Особенности:</span>
                            <br />
                            • Оплата картой
                            <br />
                            • Парковка
                            <br />
                            • Самовывоз
                            <br />
                            • Доставка
                            <br />
                            • Запчасти
                            <br /><br />
                            Компетентные продавцы всегда готовы помочь с выбором. Доставка по городу.
                        </p>
                        <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-red-500 hover:text-red-400 text-sm font-medium transition mt-2 inline-block"
                        >
                            {showFullDescription ? 'Скрыть' : 'Читать полностью →'}
                        </button>
                    </div>

                    {/* Категории */}
                    <div className="mt-10">
                        <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider text-gray-400">
                            Категории товаров
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 text-sm rounded-lg hover:border-red-500/50 transition">Моторные масла</span>
                            <span className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 text-sm rounded-lg hover:border-red-500/50 transition">Аккумуляторы</span>
                            <span className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 text-sm rounded-lg hover:border-red-500/50 transition">Фильтры</span>
                            <span className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 text-sm rounded-lg hover:border-red-500/50 transition">Тормозные колодки</span>
                            <span className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 text-sm rounded-lg hover:border-red-500/50 transition">Свечи зажигания</span>
                            <span className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 text-sm rounded-lg hover:border-red-500/50 transition">Антифриз</span>
                            <span className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 text-sm rounded-lg hover:border-red-500/50 transition">Автолампы</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}