// app/seller/products/page.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// ✅ ЗАГЛУШКА ТОВАРОВ (как из БД)
const MOCK_PRODUCTS = [
    {
        id: '1',
        title: 'Тормозные колодки Brembo',
        price: 4500,
        brand: 'Brembo',
        category: 'Тормозная система',
        description: 'Премиальные керамические тормозные колодки для европейских автомобилей.',
        inStock: true,
        createdAt: '2026-06-01T10:00:00Z'
    },
    {
        id: '2',
        title: 'Масляный фильтр MANN',
        price: 1200,
        brand: 'MANN-FILTER',
        category: 'Фильтры',
        description: 'Оригинальный масляный фильтр для двигателей BMW, Mercedes-Benz, Audi.',
        inStock: true,
        createdAt: '2026-06-02T11:00:00Z'
    },
    {
        id: '3',
        title: 'Амортизатор Bilstein',
        price: 8900,
        brand: 'Bilstein',
        category: 'Подвеска',
        description: 'Газонаполненный амортизатор для спортивной подвески.',
        inStock: true,
        createdAt: '2026-06-03T12:00:00Z'
    },
    {
        id: '4',
        title: 'Свечи зажигания NGK',
        price: 850,
        brand: 'NGK',
        category: 'Зажигание',
        description: 'Иридиевые свечи зажигания с увеличенным сроком службы.',
        inStock: true,
        createdAt: '2026-06-04T13:00:00Z'
    },
    {
        id: '5',
        title: 'Воздушный фильтр K&N',
        price: 2800,
        brand: 'K&N',
        category: 'Фильтры',
        description: 'Высокопоточный воздушный фильтр. Увеличивает мощность.',
        inStock: true,
        createdAt: '2026-06-05T14:00:00Z'
    }
]

export default function SellerProducts() {
    const { profile, loading } = useAuth()
    const router = useRouter()
    const [products, setProducts] = useState(MOCK_PRODUCTS)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    // Форма нового товара
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        brand: '',
        category: '',
        description: '',
        inStock: true
    })

    useEffect(() => {
        if (!loading && profile?.role !== 'seller') {
            router.push('/')
        }
    }, [profile, loading, router])

    const resetForm = () => {
        setFormData({
            title: '',
            price: '',
            brand: '',
            category: '',
            description: '',
            inStock: true
        })
        setEditingId(null)
        setShowForm(false)
    }

    const handleEdit = (product: typeof MOCK_PRODUCTS[0]) => {
        setEditingId(product.id)
        setFormData({
            title: product.title,
            price: product.price.toString(),
            brand: product.brand,
            category: product.category,
            description: product.description,
            inStock: product.inStock
        })
        setShowForm(true)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const productData = {
            title: formData.title,
            price: Number(formData.price),
            brand: formData.brand,
            category: formData.category,
            description: formData.description,
            inStock: formData.inStock,
            createdAt: new Date().toISOString()
        }

        if (editingId) {
            // Редактирование
            setProducts(products.map(p =>
                p.id === editingId
                    ? { ...p, ...productData }
                    : p
            ))
        } else {
            // Добавление
            const newProduct = {
                id: (products.length + 1).toString(),
                ...productData
            }
            setProducts([...products, newProduct])
        }
        resetForm()
    }

    const handleDelete = (id: string) => {
        if (confirm('Удалить этот товар?')) {
            setProducts(products.filter(p => p.id !== id))
        }
    }

    const toggleStock = (id: string) => {
        setProducts(products.map(p =>
            p.id === id
                ? { ...p, inStock: !p.inStock }
                : p
        ))
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
                            Управление товарами
                        </h1>
                        <p className="text-neutral-500 text-sm mt-1">
                            Всего товаров: {products.length}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded-md transition"
                    >
                        {showForm ? '✕ Отменить' : '+ Добавить товар'}
                    </button>
                </div>

                {/* Форма добавления/редактирования */}
                {showForm && (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8">
                        <h2 className="text-white font-medium mb-4">
                            {editingId ? '✏️ Редактировать товар' : '➕ Новый товар'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Название товара *"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-neutral-500"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Цена *"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-neutral-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Бренд *"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-neutral-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Категория *"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-neutral-500"
                                required
                            />
                            <textarea
                                placeholder="Описание"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-neutral-500 md:col-span-2"
                                rows={3}
                            />
                            <div className="flex items-center gap-4 md:col-span-2">
                                <label className="text-neutral-400 text-sm">В наличии:</label>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, inStock: !formData.inStock })}
                                    className={`px-4 py-1.5 rounded-md text-sm transition ${formData.inStock
                                            ? 'bg-green-500/20 text-green-500 border border-green-500/20'
                                            : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                                        }`}
                                >
                                    {formData.inStock ? '✅ Да' : '❌ Нет'}
                                </button>
                            </div>
                            <div className="flex gap-3 md:col-span-2 pt-2">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md transition"
                                >
                                    {editingId ? '💾 Сохранить' : '➕ Добавить'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 rounded-md transition"
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Список товаров */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-800/50">
                                <tr>
                                    <th className="text-left text-neutral-500 text-xs uppercase tracking-wider px-4 py-3">Название</th>
                                    <th className="text-left text-neutral-500 text-xs uppercase tracking-wider px-4 py-3">Цена</th>
                                    <th className="text-left text-neutral-500 text-xs uppercase tracking-wider px-4 py-3">Бренд</th>
                                    <th className="text-left text-neutral-500 text-xs uppercase tracking-wider px-4 py-3">Категория</th>
                                    <th className="text-left text-neutral-500 text-xs uppercase tracking-wider px-4 py-3">Статус</th>
                                    <th className="text-right text-neutral-500 text-xs uppercase tracking-wider px-4 py-3">Действия</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-neutral-800/30 transition">
                                        <td className="px-4 py-3 text-white text-sm">{product.title}</td>
                                        <td className="px-4 py-3 text-white text-sm">
                                            {product.price.toLocaleString('ru-RU')} ₽
                                        </td>
                                        <td className="px-4 py-3 text-neutral-400 text-sm">{product.brand}</td>
                                        <td className="px-4 py-3 text-neutral-400 text-sm">{product.category}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => toggleStock(product.id)}
                                                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition ${product.inStock
                                                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}
                                            >
                                                {product.inStock ? 'В наличии' : 'Нет в наличии'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white text-xs rounded transition"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs rounded transition"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Если товаров нет */}
                {products.length === 0 && (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-12 text-center">
                        <p className="text-neutral-500">Товаров пока нет</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-4 text-neutral-400 hover:text-white transition"
                        >
                            + Добавить первый товар
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}