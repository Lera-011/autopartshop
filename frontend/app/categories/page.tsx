// app/categories/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Category = {
    id: string
    name: string
    slug: string
    description: string
    productCount: number
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Заглушка: загружаем категории из localStorage или мок-данные
        setTimeout(() => {
            const mockCategories: Category[] = [
                {
                    id: '1',
                    name: 'Тормозная система',
                    slug: 'brake-system',
                    description: 'Тормозные колодки, диски, цилиндры',
                    productCount: 12
                },
                {
                    id: '2',
                    name: 'Фильтры',
                    slug: 'filters',
                    description: 'Масляные, воздушные, топливные фильтры',
                    productCount: 8
                },
                {
                    id: '3',
                    name: 'Подвеска',
                    slug: 'suspension',
                    description: 'Амортизаторы, пружины, рычаги',
                    productCount: 6
                },
                {
                    id: '4',
                    name: 'Зажигание',
                    slug: 'ignition',
                    description: 'Свечи, катушки, провода',
                    productCount: 5
                },
                {
                    id: '5',
                    name: 'Двигатель',
                    slug: 'engine',
                    description: 'Ремни, ролики, прокладки',
                    productCount: 9
                }
            ]
            setCategories(mockCategories)
            setLoading(false)
        }, 0)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-white">Загрузка категорий...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Категории товаров</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/catalog?category=${category.slug}`}
                            className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-red-600 transition group"
                        >
                            <h2 className="text-xl font-bold text-white group-hover:text-red-500 transition">
                                {category.name}
                            </h2>
                            <p className="text-gray-400 text-sm mt-2">{category.description}</p>
                            <p className="text-gray-500 text-sm mt-4">
                                Товаров: {category.productCount}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}