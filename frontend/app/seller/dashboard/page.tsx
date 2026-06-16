// app/seller/dashboard/page.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// ✅ ЗАГЛУШКА ДАННЫХ ИЗ БД
const MOCK_ORDERS = [
    {
        id: '1',
        userFullName: 'Алексей Смирнов',
        userEmail: 'alex@example.com',
        userPhone: '+7 (999) 123-45-67',
        paymentMethod: 'card',
        total: 4500,
        status: 'pending',
        comment: 'Перезвонить перед выдачей',
        items: [
            { id: '1', productName: 'Тормозные колодки Brembo', quantity: 1, price: 4500 }
        ],
        createdAt: '2026-06-16T10:30:00Z',
        updatedAt: '2026-06-16T10:30:00Z'
    },
    {
        id: '2',
        userFullName: 'Екатерина Иванова',
        userEmail: 'katya@example.com',
        userPhone: '+7 (999) 765-43-21',
        paymentMethod: 'cash',
        total: 8900,
        status: 'processing',
        comment: '',
        items: [
            { id: '2', productName: 'Амортизатор Bilstein', quantity: 2, price: 4450 }
        ],
        createdAt: '2026-06-15T15:20:00Z',
        updatedAt: '2026-06-16T09:00:00Z'
    },
    {
        id: '3',
        userFullName: 'Михаил Петров',
        userEmail: 'misha@example.com',
        userPhone: '+7 (999) 111-22-33',
        paymentMethod: 'online',
        total: 2300,
        status: 'delivered',
        comment: 'Оставить у охраны',
        items: [
            { id: '3', productName: 'Масляный фильтр MANN', quantity: 2, price: 600 },
            { id: '4', productName: 'Воздушный фильтр K&N', quantity: 1, price: 1100 }
        ],
        createdAt: '2026-06-14T08:45:00Z',
        updatedAt: '2026-06-15T16:30:00Z'
    },
    {
        id: '4',
        userFullName: 'Ольга Соколова',
        userEmail: 'olga@example.com',
        userPhone: '+7 (999) 555-66-77',
        paymentMethod: 'card',
        total: 3200,
        status: 'shipped',
        comment: '',
        items: [
            { id: '5', productName: 'Ремень ГРМ Gates', quantity: 1, price: 3200 }
        ],
        createdAt: '2026-06-13T12:00:00Z',
        updatedAt: '2026-06-14T11:00:00Z'
    },
    {
        id: '5',
        userFullName: 'Дмитрий Козлов',
        userEmail: 'dima@example.com',
        userPhone: '+7 (999) 888-99-00',
        paymentMethod: 'cash',
        total: 7800,
        status: 'cancelled',
        comment: 'Клиент передумал',
        items: [
            { id: '6', productName: 'Стартер Bosch', quantity: 1, price: 7800 }
        ],
        createdAt: '2026-06-12T09:00:00Z',
        updatedAt: '2026-06-13T08:00:00Z'
    }
]

export default function SellerDashboard() {
    const { profile, loading } = useAuth()
    const router = useRouter()
    const [orders, setOrders] = useState(MOCK_ORDERS)
    const [filter, setFilter] = useState('all')
    const [loadingOrders, setLoadingOrders] = useState(false)

    useEffect(() => {
        if (!loading && profile?.role !== 'seller') {
            router.push('/')
        }
    }, [profile, loading, router])

    const updateStatus = (orderId: string, newStatus: string) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            }
            return order
        })
        setOrders(updatedOrders)
    }

    const getStatusText = (status: string) => {
        const map: Record<string, string> = {
            pending: 'Ожидает',
            processing: 'В обработке',
            shipped: 'Отправлен',
            delivered: 'Доставлен',
            cancelled: 'Отменён'
        }
        return map[status] || status
    }

    const getStatusBadge = (status: string) => {
        const map: Record<string, string> = {
            pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
            cancelled: 'bg-red-500/10 text-red-400 border-red-500/20'
        }
        return map[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }

    const getPaymentText = (method: string) => {
        const map: Record<string, string> = {
            cash: 'Наличные',
            card: 'Карта',
            online: 'Онлайн-оплата'
        }
        return map[method] || method
    }

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter)

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-neutral-400">Загрузка...</div>
            </div>
        )
    }

    if (!profile || profile.role !== 'seller') {
        return null
    }

    return (
        <div className="min-h-screen bg-neutral-950 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Заголовок */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                            Управление заказами
                        </h1>
                        <p className="text-neutral-500 text-sm mt-1">
                            Всего заказов: {stats.total}
                        </p>
                    </div>
                    <Link
                        href="/seller/products"
                        className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded-md transition"
                    >
                        📦 Управление товарами
                    </Link>
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-center">
                        <p className="text-xl font-light text-white">{stats.total}</p>
                        <p className="text-neutral-500 text-xs uppercase tracking-wider">Всего</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-center">
                        <p className="text-xl font-light text-yellow-500">{stats.pending}</p>
                        <p className="text-neutral-500 text-xs uppercase tracking-wider">Ожидают</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-center">
                        <p className="text-xl font-light text-blue-400">{stats.processing}</p>
                        <p className="text-neutral-500 text-xs uppercase tracking-wider">В обработке</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-center">
                        <p className="text-xl font-light text-purple-400">{stats.shipped}</p>
                        <p className="text-neutral-500 text-xs uppercase tracking-wider">Отправлены</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-center">
                        <p className="text-xl font-light text-green-500">{stats.delivered}</p>
                        <p className="text-neutral-500 text-xs uppercase tracking-wider">Доставлены</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-center">
                        <p className="text-xl font-light text-red-400">{stats.cancelled}</p>
                        <p className="text-neutral-500 text-xs uppercase tracking-wider">Отменены</p>
                    </div>
                </div>

                {/* Фильтры */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 rounded-md text-sm transition ${filter === 'all'
                                ? 'bg-neutral-700 text-white'
                                : 'bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800'
                            }`}
                    >
                        Все
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-1.5 rounded-md text-sm transition ${filter === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800'
                            }`}
                    >
                        Ожидают
                    </button>
                    <button
                        onClick={() => setFilter('processing')}
                        className={`px-4 py-1.5 rounded-md text-sm transition ${filter === 'processing'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800'
                            }`}
                    >
                        В обработке
                    </button>
                    <button
                        onClick={() => setFilter('shipped')}
                        className={`px-4 py-1.5 rounded-md text-sm transition ${filter === 'shipped'
                                ? 'bg-purple-500/20 text-purple-400'
                                : 'bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800'
                            }`}
                    >
                        Отправлены
                    </button>
                    <button
                        onClick={() => setFilter('delivered')}
                        className={`px-4 py-1.5 rounded-md text-sm transition ${filter === 'delivered'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800'
                            }`}
                    >
                        Доставлены
                    </button>
                    <button
                        onClick={() => setFilter('cancelled')}
                        className={`px-4 py-1.5 rounded-md text-sm transition ${filter === 'cancelled'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800'
                            }`}
                    >
                        Отменены
                    </button>
                </div>

                {/* Список заказов */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-12 text-center">
                        <p className="text-neutral-500">Нет заказов</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    {/* Левая часть */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 flex-wrap mb-3">
                                            <span className="text-white font-medium">
                                                Заказ #{order.id}
                                            </span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                            <span className="text-neutral-500 text-xs">
                                                {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                                            </span>
                                        </div>

                                        {/* Контакты покупателя */}
                                        <div className="flex flex-wrap items-center gap-4 bg-neutral-800/30 rounded-lg p-3 mb-3">
                                            <div>
                                                <p className="text-neutral-500 text-xs uppercase tracking-wider">Покупатель</p>
                                                <p className="text-white text-sm">{order.userFullName}</p>
                                            </div>
                                            <div>
                                                <p className="text-neutral-500 text-xs uppercase tracking-wider">Телефон</p>
                                                <a
                                                    href={`tel:${order.userPhone}`}
                                                    className="text-neutral-300 hover:text-white text-sm transition"
                                                >
                                                    {order.userPhone}
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-neutral-500 text-xs uppercase tracking-wider">Email</p>
                                                <a
                                                    href={`mailto:${order.userEmail}`}
                                                    className="text-neutral-300 hover:text-white text-sm transition"
                                                >
                                                    {order.userEmail}
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-neutral-500 text-xs uppercase tracking-wider">Оплата</p>
                                                <p className="text-neutral-300 text-sm">{getPaymentText(order.paymentMethod)}</p>
                                            </div>
                                            {order.comment && (
                                                <div>
                                                    <p className="text-neutral-500 text-xs uppercase tracking-wider">Комментарий</p>
                                                    <p className="text-neutral-400 text-sm">📝 {order.comment}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Товары */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {order.items.map((item) => (
                                                <span key={item.id} className="bg-neutral-800 px-2.5 py-1 rounded-md text-xs text-neutral-300">
                                                    {item.productName} × {item.quantity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Правая часть */}
                                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-2 flex-shrink-0">
                                        <p className="text-xl font-light text-white whitespace-nowrap">
                                            {order.total.toLocaleString('ru-RU')} ₽
                                        </p>

                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className="bg-neutral-800 text-white text-sm px-3 py-1.5 rounded-md border border-neutral-700 focus:outline-none focus:border-neutral-500"
                                        >
                                            <option value="pending">Ожидает</option>
                                            <option value="processing">В обработке</option>
                                            <option value="shipped">Отправлен</option>
                                            <option value="delivered">Доставлен</option>
                                            <option value="cancelled">Отменён</option>
                                        </select>

                                        <p className="text-neutral-600 text-[10px] uppercase tracking-wider">
                                            {new Date(order.updatedAt).toLocaleDateString('ru-RU')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}