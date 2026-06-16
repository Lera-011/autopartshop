// app/cart/page.tsx
'use client'

import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()
    const { user } = useAuth()

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-neutral-950 pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Корзина пуста</h1>
                    <p className="text-gray-400 mb-8">Добавьте товары в корзину, чтобы продолжить</p>
                    <Link href="/" className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider transition">
                        Перейти в каталог
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Корзина</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Список товаров */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-neutral-900 border border-neutral-800 p-4 flex gap-4 rounded-lg">
                                <div className="w-24 h-24 bg-neutral-800 flex items-center justify-center flex-shrink-0 rounded">
                                    <svg className="w-12 h-12 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                            {item.brand && <p className="text-gray-500 text-sm">{item.brand}</p>}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-500 hover:text-red-500 transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 border border-neutral-700 text-gray-400 hover:text-white hover:border-red-600 flex items-center justify-center transition rounded"
                                            >
                                                -
                                            </button>
                                            <span className="text-white w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 border border-neutral-700 text-gray-400 hover:text-white hover:border-red-600 flex items-center justify-center transition rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-red-500 font-bold text-xl">
                                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Итого */}
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg h-fit sticky top-32">
                        <h2 className="text-xl font-bold text-white mb-4">Итого</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-400">
                                <span>Товаров ({totalItems})</span>
                                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Доставка</span>
                                <span className="text-green-500">Бесплатно</span>
                            </div>
                            <div className="border-t border-neutral-800 pt-4 mt-4">
                                <div className="flex justify-between text-white font-bold text-xl">
                                    <span>К оплате</span>
                                    <span className="text-red-500">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                                </div>
                            </div>
                        </div>

                        {/* ✅ КНОПКА ОФОРМЛЕНИЯ ЗАКАЗА */}
                        {user ? (
                            <Link
                                href="/checkout"
                                className="block w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider transition text-center rounded-lg"
                            >
                                Оформить заказ
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="block w-full py-4 bg-neutral-700 hover:bg-neutral-600 text-white font-bold uppercase tracking-wider transition text-center rounded-lg"
                            >
                                Войдите, чтобы оформить заказ
                            </Link>
                        )}

                        <Link href="/" className="block text-center mt-4 text-gray-500 hover:text-white transition text-sm">
                            ← Продолжить покупки
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}