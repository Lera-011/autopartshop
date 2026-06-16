'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart()
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: ''
    })
    const [submitting, setSubmitting] = useState(false)

    if (items.length === 0) {
        router.push('/cart')
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        const { data, error } = await supabase
            .from('orders')
            .insert([{
                customer_name: form.name,
                customer_phone: form.phone,
                customer_address: form.address,
                total_price: totalPrice,
                items: items,
                status: 'new'
            }])

        if (!error) {
            clearCart()
            alert('Заказ оформлен! С вами свяжется менеджер.')
            router.push('/')
        } else {
            alert('Ошибка при оформлении')
        }
        setSubmitting(false)
    }

    return (
        <div className="min-h-screen bg-neutral-950 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Оформление заказа</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded" required />
                        <input type="tel" placeholder="Телефон" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded" required />
                        <textarea placeholder="Адрес доставки" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded" rows={3} required />
                        <button type="submit" disabled={submitting} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold">
                            {submitting ? 'Оформляем...' : `Подтвердить заказ — ${totalPrice.toLocaleString('ru-RU')} ₽`}
                        </button>
                    </form>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Ваш заказ</h2>
                        {items.map((item, idx) => (
                            <div key={idx} className="flex justify-between py-2 border-b border-neutral-800">
                                <span>{item.title} x{item.quantity}</span>
                                <span className="text-red-500">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                            </div>
                        ))}
                        <div className="flex justify-between pt-4 font-bold text-white text-lg">
                            <span>Итого:</span>
                            <span className="text-red-500">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}