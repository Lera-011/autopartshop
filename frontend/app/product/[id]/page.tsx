'use client'

import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Link from 'next/link'
import { getProductById, products } from '@/data/products'

export default function ProductPage() {
    const params = useParams()
    const productId = params.id as string
    const product = getProductById(productId)

    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    if (!product) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Товар не найден</h1>
                    <Link href="/" className="inline-block px-6 py-3 bg-red-600 text-white hover:bg-red-700 transition">
                        Вернуться на главную
                    </Link>
                </div>
            </div>
        )
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart({
                title: product.title,
                price: product.price,
                image: product.image,
                brand: product.brand
            })
        }
        alert(`Добавлено ${quantity} × ${product.title} в корзину`)
    }

    return (
        <div className="min-h-screen bg-neutral-950 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link href="/" className="text-gray-500 hover:text-red-500 transition">
                        ← Назад в каталог
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="aspect-square bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                        <div className="w-full h-full bg-neutral-800 flex flex-col items-center justify-center">
                            <svg className="w-32 h-32 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {product.brand && (
                                <span className="mt-6 text-neutral-600 text-lg uppercase tracking-[0.2em] font-bold">
                                    {product.brand}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        {product.brand && (
                            <p className="text-red-500 text-sm uppercase tracking-wider mb-2">
                                {product.brand}
                            </p>
                        )}

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {product.title}
                        </h1>

                        {product.category && (
                            <p className="text-gray-500 mb-6">
                                Категория: {product.category}
                            </p>
                        )}

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-5xl font-black text-red-500">
                                {product.price.toLocaleString('ru-RU')} ₽
                            </span>
                            <span className="text-gray-500 line-through text-xl">
                                {Math.round(product.price * 1.3).toLocaleString('ru-RU')} ₽
                            </span>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-gray-400 uppercase text-sm font-bold">
                                Количество:
                            </span>
                            <div className="flex items-center border border-neutral-800">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 text-gray-400 hover:text-white hover:bg-neutral-800 transition"
                                >
                                    -
                                </button>
                                <span className="px-8 py-2 text-white font-medium border-x border-neutral-800">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 text-gray-400 hover:text-white hover:bg-neutral-800 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full py-5 bg-red-600 hover:bg-red-700 transition uppercase font-bold tracking-wide text-white text-lg"
                        >
                            Добавить в корзину — {(product.price * quantity).toLocaleString('ru-RU')} ₽
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}