// components/ProductCard.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

type Props = {
    id: string
    title: string
    price: number
    image?: string
    brand?: string
    onQuickView?: () => void
}

export default function ProductCard({ id, title, price, image, brand, onQuickView }: Props) {
    const { user, profile } = useAuth()
    const { addToCart } = useCart()
    const router = useRouter()

    const isSeller = profile?.role === 'seller'

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (!user) {
            router.push('/login')
            return
        }

        // ❌ ЕСЛИ ПРОДАВЕЦ — НЕ ДОБАВЛЯЕМ В КОРЗИНУ
        if (isSeller) {
            alert('Администратор не может добавлять товары в корзину')
            return
        }

        addToCart({
            id,
            title,
            price,
            image,
            brand
        })
    }

    return (
        <div
            className="group bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-red-600 transition duration-300 cursor-pointer"
            onClick={onQuickView}
        >
            <div className="relative overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-500"
                    />
                ) : (
                    <div className="w-full h-[320px] bg-neutral-800 flex flex-col items-center justify-center">
                        <svg
                            className="w-16 h-16 text-neutral-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        {brand && (
                            <span className="mt-4 text-neutral-600 text-sm uppercase tracking-[0.2em] font-bold">
                                {brand}
                            </span>
                        )}
                    </div>
                )}

                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 text-xs uppercase font-bold">
                    В наличии
                </div>

                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="px-6 py-3 bg-red-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition transform translate-y-2 group-hover:translate-y-0 duration-300">
                        Быстрый просмотр
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <div className="mt-4 flex items-center gap-4">
                    <span className="text-3xl font-black text-red-500">
                        {price.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="text-gray-500 line-through">
                        {Math.round(price * 1.3).toLocaleString('ru-RU')} ₽
                    </span>
                </div>
                <p className="mt-5 text-gray-400 leading-7">
                    Высококачественная автозапчасть с длительным сроком службы и стабильной производительностью.
                </p>

                {/* ❌ КНОПКА СКРЫТА ДЛЯ ПРОДАВЦА */}
                {!isSeller ? (
                    <button
                        className="mt-8 w-full bg-red-600 hover:bg-red-700 transition py-4 uppercase font-bold tracking-wide text-white"
                        onClick={handleAddToCart}
                    >
                        {user ? 'В корзину' : 'Войдите, чтобы добавить'}
                    </button>
                ) : (
                    <div className="mt-8 w-full py-4 bg-neutral-700 text-gray-400 text-center uppercase font-bold tracking-wide cursor-not-allowed">
                        Только для покупателей
                    </div>
                )}
            </div>
        </div>
    )
}