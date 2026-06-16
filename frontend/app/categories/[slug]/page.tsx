'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import QuickViewModal from '@/components/QuickViewModal'

type Product = {
    id: number
    title: string
    price: number
    image?: string
    brand?: string
    category?: string
    description?: string
}

type Category = {
    id: number
    name: string
    slug: string
    description: string
}

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string

    const [category, setCategory] = useState<Category | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchCategoryAndProducts()
    }, [slug])

    const fetchCategoryAndProducts = async () => {
        setLoading(true)

        // Получаем категорию
        const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', slug)
            .single()

        if (categoryError || !categoryData) {
            setLoading(false)
            return
        }

        setCategory(categoryData)

        // Получаем товары в этой категории
        const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', categoryData.id)
            .order('id')

        if (!productsError && productsData) {
            setProducts(productsData)
        }

        setLoading(false)
    }

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedProduct(null), 200)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-white">Загрузка...</div>
            </div>
        )
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-white text-2xl mb-4">Категория не найдена</div>
                    <Link href="/categories" className="text-red-500 hover:text-red-400">
                        ← Вернуться к категориям
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Хлебные крошки */}
                <div className="mb-8">
                    <Link href="/categories" className="text-gray-500 hover:text-red-500 transition">
                        ← Все категории
                    </Link>
                </div>

                {/* Заголовок категории */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {category.name}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {category.description}
                    </p>
                </div>

                {/* Товары */}
                {products.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        В этой категории пока нет товаров
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                brand={product.brand}
                                onQuickView={() => handleQuickView(product)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <QuickViewModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}