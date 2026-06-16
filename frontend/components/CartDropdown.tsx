'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'

type Props = {
    isOpen: boolean
    onClose: () => void
}

export default function CartDropdown({ isOpen, onClose }: Props) {
    const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute right-0 top-full mt-2 w-96 bg-neutral-900 border border-neutral-800 shadow-2xl z-50">
                <div className="p-4 border-b border-neutral-800">
                    <h3 className="text-white font-bold text-lg uppercase tracking-wider">
                        Корзина ({totalItems})
                    </h3>
                </div>

                {items.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-500">Корзина пуста</p>
                    </div>
                ) : (
                    <>
                        <div className="max-h-80 overflow-y-auto">
                            {items.map((item, index) => (
                                <div key={index} className="p-4 border-b border-neutral-800 flex gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{item.title}</p>
                                        {item.brand && <p className="text-gray-500 text-xs mt-1">{item.brand}</p>}
                                        <p className="text-red-500 font-bold mt-1">{item.price.toLocaleString('ru-RU')} ₽</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => updateQuantity(item.title, item.quantity - 1)} className="w-6 h-6 border border-neutral-700 text-gray-400 hover:text-white hover:border-red-600 flex items-center justify-center text-sm transition">-</button>
                                            <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.title, item.quantity + 1)} className="w-6 h-6 border border-neutral-700 text-gray-400 hover:text-white hover:border-red-600 flex items-center justify-center text-sm transition">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.title)} className="text-gray-500 hover:text-red-500 transition p-1">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-neutral-800">
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-400">Итого:</span>
                                <span className="text-white font-bold text-xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                            </div>
                            <Link
                                href="/cart"
                                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider transition text-center block"
                                onClick={onClose}
                            >
                                Перейти в корзину
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}