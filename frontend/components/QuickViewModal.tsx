// components/QuickViewModal.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

type Product = {
    id?: string
    title: string
    price: number
    image?: string
    description?: string
    brand?: string
    category?: string
}

type Props = {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: Props) {
    const { addToCart } = useCart()
    const { profile } = useAuth()
    const [quantity, setQuantity] = useState(1)
    const prevIsOpen = useRef(isOpen)

    const isSeller = profile?.role === 'seller'

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen && !prevIsOpen.current) {
            setQuantity(1)
        }
        prevIsOpen.current = isOpen
    }, [isOpen])

    if (!isOpen || !product) return null

    const handleAddToCart = (): void => {
        if (isSeller) {
            alert('Администратор не может добавлять товары в корзину')
            onClose()
            return
        }

        const productId = product.id || Date.now().toString()

        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: productId,
                title: product.title,
                price: product.price,
                image: product.image,
                brand: product.brand
            })
        }
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className="relative bg-neutral-900 border border-neutral-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition p-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-square bg-black">
                        <div className="w-full h-full bg-neutral-800 flex flex-col items-center justify-center">
                            <svg
                                className="w-24 h-24 text-neutral-700"
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
                            {product.brand && (
                                <span className="mt-6 text-neutral-600 text-lg uppercase tracking-[0.2em] font-bold">
                                    {product.brand}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="p-8 md:p-10 flex flex-col justify-center">
                        {product.brand && (
                            <p className="text-red-500 text-sm uppercase tracking-wider mb-2">
                                {product.brand}
                            </p>
                        )}

                        <h2 className="text-3xl font-bold text-white mb-2">
                            {product.title}
                        </h2>

                        {product.category && (
                            <p className="text-gray-400 mb-6">
                                Категория: {product.category}
                            </p>
                        )}

                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-4xl font-black text-red-500">
                                {(product.price * quantity).toLocaleString('ru-RU')} ₽
                            </span>
                            {quantity === 1 && (
                                <span className="text-gray-500 line-through text-xl">
                                    {Math.round(product.price * 1.3).toLocaleString('ru-RU')} ₽
                                </span>
                            )}
                        </div>

                        <p className="text-gray-400 leading-7 mb-8">
                            {product.description || 'Высококачественная автозапчасть с длительным сроком службы. Соответствует спецификациям OEM.'}
                        </p>

                        {!isSeller ? (
                            <>
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
                                    className="w-full bg-red-600 hover:bg-red-700 transition py-5 uppercase font-bold tracking-wide text-white text-lg"
                                >
                                    Добавить в корзину {(product.price * quantity).toLocaleString('ru-RU')} ₽
                                </button>
                            </>
                        ) : (
                            <div className="w-full py-5 bg-neutral-700 text-gray-400 text-center uppercase font-bold tracking-wide text-lg rounded cursor-not-allowed">
                                Только для покупателей
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t border-neutral-800">
                            <div className="flex items-center gap-3 text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-green-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-sm">В наличии. Быстрая доставка.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}