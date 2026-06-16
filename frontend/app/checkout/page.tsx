// app/checkout/page.tsx
'use client'

import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
    const { user, loading } = useAuth()
    const { items, totalPrice, clearCart } = useCart()
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
        if (!loading && user && items.length === 0) {
            router.push('/cart')
        }
    }, [user, loading, items, router])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Имитация отправки заказа
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)

            // Сохраняем заказ в localStorage
            const orders = JSON.parse(localStorage.getItem('orders') || '[]')
            const newOrder = {
                id: (orders.length + 1).toString(),
                userId: user?.id || '1',
                userFullName: user?.full_name || '',
                userEmail: user?.email || '',
                userPhone: user?.phone || '',
                userAddress: 'Самовывоз (г. Севастополь, Фиолентовское шоссе, 6)',
                paymentMethod: paymentMethod,
                items: items.map(item => ({
                    id: item.id,
                    productName: item.title,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: totalPrice,
                status: 'pending',
                comment: 'Самовывоз',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            orders.push(newOrder)
            localStorage.setItem('orders', JSON.stringify(orders))
            setOrderNumber(newOrder.id)
            clearCart()
        }, 1500)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-neutral-400">Загрузка...</div>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-neutral-950 pt-32 pb-16">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-12">
                        <div className="text-6xl mb-4">✅</div>
                        <h1 className="text-3xl font-bold text-white mb-4">Заказ оформлен!</h1>
                        <p className="text-gray-400 mb-6">
                            Спасибо за заказ! В ближайшее время с вами свяжется менеджер для подтверждения.
                        </p>
                        <p className="text-gray-500 text-sm mb-8">
                            Номер заказа: #{orderNumber}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition"
                            >
                                На главную
                            </Link>
                            <Link
                                href="/profile"
                                className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-md transition"
                            >
                                Мои заказы
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Оформление заказа</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Форма */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Контакты */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Контактные данные</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Ваше имя</label>
                                        <input
                                            type="text"
                                            value={user?.full_name || ''}
                                            disabled
                                            className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-md cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Телефон</label>
                                        <input
                                            type="tel"
                                            value={user?.phone || ''}
                                            disabled
                                            className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-md cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-md cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Способ оплаты */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Способ оплаты</h2>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg cursor-pointer hover:bg-neutral-800 transition">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cash"
                                            checked={paymentMethod === 'cash'}
                                            onChange={() => setPaymentMethod('cash')}
                                            className="w-4 h-4 text-red-600 focus:ring-red-600"
                                        />
                                        <span className="text-white">💰 Наличные (при получении)</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg cursor-pointer hover:bg-neutral-800 transition">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                            className="w-4 h-4 text-red-600 focus:ring-red-600"
                                        />
                                        <span className="text-white">💳 Карта (при получении)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Доставка */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Доставка</h2>
                                <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
                                    <p className="text-gray-300 flex items-start gap-3">
                                        <span className="text-xl">📍</span>
                                        <span>
                                            <span className="text-white font-medium">Самовывоз</span>
                                            <br />
                                            <span className="text-gray-400 text-sm">
                                                г. Севастополь, Фиолентовское шоссе, 6
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Кнопка */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 text-white font-bold rounded-lg transition ${isSubmitting
                                        ? 'bg-neutral-700 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                            </button>
                        </form>
                    </div>

                    {/* Итого */}
                    <div className="lg:col-span-1">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 sticky top-32">
                            <h2 className="text-xl font-bold text-white mb-4">Ваш заказ</h2>

                            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-300">
                                            {item.title} × {item.quantity}
                                        </span>
                                        <span className="text-white">
                                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-neutral-800 pt-4">
                                <div className="flex justify-between text-white font-bold text-xl">
                                    <span>Итого</span>
                                    <span className="text-red-500">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-neutral-800/30 rounded-lg border border-neutral-700">
                                <p className="text-gray-400 text-sm text-center flex items-center justify-center gap-2">
                                    <span className="text-green-500">📞</span>
                                    Вам перезвонят для подтверждения заказа
                                </p>
                            </div>

                            <Link
                                href="/cart"
                                className="block text-center mt-4 text-gray-500 hover:text-white text-sm transition"
                            >
                                ← Вернуться в корзину
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}